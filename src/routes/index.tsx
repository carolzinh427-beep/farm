import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../site/HomePage";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/")({
  head: () => routeHead(pageMeta.home, "/"),
  component: HomePage,
});
