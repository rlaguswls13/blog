import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { DevlogBackLink } from "@/components/layout/DevlogBackLink";
import { TagList } from "@/components/ui/TagBadge";
import { CalendarIcon } from "@/components/ui/Icons";
import { G1GCMemory } from "@/components/diagrams/devlog/java/G1GCMemory";
import { KahaDBBlocks } from "@/components/diagrams/devlog/messaging/KahaDBBlocks";
import { QuartzMechanism } from "@/components/diagrams/devlog/spring/QuartzMechanism";
import { QuartzHAClustering } from "@/components/diagrams/devlog/spring/QuartzHAClustering";
import { QuartzSharding } from "@/components/diagrams/devlog/spring/QuartzSharding";
import { Indent } from "@/components/ui/Indent";
import { ApiFlowDiagram } from "@/components/diagrams/devlog/architecture/ApiFlowDiagram";
import { DbBottleneckDiagram } from "@/components/diagrams/devlog/architecture/DbBottleneckDiagram";
import { MqPriorityDiagram } from "@/components/diagrams/devlog/architecture/MqPriorityDiagram";
import { TimeoutPolicyDiagram } from "@/components/diagrams/devlog/architecture/TimeoutPolicyDiagram";
import { PubSubArchitecture } from "@/components/diagrams/devlog/architecture/PubSubArchitecture";
import { EventBusSimulator } from "@/components/diagrams/devlog/architecture/EventBusSimulator";
import { StorageArchitectureDiagram } from "@/components/diagrams/devlog/architecture/StorageArchitectureDiagram";
import { StorageNetworkDiagram } from "@/components/diagrams/devlog/storage/StorageNetworkDiagram";
import { StoragePhysicalDiagram } from "@/components/diagrams/devlog/storage/StoragePhysicalDiagram";
import { ContainerVsVmDiagram } from "@/components/diagrams/devlog/container/ContainerVsVmDiagram";
import { K8sSecurityDiagram } from "@/components/diagrams/devlog/container/K8sSecurityDiagram";
import { CodePopup } from "@/components/layout/CodePopup";
import { Collapsible } from "@/components/ui/Collapsible";
import { MdxImageFigure } from "@/components/ui/MdxImageFigure";
import devlogData from "@/data/devlog.json";
import { sortByDateDesc } from "@/lib/utils";
import type { DevlogEntry, DevlogCategory } from "@/types";

const components = {
  G1GCMemory,
  KahaDBBlocks,
  QuartzMechanism,
  QuartzHAClustering,
  QuartzSharding,
  Indent,
  ApiFlowDiagram,
  DbBottleneckDiagram,
  MqPriorityDiagram,
  TimeoutPolicyDiagram,
  PubSubArchitecture,
  EventBusSimulator,
  StorageArchitectureDiagram,
  StorageNetworkDiagram,
  StoragePhysicalDiagram,
  ContainerVsVmDiagram,
  K8sSecurityDiagram,
  CodePopup,
  Collapsible,
  MdxImageFigure,
};

function getAllMdxFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getAllMdxFiles(fullPath));
    } else if (file.endsWith(".mdx")) {
      results.push(fullPath);
    }
  }
  return results;
}

function findMdxFile(dir: string, id: string): string | null {
  if (!fs.existsSync(dir)) return null;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      const found = findMdxFile(fullPath, id);
      if (found) return found;
    } else if (file === `${id}.mdx`) {
      return fullPath;
    }
  }
  return null;
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/content/devlog");
  const categories = ["tech_study", "problem_solving", "competition_event"];
  const params: { category: string; id: string }[] = [];

  for (const category of categories) {
    const categoryDir = path.join(contentDir, category);
    const mdxFiles = getAllMdxFiles(categoryDir);
    for (const file of mdxFiles) {
      params.push({
        category,
        id: path.basename(file, ".mdx"),
      });
    }
  }

  return params;
}

export default async function DevlogDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;

  // Handle MDX rendering
  const categoryDir = path.join(process.cwd(), `src/content/devlog/${category}`);
  const filePath = findMdxFile(categoryDir, id);

  if (!filePath) {
    return <div>Devlog not found</div>;
  }

  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch {
    return <div>Devlog not found</div>;
  }

  const { data, content } = matter(fileContent);

  return (
    <>
      <DevlogBackLink category={category} />
      <div className="project-card" style={{ marginBottom: "40px" }}>
        <div className="devlog-meta" style={{ marginBottom: "15px" }}>
          <span>📅 {data.date}</span>
        </div>
        <div className="page-title" style={{ borderBottom: "none", paddingBottom: 0, marginBottom: "15px" }}>
          {data.title}
        </div>
        {data.tags && <TagList tags={data.tags} />}
      </div>

      <div className="mdx-content">
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark-dimmed",
                    keepBackground: true,
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </>
  );
}
