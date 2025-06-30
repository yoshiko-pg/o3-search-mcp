# o3-search-mcp

An MCP (Model Context Protocol) server that provides web search capabilities using OpenAI's o3 model. The `o3-search` tool accepts text queries and returns AI-powered search results.

<a href="https://glama.ai/mcp/servers/@yoshiko-pg/o3-search-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@yoshiko-pg/o3-search-mcp/badge" alt="o3-search MCP server" />
</a>

## Installation

### Using npx (Recommended)

Claude Code:

```
$ claude mcp add o3 -s user \
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=medium \
	-e REASONING_EFFORT=medium \
	-- npx o3-search-mcp
```

json:

```json
{
  "mcpServers": {
    "o3-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```

### Local Development Setup

If you want to download and run the code locally:

   ```bash
   # setup
   git clone git@github.com:yoshiko-pg/o3-search-mcp.git
   cd o3-search-mcp
   pnpm install
   pnpm build
   ```

Claude Code:

```
$ claude mcp add o3 -s user \
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=medium \
	-e REASONING_EFFORT=medium \
	-- node /path/to/o3-search-mcp/build/index.js
```

json:

```json
{
  "mcpServers": {
    "o3-search": {
      "command": "node",
      "args": ["/path/to/o3-search-mcp/build/index.js"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```