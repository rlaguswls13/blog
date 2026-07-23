import fs from "fs";
import path from "path";
import { isValidElement, type ComponentPropsWithoutRef } from "react";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { DevlogBackLink } from "@/components/layout/DevlogBackLink";
import { TagList } from "@/components/ui/TagBadge";
import { CalendarIcon } from "@/components/ui/Icons";
import { Indent } from "@/components/ui/Indent";
import { LazyMdxDiagram, type LazyMdxDiagramName } from "@/components/ui/LazyMdxDiagram";
import { CodePopup } from "@/components/layout/CodePopup";
import { Collapsible } from "@/components/ui/Collapsible";
import { MdxImageFigure } from "@/components/ui/MdxImageFigure";
import { NotionImage } from "@/components/ui/notion/NotionImage";
import { NotionTable } from "@/components/ui/notion/NotionTable";
import { NotionToggle } from "@/components/ui/notion/NotionToggle";
import { NotionCallout } from "@/components/ui/notion/NotionCallout";
import { NotionDivider } from "@/components/ui/notion/NotionDivider";
import { NotionIndent } from "@/components/ui/notion/NotionIndent";
import { NotionCode } from "@/components/ui/notion/NotionCode";
import { GiscusComments } from "@/components/ui/GiscusComments";
import recommendationData from "@/data/devlog-recommendations.json";
import { RelatedDevlogs, type RelatedDevlogItem } from "@/components/ui/RelatedDevlogs";

type PrettyCodeFigureProps = ComponentPropsWithoutRef<"figure"> & {
  "data-rehype-pretty-code-figure"?: string;
};

const lazyDiagram = (name: LazyMdxDiagramName) => function LazyDiagramSlot() {
  return <LazyMdxDiagram name={name} />;
};

const components = {
  G1GCMemory: lazyDiagram("G1GCMemory"),
  KahaDBBlocks: lazyDiagram("KahaDBBlocks"),
  QuartzMechanism: lazyDiagram("QuartzMechanism"),
  QuartzHAClustering: lazyDiagram("QuartzHAClustering"),
  QuartzSharding: lazyDiagram("QuartzSharding"),
  Indent,
  ApiFlowDiagram: lazyDiagram("ApiFlowDiagram"),
  DbBottleneckDiagram: lazyDiagram("DbBottleneckDiagram"),
  MqPriorityDiagram: lazyDiagram("MqPriorityDiagram"),
  TimeoutPolicyDiagram: lazyDiagram("TimeoutPolicyDiagram"),
  PubSubArchitecture: lazyDiagram("PubSubArchitecture"),
  EventBusSimulator: lazyDiagram("EventBusSimulator"),
  StorageArchitectureDiagram: lazyDiagram("StorageArchitectureDiagram"),
  StorageNetworkDiagram: lazyDiagram("StorageNetworkDiagram"),
  StoragePhysicalDiagram: lazyDiagram("StoragePhysicalDiagram"),
  ContainerVsVmDiagram: lazyDiagram("ContainerVsVmDiagram"),
  K8sSecurityDiagram: lazyDiagram("K8sSecurityDiagram"),
  CodePopup,
  Collapsible,
  MdxImageFigure,
  NotionImage,
  NotionTable,
  NotionToggle,
  NotionCallout,
  NotionDivider,
  NotionIndent,
  figure: (props: PrettyCodeFigureProps) => {
    if (props["data-rehype-pretty-code-figure"] !== undefined) {
      const language = isValidElement<{ "data-language"?: string }>(props.children)
        ? props.children.props["data-language"] || "text"
        : "text";
      return <NotionCode language={language}>{props.children}</NotionCode>;
    }
    return <figure {...props} />;
  },
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
  const categories = ["tech_study", "problem_solving", "competition_event", "blog", "education"];
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
  const recommendationItems = recommendationData.items as Record<string, RelatedDevlogItem[]>;
  const relatedDevlogs = recommendationItems[`${category}/${id}`] || [];

  return (
    <article className="detail-content-page devlog-detail-page">
      <DevlogBackLink category={category} />
      <header className="detail-page-heading project-card" style={{ marginBottom: "40px" }}>
        <span className="page-heading-eyebrow">DEVLOG · {category.replaceAll("_", " ")}</span>
        <div className="devlog-meta" style={{ marginBottom: "15px" }}>
          <span><CalendarIcon /> {data.date}</span>
        </div>
        <h1 className="page-title">
          {data.title}
        </h1>
        {data.tags && <TagList tags={data.tags} />}
      </header>

      <RelatedDevlogs items={relatedDevlogs} />

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
      <GiscusComments />
    </article>
  );
}
