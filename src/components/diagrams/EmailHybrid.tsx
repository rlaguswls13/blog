"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "./DiagramParts";

export function EmailHybrid() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="하이브리드 환경 & 운영 자동화 클러스터링" desc="이중화 아키텍처 및 DB 기반 동적 작업 분산 체계" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon="🖥️" label="인프라 클러스터링 및 자동화" color="#0891b2" />
            <FlowCard bg="#ecfeff" border="#a5f3fc" title="DMZ & Clustering Config" desc="설정 파일 기반 이중화 및 네트워크 분리" titleColor="#164e63" />
            <Arrow />
            <FlowCard gradBg="linear-gradient(135deg, #0891b2, #14b8a6)" border="transparent" title="Multi-OS & Storage I/O" desc="Windows/Linux, DAS/NAS/SAN 맞춤형 튜닝" light />
            <Arrow />
            <FlowCard bg="#1e293b" border="#334155" title="Integrated Shell Automation" desc="다중 JVM 일괄 제어 및 모니터링 스크립트" light />
          </div>
          <div>
            <SectionTitle icon="📊" label="DB 기반 작업 분산 & 성능 튜닝" color="#c026d3" />
            <FlowCard bg="#fdf4ff" border="#f0abfc" title="Quartz Job & Spring Batch" desc="스케줄러 기반 배치 작업 연동" titleColor="#701a75" />
            <Arrow />
            <LayerBox label="Distribution Layer" title="Dynamic Job Distribution" color="violet">
              <LayerItem label="DB-based Workload" desc="고정된 소스 한계 극복 (유연성 확보)" badge="DYNAMIC" color="violet" />
              <LayerItem label="JRE Environment Tuning" desc="GC, Block Size 등 시스템 리소스 최적화" badge="TUNED" color="violet" />
            </LayerBox>
            <Arrow />
            <ResultBox text="⚡ 고성능 발송 환경 및 Downtime 최소화 서비스" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { color: "#0891b2", bg: "#ecfeff", title: "안정성 (Stability)", desc: "인프라 이중화 및 클러스터링을 통한 서비스 중단(Downtime) 제로화" },
        { color: "#7c3aed", bg: "#f5f3ff", title: "유연성 (Flexibility)", desc: "DB 기반 작업 분산으로 소스 하드코딩 탈피 및 확장성 확보" },
        { color: "#64748b", bg: "#f1f5f9", title: "운영 최적화 (Automation)", desc: "통합 쉘 스크립트 제공으로 고객사 관리 공수 획기적 절감" },
      ]} />
    </DiagramWrapper>
  );
}
