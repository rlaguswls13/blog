const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function getProjectThumbnail(id: string) {
  return `${basePath}/thumnail/projects/${id}.webp`;
}

export function getDevlogThumbnail(category: string, id: string) {
  return `${basePath}/thumnail/devlog/${category}/${id}.webp`;
}
