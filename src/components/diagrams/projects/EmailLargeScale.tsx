"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";
import { Icons } from "@/components/diagrams/DiagramIcons";

export function EmailLargeScale() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="대규모 이메일 커스텀 발송 아키텍처" desc="대용량 청구서 파일 병목 해결 및 GC 메모리 최적화 체계" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon={<Icons.Radio />} label="대용량 첨부파일 처리 프로세스" theme="indigo" />
            <FlowCard theme="indigo" variant="soft" title="Large-Scale Data Input" desc="대규모 결재 내역 및 대용량 청구서 첨부" />
            <Arrow />
            <FlowCard theme="indigo" variant="solid" title="Custom Dispatch Engine" desc="Java Segment Block 방식 특화 아키텍처" />
            <Arrow />
            <FlowCard theme="slate" variant="dark" title="High-Availability Server" desc="STABLE_DISPATCH_QUEUE" />
          </div>
          <div>
            <SectionTitle icon={<Icons.Shield />} label="[Real-time] 시스템 과부하 방어 로직" theme="rose" />
            <FlowCard theme="rose" variant="soft" title="Resource Monitoring" desc="실시간 메모리 사용량 추적 및 통제" />
            <Arrow />
            <LayerBox label="Optimization Layer" title="Heap & GC Optimization" theme="amber">
              <LayerItem label="GC Policy Tuning" desc="효율적 객체 소멸 및 자원 회수" badge="APPLIED" theme="amber" />
              <LayerItem label="Heap Allocation Refactoring" desc="Global/Static 변수 제거 및 참조 개선" badge="HOTFIX" theme="amber" />
            </LayerBox>
            <Arrow />
            <ResultBox icon={<Icons.Monitor />} text="Shutdown 방지 및 Downtime 최소화 발송" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { theme: "indigo", title: "가용성 (Availability)", desc: "특화 커스텀 설계로 대량 첨부 발송 시 안정적인 퍼포먼스 유지" },
        { theme: "amber", title: "자원 효율 (Efficiency)", desc: "GC 튜닝 및 힙 메모리 참조 개선을 통해 시스템 과부하 완벽 방어" },
        { theme: "emerald", title: "유지보수 (Maintainability)", desc: "더미 데이터 생성 테스터 모듈 사전 연동으로 사전 검증 편의성 대폭 향상" },
      ]} />
    </DiagramWrapper>
  );
}
