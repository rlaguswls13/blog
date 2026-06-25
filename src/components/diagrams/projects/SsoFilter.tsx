"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "@/components/diagrams/DiagramParts";
import { Icons } from "@/components/diagrams/DiagramIcons";

export function SsoFilter() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="Okta API 기반 커스텀 SSO/SLO 필터 구조" desc="레거시 플러그인 한계를 극복한 맞춤형 인증/로그아웃 아키텍처" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon={<Icons.Lock />} label="SSO 인증 파이프라인" theme="rose" />
            <FlowCard theme="rose" variant="soft" title="Legacy Plugin Conflict" desc="기존 SAML 플러그인의 Spring Boot 비호환 이슈" icon={<Icons.Package className="w-5 h-5" />} />
            <Arrow />
            <FlowCard theme="rose" variant="solid" title="Custom SSO Filter (Okta API)" desc="Servlet Filter 기반 토큰 검증 직접 구현" icon={<Icons.Shield className="w-5 h-5" />} />
            <Arrow />
            <FlowCard theme="slate" variant="dark" title="Session & Token Manager" desc="세션 생성, 갱신, 만료 일원 관리" icon={<Icons.Key className="w-5 h-5" />} />
          </div>
          <div>
            <SectionTitle icon={<Icons.Refresh />} label="계정 동기화 & SLO" theme="violet" />
            <FlowCard theme="violet" variant="soft" title="HR Data Sync Engine" desc="고객사 인사정보 ↔ 솔루션 계정 자동 동기화" icon={<Icons.Refresh className="w-5 h-5" />} />
            <Arrow />
            <LayerBox label="Logout Layer" title="SLO (Single Logout)" theme="violet">
              <LayerItem label="Global Session Invalidation" desc="Okta 세션과 로컬 세션 동시 파기" badge="SECURE" theme="violet" />
              <LayerItem label="Redirect Chain Control" desc="로그아웃 후 안전한 리다이렉트 경로 보장" badge="SAFE" theme="violet" />
            </LayerBox>
            <Arrow />
            <ResultBox icon={<Icons.Shield />} text="플러그인 의존 없는 완전 자체 구현 인증 체계" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { theme: "rose", title: "보안 (Security)", desc: "Okta API 직접 연동으로 플러그인 취약점 제거" },
        { theme: "violet", title: "자동화 (Automation)", desc: "인사 DB 연동 자동 계정 Sync로 수동 관리 공수 제로화" },
        { theme: "emerald", title: "확장성 (Scalability)", desc: "신규 IdP 연동 시 Filter 교체만으로 대응 가능" },
      ]} />
    </DiagramWrapper>
  );
}
