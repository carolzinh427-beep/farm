import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "../site/CheckoutPages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/carrinho")({
  head: () => routeHead(pageMeta.cart, "/carrinho"),
  component: CartPage,
});
