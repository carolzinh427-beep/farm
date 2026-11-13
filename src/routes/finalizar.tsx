import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "../site/CheckoutPages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/finalizar")({
  head: () => routeHead(pageMeta.checkout, "/finalizar"),
  component: CheckoutPage,
});
