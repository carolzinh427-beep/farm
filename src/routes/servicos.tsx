import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "../site/StorePages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/servicos")({
  head: () => routeHead(pageMeta.services, "/servicos"),
  component: ServicesPage,
});
