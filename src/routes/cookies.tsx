import { createFileRoute } from "@tanstack/react-router";
import { CookiesPage } from "../site/StorePages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/cookies")({
  head: () => routeHead(pageMeta.cookies, "/cookies"),
  component: CookiesPage,
});
