"use client";

import dynamic from "next/dynamic";
import { DeferredContent, LoadingPlaceholder } from "@/components/ui/DeferredContent";

const loading = () => <LoadingPlaceholder label="다이어그램 불러오는 중" minHeight={260} />;

const diagrams = {
  G1GCMemory: dynamic(() => import("@/components/diagrams/devlog/java/G1GCMemory").then((m) => m.G1GCMemory), { ssr: false, loading }),
  KahaDBBlocks: dynamic(() => import("@/components/diagrams/devlog/messaging/KahaDBBlocks").then((m) => m.KahaDBBlocks), { ssr: false, loading }),
  QuartzMechanism: dynamic(() => import("@/components/diagrams/devlog/spring/QuartzMechanism").then((m) => m.QuartzMechanism), { ssr: false, loading }),
  QuartzHAClustering: dynamic(() => import("@/components/diagrams/devlog/spring/QuartzHAClustering").then((m) => m.QuartzHAClustering), { ssr: false, loading }),
  QuartzSharding: dynamic(() => import("@/components/diagrams/devlog/spring/QuartzSharding").then((m) => m.QuartzSharding), { ssr: false, loading }),
  ApiFlowDiagram: dynamic(() => import("@/components/diagrams/devlog/architecture/ApiFlowDiagram").then((m) => m.ApiFlowDiagram), { ssr: false, loading }),
  DbBottleneckDiagram: dynamic(() => import("@/components/diagrams/devlog/architecture/DbBottleneckDiagram").then((m) => m.DbBottleneckDiagram), { ssr: false, loading }),
  MqPriorityDiagram: dynamic(() => import("@/components/diagrams/devlog/architecture/MqPriorityDiagram").then((m) => m.MqPriorityDiagram), { ssr: false, loading }),
  TimeoutPolicyDiagram: dynamic(() => import("@/components/diagrams/devlog/architecture/TimeoutPolicyDiagram").then((m) => m.TimeoutPolicyDiagram), { ssr: false, loading }),
  PubSubArchitecture: dynamic(() => import("@/components/diagrams/devlog/architecture/PubSubArchitecture").then((m) => m.PubSubArchitecture), { ssr: false, loading }),
  EventBusSimulator: dynamic(() => import("@/components/diagrams/devlog/architecture/EventBusSimulator").then((m) => m.EventBusSimulator), { ssr: false, loading }),
  StorageArchitectureDiagram: dynamic(() => import("@/components/diagrams/devlog/architecture/StorageArchitectureDiagram").then((m) => m.StorageArchitectureDiagram), { ssr: false, loading }),
  StorageNetworkDiagram: dynamic(() => import("@/components/diagrams/devlog/storage/StorageNetworkDiagram").then((m) => m.StorageNetworkDiagram), { ssr: false, loading }),
  StoragePhysicalDiagram: dynamic(() => import("@/components/diagrams/devlog/storage/StoragePhysicalDiagram").then((m) => m.StoragePhysicalDiagram), { ssr: false, loading }),
  ContainerVsVmDiagram: dynamic(() => import("@/components/diagrams/devlog/container/ContainerVsVmDiagram").then((m) => m.ContainerVsVmDiagram), { ssr: false, loading }),
  K8sSecurityDiagram: dynamic(() => import("@/components/diagrams/devlog/container/K8sSecurityDiagram").then((m) => m.K8sSecurityDiagram), { ssr: false, loading }),
} as const;

export type LazyMdxDiagramName = keyof typeof diagrams;

export function LazyMdxDiagram({ name }: { name: LazyMdxDiagramName }) {
  const Diagram = diagrams[name];
  return (
    <DeferredContent label="다이어그램 불러오는 중" minHeight={260} rootMargin="280px 0px" className="lazy-diagram-slot">
      <Diagram />
    </DeferredContent>
  );
}
