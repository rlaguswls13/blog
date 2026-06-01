"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";
import { Icons } from "@/components/diagrams/DiagramIcons";

export function ContainerSupport() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="레거시 인프라 → 컨테이너 마이그레이션 기술 지원" desc="VM 기반 운영 환경의 Docker 컨테이너 전환 및 운영 자동화" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon={<Icons.Package />} label="인프라 전환 프로세스" theme="slate" />
            <FlowCard theme="slate" variant="soft" title="Legacy VM / On-Premise" desc="물리/가상 서버 기반 전통적 운영" />
            <Arrow />
            <FlowCard theme="cyan" variant="solid" title="Containerization Strategy" desc="Docker 이미지 빌드 및 Compose 구성" />
            <Arrow />
            <FlowCard theme="slate" variant="dark" title="Container Orchestration" desc="서비스 단위 컨테이너 배포 및 관리" />
          </div>
          <div>
            <SectionTitle icon={<Icons.Wrench />} label="기술 지원 & 트러블슈팅" theme="amber" />
            <FlowCard theme="amber" variant="soft" title="고객사 환경 분석" desc="기존 인프라 호환성 검증 및 의존성 분석" />
            <Arrow />
            <LayerBox label="Support Layer" title="마이그레이션 기술 지원" theme="amber">
              <LayerItem label="Dockerfile Optimization" desc="멀티스테이지 빌드로 이미지 경량화" badge="OPTIMIZED" theme="amber" />
              <LayerItem label="Volume & Network Config" desc="데이터 영속성 및 네트워크 구성 가이드" badge="GUIDE" theme="amber" />
            </LayerBox>
            <Arrow />
            <ResultBox icon={<Icons.Container />} text="무중단 컨테이너 전환 및 운영 안정화" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { theme: "blue", title: "표준화 (Standard)", desc: "Docker 기반 배포 표준화로 환경 불일치 제거" },
        { theme: "amber", title: "가이드 (Guide)", desc: "단계별 마이그레이션 가이드로 고객사 자립 지원" },
        { theme: "emerald", title: "효율성 (Efficiency)", desc: "리소스 사용 효율 극대화 및 배포 속도 향상" },
      ]} />
    </DiagramWrapper>
  );
}
