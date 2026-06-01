"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";
import { Icons } from "@/components/diagrams/DiagramIcons";

export function CloudMigrationFlow() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="엔터프라이즈 클라우드 마이그레이션 아키텍처" desc="온프레미스 물리 서버 → 퍼블릭 클라우드 가상 서버 전환" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon={<Icons.Building />} label="마이그레이션 프로세스" theme="rose" />
            <FlowCard theme="rose" variant="soft" title="Legacy On-Premise VM" desc="물리 서버 기반 운영 환경" />
            <Arrow />
            <FlowCard theme="rose" variant="solid" title="Cloud Assessment & Planning" desc="워크로드 분석 및 마이그레이션 전략 수립" />
            <Arrow />
            <FlowCard theme="slate" variant="dark" title="Public Cloud Infrastructure" desc="클라우드 가상 서버 환경 구축 완료" />
          </div>
          <div>
            <SectionTitle icon={<Icons.Container />} label="컨테이너화 & 보안 강화" theme="emerald" />
            <FlowCard theme="emerald" variant="soft" title="Docker Container Deployment" desc="컨테이너 기반 배포 체계 구축" />
            <Arrow />
            <LayerBox label="Security Layer" title="네트워크 보안 & 백업" theme="emerald">
              <LayerItem label="Network Security Group" desc="IP 화이트리스트 및 포트 제어" badge="SECURED" theme="emerald" />
              <LayerItem label="Automated Backup" desc="스냅샷 기반 자동 백업 프로세스" badge="DAILY" theme="emerald" />
            </LayerBox>
            <Arrow />
            <ResultBox icon={<Icons.Coins />} text="운영 비용 절감 및 확장성 확보" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { theme: "rose", title: "비용 절감 (Cost)", desc: "물리 서버 대비 운영 비용 획기적 절감" },
        { theme: "emerald", title: "보안 (Security)", desc: "네트워크 격리 및 자동 백업으로 데이터 보호" },
        { theme: "blue", title: "확장성 (Scalability)", desc: "트래픽 기반 자동 스케일링 지원" },
      ]} />
    </DiagramWrapper>
  );
}
