"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";
import { Icons } from "@/components/diagrams/DiagramIcons";

export function DevopsDbArch() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="DevOps B2B 클라우드 관리 포털 아키텍처" desc="맞춤형 권한 체계 및 대규모 조직 데이터 최적화" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon={<Icons.Architecture />} label="데이터 모델링 & 캐시 전략" theme="fuchsia" />
            <FlowCard theme="fuchsia" variant="soft" title="RDBMS Recursive Modeling" desc="재귀 쿼리 기반 조직도 계층 구조 설계" icon={<Icons.DatabaseStack className="w-5 h-5" />} />
            <Arrow />
            <FlowCard theme="fuchsia" variant="solid" title="Denormalization Strategy" desc="역정규화 기법으로 대규모 조회 성능 최적화" icon={<Icons.TrendingUp className="w-5 h-5" />} />
            <Arrow />
            <FlowCard theme="slate" variant="dark" title="Local Cache Layer" desc="Guava Cache 기반 조직 데이터 캐싱" icon={<Icons.Database className="w-5 h-5" />} />
          </div>
          <div>
            <SectionTitle icon={<Icons.Users />} label="B2B 권한 & 포털 기능" theme="blue" />
            <FlowCard theme="blue" variant="soft" title="Multi-Tenant Auth" desc="고객사별 독립적 권한 체계 구현" icon={<Icons.Users className="w-5 h-5" />} />
            <Arrow />
            <LayerBox label="Portal Features" title="클라우드 관리 포털" theme="indigo">
              <LayerItem label="Resource Dashboard" desc="실시간 클라우드 리소스 현황 시각화" badge="DASHBOARD" theme="indigo" />
              <LayerItem label="Billing Management" desc="고객사별 과금 및 사용량 추적" badge="BILLING" theme="indigo" />
            </LayerBox>
            <Arrow />
            <ResultBox icon={<Icons.BarChart />} text="대규모 조직 데이터 조회 성능 10배 향상" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { theme: "fuchsia", title: "성능 (Performance)", desc: "역정규화 + 로컬 캐시로 조회 성능 극대화" },
        { theme: "blue", title: "권한 (Authorization)", desc: "B2B 맞춤형 멀티테넌트 권한 체계 구현" },
        { theme: "amber", title: "확장성 (Scalability)", desc: "신규 고객사 온보딩 시 설정만으로 대응" },
      ]} />
    </DiagramWrapper>
  );
}
