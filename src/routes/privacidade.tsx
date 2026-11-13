import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "../site/StorePages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/privacidade")({
  head: () => routeHead(pageMeta.privacy, "/privacidade"),
  component: PrivacyPage,
});
