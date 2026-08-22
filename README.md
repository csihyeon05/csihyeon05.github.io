# 차시현 (Tristan Cha) — Portfolio

GitHub Pages용 개인 포트폴리오 사이트입니다.

## 구성

| 파일 | 설명 |
|---|---|
| `index.html` | 포트폴리오 (원페이지 스크롤: About / Education / Awards / Projects / Contact) |
| `card.html` | 전자 명함 |

두 파일 모두 **단일 파일 완결형**입니다. 로고는 base64로 내장되어 있어 별도 이미지 파일이 필요 없습니다.
외부 의존성은 Google Fonts(Cormorant Garamond, Noto Serif KR, JetBrains Mono)뿐입니다.

## 배포 방법

1. `csihyeon05.github.io` 라는 이름으로 저장소를 생성합니다. (사용자 페이지)
2. `index.html`, `card.html`, `README.md` 를 저장소 루트에 업로드합니다.
3. **Settings → Pages → Source** 를 `Deploy from a branch` / `main` / `/ (root)` 로 설정합니다.
4. 1~2분 후 아래 주소로 접속됩니다.

```
https://csihyeon05.github.io/          → 포트폴리오
https://csihyeon05.github.io/card.html → 전자 명함
```

프로젝트 저장소(예: `portfolio`)에 올릴 경우 주소는 `https://csihyeon05.github.io/portfolio/` 가 됩니다.

## 수정 가이드

- **색상 / 폰트**: `index.html` 상단 `:root` 의 CSS 변수(`--ink`, `--rule`, `--serif`, `--mono`)만 바꾸면 전체에 반영됩니다.
- **프로젝트 추가**: `<section id="projects">` 안의 `<article class="project">` 블록을 복사해 내용을 교체하고, `.p-index` 번호만 수정하십시오.
- **성과 추가**: `<div class="timeline">` 안의 `.tl-item` 블록을 복사하십시오.
- **내비게이션**: 새 섹션을 추가할 경우 `<section id="...">` 와 상단 `<nav>` 의 `<a href="#...">` 를 함께 추가하면 스크롤 위치 하이라이트가 자동 동작합니다.

## 접근성 / 대응 현황

- 반응형: 820px 이하에서 2단 → 1단 전환, 모바일 가로 스크롤 없음
- `prefers-reduced-motion` 대응 (애니메이션 비활성화)
- 키보드 포커스 링(`:focus-visible`) 적용
- 인쇄 시 내비게이션 및 배경 질감 제거 (`@media print`)
- Open Graph 메타 태그 포함
