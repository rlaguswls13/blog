"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "./DiagramParts";

export function CSPipeline() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="B2B 대규모 기술 지원 및 CS 파이프라인" desc="56+ 엔터프라이즈 고객사 대응 체계 및 이슈 트래킹 플로우" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon="🎯" label="이슈 인입 & 분석 플로우" color="#e11d48" />
            <FlowCard bg="#fff1f2" border="#fecdd3" title="56+ Enterprise Clients" desc="금융, 통신, 항공 등 주요 산업군 고객" titleColor="#881337" />
            <Arrow />
            <FlowCard gradBg="linear-gradient(135deg, #e11d48, #f97316)" border="transparent" title="Jira Issue Tracking" desc="우선순위 기반 이슈 분류 및 SLA 관리" light />
            <Arrow />
            <FlowCard bg="#1e293b" border="#334155" title="Root Cause Analysis" desc="로그 분석 기반 근본 원인 진단" light />
          </div>
          <div>
            <SectionTitle icon="📋" label="기술 문서 자산화 & 레거시 대응" color="#0891b2" />
            <FlowCard bg="#ecfeff" border="#a5f3fc" title="Notion Knowledge Base" desc="재현 절차 및 해결 방법 문서화" titleColor="#164e63" />
            <Arrow />
            <LayerBox label="Migration Support" title="레거시 마이그레이션 지원" color="cyan">
              <LayerItem label="Version Upgrade Guide" desc="Java/Spring 버전 업그레이드 가이드 제공" badge="GUIDE" color="cyan" />
              <LayerItem label="Config Compatibility Check" desc="설정 파일 호환성 사전 검증 자동화" badge="AUTO" color="cyan" />
            </LayerBox>
            <Arrow />
            <ResultBox text="📊 MTTR 단축 및 반복 이슈 제로화" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { color: "#e11d48", bg: "#fff1f2", title: "대응력 (Response)", desc: "SLA 기반 우선순위 처리로 고객 만족도 극대화" },
        { color: "#0891b2", bg: "#ecfeff", title: "지식 자산화 (Knowledge)", desc: "Notion 기반 해결 사례 축적으로 팀 역량 강화" },
        { color: "#059669", bg: "#ecfdf5", title: "예방 (Prevention)", desc: "반복 이슈 패턴 분석으로 사전 대응 체계 구축" },
      ]} />
    </DiagramWrapper>
  );
}
