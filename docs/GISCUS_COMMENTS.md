# Devlog 댓글 설정

Devlog 글의 댓글 기능은 [giscus](https://giscus.app/ko)를 사용한다. 각 글의 댓글
스레드는 GitHub Discussions에 저장된다.

## 최초 GitHub 설정

1. GitHub에서 `rlaguswls13/giscus-blog` 저장소를 열고
   **Settings → Features → Discussions**를 활성화한다.
2. 해당 저장소에 [giscus GitHub App](https://github.com/apps/giscus)을 설치한다.
3. `Announcements` 카테고리를 사용할 수 있는지 확인한다.
4. GitHub Pages 배포 워크플로 중 하나를 다시 실행한다.

저장소 이름, 저장소 ID, 카테고리와 카테고리 ID는 브라우저에 전달해야 하는 공개
식별자다. 해당 값은 컴포넌트에서 관리하며 GitHub Actions 시크릿이나 환경변수로
등록할 필요가 없다.

## 글과 Discussion 연결 규칙

각 Discussion은 giscus 설정에 따라 페이지 URL의 pathname과 연결된다.

```text
/devlog/{category}/{id}
```

## 테마

giscus iframe은 `public/giscus-themes`에 있는 사용자 정의 스타일을 사용한다.
댓글 테마는 블로그의 `theme-light`와 `theme-dark` 클래스를 따르며 테마 전환 시
즉시 갱신된다. 댓글이 없는 영역을 간결하게 유지하기 위해 반응 기능은 비활성화한다.
