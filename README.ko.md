# o3-search-mcp (gpt-5, o4-mini 지원)

<div align="center">
  <p><a href="./README.md">English</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.zh.md">简体中文</a> | 한국어</p>

[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/810f04ea-e685-4840-ae20-6a70deb7407a)

</div>


OpenAI의 고급 모델과 강력한 웹 검색 기능을 사용할 수 있게 해주는 MCP 서버입니다.
임의의 AI 코딩 에이전트에 등록하면 코딩 에이전트가 자율적으로 OpenAI 모델과 상의하여 복잡한 문제를 해결할 수 있습니다.

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

## 사용 예

（MCP 이름에 맞춰 o3라고 부르지만, env로 gpt-5나 o4-mini를 사용할 모델로 지정할 수 있습니다）

### 🐛 디버깅에 막혔을 때

o3의 웹 검색은 GitHub 이슈나 Stack Overflow 등 광범위하게 문제를 검색할 수 있으므로, 틈새 문제를 해결할 가능성이 크게 높아집니다. 지시 예:

```
> 시작하면 다음과 같은 오류가 발생하는데 수정해 줘. 어려우면 o3에게 물어봐
> [오류 메시지 붙여넣기]
```
```
> WebSocket 연결이 잘 안 돼. 디버깅해 줘. 모르면 o3에게 물어봐
```

### 📚 최신 라이브러리 정보를 참조하고 싶을 때

정리된 문서가 없어도 강력한 웹 검색으로 답을 얻을 수 있습니다. 지시 예:

```
> 이 라이브러리를 v2로 버전업하고 싶어. o3에게 물어보면서 진행해 줘
```

```
> 이 라이브러리의 이 옵션이 없다고 나왔어. 없어진 것 같아. 대신 무엇을 지정해야 하는지 o3에게 물어보고 교체해 줘
```

### 🧩 복잡한 작업에 임할 때

검색뿐만 아니라 설계의 벽타기 상대로 삼을 수도 있습니다. 지시 예:

```
> 동시 편집 가능한 에디터를 만들고 싶으니 설계해 줘. o3에게도 설계 검토를 요청하고, 필요하면 토론해 줘.
```

또한 MCP 서버로 제공되므로 이쪽에서 지시하지 않아도 AI 에이전트가 스스로 필요성을 판단하여 자율적으로 o3에게 말을 걸 수도 있습니다. 스스로 구동하면서 문제 해결의 폭이 한꺼번에 넓어질 것입니다!

## 설치

### npx (권장)

Claude Code:

```sh
$ claude mcp add o3 \
	-s user \  # 이 줄을 빼면 project scope로 설치됩니다
	-e OPENAI_MODEL=o3 \ # o4-mini, gpt-5도 사용 가능
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
        // 옵션: o3, o4-mini, gpt-5 (기본값: o3)
        "OPENAI_MODEL": "o3",
        // 옵션: low, medium, high (기본값: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // 옵션: 밀리초 단위의 API 시간 초과 (기본값: 300000)
        "OPENAI_API_TIMEOUT": "300000",
        // 옵션: 최대 재시도 횟수 (기본값: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

### 로컬 설정

코드를 다운로드하여 로컬에서 실행하고 싶은 경우:

```bash
git clone git@github.com:yoshiko-pg/o3-search-mcp.git
cd o3-search-mcp
pnpm install
pnpm build
```

Claude Code:

```sh
$ claude mcp add o3 \
	-s user \  # 이 줄을 빼면 project scope로 설치됩니다
	-e OPENAI_MODEL=o3 \ # o4-mini, gpt-5도 사용 가능
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
        // 옵션: o3, o4-mini, gpt-5 (기본값: o3)
        "OPENAI_MODEL": "o3",
        // 옵션: low, medium, high (기본값: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium",
        // 옵션: 밀리초 단위의 API 시간 초과 (기본값: 300000)
        "OPENAI_API_TIMEOUT": "300000",
        // 옵션: 최대 재시도 횟수 (기본값: 3)
        "OPENAI_MAX_RETRIES": "3"
      }
    }
  }
}
```

## 환경 변수

| 환경 변수 이름 | 옵션 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | 필수 | - | OpenAI API 키 |
| `OPENAI_MODEL` | 선택 | `o3` | 사용할 모델<br>값: `o3`, `o4-mini`, `gpt-5` |
| `SEARCH_CONTEXT_SIZE` | 선택 | `medium` | 검색 컨텍스트 크기 제어<br>값: `low`, `medium`, `high` |
| `REASONING_EFFORT` | 선택 | `medium` | 추론 노력 수준 제어<br>값: `low`, `medium`, `high` |
| `OPENAI_API_TIMEOUT` | 선택 | `300000` | 밀리초 단위의 API 요청 시간 초과<br>예: `300000`은 5분 |
| `OPENAI_MAX_RETRIES` | 선택 | `3` | 실패한 요청의 최대 재시도 횟수<br>SDK는 속도 제한(429), 서버 오류(5xx), 연결 오류 시 자동으로 재시도합니다 |

## 주의 사항

OpenAI API에서 o3 모델을 사용하려면 티어를 4까지 올리거나 조직 인증을 받아야 합니다.
아직 사용할 수 없는 API 키를 이 MCP에 등록하면 호출 시 오류가 발생합니다.
참고: https://help.openai.com/en/articles/10362446-api-access-to-o1-o3-and-o4-models