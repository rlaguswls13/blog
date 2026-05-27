"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";

export function ContainerSupport() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="레거시 인프라 → 컨테이너 마이그레이션 기술 지원" desc="VM 기반 운영 환경의 Docker 컨테이너 전환 및 운영 자동화" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon="📦" label="인프라 전환 프로세스" color="#64748b" />
            <FlowCard bg="#f1f5f9" border="#cbd5e1" title="Legacy VM / On-Premise" desc="물리/가상 서버 기반 전통적 운영" titleColor="#1e293b" />
            <Arrow />
            <FlowCard gradBg="linear-gradient(135deg, #0284c7, #0891b2)" border="transparent" title="Containerization Strategy" desc="Docker 이미지 빌드 및 Compose 구성" light />
            <Arrow />
            <FlowCard bg="#1e293b" border="#334155" title="Container Orchestration" desc="서비스 단위 컨테이너 배포 및 관리" light />
          </div>
          <div>
            <SectionTitle icon="🔧" label="기술 지원 & 트러블슈팅" color="#d97706" />
            <FlowCard bg="#fffbeb" border="#fde68a" title="고객사 환경 분석" desc="기존 인프라 호환성 검증 및 의존성 분석" titleColor="#78350f" />
            <Arrow />
            <LayerBox label="Support Layer" title="마이그레이션 기술 지원" color="amber">
              <LayerItem label="Dockerfile Optimization" desc="멀티스테이지 빌드로 이미지 경량화" badge="OPTIMIZED" color="amber" />
              <LayerItem label="Volume & Network Config" desc="데이터 영속성 및 네트워크 구성 가이드" badge="GUIDE" color="amber" />
            </LayerBox>
            <Arrow />
            <ResultBox text="🐳 무중단 컨테이너 전환 및 운영 안정화" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { color: "#0284c7", bg: "#e0f2fe", title: "표준화 (Standard)", desc: "Docker 기반 배포 표준화로 환경 불일치 제거" },
        { color: "#d97706", bg: "#fffbeb", title: "가이드 (Guide)", desc: "단계별 마이그레이션 가이드로 고객사 자립 지원" },
        { color: "#059669", bg: "#ecfdf5", title: "효율성 (Efficiency)", desc: "리소스 사용 효율 극대화 및 배포 속도 향상" },
      ]} />
    </DiagramWrapper>
  );
}
