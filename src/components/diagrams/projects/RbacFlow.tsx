"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";

export function RbacFlow() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="메뉴 접근 권한(RBAC) 아키텍처 및 데이터 흐름" desc="Interceptor 기반 동적 메뉴 접근 제어 체계" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon="🔑" label="인증 & 권한 파이프라인" color="#2563eb" />
            <FlowCard bg="#eff6ff" border="#bfdbfe" title="External Auth (외부 API / DB)" desc="Okta 인증 정보 및 DB 권한 매핑" titleColor="#1e3a5f" />
            <Arrow />
            <FlowCard gradBg="linear-gradient(135deg, #2563eb, #4f46e5)" border="transparent" title="Spring Interceptor Chain" desc="요청별 권한 검증 및 메뉴 접근 통제" light />
            <Arrow />
            <FlowCard bg="#1e293b" border="#334155" title="Dynamic Menu Rendering" desc="사용자 권한에 따른 UI 메뉴 동적 구성" light />
          </div>
          <div>
            <SectionTitle icon="⚙️" label="역할 기반 데이터 모델" color="#059669" />
            <FlowCard bg="#ecfdf5" border="#a7f3d0" title="Role-Permission Mapping" desc="역할-권한 다대다 관계 모델링" titleColor="#064e3b" />
            <Arrow />
            <LayerBox label="Access Control" title="계층형 RBAC 구조" color="emerald">
              <LayerItem label="Menu-Level Permission" desc="메뉴 단위 Read/Write/Admin 분리" badge="RBAC" color="emerald" />
              <LayerItem label="Data-Level Filtering" desc="조직도 기반 데이터 접근 범위 제한" badge="ROW-LEVEL" color="emerald" />
            </LayerBox>
            <Arrow />
            <ResultBox text="🔒 인증-인가-메뉴 렌더링까지 완전 자동화된 보안 체계" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { color: "#2563eb", bg: "#eff6ff", title: "보안 (Security)", desc: "Interceptor 기반 서버사이드 권한 검증으로 우회 불가" },
        { color: "#059669", bg: "#ecfdf5", title: "유연성 (Flexibility)", desc: "역할/권한 DB 관리로 코드 수정 없이 권한 조정" },
        { color: "#d97706", bg: "#fffbeb", title: "사용성 (UX)", desc: "권한에 맞는 메뉴만 노출하여 사용자 혼란 방지" },
      ]} />
    </DiagramWrapper>
  );
}
