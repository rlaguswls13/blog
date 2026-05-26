import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { BackLink } from "@/components/layout/BackLink";
import { TagList } from "@/components/ui/TagBadge";
import { G1GCMemory } from "@/components/diagrams/G1GCMemory";
import { KahaDBBlocks } from "@/components/diagrams/KahaDBBlocks";
import { QuartzMechanism } from "@/components/diagrams/QuartzMechanism";
import { QuartzHAClustering } from "@/components/diagrams/QuartzHAClustering";
import { QuartzSharding } from "@/components/diagrams/QuartzSharding";
import { Indent } from "@/components/ui/Indent";
import { ApiFlowDiagram } from "@/components/diagrams/ApiFlowDiagram";
import { DbBottleneckDiagram } from "@/components/diagrams/DbBottleneckDiagram";
import { MqPriorityDiagram } from "@/components/diagrams/MqPriorityDiagram";
import { TimeoutPolicyDiagram } from "@/components/diagrams/TimeoutPolicyDiagram";
import { PubSubArchitecture } from "@/components/diagrams/PubSubArchitecture";
import { EventBusSimulator } from "@/components/diagrams/EventBusSimulator";

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
};

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/content/devlog");
  const categories = ["tech_study", "problem_solving"];
  const params: { category: string; id: string }[] = [];

  for (const category of categories) {
    const categoryDir = path.join(contentDir, category);
    if (fs.existsSync(categoryDir)) {
      const files = fs.readdirSync(categoryDir);
      for (const file of files) {
        if (file.endsWith(".mdx")) {
          params.push({
            category,
            id: file.replace(/\.mdx$/, ""),
          });
        }
      }
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
  const filePath = path.join(
    process.cwd(),
    `src/content/devlog/${category}/${id}.mdx`
  );

  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch {
    return <div>Devlog not found</div>;
  }

  const { data, content } = matter(fileContent);

  return (
    <>
      <BackLink href="/devlog" label="목록으로" />
      <div className="project-card" style={{ marginBottom: "40px" }}>
        <div className="devlog-meta" style={{ marginBottom: "15px" }}>
          <span>📅 {data.date}</span>
        </div>
        <h1 style={{ borderBottom: "none", paddingBottom: 0, marginBottom: "15px" }}>
          {data.title}
        </h1>
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
