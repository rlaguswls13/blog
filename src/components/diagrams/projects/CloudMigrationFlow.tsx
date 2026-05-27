"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";

export function CloudMigrationFlow() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="엔터프라이즈 클라우드 마이그레이션 아키텍처" desc="온프레미스 물리 서버 → 퍼블릭 클라우드 가상 서버 전환" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon="🏢" label="마이그레이션 프로세스" color="#e11d48" />
            <FlowCard bg="#fff1f2" border="#fecdd3" title="Legacy On-Premise VM" desc="물리 서버 기반 운영 환경" titleColor="#881337" />
            <Arrow />
            <FlowCard gradBg="linear-gradient(135deg, #e11d48, #f97316)" border="transparent" title="Cloud Assessment & Planning" desc="워크로드 분석 및 마이그레이션 전략 수립" light />
            <Arrow />
            <FlowCard bg="#1e293b" border="#334155" title="Public Cloud Infrastructure" desc="클라우드 가상 서버 환경 구축 완료" light />
          </div>
          <div>
            <SectionTitle icon="🐳" label="컨테이너화 & 보안 강화" color="#059669" />
            <FlowCard bg="#ecfdf5" border="#a7f3d0" title="Docker Container Deployment" desc="컨테이너 기반 배포 체계 구축" titleColor="#064e3b" />
            <Arrow />
            <LayerBox label="Security Layer" title="네트워크 보안 & 백업" color="emerald">
              <LayerItem label="Network Security Group" desc="IP 화이트리스트 및 포트 제어" badge="SECURED" color="emerald" />
              <LayerItem label="Automated Backup" desc="스냅샷 기반 자동 백업 프로세스" badge="DAILY" color="emerald" />
            </LayerBox>
            <Arrow />
            <ResultBox text="💰 운영 비용 절감 및 확장성 확보" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { color: "#e11d48", bg: "#fff1f2", title: "비용 절감 (Cost)", desc: "물리 서버 대비 운영 비용 획기적 절감" },
        { color: "#059669", bg: "#ecfdf5", title: "보안 (Security)", desc: "네트워크 격리 및 자동 백업으로 데이터 보호" },
        { color: "#2563eb", bg: "#eff6ff", title: "확장성 (Scalability)", desc: "트래픽 기반 자동 스케일링 지원" },
      ]} />
    </DiagramWrapper>
  );
}
