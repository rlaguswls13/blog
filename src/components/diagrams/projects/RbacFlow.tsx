"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";
import { Icons } from "@/components/diagrams/DiagramIcons";

export function RbacFlow() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="메뉴 접근 권한(RBAC) 아키텍처 및 데이터 흐름" desc="Interceptor 기반 동적 메뉴 접근 제어 체계" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon={<Icons.Key />} label="인증 & 권한 파이프라인" theme="blue" />
            <FlowCard theme="blue" variant="soft" title="External Auth (외부 API / DB)" desc="Okta 인증 정보 및 DB 권한 매핑" />
            <Arrow />
            <FlowCard theme="indigo" variant="solid" title="Spring Interceptor Chain" desc="요청별 권한 검증 및 메뉴 접근 통제" />
            <Arrow />
            <FlowCard theme="slate" variant="dark" title="Dynamic Menu Rendering" desc="사용자 권한에 따른 UI 메뉴 동적 구성" />
          </div>
          <div>
            <SectionTitle icon={<Icons.Settings />} label="역할 기반 데이터 모델" theme="emerald" />
            <FlowCard theme="emerald" variant="soft" title="Role-Permission Mapping" desc="역할-권한 다대다 관계 모델링" />
            <Arrow />
            <LayerBox label="Access Control" title="계층형 RBAC 구조" theme="emerald">
              <LayerItem label="Menu-Level Permission" desc="메뉴 단위 Read/Write/Admin 분리" badge="RBAC" theme="emerald" />
              <LayerItem label="Data-Level Filtering" desc="조직도 기반 데이터 접근 범위 제한" badge="ROW-LEVEL" theme="emerald" />
            </LayerBox>
            <Arrow />
            <ResultBox icon={<Icons.Lock />} text="인증-인가-메뉴 렌더링까지 완전 자동화된 보안 체계" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { theme: "blue", title: "보안 (Security)", desc: "Interceptor 기반 서버사이드 권한 검증으로 우회 불가" },
        { theme: "emerald", title: "유연성 (Flexibility)", desc: "역할/권한 DB 관리로 코드 수정 없이 권한 조정" },
        { theme: "amber", title: "사용성 (UX)", desc: "권한에 맞는 메뉴만 노출하여 사용자 혼란 방지" },
      ]} />
    </DiagramWrapper>
  );
}
