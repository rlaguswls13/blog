# Copilot Agent Instructions — Resume Static Blog

이 저장소는 **Next.js 16 App Router + React 19 + TypeScript 5** 기반의 정적 블로그/포트폴리오 사이트입니다.
아래 규칙을 항상 준수하여 코드를 작성하세요.

---

## 1. 프로젝트 개요 & 빌드 구조

- **정적 사이트 출력**: `next.config.ts`의 `output: "export"` — 빌드 결과는 `out/` 디렉터리의 순수 HTML/CSS/JS
- **basePath**: 프로덕션에서는 `/blog`, 개발 환경에서는 빈 문자열 (`process.env.NODE_ENV === "production"`)
- **페이지 확장자**: `ts`, `tsx`, `md`, `mdx` 모두 페이지로 인식 (`pageExtensions`)
- **이미지 최적화 비활성화**: `images.unoptimized: true` — Next.js Image Optimization API 미사용, 정적 import 이미지 사용

### 빌드 명령어
| 명령 | 동작 |
|---|---|
| `npm run dev` | Notion 동기화 후 개발 서버 실행 |
| `npm run dev:no-fetch` | Notion 동기화 없이 개발 서버만 실행 |
| `npm run build` | Notion 동기화 후 정적 빌드 |
| `npm run build:no-fetch` | Notion 동기화 없이 정적 빌드 (CI/CD에서 사용) |
| `npm run fetch-notion` | Notion → `src/data/education.json` 단독 동기화 |

---

## 2. 디렉터리 구조 규칙

```
src/
  app/          # Next.js App Router 페이지 및 레이아웃
  components/
    layout/     # 전역 레이아웃 컴포넌트 (Navbar, ThemeProvider, BackLink 등)
    ui/         # 재사용 UI 컴포넌트 (TagBadge, Pagination, TabGroup 등)
    diagrams/
      devlog/   # Devlog MDX에서 사용하는 다이어그램 컴포넌트
      projects/ # 프로젝트 상세 페이지 다이어그램 컴포넌트
  content/
    devlog/     # MDX 아티클 파일 (카테고리/패키지 폴더 구조)
  data/         # JSON 데이터 파일 (모든 정적 데이터의 원본)
  lib/          # 순수 유틸리티 함수
  types/        # TypeScript 타입 정의 (index.ts 단일 파일)
```

- **새 페이지**: `src/app/` 하위에 폴더와 `page.tsx` 파일로 생성
- **새 컴포넌트**: 성격에 따라 `layout/`, `ui/`, `diagrams/` 중 적절한 위치에 배치
- **새 타입**: 반드시 `src/types/index.ts`에 추가 (별도 타입 파일 생성 금지)
- **새 유틸 함수**: `src/lib/utils.ts`에 추가
- **경로 alias**: `@/` = `src/` (예: `@/components/ui/TagBadge`)

---

## 3. TypeScript 규칙

- **strict 모드** 활성화 — `any` 타입 사용 금지
- **타입 정의 위치**: 모든 인터페이스/타입은 `src/types/index.ts`에 집중 관리
- **Props 타입**: 컴포넌트 파일 내부에 `interface XxxProps` 로 로컬 정의 허용 (공유되지 않는 경우)
- **JSON 데이터 import**: `resolveJsonModule: true` — `import data from "@/data/xxx.json"` 방식으로 직접 import
- **target**: ES2017, **module**: ESNext, **moduleResolution**: bundler

---

## 4. 스타일링 규칙 (핵심)

### 4-1. 레이어 구조

이 프로젝트는 **3가지 스타일 레이어**를 계층적으로 사용합니다:

| 레이어 | 위치/도구 | 역할 |
|---|---|---|
| **Primitive Layer** (원시) | `globals.css` `:root` | 원자 값: 구체적인 색상·그림자를 숫자/색상명으로 명명. 컴포넌트에서 직접 참조 금지 |
| **Semantic Layer** (의미론적) | `globals.css` `.theme-dark` / `.theme-light` | Primitive를 "어디에, 어떤 의도로" 쓰는지 의미 부여. 테마 전환 시 이 레이어의 값만 교체 |
| **Utility / Semantic CSS Class** | `globals.css` 전역 클래스 + Tailwind v4 | 반복 패턴(`.project-card` 등) + 레이아웃 일회성 스타일 |

#### Primitive → Semantic 흐름
```
:root                              .theme-dark / .theme-light
--primitive-purple-300: #BB86FC    --accent-primary: var(--primitive-purple-300)
--primitive-purple-700: #6200EE    --accent-primary: var(--primitive-purple-700)
```

### 4-2. 테마 전환 방식 (클래스 기반)

- `<html>` 요소에 `class="theme-dark"` 또는 `class="theme-light"` 클래스를 부여하여 하위 전체 제어
- `ThemeProvider`가 `classList.remove/add`로 전환 → 단일 클래스 추가/제거로 전체 도메인 테마 변경
- `layout.tsx`의 `<html>` 초기값은 `className="theme-dark"` (SSR 기본)
- **새 테마 추가 시**: `globals.css`에 `.theme-xxx { }` 블록 추가 + `ThemeProvider`의 `THEMES` 배열에 추가

```tsx
// ThemeProvider 내부 — data-theme 속성이 아닌 classList 사용
THEMES.forEach((t) => document.documentElement.classList.remove(`theme-${t}`));
document.documentElement.classList.add(`theme-${resolved}`);
```

### 4-3. Primitive Layer 네이밍 규칙

Primitive 변수는 `--primitive-{scale}-{step}` 형식으로 명명합니다.

```css
/* globals.css :root 예시 */
--primitive-neutral-900: #121212;      /* 다크 배경 원자값 */
--primitive-purple-300:  #BB86FC;      /* 다크 강조색 원자값 */
--primitive-purple-300-a30: rgba(187, 134, 252, 0.30); /* 알파 오버레이 */
--primitive-shadow-hover: 0 8px 16px rgba(0, 0, 0, 0.30); /* 그림자 원자값 */
```

### 4-4. Semantic Layer 변수 목록

**반드시 Semantic 변수를 사용**하여 테마를 지원하세요.

```
/* 배경 */
var(--bg-primary)          /* 최상위 배경 */
var(--bg-secondary)        /* 카드/패널 배경 */
var(--bg-tertiary)         /* 중첩 배경 */

/* 텍스트 */
var(--text-primary)        /* 주 텍스트 */
var(--text-secondary)      /* 보조 텍스트, 부제목 */

/* 강조색 */
var(--accent-primary)      /* 주 강조색 */
var(--accent-secondary)    /* 보조 강조색 */
var(--accent-chip-bg)      /* 칩/배지 배경 */
var(--accent-chip-border)  /* 칩/배지 테두리 */
var(--accent-glow-sm)      /* 소형 Glow 효과 (hover shadow) */
var(--accent-glow-md)      /* 중형 Glow 효과 (modal shadow) */
var(--accent-cta-shadow)   /* CTA 버튼 그림자 */
var(--accent-cta-shadow-hv)/* CTA 버튼 hover 그림자 */

/* 레이아웃 */
var(--border-color)        /* 테두리 */
var(--card-shadow)         /* 카드 기본 그림자 */
var(--card-shadow-hover)   /* 카드 hover 그림자 */
var(--card-shadow-hover-sm)/* 작은 카드 hover 그림자 */
var(--float-shadow)        /* 플로팅 요소 그림자 */
var(--modal-shadow)        /* 모달 깊은 그림자 */
var(--nav-bg)              /* 네비게이션 배경 */
var(--transition-speed)    /* 트랜지션 속도 (0.3s) */
```

**다이어그램 전용 토큰** (`var(--diagram-*)`) — 다이어그램 컴포넌트에서만 사용:
```
var(--diagram-bg), var(--diagram-card-bg), var(--diagram-card-border)
var(--diagram-text-heading), var(--diagram-text-primary), var(--diagram-text-secondary)
var(--diagram-badge-bg), var(--diagram-badge-border)
var(--diagram-arrow-color), var(--diagram-wrapper-border)
```

### 4-5. 색상 사용 규칙

- **테마 의존적 색상** → 반드시 Semantic CSS 변수 사용 (`var(--accent-primary)`)
- **테마 무관 브랜드 색상** (다이어그램 강조색) → Tailwind 고정값 또는 하드코딩 허용
  - 예: `#3b82f6` (blue), `#10b981` (emerald), `#f43f5e` (rose), `#8b5cf6` (violet)
- **절대 금지**: 테마 의존적 색상에 하드코딩된 hex/rgba 값 직접 사용

### 4-6. 인라인 스타일 패턴

```tsx
/* CSS 변수가 필요한 경우 → inline style */
<div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>

/* Tailwind로 처리 가능한 레이아웃 → Tailwind */
<div className="flex items-center gap-4 rounded-xl p-4">

/* Tailwind 임의값에서 CSS 변수 참조 */
<div className="shadow-[0_0_12px_var(--accent-glow-sm)]">

/* CTA 버튼 shadow 패턴 */
<a style={{ boxShadow: 'var(--accent-cta-shadow)' }}
   onMouseOver={(e) => { e.currentTarget.style.boxShadow = 'var(--accent-cta-shadow-hv)'; }}
   onMouseOut={(e) =>  { e.currentTarget.style.boxShadow = 'var(--accent-cta-shadow)'; }}>
```

### 4-7. 주요 시맨틱 CSS 클래스

```css
.project-card       /* 카드 컨테이너 */
.tech-tag           /* 기술 태그 배지 */
.category-tabs      /* 탭 목록 컨테이너 */
.category-tab       /* 개별 탭 아이템 (.active 상태 포함) */
.page-title         /* 페이지 제목 h1 스타일 */
.section-title      /* 섹션 제목 */
.devlog-tags        /* 태그 목록 래퍼 */
.devlog-meta        /* 날짜 등 메타정보 */
.back-link          /* 뒤로가기 링크 */
.skill-bar          /* 스킬 진행률 바 */
.grid-2             /* 2열 반응형 그리드 */
.pagination-container /* 페이지네이션 래퍼 */
.pagination-btn     /* 페이지네이션 버튼 */
.about-top-grid     /* About 페이지 상단 2열 그리드 */
.profile-card       /* 프로필 카드 */
.bio-card           /* 바이오 카드 */
```

- **기본값**: Server Component (파일 상단에 `"use server"` 또는 지시어 없음)
- **`"use client"` 필수 조건**:
  - `useState`, `useEffect`, `useReducer` 등 React hooks 사용 시
  - `useRouter`, `usePathname`, `useSearchParams` 등 Next.js 클라이언트 훅 사용 시
  - 브라우저 API (`localStorage`, `document`, `window`) 접근 시
  - 이벤트 핸들러 (`onClick`, `onMouseOver` 등) 직접 사용 시
- **패턴**: 클라이언트 상태가 필요한 페이지는 `<Suspense>`로 래핑한 내부 컴포넌트 분리

```tsx
// page.tsx (Server Component)
export default function SomePage() {
  return <Suspense fallback={<div>Loading...</div>}><SomeContent /></Suspense>;
}

// SomeContent는 "use client" 내부 컴포넌트
```

### 5-2. Named Export 규칙

모든 컴포넌트는 **named export** 사용 (default export는 App Router `page.tsx`에서만 사용):

```tsx
// 컴포넌트 파일
export function TagBadge({ tag }: { tag: string }) { ... }
export function TagList({ tags }: { tags: string[] }) { ... }

// page.tsx
export default function ProjectsPage() { ... }
```

### 5-3. 컴포넌트 Props 패턴

```tsx
interface ComponentProps {
  title: string;
  children?: React.ReactNode;
}

export function Component({ title, children }: ComponentProps) { ... }
```

### 5-4. 인라인 스타일과 Tailwind 혼용 패턴

```tsx
// CSS 변수가 필요한 경우 → inline style
<div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>

// Tailwind로 처리 가능한 레이아웃 → Tailwind
<div className="flex items-center gap-4 rounded-xl p-4">

// 혼용 (권장 패턴)
<div
  className="flex-1 rounded-xl p-4 text-center"
  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
>
```

---

## 6. 라우팅 & 페이지 구조

### 6-1. 현재 라우트 맵

| URL | 파일 | 설명 |
|---|---|---|
| `/` | `src/app/page.tsx` | About/홈 (서버 컴포넌트) |
| `/projects` | `src/app/projects/page.tsx` | 프로젝트 목록 (클라이언트) |
| `/projects/[id]` | `src/app/projects/[id]/page.tsx` | 프로젝트 상세 (서버+클라이언트) |
| `/devlog` | `src/app/devlog/page.tsx` | 데브로그 목록 (클라이언트) |
| `/devlog/[category]/[id]` | `src/app/devlog/[category]/[id]/page.tsx` | MDX 아티클 (서버 컴포넌트) |
| `/blog` | `src/app/blog/page.tsx` | 이력서/Resume (서버 컴포넌트) |
| `/contact` | `src/app/contact/page.tsx` | 연락처 (클라이언트) |

### 6-2. 동적 라우트 정적 생성

`output: "export"` 모드에서는 동적 라우트에 `generateStaticParams` 필수:

```tsx
export async function generateStaticParams() {
  // MDX 파일 스캔하여 params 배열 반환
  return [{ category: "tech_study", id: "tech-1" }, ...];
}
```

### 6-3. URL 상태 관리 패턴

목록 페이지의 필터/탭/검색/페이지 상태는 URL query params로 관리:

```tsx
const searchParams = useSearchParams();
const router = useRouter();

// URL에서 상태 초기화
const initialTab = searchParams.get("tab") || "tech_study";

// 상태 변경 시 URL 동기화
router.replace(`/devlog?tab=${activeTab}&pkg=${activePkg}&page=${currentPage}`, { scroll: false });
```

Query params 컨벤션:
- `tab` — 활성 탭 키
- `pkg` — 패키지/하위 카테고리 필터
- `q` — 검색어
- `page` — 현재 페이지 번호

---

## 7. 데이터 레이어 규칙

### 7-1. JSON 데이터 파일

모든 정적 콘텐츠 데이터는 `src/data/` JSON 파일에 관리:

| 파일 | 내용 |
|---|---|
| `profile.json` | 프로필, 소개, 스킬, 소셜 링크 |
| `projects.json` | 프로젝트 목록 (메타 정보) |
| `project-detail.json` | 프로젝트 상세 탭 내용 |
| `devlog.json` | 데브로그 엔트리 인덱스 (4개 카테고리) |
| `education.json` | 교육일지 (Notion에서 동기화) |
| `resume.json` | 경력/학력/자격증 타임라인 |
| `contact.json` | 연락처 정보 |
| `codePopupContent.ts` | CodePopup 모달 코드 스니펫 데이터 |

### 7-2. devlog.json 구조

```json
{
  "tech_study": [DevlogEntry],
  "problem_solving": [DevlogEntry],
  "competition_event": [DevlogEntry]
}
```

`DevlogEntry` 필드: `id`, `title`, `date` (YYYY.MM.DD), `tags`, `description`, `package` (선택)

### 7-3. MDX 콘텐츠 파일

- **위치**: `src/content/devlog/{category}/{package}/{id}.mdx`
- **frontmatter 필드**: `id`, `title`, `date`, `tags`, `description`, `category`
- **MDX 커스텀 컴포넌트**: `page.tsx`의 `components` 객체에 등록된 컴포넌트만 MDX 내에서 사용 가능

```mdx
---
id: "tech-1"
title: "제목"
date: "2026.05.26"
tags: ["Tag1", "Tag2"]
description: "설명"
category: "tech_study"
---

본문 내용...

<PubSubArchitecture />

<Collapsible title="접기/펼치기 제목">
  내용
</Collapsible>
```

### 7-4. 날짜 포맷

날짜는 `YYYY.MM.DD` 형식 사용 (예: `"2026.05.26"`).
"현재 진행 중"은 `"현재"` 문자열. `parseDate()` 유틸이 이 두 형식 모두 처리.

---

## 8. 다이어그램 컴포넌트 규칙

### 8-1. 구조

```
components/diagrams/
  DiagramParts.tsx     # 공통 서브컴포넌트 (DiagramWrapper, DiagramHeader, themes 팔레트)
  DiagramIcons.tsx     # 다이어그램 전용 SVG 아이콘
  devlog/              # MDX에서 사용하는 다이어그램
  projects/            # 프로젝트 상세 페이지 다이어그램
```

### 8-2. 작성 규칙

모든 다이어그램 컴포넌트:
1. `"use client"` 지시어 추가
2. `DiagramWrapper`, `DiagramHeader` 등 `DiagramParts.tsx` 공통 컴포넌트 활용
3. 테마 의존적 배경/텍스트 → `var(--diagram-*)` CSS 변수 사용
4. 브랜드 강조색 → `themes` 팔레트에서 선택 (violet, rose, emerald, cyan, fuchsia, blue, amber, indigo, slate)
5. 모바일 대응: `min-w-[xxx]` + `overflow-x-auto` 패턴으로 가로 스크롤 처리

```tsx
"use client";
import { DiagramWrapper, DiagramHeader, themes } from "@/components/diagrams/DiagramParts";

export function MyDiagram() {
  const t = themes.violet;
  return (
    <DiagramWrapper>
      <DiagramHeader title="제목" desc="설명" theme="violet" />
      <div className="p-6" style={{ background: 'var(--diagram-bg)' }}>
        {/* 내용 */}
      </div>
    </DiagramWrapper>
  );
}
```

### 8-3. MDX에 다이어그램 추가하는 절차

1. `src/components/diagrams/devlog/{카테고리}/NewDiagram.tsx` 생성
2. `src/app/devlog/[category]/[id]/page.tsx`의 `components` 객체에 등록
3. MDX 파일에서 `<NewDiagram />` 태그로 사용

---

## 9. 유틸리티 함수 (`src/lib/utils.ts`)

| 함수 | 용도 |
|---|---|
| `parseDate(dateStr)` | `"YYYY.MM.DD"`, `"YYYY.MM"`, `"현재"` → `Date` |
| `formatPeriods(periods)` | 기간 배열 → 표시 문자열 |
| `formatMiniPeriod(periods)` | 기간 배열 → 짧은 표시 문자열 |
| `calculateTotalPeriod(periods)` | 기간 배열 → `"(총 N년 M개월)"` |
| `sortByDateDesc(items)` | `periods` 또는 `date` 필드 기준 내림차순 정렬 |

---

## 10. Notion 연동 (`scripts/fetch-notion.mjs`)

- **목적**: Notion DB → `src/data/education.json` 자동 동기화
- **환경변수**: `.env` 또는 `.env.local`에 `NOTION_TOKEN`, `NOTION_PAGE_ID` 필요
- **ESM 모듈**: `.mjs` 확장자, `import/export` 문법 사용
- 환경변수가 없으면 `process.exit(1)` 종료 — CI에서는 `build:no-fetch` 사용

---

## 11. 아이콘 & SVG 규칙

- **외부 아이콘 라이브러리 사용 금지** — 모든 아이콘은 직접 SVG 작성
- 위치: `src/components/ui/Icons.tsx` (일반 아이콘) 또는 `src/components/diagrams/DiagramIcons.tsx` (다이어그램 전용)
- 인터페이스: `{ className?: string; style?: React.CSSProperties; width?: number; height?: number }`
- SVG 기본값: `width={16}` `height={16}`, `viewBox="0 0 24 24"`, `stroke="currentColor"`

---

## 12. 금지 사항

- 외부 CSS 프레임워크 추가 금지 (Bootstrap, Material-UI 등) — Tailwind v4 + globals.css만 사용
- 외부 차트/다이어그램 라이브러리 추가 금지 (Chart.js, D3 등) — 커스텀 React 컴포넌트로 구현
- `src/types/index.ts` 외부에 별도 타입 파일 생성 금지
- 테마 색상에 하드코딩 hex 값 사용 금지 → CSS 변수 사용
- `output: "export"` 호환성 깨는 기능 사용 금지:
  - API Routes (`app/api/`)
  - Server Actions (폼 submit용)
  - ISR (Incremental Static Regeneration)
  - `next/image` 최적화 기능 (unoptimized 모드 유지)
- `trailingSlash: false` — URL에 후행 슬래시 없음 유지

---

## 13. 새 Devlog 아티클 추가 절차

1. `src/data/devlog.json`의 해당 카테고리 배열에 엔트리 추가
2. `src/content/devlog/{category}/{package}/{id}.mdx` 파일 생성
3. frontmatter의 `id`가 JSON의 `id`와 일치해야 함
4. 다이어그램이 필요하면 §8-3 절차 따름

---

## 14. 코드 스타일

- **따옴표**: 문자열은 큰따옴표(`"`) 또는 JSX 내부에서 작은따옴표(`'`) — 일관성 유지
- **세미콜론**: 사용 (TypeScript strict 모드)
- **줄 길이**: 제한 없음, 가독성 우선
- **조건부 렌더링**: 단순 조건은 `&&`, 복잡한 경우 삼항 연산자 또는 조기 반환
- **주석**: 한국어 또는 영어 모두 허용, 비즈니스 로직 설명은 한국어 권장
