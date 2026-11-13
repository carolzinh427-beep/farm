import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../site/StorePages";
import { pageMeta } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/atendimento")({
  head: () => routeHead(pageMeta.contact, "/atendimento"),
  component: ContactPage,
});
