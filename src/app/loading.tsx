import { LoadingPlaceholder } from "@/components/ui/DeferredContent";

export default function Loading() {
  return (
    <main className="route-loading-shell" aria-label="페이지 로딩 상태">
      <div className="route-loading-heading" aria-hidden="true" />
      <LoadingPlaceholder label="페이지 불러오는 중" minHeight={320} />
    </main>
  );
}
