"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";

export function IntegratedPortal() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="사내 그룹웨어 및 ERP 통합지원 포털 구축" desc="Legacy JSP → React/Java 15 풀스택 마이그레이션" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon="🔄" label="레거시 마이그레이션 프로세스" color="#64748b" />
            <FlowCard bg="#f1f5f9" border="#cbd5e1" title="Legacy Groupware" desc="Java 1.6 / JSP 기반 레거시 시스템" titleColor="#1e293b" />
            <Arrow />
            <FlowCard gradBg="linear-gradient(135deg, #4f46e5, #7c3aed)" border="transparent" title="Tech Stack Upgrade" desc="Java 15 + React + Gradle 현대화" light />
            <Arrow />
            <FlowCard bg="#1e293b" border="#334155" title="Unified Portal" desc="업무/인사/사업관리 메뉴 통합 구축" light />
          </div>
          <div>
            <SectionTitle icon="📦" label="데이터 마이그레이션 & 통합" color="#d97706" />
            <FlowCard bg="#fffbeb" border="#fde68a" title="User Data Migration" desc="기존 사용자 데이터 무손실 이관" titleColor="#78350f" />
            <Arrow />
            <LayerBox label="Integration Layer" title="시스템 통합 전략" color="amber">
              <LayerItem label="API Gateway Pattern" desc="마이크로서비스 간 통신 일원화" badge="GATEWAY" color="amber" />
              <LayerItem label="DB Schema Migration" desc="레거시 스키마 정규화 및 최적화" badge="MIGRATED" color="amber" />
            </LayerBox>
            <Arrow />
            <ResultBox text="🚀 업무 효율성 극대화 및 유지보수 비용 절감" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { color: "#4f46e5", bg: "#eef2ff", title: "현대화 (Modernization)", desc: "최신 기술 스택 전환으로 개발 생산성 향상" },
        { color: "#d97706", bg: "#fffbeb", title: "데이터 무결성 (Integrity)", desc: "무손실 마이그레이션으로 업무 연속성 보장" },
        { color: "#059669", bg: "#ecfdf5", title: "통합 (Integration)", desc: "분산된 시스템을 단일 포털로 통합 운영" },
      ]} />
    </DiagramWrapper>
  );
}
