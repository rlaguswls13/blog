"use client";
import { DiagramWrapper, DiagramHeader, DiagramBody, TwoColumnGrid, SectionTitle, FlowCard, Arrow, LayerBox, LayerItem, ResultBox, FooterGrid } from "./DiagramParts";

export function SsoFilter() {
  return (
    <DiagramWrapper>
      <DiagramHeader title="Okta API 기반 커스텀 SSO/SLO 필터 구조" desc="레거시 플러그인 한계를 극복한 맞춤형 인증/로그아웃 아키텍처" />
      <DiagramBody>
        <TwoColumnGrid>
          <div>
            <SectionTitle icon="🔐" label="SSO 인증 파이프라인" color="#e11d48" />
            <FlowCard bg="#fff1f2" border="#fecdd3" title="Legacy Plugin Conflict" desc="기존 SAML 플러그인의 Spring Boot 비호환 이슈" titleColor="#881337" />
            <Arrow />
            <FlowCard gradBg="linear-gradient(135deg, #e11d48, #be123c)" border="transparent" title="Custom SSO Filter (Okta API)" desc="Servlet Filter 기반 토큰 검증 직접 구현" light />
            <Arrow />
            <FlowCard bg="#1e293b" border="#334155" title="Session & Token Manager" desc="세션 생성, 갱신, 만료 일원 관리" light />
          </div>
          <div>
            <SectionTitle icon="🔄" label="계정 동기화 & SLO" color="#7c3aed" />
            <FlowCard bg="#f5f3ff" border="#ddd6fe" title="HR Data Sync Engine" desc="고객사 인사정보 ↔ 솔루션 계정 자동 동기화" titleColor="#4c1d95" />
            <Arrow />
            <LayerBox label="Logout Layer" title="SLO (Single Logout)" color="violet">
              <LayerItem label="Global Session Invalidation" desc="Okta 세션과 로컬 세션 동시 파기" badge="SECURE" color="violet" />
              <LayerItem label="Redirect Chain Control" desc="로그아웃 후 안전한 리다이렉트 경로 보장" badge="SAFE" color="violet" />
            </LayerBox>
            <Arrow />
            <ResultBox text="🛡️ 플러그인 의존 없는 완전 자체 구현 인증 체계" />
          </div>
        </TwoColumnGrid>
      </DiagramBody>
      <FooterGrid items={[
        { color: "#e11d48", bg: "#fff1f2", title: "보안 (Security)", desc: "Okta API 직접 연동으로 플러그인 취약점 제거" },
        { color: "#7c3aed", bg: "#f5f3ff", title: "자동화 (Automation)", desc: "인사 DB 연동 자동 계정 Sync로 수동 관리 공수 제로화" },
        { color: "#059669", bg: "#ecfdf5", title: "확장성 (Scalability)", desc: "신규 IdP 연동 시 Filter 교체만으로 대응 가능" },
      ]} />
    </DiagramWrapper>
  );
}
