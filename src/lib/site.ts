import rawConfig from "@/data/config/site.json";

export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || rawConfig.siteUrl,
  giscus: {
    repository: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY || rawConfig.giscus.repository,
    repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID || rawConfig.giscus.repositoryId,
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || rawConfig.giscus.category,
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || rawConfig.giscus.categoryId,
    language: process.env.NEXT_PUBLIC_GISCUS_LANGUAGE || rawConfig.giscus.language,
  },
} as const;
