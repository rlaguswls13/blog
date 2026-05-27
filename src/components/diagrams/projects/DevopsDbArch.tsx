"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";

export function DevopsDbArch() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="DevOps B2B 클라우드 관리 포털 아키텍처" desc="맞춤형 권한 체계 및 대규모 조직 데이터 최적화" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon="🏗️" label="데이터 모델링 & 캐시 전략" color="#c026d3" />
            <FlowCard bg="#fdf4ff" border="#f0abfc" title="RDBMS Recursive Modeling" desc="재귀 쿼리 기반 조직도 계층 구조 설계" titleColor="#701a75" />
            <Arrow />
            <FlowCard gradBg="linear-gradient(135deg, #c026d3, #7c3aed)" border="transparent" title="Denormalization Strategy" desc="역정규화 기법으로 대규모 조회 성능 최적화" light />
            <Arrow />
            <FlowCard bg="#1e293b" border="#334155" title="Local Cache Layer" desc="Guava Cache 기반 조직 데이터 캐싱" light />
          </div>
          <div>
            <SectionTitle icon="👥" label="B2B 권한 & 포털 기능" color="#2563eb" />
            <FlowCard bg="#eff6ff" border="#bfdbfe" title="Multi-Tenant Auth" desc="고객사별 독립적 권한 체계 구현" titleColor="#1e3a5f" />
            <Arrow />
            <LayerBox label="Portal Features" title="클라우드 관리 포털" color="indigo">
              <LayerItem label="Resource Dashboard" desc="실시간 클라우드 리소스 현황 시각화" badge="DASHBOARD" color="indigo" />
              <LayerItem label="Billing Management" desc="고객사별 과금 및 사용량 추적" badge="BILLING" color="indigo" />
            </LayerBox>
            <Arrow />
            <ResultBox text="📊 대규모 조직 데이터 조회 성능 10배 향상" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { color: "#c026d3", bg: "#fdf4ff", title: "성능 (Performance)", desc: "역정규화 + 로컬 캐시로 조회 성능 극대화" },
        { color: "#2563eb", bg: "#eff6ff", title: "권한 (Authorization)", desc: "B2B 맞춤형 멀티테넌트 권한 체계 구현" },
        { color: "#d97706", bg: "#fffbeb", title: "확장성 (Scalability)", desc: "신규 고객사 온보딩 시 설정만으로 대응" },
      ]} />
    </DiagramWrapper>
  );
}
