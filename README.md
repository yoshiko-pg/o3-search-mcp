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
	-e OPENAI_API_TIMEOUT=60000 \
	-e OPENAI_MAX_RETRIES=3 \
	-- npx o3-search-mcp
```

json:

```jsonc
{
  "mcpServers": {
    "o3-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // Optional: API timeout in milliseconds (default: 60000)
        "OPENAI_API_TIMEOUT": "60000",
        // Optional: Maximum retry attempts (default: 3)
        "OPENAI_MAX_RETRIES": "3"
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
	-e OPENAI_API_TIMEOUT=60000 \
	-e OPENAI_MAX_RETRIES=3 \
	-- node /path/to/o3-search-mcp/build/index.js
```

json:

```jsonc
{
  "mcpServers": {
    "o3-search": {
      "command": "node",
      "args": ["/path/to/o3-search-mcp/build/index.js"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // Optional: API timeout in milliseconds (default: 60000)
        "OPENAI_API_TIMEOUT": "60000",
        // Optional: Maximum retry attempts (default: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

## Configuration

### Environment Variables

- **OPENAI_API_KEY** (required): Your OpenAI API key
- **SEARCH_CONTEXT_SIZE** (optional): Controls the search context size
  - Values: `low`, `medium`, `high`
  - Default: `medium`
- **REASONING_EFFORT** (optional): Controls the reasoning effort level
  - Values: `low`, `medium`, `high`
  - Default: `medium`
- **OPENAI_API_TIMEOUT** (optional): API request timeout in milliseconds
  - Default: `60000` (60 seconds)
  - Example: `120000` for 2 minutes
- **OPENAI_MAX_RETRIES** (optional): Maximum number of retry attempts for failed requests
  - Default: `3`
  - The SDK automatically retries on rate limits (429), server errors (5xx), and connection errors
