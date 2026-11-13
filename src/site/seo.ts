export type SeoEntry = { title: string; description: string };

const ORIGIN = "https://bemviva-farmacia.higgsfield.app";

export function routeHead(entry: SeoEntry, path: string) {
  const url = ORIGIN + path;
  return {
    meta: [
      { title: entry.title },
      { name: "description", content: entry.description },
      { property: "og:title", content: entry.title },
      { property: "og:description", content: entry.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
