# 기술 스택 및 아키텍처 상세 정의서

본 문서는 포트폴리오 프로젝트의 기술 아키텍처, 핵심 의존성 패키지, 그리고 마이그레이션 세부 사항에 대한 상세 정보를 제공합니다.

---

## 기술 스택 개요

### 핵심 프레임워크 및 런타임
- 프레임워크: Next.js 16.2.6 (App Router)
- 라이브러리: React 19.2.4 / React-DOM 19.2.4
- 언어: TypeScript 5.x

### 콘텐츠 파싱 및 렌더링
- next-mdx-remote 6.0.0 (동적 MDX 파서 및 렌더러)
- @next/mdx 16.2.6 & @mdx-js/react
- gray-matter 4.0.3 (프론트매터 파싱)

### 스타일링 및 레이아웃
- CSS Vanilla Custom Properties (테마 변수 시스템)
- Tailwind CSS 4.x (복잡하고 반응형인 다이어그램 구조 조율에 부분 사용)

### 정적 빌드 및 배포
- 빌드 모드: 정적 내보내기 (output: "export")
- 라우팅 최적화: trailingSlash: true (GitHub Pages 디렉터리 구조와의 라우팅 호환성 보장)

---

## 아키텍처 상세 분석

### 1. 통합 React Canvas 렌더링 엔진
성능 병목과 리사이징 지연을 유발하던 기존의 레거시 iframe 통합 방식 대신, 커스텀 React Canvas 컴포넌트를 활용한 구조로 완전히 재설계되었습니다.
- 구현 방식: 커스텀 useRef 훅 및 HTML5 Canvas API 직접 제어
- 대상 범위: 15개의 핵심 아키텍처 및 시스템 구조 다이어그램
- 기대 효과: 불필요한 렌더링 주기 제거, 철저한 메모리 관리, 새로고침 없는 부드러운 반응형 리사이징 지원
- 구조화: DiagramParts.tsx를 통해 표준화된 레이아웃 서브컴포넌트(Tailwind CSS 4 활용)를 제공하여 10개의 프로젝트 아키텍처 다이어그램 전반에 걸쳐 일관성을 확보함

### 2. MDX 기반 Devlog 파이프라인
Devlog 시스템은 src/content/devlog/ 디렉터리에 위치한 MDX 파일 구조와 next-mdx-remote 패키지를 결합하여 작동합니다.
- 프론트매터 파싱: gray-matter를 사용하여 작성일, 카테고리, 태그 등의 메타데이터를 동적으로 추출하고 목록화함
- 동적 임포트: 마크다운 텍스트 본문 내부에서 직접 상호작용이 가능한 React Canvas 다이어그램 컴포넌트(<G1GCMemory />, <KahaDBBlocks /> 등)를 네이티브하게 임베딩하고 렌더링함

### 3. 상태 기반 동적 카테고리 라우팅
- 폴더 구조: Next.js App Router의 동적 세그먼트(/devlog/[category]/[id]/)를 활용해 개발 로그 포스트를 동적으로 라우팅함
- 성능 최적화: generateStaticParams 빌드 메서드를 구현하여 컴파일 단계에서 모든 동적 경로를 미리 분석하고 정적 HTML 파일로 사전 렌더링(Prerender)함

---

## 빌드 및 컴파일 세부 사양

### Next.js 설정 (next.config.ts)
정적 웹 호스팅 환경 배포를 위해 Next.js의 코어 설정을 최적화했습니다:
- output: "export"는 Node.js 서버 실행 없이 순수 HTML, CSS, JS 파일 묶음만을 생성하도록 강제합니다.
- basePath: "/resume"는 GitHub Pages의 하위 저장소 명명 규칙과 일치하도록 모든 자산(Assets) 링크와 클라이언트 사이드 라우팅 경로 앞에 공통 접두사를 붙여줍니다.
- trailingSlash: true는 개별 경로를 폴더 기반 구조(예: /projects/enterprise-email/index.html)로 출력하여, GitHub Pages 환경에서 직접 URL 입력이나 새로고침 시 경로를 잃지 않고 정확히 페이지를 반환하도록 만듭니다.
- pageExtensions: 기존 소스 파일 외에도 MDX 파일 구조를 원활히 읽고 라우팅할 수 있도록 확장자 지원을 정의했습니다.
