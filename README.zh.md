# o3-search-mcp (gpt-5, o4-mini 支持)

<div align="center">
  <p><a href="./README.md">English</a> | <a href="./README.ja.md">日本語</a> | 简体中文 | <a href="./README.ko.md">한국어</a></p>

[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/810f04ea-e685-4840-ae20-6a70deb7407a)

</div>


一个MCP服务器，可以使用OpenAI的高端模型及其强大的Web搜索功能。
通过将其注册到任何AI编码代理，该代理可以自主地与OpenAI模型协商，以解决复杂的问题。

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

## 使用案例

（虽然为了与MCP名称匹配而称为o3，但您可以通过env指定gpt-5或o4-mini作为要使用的模型）

### 🐛 调试卡住时

o3的Web搜索可以广泛搜索GitHub issue和Stack Overflow等问题，因此解决小众问题的可能性大大增加。指示示例：

```
> 启动后出现以下错误，请修复。如果太难，请询问o3
> [粘贴错误消息]
```
```
> WebSocket连接不成功。请调试。如果不知道，请询问o3
```

### 📚 想要参考最新的库信息时

即使没有整理好的文档，也可以通过强大的Web搜索获得答案。指示示例：

```
> 我想将这个库升级到v2。请边咨询o3边进行
```

```
> 我被告知该库的此选项不存在。也许它已被删除。请询问o3应该指定什么来代替并替换它
```

### 🧩 处理复杂任务时

除了搜索之外，您还可以将其用作设计的讨论对象。指示示例：

```
> 我想创建一个可同时编辑的编辑器，请进行设计。并请o3进行设计审查，必要时进行讨论。
```

此外，由于它是作为MCP服务器提供的，因此即使您不发出指示，AI代理也可能会自行判断必要性并自主地与o3对话。这将极大地扩展其在自主运行中解决问题的范围！

## 安装

### npx (推荐)

Claude Code:

```sh
$ claude mcp add o3 \
	-s user \  # 省略此行将在项目范围内安装
	-e OPENAI_MODEL=o3 \ # o4-mini, gpt-5 也可用
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
        // 可选: o3, o4-mini, gpt-5 (默认: o3)
        "OPENAI_MODEL": "o3",
        // 可选: low, medium, high (默认: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // 可选: API超时（毫秒） (默认: 60000)
        "OPENAI_API_TIMEOUT": "60000",
        // 可选: 最大重试次数 (默认: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

### 本地设置

如果您想下载代码并在本地运行：

```bash
git clone git@github.com:yoshiko-pg/o3-search-mcp.git
cd o3-search-mcp
pnpm install
pnpm build
```

Claude Code:

```sh
$ claude mcp add o3 \
	-s user \  # 省略此行将在项目范围内安装
	-e OPENAI_MODEL=o3 \ # o4-mini, gpt-5 也可用
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
        // 可选: o3, o4-mini, gpt-5 (默认: o3)
        "OPENAI_MODEL": "o3",
        // 可选: low, medium, high (默认: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // 可选: API超时（毫秒） (默认: 60000)
        "OPENAI_API_TIMEOUT": "60000",
        // 可选: 最大重试次数 (默认: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

## 环境变量

| 环境变量名 | 选项 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | 必需 | - | OpenAI API 密钥 |
| `OPENAI_MODEL` | 可选 | `o3` | 使用的模型<br>值: `o3`, `o4-mini`, `gpt-5` |
| `SEARCH_CONTEXT_SIZE` | 可选 | `medium` | 控制搜索上下文大小<br>值: `low`, `medium`, `high` |
| `REASONING_EFFORT` | 可选 | `medium` | 控制推理努力级别<br>值: `low`, `medium`, `high` |
| `OPENAI_API_TIMEOUT` | 可选 | `60000` | API请求超时（毫秒）<br>示例: `120000` 为2分钟 |
| `OPENAI_MAX_RETRIES` | 可选 | `3` | 失败请求的最大重试次数<br>SDK会在速率限制（429）、服务器错误（5xx）和连接错误时自动重试 |

## 注意事项

要从OpenAI API使用o3模型，您需要将您的层级提升到4级或验证您的组织。
如果您向此MCP注册了尚未启用o3的API密钥，则调用将导致错误。
参考: https://help.openai.com/en/articles/10362446-api-access-to-o1-o3-and-o4-models