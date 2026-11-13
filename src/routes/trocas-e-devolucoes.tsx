import { createFileRoute } from "@tanstack/react-router";
import { ReturnsPage } from "../site/StorePages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/trocas-e-devolucoes")({
  head: () => routeHead(pageMeta.returns, "/trocas-e-devolucoes"),
  component: ReturnsPage,
});
