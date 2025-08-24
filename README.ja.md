# o3-search-mcp (gpt-5, o4-mini 対応)

<div align="center">
  <p><a href="./README.md">English</a> | 日本語 | <a href="./README.zh.md">简体中文</a> | <a href="./README.ko.md">한국어</a></p>

[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/810f04ea-e685-4840-ae20-6a70deb7407a)

</div>


OpenAIのハイエンドモデルとその強力なWeb検索機能を使えるようにするMCPサーバー。  
任意のAIコーディングエージェントに登録することで、コーディングエージェントが自律的にOpenAIのモデルと相談し、複雑な問題を解決できるようになります。

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

## 使用例

（MCP名にあわせてo3と呼んでいますが、利用するモデルはenvでgpt-5やo4-miniも指定可能です）

### 🐛 デバッグで詰まった場合

o3のWeb検索ではGitHubのissueやStack Overflowなど広範囲に問題を検索できるので、ニッチな問題も解決できる可能性が大幅に高まります。指示の例：

```
> 起動したら以下のエラーが出ているので修正して。難しければo3に聞いてみて
> [エラーメッセージを貼り付け]
```
```
> WebSocketの接続がうまくいかない。デバッグして。わからなければo3に聞いてみて
```

### 📚 最新のライブラリ情報を参照したい場合

整ったドキュメントが存在しない場合でも強力なWeb検索から答えを得られます。指示の例：

```
> このライブラリをv2にバージョンアップしたい。o3に聞きながら進めて
```

```
> このライブラリのこのオプションが存在しないと言われた。なくなったのかも。代わりに何を指定すべきかo3に聞いて置き換えて
```

### 🧩 複雑なタスクに取り組む場合

検索だけでなく、設計の壁打ち相手になってもらうことも可能です。指示の例：

```
> 同時編集可能なエディタを作成したいので設計して。o3にも設計レビューを依頼して、必要ならディスカッションして。
```

また、MCPサーバーとして提供されているため、こちらから指示しなくてもAIエージェントが自分で必要性を判断して自律的にo3に話しかけることもあります。自走する中での問題解決の幅が一気に広がるでしょう！

## インストール

### npx（推奨）

Claude Code:

```sh
$ claude mcp add o3 \ 
	-s user \  # この行を抜くと project scope でインストールされます
	-e OPENAI_MODEL=o3 \ # o4-mini, gpt-5 も指定可能
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=medium \
	-e REASONING_EFFORT=medium \
	-e OPENAI_API_TIMEOUT=300000 \
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
        // オプション: o3, o4-mini, gpt-5 (デフォルト: o3)
        "OPENAI_MODEL": "o3",
        // オプション: low, medium, high (デフォルト: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // オプション: ミリ秒単位のAPIタイムアウト (デフォルト: 300000)
        "OPENAI_API_TIMEOUT": "300000",
        // オプション: 最大リトライ回数 (デフォルト: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

### ローカルセットアップ

コードをダウンロードしてローカルで実行したい場合：

```bash
git clone git@github.com:yoshiko-pg/o3-search-mcp.git
cd o3-search-mcp
pnpm install
pnpm build
```

Claude Code:

```sh
$ claude mcp add o3 \
	-s user \  # この行を抜くと project scope でインストールされます
	-e OPENAI_MODEL=o3 \ # o4-mini, gpt-5 も指定可能
	-e OPENAI_API_KEY=your-api-key \
	-e OPENAI_MODEL=o3 \
	-e SEARCH_CONTEXT_SIZE=medium \
	-e REASONING_EFFORT=medium \
	-e OPENAI_API_TIMEOUT=300000 \
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
        // オプション: o3, o4-mini, gpt-5 (デフォルト: o3)
        "OPENAI_MODEL": "o3",
        // オプション: low, medium, high (デフォルト: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // オプション: ミリ秒単位のAPIタイムアウト (デフォルト: 300000)
        "OPENAI_API_TIMEOUT": "300000",
        // オプション: 最大リトライ回数 (デフォルト: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

## 環境変数

| 環境変数名 | オプション | デフォルト | 説明 |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | 必須 | - | OpenAI API Key |
| `OPENAI_MODEL` | 任意 | `o3` | 使用するモデル<br>値: `o3`, `o4-mini`, `gpt-5` |
| `SEARCH_CONTEXT_SIZE` | 任意 | `medium` | 検索コンテキストサイズを制御<br>値: `low`, `medium`, `high` |
| `REASONING_EFFORT` | 任意 | `medium` | 推論努力レベルを制御<br>値: `low`, `medium`, `high` |
| `OPENAI_API_TIMEOUT` | 任意 | `300000` | ミリ秒単位のAPIリクエストタイムアウト<br>例: `300000` で5分 |
| `OPENAI_MAX_RETRIES` | 任意 | `3` | 失敗したリクエストの最大リトライ回数<br>SDKはレート制限（429）、サーバーエラー（5xx）、接続エラーで自動的にリトライします |

## 注意点

OpenAI APIからo3 modelを利用可能にするためには、Tierを4まで上げるか、Organizationの検証をおこなう必要があります。  
まだ利用可能でないAPI KeyをこのMCPに登録した場合、呼び出しでエラーになります。  
参考: https://help.openai.com/en/articles/10362446-api-access-to-o1-o3-and-o4-models
