# 참여도 통계와 인기 콘텐츠 순위

Home 화면은 giscus/GitHub Discussions의 댓글 수를 참여도 값으로 사용합니다. 인기 콘텐츠는 다음 우선순위로 정렬합니다.

1. 댓글 수 내림차순
2. 댓글 수가 같으면 게시물 최신순

`npm run fetch-engagement`는 `rlaguswls13/giscus-blog` 저장소의 공개 Discussions를 읽어 `src/data/engagement.json`에 저장합니다. 네트워크 요청이 실패하면 마지막 캐시를 그대로 사용하므로 정적 빌드는 계속 진행됩니다.

GitHub API의 비인증 요청 한도를 완화하려면 저장소에 `GISCUS_GITHUB_TOKEN` Secret을 선택적으로 등록할 수 있습니다.

GA4는 브라우저의 방문 이벤트 기록에만 사용하며, 이 동기화 과정에서는 Analytics 데이터를 조회하거나 화면에 조회수를 표시하지 않습니다.
