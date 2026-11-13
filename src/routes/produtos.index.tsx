import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "../site/CatalogPages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/produtos/")({
  head: () => routeHead(pageMeta.products, "/produtos"),
  component: CatalogPage,
});
