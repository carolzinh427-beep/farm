import { createFileRoute } from "@tanstack/react-router";
import { DeliveryPage } from "../site/StorePages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/entrega-e-retirada")({
  head: () => routeHead(pageMeta.delivery, "/entrega-e-retirada"),
  component: DeliveryPage,
});
