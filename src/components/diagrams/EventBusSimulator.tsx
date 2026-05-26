"use client";
import React, { useState, useEffect, useRef } from "react";

// ==========================================
// Types & Interfaces
// ==========================================
type Architecture = "DI" | "Spring";
type Scenario = "Success" | "Error";
type StatusType = "default" | "success" | "error" | "pending";

interface NodeStatus {
  text: string;
  type: StatusType;
}

interface PacketState {
  show: boolean;
  top: string;
  left: string;
  transition: string;
  opacity: number;
}

interface Position {
  top: string;
  left: string;
}

// ==========================================
// Constants & Center Coordinates
// ==========================================
// Nodes: Width 140px (Half 70px), Height ~110px (Half 55px)
// Packets: Width 16px (Half 8px)
const CENTERS = {
  pub: { x: 150, y: 190 },
  bus: { x: 390, y: 190 },
  log: { x: 630, y: 95 },
  db: { x: 630, y: 285 },
};

const NODE_POS: Record<string, Position> = {
  pub: { top: `${CENTERS.pub.y - 55}px`, left: `${CENTERS.pub.x - 70}px` },
  bus: { top: `${CENTERS.bus.y - 55}px`, left: `${CENTERS.bus.x - 70}px` },
  log: { top: `${CENTERS.log.y - 55}px`, left: `${CENTERS.log.x - 70}px` },
  db: { top: `${CENTERS.db.y - 55}px`, left: `${CENTERS.db.x - 70}px` },
};

const PACKET_POS: Record<string, Position> = {
  pub: { top: `${CENTERS.pub.y - 8}px`, left: `${CENTERS.pub.x - 8}px` },
  bus: { top: `${CENTERS.bus.y - 8}px`, left: `${CENTERS.bus.x - 8}px` },
  log: { top: `${CENTERS.log.y - 8}px`, left: `${CENTERS.log.x - 8}px` },
  db: { top: `${CENTERS.db.y - 8}px`, left: `${CENTERS.db.x - 8}px` },
};

const INITIAL_PACKET: PacketState = {
  show: false,
  top: PACKET_POS.pub.top,
  left: PACKET_POS.pub.left,
  transition: "none",
  opacity: 1,
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ==========================================
// Sub-Components
// ==========================================
const SimulatorNode = ({
  label,
  subLabel,
  top,
  left,
  bgClass,
  status,
  visible = true,
  icon,
}: {
  label: string;
  subLabel?: string;
  top: string;
  left: string;
  bgClass: string;
  status?: NodeStatus;
  visible?: boolean;
  icon?: string;
}) => {
  const getStatusColor = (type?: StatusType) => {
    switch (type) {
      case "success": return "bg-green-500/20 text-green-300 border-green-500/50";
      case "error": return "bg-red-500/20 text-red-300 border-red-500/50";
      case "pending": return "bg-orange-500/20 text-orange-300 border-orange-500/50";
      default: return "bg-black/20 text-white/70 border-transparent";
    }
  };

  return (
    <div
      className={`absolute w-[140px] py-4 text-center rounded-xl shadow-lg border border-white/10 backdrop-blur-sm transition-all duration-500 ${bgClass} ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ top, left }}
    >
      <div className="flex justify-center mb-1 text-2xl">{icon}</div>
      <span className="font-bold text-white tracking-wide">{label}</span>
      {subLabel && <span className="text-xs font-medium text-white/80 block mt-0.5">{subLabel}</span>}
      <div className="mt-3 px-2">
        <div className={`text-[11px] font-semibold min-h-[22px] flex items-center justify-center rounded-md border ${getStatusColor(status?.type)} transition-colors duration-300`}>
          {status?.text}
        </div>
      </div>
    </div>
  );
};

const SimulatorPacket = ({ state }: { state: PacketState }) => {
  if (!state.show) return null;
  return (
    <div
      className="absolute w-4 h-4 rounded-full z-20 shadow-[0_0_15px_rgba(251,191,36,1)] border-2 border-white bg-gradient-to-br from-amber-300 to-amber-500"
      style={{
        top: state.top,
        left: state.left,
        transition: state.transition,
        opacity: state.opacity,
      }}
    />
  );
};

// ==========================================
// Main Component
// ==========================================
export function EventBusSimulator() {
  const [arch, setArch] = useState<Architecture>("DI");
  const [scenario, setScenario] = useState<Scenario>("Success");
  const [isRunning, setIsRunning] = useState(false);

  const [loggerStatus, setLoggerStatus] = useState<NodeStatus>({ text: "대기 중", type: "default" });
  const [dbStatus, setDbStatus] = useState<NodeStatus>({ text: "대기 중", type: "default" });
  const [busStatus, setBusStatus] = useState<NodeStatus>({ text: "비활성", type: "default" });

  const [packet1, setPacket1] = useState<PacketState>(INITIAL_PACKET);
  const [packet2, setPacket2] = useState<PacketState>(INITIAL_PACKET);
  const [logs, setLogs] = useState<React.ReactNode[]>(["$ systemctl status event-simulator", "> 대기 중... 설정을 선택하고 '흐름 실행' 버튼을 누르세요."]);

  const logsContainerRef = useRef<HTMLDivElement>(null);

  // 컨테이너 스크롤만 이동시켜 화면 전체가 아래로 튀는 현상 방지
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (log: React.ReactNode) => setLogs((prev) => [...prev, log]);

  const resetSimulation = () => {
    setPacket1(INITIAL_PACKET);
    setPacket2(INITIAL_PACKET);
    setLoggerStatus({ text: "대기 중", type: "default" });
    setDbStatus({ text: "대기 중", type: "default" });
    setBusStatus({ text: arch === "Spring" ? "대기 중" : "비활성", type: "default" });
    setLogs(["$ systemctl status event-simulator", "> 초기화 완료. 준비되었습니다."]);
  };

  const handleArchChange = (newArch: Architecture) => {
    if (isRunning) return;
    setArch(newArch);
    setBusStatus({ text: newArch === "Spring" ? "대기 중" : "비활성", type: "default" });
  };

  const movePacket = async (
    setPacket: React.Dispatch<React.SetStateAction<PacketState>>,
    from: Position,
    to: Position,
    durationMs: number = 1000
  ) => {
    setPacket({ show: true, top: from.top, left: from.left, transition: "none", opacity: 1 });
    await delay(50);
    setPacket({ show: true, top: to.top, left: to.left, transition: `all ${durationMs}ms ease-in-out`, opacity: 1 });
    await delay(durationMs + 100);
  };

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    
    // Clear logs explicitly on run start
    setLogs(["$ ./run_transaction.sh"]);
    setPacket1(INITIAL_PACKET);
    setPacket2(INITIAL_PACKET);
    setLoggerStatus({ text: "대기 중", type: "default" });
    setDbStatus({ text: "대기 중", type: "default" });
    setBusStatus({ text: arch === "Spring" ? "대기 중" : "비활성", type: "default" });

    const isError = scenario === "Error";

    if (arch === "DI") {
      addLog(<span className="text-blue-400">&gt; Direct DI 방식 시뮬레이션 시작</span>);

      // 1. Pub -> Logger
      addLog(<span>&gt; [1] 로깅 서비스 동기(직접) 호출 중...</span>);
      await movePacket(setPacket1, PACKET_POS.pub, PACKET_POS.log, 1200);
      setLoggerStatus({ text: "로그 저장 완료!", type: "success" });
      setPacket1((p) => ({ ...p, show: false }));

      // 2. Pub -> DB
      addLog(<span>&gt; [2] 핵심 비즈니스 로직(DB 저장) 처리 중...</span>);
      await movePacket(setPacket2, PACKET_POS.pub, PACKET_POS.db, 1000);
      setPacket2((p) => ({ ...p, show: false }));

      if (isError) {
        setDbStatus({ text: "에러! 롤백 발생", type: "error" });
        addLog(<span className="text-red-400 font-bold">🚨 [CRITICAL] DB는 롤백되었으나 로깅은 이미 커밋됨 (데이터 정합성 깨짐!)</span>);
      } else {
        setDbStatus({ text: "주문 커밋 완료!", type: "success" });
        addLog(<span className="text-green-400 font-bold">✅ 모든 작업 성공.</span>);
      }

    } else if (arch === "Spring") {
      addLog(<span className="text-purple-400">&gt; Spring Event (Pub/Sub) 시뮬레이션 시작</span>);

      // 1. Pub -> Event Bus
      addLog(<span>&gt; [1] 트랜잭션 도중 이벤트 발행 (대기실로 던짐)</span>);
      await movePacket(setPacket1, PACKET_POS.pub, PACKET_POS.bus, 800);
      setBusStatus({ text: "이벤트 대기 중...", type: "pending" });

      // 2. Pub -> DB
      addLog(<span>&gt; [2] 핵심 비즈니스 로직(DB 저장) 처리 중...</span>);
      await movePacket(setPacket2, PACKET_POS.pub, PACKET_POS.db, 1000);
      setPacket2((p) => ({ ...p, show: false }));

      if (isError) {
        setDbStatus({ text: "에러! 롤백 발생", type: "error" });
        addLog(<span className="text-orange-400">&gt; ⚠️ 메인 트랜잭션 롤백 이벤트 발생!</span>);

        // 대기실 이벤트 소멸
        await delay(600);
        setPacket1((p) => ({ ...p, opacity: 0 }));
        setBusStatus({ text: "이벤트 폐기됨", type: "error" });
        addLog(<span className="text-green-400 font-bold">🛡️ [방어 성공] 트랜잭션 실패로 인해 대기실의 이벤트 자동 폐기됨. 로거 호출 취소.</span>);
      } else {
        setDbStatus({ text: "주문 커밋 완료!", type: "success" });
        addLog(<span className="text-cyan-400">&gt; ✅ DB 트랜잭션 정상 커밋 확인. (AFTER_COMMIT 이벤트 발송)</span>);

        // Event Bus -> Logger
        setBusStatus({ text: "이벤트 발송 완료", type: "success" });
        await movePacket(setPacket1, PACKET_POS.bus, PACKET_POS.log, 1000);
        setLoggerStatus({ text: "비동기 로그 저장 완료!", type: "success" });
        setPacket1((p) => ({ ...p, show: false }));
        addLog(<span className="text-green-400 font-bold">✅ 비동기 이벤트 기반 모든 작업 성공.</span>);
      }
    }
    
    setIsRunning(false);
  };

  return (
    <div className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 p-4 md:p-8 rounded-3xl shadow-sm my-10 font-sans max-w-[960px] mx-auto">
      
      <div className="text-center mb-8">
        <h3 className="font-extrabold text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 tracking-tight">
          아키텍처 트랜잭션 시뮬레이터
        </h3>
        <p className="text-sm text-zinc-500 mt-2 font-medium">이벤트 기반 구조의 정합성 방어 능력을 시각적으로 확인해 보세요.</p>
      </div>

      {/* Control Panel */}
      <div className="flex flex-col md:flex-row justify-between gap-6 bg-zinc-50 dark:bg-zinc-900 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl mb-8">
        <div className="space-y-3 flex-1">
          <strong className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">1. 아키텍처 방식</strong>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${arch === 'DI' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${arch === 'DI' ? 'border-blue-500' : 'border-zinc-400'}`}>
                {arch === 'DI' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
              <input type="radio" className="hidden" checked={arch === "DI"} onChange={() => handleArchChange("DI")} disabled={isRunning} />
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">기존 방식 (Direct DI)</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${arch === 'Spring' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-sm' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${arch === 'Spring' ? 'border-purple-500' : 'border-zinc-400'}`}>
                {arch === 'Spring' && <div className="w-2 h-2 rounded-full bg-purple-500" />}
              </div>
              <input type="radio" className="hidden" checked={arch === "Spring"} onChange={() => handleArchChange("Spring")} disabled={isRunning} />
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Spring Event (Pub/Sub)</span>
            </label>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          <strong className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">2. 트랜잭션 시나리오</strong>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${scenario === 'Success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-sm' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${scenario === 'Success' ? 'border-green-500' : 'border-zinc-400'}`}>
                {scenario === 'Success' && <div className="w-2 h-2 rounded-full bg-green-500" />}
              </div>
              <input type="radio" className="hidden" checked={scenario === "Success"} onChange={() => !isRunning && setScenario("Success")} disabled={isRunning} />
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">DB 커밋 성공 (정상)</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${scenario === 'Error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 shadow-sm' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${scenario === 'Error' ? 'border-red-500' : 'border-zinc-400'}`}>
                {scenario === 'Error' && <div className="w-2 h-2 rounded-full bg-red-500" />}
              </div>
              <input type="radio" className="hidden" checked={scenario === "Error"} onChange={() => !isRunning && setScenario("Error")} disabled={isRunning} />
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">DB 에러 발생 (롤백)</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-center pt-4 md:pt-0 pb-2">
          <button 
            onClick={runSimulation} 
            disabled={isRunning}
            className="w-full md:w-auto h-full min-h-[100px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex flex-col md:flex-row items-center justify-center gap-3"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg">시뮬레이션 중...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-lg">흐름 실행</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulation Area */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
        <div className="relative h-[380px] min-w-[780px] bg-zinc-100 dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-inner border border-zinc-200 dark:border-zinc-800 mx-auto">
          
          {/* Dashboard Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* Connective Paths SVG */}
          <svg className="absolute inset-0 pointer-events-none z-0" width="100%" height="100%">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--line-color, #71717a)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--line-color, #71717a)" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <style>
              {`
                .animated-path {
                  stroke-dasharray: 8 6;
                  animation: dash 20s linear infinite;
                }
                @keyframes dash {
                  to { stroke-dashoffset: -1000; }
                }
              `}
            </style>
            
            {/* Common Line: Pub to DB */}
            <path d={`M ${CENTERS.pub.x} ${CENTERS.pub.y} Q ${CENTERS.bus.x} ${CENTERS.db.y} ${CENTERS.db.x} ${CENTERS.db.y}`} fill="none" stroke="url(#lineGrad)" strokeWidth="3" className="animated-path opacity-50" />
            
            {arch === "DI" && (
              /* Line: Pub to Logger (Direct) */
              <path d={`M ${CENTERS.pub.x} ${CENTERS.pub.y} Q ${CENTERS.bus.x} ${CENTERS.log.y} ${CENTERS.log.x} ${CENTERS.log.y}`} fill="none" stroke="url(#lineGrad)" strokeWidth="3" className="animated-path opacity-50" />
            )}
            
            {arch === "Spring" && (
              <>
                {/* Line: Pub to Bus */}
                <path d={`M ${CENTERS.pub.x} ${CENTERS.pub.y} L ${CENTERS.bus.x} ${CENTERS.bus.y}`} fill="none" stroke="url(#lineGrad)" strokeWidth="3" className="animated-path opacity-50" />
                {/* Line: Bus to Logger */}
                <path d={`M ${CENTERS.bus.x} ${CENTERS.bus.y} Q ${(CENTERS.bus.x + CENTERS.log.x) / 2} ${CENTERS.log.y} ${CENTERS.log.x} ${CENTERS.log.y}`} fill="none" stroke="url(#lineGrad)" strokeWidth="3" className="animated-path opacity-50" />
              </>
            )}
          </svg>

          {/* Nodes */}
          <div className="z-10 relative h-full w-full">
            <SimulatorNode 
              icon="🛒"
              label="주문 서비스" 
              top={NODE_POS.pub.top} 
              left={NODE_POS.pub.left} 
              bgClass="bg-gradient-to-br from-zinc-700 to-zinc-900" 
            />
            
            <SimulatorNode 
              icon="📬"
              label="이벤트 버스" 
              subLabel="(ApplicationEventPublisher)" 
              top={NODE_POS.bus.top} 
              left={NODE_POS.bus.left} 
              bgClass="bg-gradient-to-br from-indigo-500 to-purple-600 shadow-purple-500/20" 
              status={busStatus} 
              visible={arch === "Spring"} 
            />
            
            <SimulatorNode 
              icon="📝"
              label="로깅 서비스" 
              subLabel="(ELK / File 저장)"
              top={NODE_POS.log.top} 
              left={NODE_POS.log.left} 
              bgClass="bg-gradient-to-br from-cyan-500 to-blue-600 shadow-blue-500/20" 
              status={loggerStatus} 
            />
            
            <SimulatorNode 
              icon="💾"
              label="데이터베이스" 
              subLabel="(주문/결제 트랜잭션)"
              top={NODE_POS.db.top} 
              left={NODE_POS.db.left} 
              bgClass="bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20" 
              status={dbStatus} 
            />
          </div>

          <SimulatorPacket state={packet1} />
          <SimulatorPacket state={packet2} />
        </div>
      </div>

      {/* Terminal View */}
      <div className="mt-8 rounded-2xl overflow-hidden shadow-xl border border-zinc-700/50 bg-[#1e1e1e]">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#2d2d2d] border-b border-black/30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-inner"></div>
          </div>
          <span className="text-xs font-medium text-zinc-400 font-mono tracking-wider">simulation-log.sh</span>
          <div className="w-12"></div> {/* Spacer for centering */}
        </div>
        <div 
          ref={logsContainerRef}
          className="p-5 font-mono text-sm h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600"
        >
          <div className="space-y-1.5 text-zinc-300">
            {logs.map((log, i) => (
              <div key={i} className="leading-relaxed animate-fade-in-up flex">
                <span className="mr-3 text-zinc-500 select-none">{String(i + 1).padStart(2, '0')}</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
