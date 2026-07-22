# @blog/ga4-analytics

GA4 방문 이벤트 수집만 담당하는 로컬 패키지입니다. Analytics Data API 조회나 서비스 계정 인증 기능은 포함하지 않습니다.

Next.js 루트 레이아웃에서 `GoogleAnalytics`에 측정 ID를 전달하면 최초 로드와 App Router의 클라이언트 경로 이동을 모두 `page_view`로 기록합니다. 추가 이벤트는 `trackEvent`로 전송할 수 있습니다.

```tsx
import { GoogleAnalytics, trackEvent } from "@blog/ga4-analytics/react";

<GoogleAnalytics measurementId={process.env.GA4_PROPERTY_ID || ""} />;
trackEvent("contact_click", { method: "email" });
```

`GA4_PROPERTY_ID`에는 `G-`로 시작하는 GA4 측정 ID를 설정합니다. 값이 없거나 올바른 측정 ID 형식이 아니면 태그를 출력하지 않습니다. 측정 ID는 브라우저에서 GA4로 이벤트를 전송하기 위한 공개 식별자이며, 이 패키지는 비공개 키나 조회 권한을 사용하지 않습니다.
