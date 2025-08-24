# o3-search-mcp (gpt-5, o4-mini support)

<div align="center">
  <p>English | <a href="./README.ja.md">日本語</a> | <a href="./README.zh.md">简体中文</a> | <a href="./README.ko.md">한국어</a></p>

[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/810f04ea-e685-4840-ae20-6a70deb7407a)

</div>


MCP server that enables the use of OpenAI's high-end models and their powerful web search capabilities.
By registering it with any AI coding agent, the agent can autonomously consult with OpenAI models to solve complex problems.

<table>
	<tr>
		<td width="50%">
			<a href="https://mseep.ai/app/yoshiko-pg-o3-search-mcp">
<img src="https://mseep.net/pr/yoshiko-pg-o3-search-mcp-badge.png" alt="MseeP.ai Security Assessment Badge" />
</a>
		</td>
		<td width="50%">
			<a href="https://glama.ai/mcp/servers/@yoshiko-pg/o3-search-mcp">
  <img src="https://glama.ai/mcp/servers/@yoshiko-pg/o3-search-mcp/badge" alt="o3-search MCP server" />
</a>
		</td>
	</tr>
</table>


## Use Cases

(Although called o3 to match the MCP name, you can specify gpt-5 or o4-mini via env for the model to use)

### 🐛 When you're stuck debugging

o3's web search can scan a wide range of sources, including GitHub issues and Stack Overflow, significantly increasing the chances of resolving niche problems. Example prompts:

```
> I'm getting the following error on startup, please fix it. If it's too difficult, ask o3.
> [Paste error message here]
```
```
> The WebSocket connection isn't working. Please debug it. If you don't know how, ask o3.
```

### 📚 When you want to reference the latest library information

You can get answers from the powerful web search even when there's no well-organized documentation. Example prompts:

```
> I want to upgrade this library to v2. Proceed while consulting with o3.
```

```
> I was told this option for this library doesn't exist. It might have been removed. Ask o3 what to specify instead and replace it.
```

### 🧩 When tackling complex tasks

In addition to search, you can also use it as a sounding board for design. Example prompts:

```
> I want to create a collaborative editor, so please design it. Also, ask o3 for a design review and discuss if necessary.
```

Also, since it's provided as an MCP server, the AI agent may decide on its own to talk to o3 when it deems it necessary, without any instructions from you. This will dramatically expand the range of problems it can solve on its own!

## Installation

### npx (Recommended)

Claude Code:

```sh
$ claude mcp add o3 \
	-s user \  # If you omit this line, it will be installed in the project scope
	-e OPENAI_MODEL=o3 \ # o4-mini, gpt-5 also available
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
        // Optional: o3, o4-mini, gpt-5 (default: o3)
        "OPENAI_MODEL": "o3",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // Optional: API timeout in milliseconds (default: 60000)
        "OPENAI_API_TIMEOUT": "60000",
        // Optional: Maximum number of retries (default: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

### Local Setup

If you want to download the code and run it locally:

```bash
git clone git@github.com:yoshiko-pg/o3-search-mcp.git
cd o3-search-mcp
pnpm install
pnpm build
```

Claude Code:

```sh
$ claude mcp add o3 \
	-s user \  # If you omit this line, it will be installed in the project scope
	-e OPENAI_MODEL=o3 \ # o4-mini, gpt-5 also available
	-e OPENAI_API_KEY=your-api-key \
	-e OPENAI_MODEL=o3 \
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
        // Optional: o3, o4-mini, gpt-5 (default: o3)
        "OPENAI_MODEL": "o3",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // Optional: API timeout in milliseconds (default: 60000)
        "OPENAI_API_TIMEOUT": "60000",
        // Optional: Maximum number of retries (default: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

## Environment Variables

| Environment Variable | Options | Default | Description |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | Required | - | OpenAI API Key |
| `OPENAI_MODEL` | Optional | `o3` | Model to use<br>Values: `o3`, `o4-mini`, `gpt-5` |
| `SEARCH_CONTEXT_SIZE` | Optional | `medium` | Controls the search context size<br>Values: `low`, `medium`, `high` |
| `REASONING_EFFORT` | Optional | `medium` | Controls the reasoning effort level<br>Values: `low`, `medium`, `high` |
| `OPENAI_API_TIMEOUT` | Optional | `60000` | API request timeout in milliseconds<br>Example: `120000` for 2 minutes |
| `OPENAI_MAX_RETRIES` | Optional | `3` | Maximum number of retries for failed requests<br>The SDK automatically retries on rate limits (429), server errors (5xx), and connection errors |

## Notes

To use the o3 model from the OpenAI API, you need to either raise your tier to 4 or verify your organization.
If you register an API key that is not yet enabled for o3 with this MCP, calls will result in an error.
Reference: https://help.openai.com/en/articles/10362446-api-access-to-o1-o3-and-o4-models
