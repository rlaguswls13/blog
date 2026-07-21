export interface NotionAnnotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface NormalizedRichText {
  plain_text: string;
  annotations: NotionAnnotations;
  href?: string | null;
  type: "text" | "mention" | "equation";
}

export interface NormalizedBlock {
  id: string;
  type: string;
  has_children: boolean;
  children?: NormalizedBlock[];
  last_edited_time?: string;
  data: Record<string, unknown>;
}

export interface NormalizedPage {
  id: string;
  title: string;
  slug: string;
  category?: string;
  tags?: string[];
  date?: string;
  lastEditedTime: string;
  coverImage?: string | null;
  icon?: string | null;
  blocks: NormalizedBlock[];
  assetIds: string[];
  properties: Record<string, unknown>;
}

export interface ManifestAsset {
  blockId: string;
  localPath: string;
  contentType: string;
  lastEditedTime: string;
  checksum?: string;
}

export interface ManifestPage {
  id: string;
  lastEditedTime: string;
  slug: string;
  outputPath: string;
  assetIds: string[];
}

export interface Manifest {
  schemaVersion: string;
  notionApiVersion: string;
  lastSuccessfulSync: string;
  sourceId: string;
  pages: Record<string, ManifestPage>;
  assets: Record<string, ManifestAsset>;
}
