import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "../site/StorePages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/termos")({
  head: () => routeHead(pageMeta.terms, "/termos"),
  component: TermsPage,
});
