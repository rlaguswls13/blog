# 개발자 포트폴리오 (김현진)

본 프로젝트는 풀스택 개발자 김현진의 개인 이력, 프로젝트 경험, 기술 블로그형 트러블슈팅(Devlog), 그리고 연락처 정보를 소개하기 위해 설계된 반응형 웹 포트폴리오 사이트입니다.

기존의 레거시 모놀리식 HTML/JS 아키텍처에서 Next.js 16 (App Router), TypeScript, 그리고 MDX 기반의 현대적인 정적 웹 애플리케이션으로 전면 마이그레이션되었습니다.


## 프로젝트 개요
  - React 컴포넌트 모듈화: 기존의 무거운 단일 HTML 구조들을 재사용성이 높은 독립된 React 컴포넌트로 개편했습니다.
  - 타입 세이프한 콘텐츠 제어: 정적 JSON 데이터의 형식을 정의하고 src/data/ 디렉터리 내부에 구조화하여 관리의 안정성을 확보했습니다.
  - 네이티브 캔버스 다이어그램 구현: 성능 저하를 유발하던 기존의 iframe 렌더링 방식을 걷어내고, 15개의 커스텀 React Canvas 컴포넌트를 자체 개발하여 렌더링 속도와 반응형 리사이징 품질을 극대화했습니다.
  - MDX 기반 콘텐츠 파이프라인: 마크다운 파일 본문 내에 복잡한 아키텍처 다이어그램 컴포넌트를 직접 내장하여 렌더링할 수 있는 유연한 구조를 확보했습니다.
  - 자동화된 배포 프로세스 구축: GitHub Actions를 통합하여 코드 변경 시 자동으로 빌드를 검증하고 배포를 수행하는 파이프라인을 구축했습니다.


## 주요 문서 정보 안내

상세한 아키텍처 분석, 의존성 패키지 명세서, 그리고 환경 구축 및 관리 방법에 대한 가이드는 아래 개별 문서를 참조해 주시기 바랍니다.



## 디렉터리 구조
```text
blog
 ┣ .github/workflows
 ┃ ┗ deploy.yml          # GitHub Actions 배포 자동화 파이프라인
 ┣ docs                  # 추가 가이드 및 명세서 보관 폴더
 ┃ ┣ GUIDE.md            # 설치 및 관리 가이드
 ┃ ┗ TECH_STACK.md       # 기술 스택 및 아키텍처 상세 정의서
 ┣ public/images         # 로컬 이미지 자원 폴더
 ┣ src
 ┃ ┣ app                 # Next.js App Router 페이지 및 동적 라우트 구조
 ┃ ┃ ┣ contact           # 연락처 정보 페이지
 ┃ ┃ ┣ devlog            # 개발 로그 대시보드 및 상세 포스트 페이지
 ┃ ┃ ┣ projects          # 프로젝트 이력 및 상세 아키텍처 뷰어
 ┃ ┃ ┣ blog              # 타임라인 기반 이력서 페이지
 ┃ ┃ ┣ globals.css       # 통합 스타일 변수 및 전역 스타일시트
 ┃ ┃ ┣ layout.tsx        # 공통 레이아웃 및 내비게이션 구성
 ┃ ┃ ┗ page.tsx          # 메인 소개 페이지 (About)
 ┃ ┣ components          # 공통 React 컴포넌트
 ┃ ┃ ┣ diagrams          # 15개의 Canvas 기반 TSX 다이어그램 컴포넌트
 ┃ ┃ ┣ layout            # 상단 메뉴바 및 하단 푸터 구성 컴포넌트
 ┃ ┃ ┗ ui                # 역량 바, 타임라인 등 공통 UI 요소
 ┃ ┣ content/devlog      # MDX 포맷의 기술 로그 콘텐츠 파일들
 ┃ ┣ data                # 공통 정적 JSON 메타데이터
 ┃ ┣ lib                 # 날짜 포맷팅 및 문자열 공통 유틸리티 함수
 ┃ ┗ types               # TypeScript 인터페이스 및 타입 정의 파일
 ┣ next.config.ts         # 정적 배포 및 MDX 호환을 위한 Next.js 설정
 ┣ package.json           # 프로젝트 패키지 의존성 명세
 ┗ tsconfig.json          # 타입스크립트 컴파일 구성 설정
```

## Notion 콘텐츠 연동 및 증분 동기화 아키텍처

본 프로젝트는 Notion을 CMS로 사용하여 콘텐츠를 수집, 정규화하고 로컬 Next.js 페이지로 렌더링하는 증분 동기화 엔진을 포함하고 있습니다.

### 주요 기능
1. **증분 동기화 (Incremental Synchronization)**:
   - 전체 블록을 매번 다시 조회하지 않고 페이지 메타데이터의 `last_edited_time`을 `.cache/notion/manifest.json`과 비교합니다.
   - 변경되지 않은 페이지의 블록 API 호출 및 이미지 다운로드를 생략합니다.
   - Notion에서 삭제되거나 휴지통으로 이동한 페이지의 기존 생성 파일과 자산을 자동으로 제거합니다.
   - 100% 동기화에 성공한 경우에만 매니페스트를 원자적으로 갱신합니다.

2. **이미지 로컬화 및 보안 (Image Localization & Security)**:
   - 만료 기간이 있는 Notion S3 이미지 URL을 빌드 시 `public/notion-assets/` 경로에 로컬 다운로드합니다.
   - 블록 ID 및 수정 시각을 기준으로 중복 다운로드를 방지합니다.
   - 다운로드 타임아웃, 최대 파일 크기 제한(15MB), 허용 프로토콜(HTTP/HTTPS) 검증을 적용합니다.

3. **React 컴포넌트 렌더링 및 테마 시스템**:
   - Notion 응답 블록을 내부 콘텐츠 모델로 정규화한 뒤 React 컴포넌트(`src/components/notion/`)로 렌더링합니다.
   - `src/styles/notion-theme.css`를 통해 기존 사이트의 디자인 시스템 토큰(색상, 타이포그래피, 다크모드 등)과 통합된 스타일을 제공합니다.
   - 제목 anchor ID 자동 생성, 모바일 반응형 이탈 방지(코드, 테이블, 이미지)를 지원합니다.

4. **캐시 폴백 및 GitHub Actions Caching**:
   - Notion API 일시 장애 시 기존 정상 캐시(`.cache/notion/`, `src/content/generated/`)를 활용하여 빌드를 수행합니다.
   - GitHub Actions workflow에서 `actions/cache@v4`를 통해 `.cache/notion`, `public/notion-assets`, `src/content/generated` 경로를 빌드 전 복원하고 저장합니다.

### 환경 변수
- `NOTION_TOKEN`: Notion API 통합 토큰 (필수)
- `NOTION_PAGE_ID`: 루트 Notion 페이지 ID (`NOTION_DATA_SOURCE_ID` 미지정 시 사용)
- `NOTION_DATA_SOURCE_ID`: Notion 데이터베이스/데이터 소스 ID
- `NOTION_FORCE_FULL_SYNC=true`: 캐시를 무시하고 전체 재동기화를 수행하는 옵션

### 실행 명령
- `npm run fetch-notion`: Notion API 동기화 및 로컬 생성 파일 갱신
- `npm run build:no-fetch`: 네트워크 요청 없이 기존 생성된 데이터를 기반으로 Next.js 정적 사이트 빌드

