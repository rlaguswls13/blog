"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";
import { Icons } from "@/components/diagrams/DiagramIcons";

export function EmailHybrid() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="하이브리드 환경 & 운영 자동화 클러스터링" desc="이중화 아키텍처 및 DB 기반 동적 작업 분산 체계" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon={<Icons.Monitor />} label="인프라 클러스터링 및 자동화" theme="cyan" />
            <FlowCard theme="cyan" variant="soft" title="DMZ & Clustering Config" desc="설정 파일 기반 이중화 및 네트워크 분리" />
            <Arrow />
            <FlowCard theme="cyan" variant="solid" title="Multi-OS & Storage I/O" desc="Windows/Linux, DAS/NAS/SAN 맞춤형 튜닝" />
            <Arrow />
            <FlowCard theme="slate" variant="dark" title="Integrated Shell Automation" desc="다중 JVM 일괄 제어 및 모니터링 스크립트" />
          </div>
          <div>
            <SectionTitle icon={<Icons.BarChart />} label="DB 기반 작업 분산 & 성능 튜닝" theme="fuchsia" />
            <FlowCard theme="fuchsia" variant="soft" title="Quartz Job & Spring Batch" desc="스케줄러 기반 배치 작업 연동" />
            <Arrow />
            <LayerBox label="Distribution Layer" title="Dynamic Job Distribution" theme="violet">
              <LayerItem label="DB-based Workload" desc="고정된 소스 한계 극복 (유연성 확보)" badge="DYNAMIC" theme="violet" />
              <LayerItem label="JRE Environment Tuning" desc="GC, Block Size 등 시스템 리소스 최적화" badge="TUNED" theme="violet" />
            </LayerBox>
            <Arrow />
            <ResultBox icon={<Icons.Zap />} text="고성능 발송 환경 및 Downtime 최소화 서비스" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { theme: "cyan", title: "안정성 (Stability)", desc: "인프라 이중화 및 클러스터링을 통한 서비스 중단(Downtime) 제로화" },
        { theme: "violet", title: "유연성 (Flexibility)", desc: "DB 기반 작업 분산으로 소스 하드코딩 탈피 및 확장성 확보" },
        { theme: "slate", title: "운영 최적화 (Automation)", desc: "통합 쉘 스크립트 제공으로 고객사 관리 공수 획기적 절감" },
      ]} />
    </DiagramWrapper>
  );
}
