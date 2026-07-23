# Data packages

정적 데이터는 사용 목적에 따라 세 패키지로 관리합니다.

- `config/`: 공개 사이트 설정과 id → slug 매핑
- `pages/main/`: 메인·목록·소개 화면에서 직접 사용하는 원본 데이터와 Notion의 `personal`·`education` 데이터
- `pages/detail/`: 프로젝트와 Devlog 상세 화면 전용 데이터
- `indexes/`: 목록, 추천, 참여 통계를 빠르게 조회하기 위한 빌드 타임 인덱스와 캐시

`indexes/`의 생성 파일은 직접 편집하지 않고 `scripts/`의 npm 작업으로 갱신합니다.
