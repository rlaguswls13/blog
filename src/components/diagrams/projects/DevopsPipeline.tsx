"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";

export function DevopsPipeline() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="DevOps 배포/개발 자동화 파이프라인" desc="Jenkins CI/CD 기반 지속적 통합 및 배포 체계 구축" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon="🔄" label="CI/CD 파이프라인" color="#64748b" />
            <FlowCard bg="#f1f5f9" border="#cbd5e1" title="Monolithic Refactoring" desc="레거시 모놀리식 구조 모듈화 분리" titleColor="#1e293b" />
            <Arrow />
            <FlowCard gradBg="linear-gradient(135deg, #d97706, #ea580c)" border="transparent" title="Jenkins Pipeline" desc="Multi-branch 파이프라인 자동 빌드/테스트" light />
            <Arrow />
            <FlowCard bg="#1e293b" border="#334155" title="Automated Deployment" desc="스테이징/프로덕션 자동 배포 및 롤백" light />
          </div>
          <div>
            <SectionTitle icon="📈" label="품질 관리 & 모니터링" color="#059669" />
            <FlowCard bg="#ecfdf5" border="#a7f3d0" title="Code Quality Gate" desc="SonarQube 기반 코드 품질 자동 검증" titleColor="#064e3b" />
            <Arrow />
            <LayerBox label="Monitoring Layer" title="운영 모니터링 체계" color="emerald">
              <LayerItem label="Health Check Automation" desc="서비스 헬스체크 및 알림 자동화" badge="24/7" color="emerald" />
              <LayerItem label="Log Aggregation" desc="중앙 집중식 로그 수집 및 분석" badge="ELK" color="emerald" />
            </LayerBox>
            <Arrow />
            <ResultBox text="⚡ 배포 리드타임 단축 및 장애 대응 속도 향상" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { color: "#d97706", bg: "#fffbeb", title: "자동화 (Automation)", desc: "코드 커밋부터 배포까지 완전 자동화" },
        { color: "#059669", bg: "#ecfdf5", title: "품질 (Quality)", desc: "자동 테스트 및 코드 분석으로 품질 보장" },
        { color: "#e11d48", bg: "#fff1f2", title: "안정성 (Reliability)", desc: "블루/그린 배포로 무중단 서비스 유지" },
      ]} />
    </DiagramWrapper>
  );
}
