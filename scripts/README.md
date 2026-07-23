# Scripts

빌드와 콘텐츠 동기화에 사용하는 코드를 기능 단위로 관리합니다.

- `ga4/`: GA4 로딩과 페이지뷰·이벤트 전송을 담당하는 로컬 패키지
- `slug/`: 기존 Devlog id와 공개 URL slug의 매핑 생성·검증
- `notion/`: Notion API 조회, 정규화, MDX 변환, 콘텐츠별 동기화
- `engagement/`: Giscus discussion 참여 통계 수집
- `recommendations/`: Devlog 추천 데이터 생성

외부에서 실행할 때는 파일 경로 대신 루트 `package.json`의 npm 명령을 사용합니다.
