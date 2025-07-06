#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import OpenAI from "openai";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "o3-search-mcp",
  version: "0.0.1",
});

// Configuration from environment variables
const config = {
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: parseInt(process.env.OPENAI_MAX_RETRIES || '3'),
  timeout: parseInt(process.env.OPENAI_API_TIMEOUT || '60000'),
  searchContextSize: (process.env.SEARCH_CONTEXT_SIZE || 'medium') as 'low' | 'medium' | 'high',
  reasoningEffort: (process.env.REASONING_EFFORT || 'medium') as 'low' | 'medium' | 'high',
};

// Initialize OpenAI client with retry and timeout configuration
const openai = new OpenAI({
  apiKey: config.apiKey,
  maxRetries: config.maxRetries,
  timeout: config.timeout,
});

// Define the o3-search tool
server.tool(
  "o3-search",
  `An AI agent with advanced web search capabilities. Useful for finding latest information and troubleshooting errors. Supports natural language queries.`,
  { input: z.string().describe('Ask questions, search for information, or consult about complex problems in English.'), },
  async ({ input }) => {
    try {
      // デバッグログ（オプション）
      console.error(`[o3-search] Request started with timeout: ${config.timeout}ms, maxRetries: ${config.maxRetries}`);
      
      const response = await openai.responses.create({
        model: 'o3',
        input,
        tools: [{ type: 'web_search_preview', search_context_size: config.searchContextSize }],
        tool_choice: 'auto',
        parallel_tool_calls: true,
        reasoning: { effort: config.reasoningEffort },
      })

      return {
        content: [
          {
            type: "text",
            text: response.output_text || "No response text available.",
          },
        ],
      };
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      
      // エラーの種類に応じたメッセージ
      let errorMessage = "An error occurred while processing your request.";
      
      if (error instanceof OpenAI.APIError) {
        if (error.status === 429) {
          errorMessage = "Rate limit exceeded. The request was retried but still failed. Please try again later.";
        } else if (error.status && error.status >= 500) {
          errorMessage = "OpenAI service is temporarily unavailable. Please try again later.";
        }
      } else if (error instanceof OpenAI.APIConnectionTimeoutError) {
        errorMessage = "Request timed out. Please try again with a simpler query.";
      }
      
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
