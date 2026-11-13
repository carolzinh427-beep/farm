import { createFileRoute } from "@tanstack/react-router";

const origin = "https://bemviva-farmacia.higgsfield.app";
const paths = [
  "/",
  "/produtos",
  "/servicos",
  "/atendimento",
  "/sobre",
  "/entrega-e-retirada",
  "/trocas-e-devolucoes",
  "/privacidade",
  "/cookies",
  "/termos",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = paths.map((path) => "<url><loc>" + origin + path + "</loc></url>").join("");
        const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls + "</urlset>";
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
