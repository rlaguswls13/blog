"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";
import { Icons } from "@/components/diagrams/DiagramIcons";

export function DevopsPipeline() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="DevOps 배포/개발 자동화 파이프라인" desc="Jenkins CI/CD 기반 지속적 통합 및 배포 체계 구축" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon={<Icons.Refresh />} label="CI/CD 파이프라인" theme="slate" />
            <FlowCard theme="slate" variant="soft" title="Monolithic Refactoring" desc="레거시 모놀리식 구조 모듈화 분리" />
            <Arrow />
            <FlowCard theme="amber" variant="solid" title="Jenkins Pipeline" desc="Multi-branch 파이프라인 자동 빌드/테스트" />
            <Arrow />
            <FlowCard theme="slate" variant="dark" title="Automated Deployment" desc="스테이징/프로덕션 자동 배포 및 롤백" />
          </div>
          <div>
            <SectionTitle icon={<Icons.TrendingUp />} label="품질 관리 & 모니터링" theme="emerald" />
            <FlowCard theme="emerald" variant="soft" title="Code Quality Gate" desc="SonarQube 기반 코드 품질 자동 검증" />
            <Arrow />
            <LayerBox label="Monitoring Layer" title="운영 모니터링 체계" theme="emerald">
              <LayerItem label="Health Check Automation" desc="서비스 헬스체크 및 알림 자동화" badge="24/7" theme="emerald" />
              <LayerItem label="Log Aggregation" desc="중앙 집중식 로그 수집 및 분석" badge="ELK" theme="emerald" />
            </LayerBox>
            <Arrow />
            <ResultBox icon={<Icons.Zap />} text="배포 리드타임 단축 및 장애 대응 속도 향상" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { theme: "amber", title: "자동화 (Automation)", desc: "코드 커밋부터 배포까지 완전 자동화" },
        { theme: "emerald", title: "품질 (Quality)", desc: "자동 테스트 및 코드 분석으로 품질 보장" },
        { theme: "rose", title: "안정성 (Reliability)", desc: "블루/그린 배포로 무중단 서비스 유지" },
      ]} />
    </DiagramWrapper>
  );
}
