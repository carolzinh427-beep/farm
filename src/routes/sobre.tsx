import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../site/StorePages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/sobre")({
  head: () => routeHead(pageMeta.about, "/sobre"),
  component: AboutPage,
});
