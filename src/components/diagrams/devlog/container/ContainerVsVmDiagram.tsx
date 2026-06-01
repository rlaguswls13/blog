"use client";
import React from 'react';
import {
  DiagramWrapper,
  DiagramHeader,
  DiagramBody
} from '@/components/diagrams/DiagramParts';

export function ContainerVsVmDiagram() {
  return (
    <DiagramWrapper className="max-w-[1200px]">
      <DiagramHeader 
        title="Virtual Machine vs Container" 
        desc="순수 아키텍처 구조와 자원/보안 관점의 트레이드오프 분석"
        theme="indigo"
      />
      
      <style>{`
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-up {
          animation: scale-up 0.4s ease-out forwards;
        }
      `}</style>

      <DiagramBody className="py-8 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-10 font-sans animate-scale-up">
          
          {/* ==========================================
               Virtual Machine Section
          =========================================== */}
          <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-[var(--diagram-card-border)] bg-[var(--diagram-card-bg)] shadow-[var(--diagram-card-shadow)]">
            
            {/* Left: Structural Diagram */}
            <div className="w-full lg:w-[56%] p-6 md:p-8 flex flex-col justify-center gap-6">
              <div className="text-center">
                <h3 className="text-base font-extrabold tracking-tight text-[var(--diagram-text-heading)] mb-1">
                  Virtual Machine
                </h3>
                <p className="text-[11px] font-semibold text-[var(--diagram-text-secondary)]">
                  하드웨어 가상화 기반 격리 구조
                </p>
              </div>
              
              <div className="flex flex-col gap-2.5 w-full">
                {/* Apps Layer */}
                <div className="flex gap-3 h-44 w-full">
                  {/* VM 1 */}
                  <div className="flex-1 flex flex-col gap-2 p-2.5 border-2 border-dashed border-[var(--diagram-card-border)] rounded-xl bg-[var(--diagram-layer-bg)]">
                    <div className="text-[9px] font-extrabold text-[var(--diagram-text-muted)] tracking-wider uppercase text-center">VM 1</div>
                    <div className="flex-1 flex items-center justify-center font-extrabold text-xs rounded-md shadow-sm border border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:-translate-y-0.5 transition-transform duration-200">
                      App 1
                    </div>
                    <div className="h-9 flex items-center justify-center font-bold text-[10px] rounded-md shadow-sm border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:-translate-y-0.5 transition-transform duration-200">
                      Bins / Libs
                    </div>
                    <div className="h-9 flex items-center justify-center font-bold text-[10px] rounded-md shadow-sm border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:-translate-y-0.5 transition-transform duration-200">
                      Guest OS
                    </div>
                  </div>
                  
                  {/* VM 2 */}
                  <div className="flex-1 flex flex-col gap-2 p-2.5 border-2 border-dashed border-[var(--diagram-card-border)] rounded-xl bg-[var(--diagram-layer-bg)]">
                    <div className="text-[9px] font-extrabold text-[var(--diagram-text-muted)] tracking-wider uppercase text-center">VM 2</div>
                    <div className="flex-1 flex items-center justify-center font-extrabold text-xs rounded-md shadow-sm border border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:-translate-y-0.5 transition-transform duration-200">
                      App 2
                    </div>
                    <div className="h-9 flex items-center justify-center font-bold text-[10px] rounded-md shadow-sm border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:-translate-y-0.5 transition-transform duration-200">
                      Bins / Libs
                    </div>
                    <div className="h-9 flex items-center justify-center font-bold text-[10px] rounded-md shadow-sm border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:-translate-y-0.5 transition-transform duration-200">
                      Guest OS
                    </div>
                  </div>
                </div>
                
                {/* Hypervisor */}
                <div className="h-11 flex items-center justify-center font-extrabold text-[11px] rounded-xl shadow-sm border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:-translate-y-0.5 transition-transform duration-200">
                  Hypervisor
                </div>
                
                {/* Host OS */}
                <div className="h-11 flex items-center justify-center font-extrabold text-[11px] rounded-xl shadow-sm border border-[var(--diagram-card-border)] bg-[var(--diagram-badge-bg)] text-[var(--diagram-text-primary)] hover:-translate-y-0.5 transition-transform duration-200">
                  Host Operating System
                </div>
                
                {/* Infrastructure */}
                <div className="h-11 flex items-center justify-center font-extrabold text-[11px] rounded-xl shadow-sm border border-[var(--diagram-card-border)] bg-[var(--diagram-badge-bg)] text-[var(--diagram-text-muted)] hover:-translate-y-0.5 transition-transform duration-200">
                  Infrastructure (Hardware)
                </div>
              </div>
            </div>

            {/* Right: Trade-off Explanation */}
            <div className="w-full lg:w-[44%] p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-[var(--diagram-card-border)] bg-[var(--diagram-bg)] flex flex-col gap-4">
              <h4 className="text-xs font-black tracking-wider uppercase text-[var(--diagram-text-muted)] border-b border-[var(--diagram-card-border)] pb-2 mb-1">
                구조적 한계로 인한 트레이드오프
              </h4>
              
              {/* Card 1 */}
              <div className="p-4 rounded-2xl border border-[var(--diagram-card-border)] bg-[var(--diagram-card-bg)] border-l-4 border-l-emerald-500 shadow-[var(--diagram-soft-shadow)] hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">강점</span>
                  <span className="text-xs font-extrabold text-[var(--diagram-text-heading)]">완벽한 보안 격리 (Security)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[var(--diagram-text-secondary)] m-0">
                  독립된 가상 하드웨어와 별도의 커널(Guest OS)을 사용합니다. 특정 VM이 해킹당하더라도 하이퍼바이저 장벽이 존재하여 호스트 OS나 다른 VM으로 위협이 전파되지 않는 매우 강력한 보안을 제공합니다.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl border border-[var(--diagram-card-border)] bg-[var(--diagram-card-bg)] border-l-4 border-l-emerald-500 shadow-[var(--diagram-soft-shadow)] hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">강점</span>
                  <span className="text-xs font-extrabold text-[var(--diagram-text-heading)]">자원 독점 배정 (Resource)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[var(--diagram-text-secondary)] m-0">
                  가상 CPU와 메모리 자원을 완전히 예약하여 물리적으로 분할 배정합니다. 한 VM의 과부하가 다른 VM의 구동 성능에 영향을 미치는 간섭(Noisy Neighbor) 현상이 원천 차단됩니다.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl border border-[var(--diagram-card-border)] bg-[var(--diagram-card-bg)] border-l-4 border-l-rose-500 shadow-[var(--diagram-soft-shadow)] hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">한계</span>
                  <span className="text-xs font-extrabold text-[var(--diagram-text-heading)]">극심한 오버헤드 (Overhead)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[var(--diagram-text-secondary)] m-0">
                  각 애플리케이션마다 무거운 Guest OS를 중복으로 띄워야 하므로 디스크와 메모리 낭비가 심합니다(GB 단위). 또한, 부팅 속도가 느리며 OS 단위의 보안 패치 및 유지보수 공수가 크게 발생합니다.
                </p>
              </div>
            </div>
            
          </div>

          {/* ==========================================
               Container Section
          =========================================== */}
          <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-[var(--diagram-card-border)] bg-[var(--diagram-card-bg)] shadow-[var(--diagram-card-shadow)]">
            
            {/* Left: Structural Diagram */}
            <div className="w-full lg:w-[56%] p-6 md:p-8 flex flex-col justify-center gap-6">
              <div className="text-center">
                <h3 className="text-base font-extrabold tracking-tight text-[var(--diagram-text-heading)] mb-1">
                  Container
                </h3>
                <p className="text-[11px] font-semibold text-[var(--diagram-text-secondary)]">
                  운영체제 커널 공유 기반 논리적 격리 구조
                </p>
              </div>
              
              <div className="flex flex-col gap-2.5 w-full">
                {/* Apps Layer */}
                <div className="flex gap-3 h-44 w-full">
                  {/* Container 1 */}
                  <div className="flex-1 flex flex-col gap-2 p-2.5 border-2 border-[rgba(59,130,246,0.2)] rounded-xl bg-[rgba(59,130,246,0.04)]">
                    <div className="text-[9px] font-extrabold text-indigo-500/80 tracking-wider uppercase text-center">C 1</div>
                    <div className="flex-1 flex items-center justify-center font-extrabold text-xs rounded-md shadow-sm border border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:-translate-y-0.5 transition-transform duration-200">
                      App 1
                    </div>
                    <div className="h-9 flex items-center justify-center font-bold text-[10px] rounded-md shadow-sm border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:-translate-y-0.5 transition-transform duration-200">
                      Bins / Libs
                    </div>
                  </div>
                  
                  {/* Container 2 */}
                  <div className="flex-1 flex flex-col gap-2 p-2.5 border-2 border-[rgba(59,130,246,0.2)] rounded-xl bg-[rgba(59,130,246,0.04)]">
                    <div className="text-[9px] font-extrabold text-indigo-500/80 tracking-wider uppercase text-center">C 2</div>
                    <div className="flex-1 flex items-center justify-center font-extrabold text-xs rounded-md shadow-sm border border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:-translate-y-0.5 transition-transform duration-200">
                      App 2
                    </div>
                    <div className="h-9 flex items-center justify-center font-bold text-[10px] rounded-md shadow-sm border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:-translate-y-0.5 transition-transform duration-200">
                      Bins / Libs
                    </div>
                  </div>

                  {/* Container 3 */}
                  <div className="flex-1 flex flex-col gap-2 p-2.5 border-2 border-[rgba(59,130,246,0.2)] rounded-xl bg-[rgba(59,130,246,0.04)]">
                    <div className="text-[9px] font-extrabold text-indigo-500/80 tracking-wider uppercase text-center">C 3</div>
                    <div className="flex-1 flex items-center justify-center font-extrabold text-xs rounded-md shadow-sm border border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:-translate-y-0.5 transition-transform duration-200">
                      App 3
                    </div>
                    <div className="h-9 flex items-center justify-center font-bold text-[10px] rounded-md shadow-sm border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:-translate-y-0.5 transition-transform duration-200">
                      Bins / Libs
                    </div>
                  </div>
                </div>
                
                {/* Container Engine */}
                <div className="h-11 flex items-center justify-center font-extrabold text-[11px] rounded-xl shadow-sm border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:-translate-y-0.5 transition-transform duration-200">
                  Container Engine (e.g., Docker)
                </div>
                
                {/* Host OS */}
                <div className="h-11 flex items-center justify-center font-extrabold text-[11px] rounded-xl shadow-sm border border-[var(--diagram-card-border)] bg-[var(--diagram-badge-bg)] text-[var(--diagram-text-primary)] hover:-translate-y-0.5 transition-transform duration-200">
                  Host Operating System (Shared Kernel)
                </div>
                
                {/* Infrastructure */}
                <div className="h-11 flex items-center justify-center font-extrabold text-[11px] rounded-xl shadow-sm border border-[var(--diagram-card-border)] bg-[var(--diagram-badge-bg)] text-[var(--diagram-text-muted)] hover:-translate-y-0.5 transition-transform duration-200">
                  Infrastructure (Hardware)
                </div>
              </div>
            </div>

            {/* Right: Trade-off Explanation */}
            <div className="w-full lg:w-[44%] p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-[var(--diagram-card-border)] bg-[var(--diagram-bg)] flex flex-col gap-4">
              <h4 className="text-xs font-black tracking-wider uppercase text-[var(--diagram-text-muted)] border-b border-[var(--diagram-card-border)] pb-2 mb-1">
                구조적 한계로 인한 트레이드오프
              </h4>
              
              {/* Card 1 */}
              <div className="p-4 rounded-2xl border border-[var(--diagram-card-border)] bg-[var(--diagram-card-bg)] border-l-4 border-l-amber-500 shadow-[var(--diagram-soft-shadow)] hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">한계</span>
                  <span className="text-xs font-extrabold text-[var(--diagram-text-heading)]">보안 격리의 취약성 (Security)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[var(--diagram-text-secondary)] m-0">
                  모든 컨테이너가 단일 Host OS의 커널을 논리적으로만 나누어 공유합니다. 컨테이너 내부에서 커널 취약점(Kernel Exploit) 공격 성공 시 전체 호스트와 다른 컨테이너들까지 연쇄적으로 침해당할 리스크가 존재합니다.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl border border-[var(--diagram-card-border)] bg-[var(--diagram-card-bg)] border-l-4 border-l-amber-500 shadow-[var(--diagram-soft-shadow)] hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">한계</span>
                  <span className="text-xs font-extrabold text-[var(--diagram-text-heading)]">자원 경합 발생 (Resource)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[var(--diagram-text-secondary)] m-0">
                  기본적으로 호스트의 물리 자원을 동적으로 공유합니다. 별도의 Limit 설정(cgroups)을 하지 않으면 특정 컨테이너의 과부하가 호스트 전체의 자원을 고갈시켜 다른 서비스들을 마비시킬 수 있습니다.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl border border-[var(--diagram-card-border)] bg-[var(--diagram-card-bg)] border-l-4 border-l-emerald-500 shadow-[var(--diagram-soft-shadow)] hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">강점</span>
                  <span className="text-xs font-extrabold text-[var(--diagram-text-heading)]">최소 오버헤드와 민첩성 (Agility)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[var(--diagram-text-secondary)] m-0">
                  Guest OS가 생략되어 이미지 크기가 매우 작고(MB 단위), 시스템 콜을 직접 호스트에 전달하여 하드웨어 성능 저하가 없습니다. 부팅이 초 단위로 빠르며, 중앙 커널만 관리하면 되므로 일관된 유지보수가 가능합니다.
                </p>
              </div>
            </div>
            
          </div>
          
        </div>
      </DiagramBody>
    </DiagramWrapper>
  );
}
