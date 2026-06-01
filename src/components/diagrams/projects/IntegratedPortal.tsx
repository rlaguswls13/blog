"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";
import { Icons } from "@/components/diagrams/DiagramIcons";

export function IntegratedPortal() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="사내 그룹웨어 및 ERP 통합지원 포털 구축" desc="Legacy JSP → React/Java 15 풀스택 마이그레이션" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon={<Icons.Refresh />} label="레거시 마이그레이션 프로세스" theme="slate" />
            <FlowCard theme="slate" variant="soft" title="Legacy Groupware" desc="Java 1.6 / JSP 기반 레거시 시스템" />
            <Arrow />
            <FlowCard theme="indigo" variant="solid" title="Tech Stack Upgrade" desc="Java 15 + React + Gradle 현대화" />
            <Arrow />
            <FlowCard theme="slate" variant="dark" title="Unified Portal" desc="업무/인사/사업관리 메뉴 통합 구축" />
          </div>
          <div>
            <SectionTitle icon={<Icons.Package />} label="데이터 마이그레이션 & 통합" theme="amber" />
            <FlowCard theme="amber" variant="soft" title="User Data Migration" desc="기존 사용자 데이터 무손실 이관" />
            <Arrow />
            <LayerBox label="Integration Layer" title="시스템 통합 전략" theme="amber">
              <LayerItem label="API Gateway Pattern" desc="마이크로서비스 간 통신 일원화" badge="GATEWAY" theme="amber" />
              <LayerItem label="DB Schema Migration" desc="레거시 스키마 정규화 및 최적화" badge="MIGRATED" theme="amber" />
            </LayerBox>
            <Arrow />
            <ResultBox icon={<Icons.Rocket />} text="업무 효율성 극대화 및 유지보수 비용 절감" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { theme: "indigo", title: "현대화 (Modernization)", desc: "최신 기술 스택 전환으로 개발 생산성 향상" },
        { theme: "amber", title: "데이터 무결성 (Integrity)", desc: "무손실 마이그레이션으로 업무 연속성 보장" },
        { theme: "emerald", title: "통합 (Integration)", desc: "분산된 시스템을 단일 포털로 통합 운영" },
      ]} />
    </DiagramWrapper>
  );
}
