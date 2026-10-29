export type PortfolioRoute = {
  page: "home" | "work" | "about" | "contact";
  projectId?: string;
  mediaId?: string;
};
type Catalog = readonly { id: string; media: readonly { src: string }[] }[];

// Asset-based IDs survive changes to the displayed project titles.
export function mediaId(src: string): string {
  return src.replace(/^\/assets\//, "").replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function readPortfolioRoute(hash: string, catalog: Catalog): PortfolioRoute {
  const [page, projectId, itemId] = hash.replace(/^#\/?/, "").split("/");
  if (page !== "work") return { page: page === "about" || page === "contact" ? page : "home" };
  const project = catalog.find(project => project.id === projectId);
  if (!project) return { page: "work" };
  const item = project.media.find(item => mediaId(item.src) === itemId);
  return { page: "work", projectId: project.id, ...(item ? { mediaId: mediaId(item.src) } : {}) };
}

export function routeHash(route: PortfolioRoute): string {
  if (route.page !== "work" || !route.projectId) return `#${route.page}`;
  return `#work/${route.projectId}${route.mediaId ? `/${route.mediaId}` : ""}`;
}
