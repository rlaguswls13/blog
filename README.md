# TECH LOG — 개발자 포트폴리오

김현진의 경력, 프로젝트, 기술 학습·문제 해결 기록, 교육 일지와 연락처를 제공하는 정적 포트폴리오/기술 블로그입니다. Next.js App Router와 TypeScript를 기반으로 하며, JSON·MDX·Notion 콘텐츠를 정적 페이지로 빌드해 GitHub Pages에 배포합니다.

- Repository: `rlaguswls13/ralguswls13.github.io`
- Site: `https://rlaguswls13.github.io`

## 주요 기능

- `Home`: 페이지 이동 없이 카테고리별 최신 글을 전환하고 인기 태그를 탐색하는 기술 블로그 홈
- `About`: `/about`에서 제공하는 프로필, 핵심 경험, 참여/개인 작업 쇼케이스, 기술 및 관심사
- `Projects`: 참여/개인 작업 탭, 검색, 페이지네이션, 프로젝트 상세 화면
- `Devlog`: 카테고리·패키지 필터, 검색, 교육일지/일지, MDX 상세 문서
- `Career`: `/career`에서 제공하는 경력·학력·자격증 타임라인
- `Contact`: 이메일, 전화, GitHub 연락 수단
- 라이트/다크 테마와 모바일·태블릿·데스크톱 반응형 UI
- URL 쿼리에 검색어, 탭, 필터, 페이지 상태 보존 및 태그 기반 통합 검색

## 작업 환경

| 구분 | 구성 |
| --- | --- |
| 프레임워크 | Next.js 16.2.6 (App Router, Static Export) |
| UI | React 19.2.4, React DOM 19.2.4 |
| 언어 | TypeScript 5 (strict mode) |
| 스타일 | Tailwind CSS 4 PostCSS 플러그인 + `src/app/globals.css` 디자인 토큰/전역 CSS |
| 콘텐츠 | JSON, MDX 3, gray-matter, next-mdx-remote |
| 코드 하이라이트 | rehype-pretty-code, Shiki |
| 품질 검사 | ESLint 9, eslint-config-next |
| 배포 | Next.js static export, GitHub Actions, GitHub Pages |
| 권장 런타임 | Node.js 20, npm (`package-lock.json` 기준) |

## 시작하기

```bash
npm ci
npm run dev:no-fetch
```

브라우저에서 `http://localhost:3000`을 엽니다. 저장된 로컬 콘텐츠만 사용할 때는 `dev:no-fetch`가 가장 빠릅니다.

Notion 원격 콘텐츠까지 갱신하며 실행하려면 환경 변수를 설정한 뒤 `npm run dev`를 사용합니다.

### 환경 변수

| 변수 | 설명 |
| --- | --- |
| `NOTION_TOKEN` | Notion API 통합 토큰 |
| `NOTION_PAGE_ID` | 루트 Notion 페이지 ID |
| `NOTION_DATA_SOURCE_ID` | Notion 데이터베이스/데이터 소스 ID |
| `NOTION_FORCE_FULL_SYNC=true` | 증분 캐시를 무시하고 전체 동기화 |
| `BASE_PATH=ROOT` | 운영 빌드를 도메인 루트에 배포 (기본값). 별도 프로젝트 배포 시 경로 직접 지정 |
| `ADSENSE_ACCOUNT` | 운영 환경에서만 사용하는 AdSense 계정 메타 값 |
| `GA4_PROPERTY_ID` | 브라우저 방문 기록에 사용할 GA4 측정 ID (`G-...`) |

민감한 값이 포함된 로컬 환경 파일은 커밋하지 않습니다.

## npm 명령

| 명령 | 용도 |
| --- | --- |
| `npm run dev` | Notion 동기화 후 개발 서버 실행 |
| `npm run dev:no-fetch` | 외부 동기화 없이 개발 서버 실행 |
| `npm run fetch-notion` | Notion 콘텐츠 증분 동기화 |
| `npm run build` | Notion 동기화 후 정적 프로덕션 빌드 |
| `npm run build:no-fetch` | 로컬 콘텐츠만으로 정적 빌드 |
| `npm run start` | Next.js 프로덕션 서버 실행(정적 export 운영은 `out/` 사용) |
| `npm run lint` | ESLint 검사 |

## 프로젝트 구조

```text
blog/
├─ .github/workflows/deploy.yml     # GitHub Pages 빌드·배포 및 저장소 동기화
├─ docs/                            # 상세 기술/운영 문서
├─ public/images/                   # 프로필·콘텐츠 이미지
├─ scripts/
│  ├─ fetch-notion.mjs             # Notion 동기화 진입점
│  ├─ handlers/                    # 콘텐츠 유형별 변환 처리
│  └─ lib/                         # Notion API·정규화·MDX 변환
├─ src/
│  ├─ app/                         # App Router 페이지와 전역 스타일
│  │  ├─ about/                    # 개발자 프로필과 경험 소개
│  │  ├─ blog/                     # 기존 URL 호환용 루트 리다이렉트
│  │  ├─ career/                   # 경력·학력·자격증 페이지
│  │  ├─ contact/                  # 연락처 페이지
│  │  ├─ devlog/                   # Devlog 목록/동적 상세 라우트
│  │  └─ projects/                 # 프로젝트 목록/동적 상세 라우트
│  ├─ components/
│  │  ├─ diagrams/                 # 프로젝트·Devlog용 React 다이어그램
│  │  ├─ layout/                   # Navbar, 테마, 공통 뒤로가기 UI
│  │  └─ ui/                       # 카드, 탭, 캐러셀, Notion 렌더러 등
│  ├─ content/devlog/              # MDX 기술 콘텐츠
│  ├─ data/                        # 화면용 JSON 데이터와 Notion 메타데이터
│  ├─ lib/                         # 공통 유틸리티와 Notion 타입
│  └─ types/                       # 애플리케이션 TypeScript 타입
├─ next.config.ts                  # static export, basePath, 이미지 설정
├─ package.json
└─ tsconfig.json
```

## 콘텐츠 흐름

1. `scripts/fetch-notion.mjs`가 Notion 페이지 메타데이터를 조회합니다.
2. `.cache/notion/manifest.json`의 `last_edited_time`과 비교해 변경된 페이지만 가져옵니다.
3. 블록을 내부 모델과 MDX로 변환하고 이미지를 `public/images/notion/`에 로컬화합니다.
4. 앱은 `src/data`와 `src/content/devlog`의 정적 데이터를 읽어 페이지를 생성합니다.
5. `next build`가 결과물을 `out/`에 static export합니다.

동기화가 실패하면 정상 캐시와 기존 생성물을 활용할 수 있으며, 매니페스트는 전체 동기화가 성공했을 때만 갱신됩니다. 이미지 다운로드에는 HTTP(S) 검증, 타임아웃과 15MB 크기 제한이 적용됩니다.

## 디자인 시스템

`src/app/globals.css`는 primitive/semantic CSS 변수로 라이트·다크 테마를 구성합니다. 현재 UI는 `img.png` 레퍼런스를 바탕으로 다음 원칙을 사용합니다.

- 밝은 캔버스와 얇은 중성 경계, 낮은 카드 그림자
- 블루/인디고 단일 포인트 컬러와 명확한 활성 상태
- 정보 밀도가 높은 카드형 목록과 절제된 라운드
- Noto Sans KR/Inter 본문, JetBrains Mono 보조 타이포그래피
- 기능을 숨기지 않는 반응형 내비게이션과 가로 스크롤 탭

새 컴포넌트는 하드코딩한 색상보다 `--bg-*`, `--text-*`, `--accent-*`, `--border-color` 같은 semantic token을 우선 사용합니다.

## 검증 및 배포

```bash
npm run lint
npm run build:no-fetch
```

GitHub Actions는 Node.js 20에서 의존성을 설치하고 Notion 콘텐츠를 동기화한 다음 `out/`을 GitHub Pages artifact로 배포합니다. `*.github.io` 사용자 페이지 저장소는 자동으로 루트 경로를 사용하며, 그 외 저장소는 `USE_ROOT_BASE_PATH` 변수 또는 저장소명에 따라 `basePath`를 결정합니다.

추가 운영 방법은 [`docs/GUIDE.md`](docs/GUIDE.md), 데이터 정렬 기준은
[`docs/DATA_SORTING_RULES.md`](docs/DATA_SORTING_RULES.md), 기술 배경은
[`docs/TECH_STACK.md`](docs/TECH_STACK.md)를 참고하세요.
