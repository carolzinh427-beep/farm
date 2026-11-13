import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import appMetaJson from "../app-meta.json";
import { SiteShell } from "../site/SiteShell";

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;
const SITE_ORIGIN = "https://bemviva-farmacia.higgsfield.app";

function ownAsset(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value, SITE_ORIGIN);
    if (url.hostname.endsWith("higgsfield.app") || url.hostname.endsWith("higgsfield-dev.app")) {
      return url.pathname + url.search;
    }
  } catch {
    return value;
  }
  return value;
}

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? "BemViva Farmácia";
  const description = meta.og_description ?? "Produtos de autocuidado e informações claras, com um canal próximo para falar com a equipe";
  const image = ownAsset(meta.og_image_url);
  const favicon = ownAsset(meta.favicon_url);
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "BemViva Farmácia" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image ? SITE_ORIGIN + image : "" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: image ? SITE_ORIGIN + image : "" },
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      ...(favicon ? [{ rel: "icon", href: favicon }] : []),
      { rel: "apple-touch-icon", href: "/assets/apple-touch-icon.png" },
      { rel: "manifest", href: "/assets/site.webmanifest" },
    ],
  };
}

function NotFoundComponent() {
  return (
    <main className="error-page">
      <p className="section-kicker">BemViva Farmácia</p>
      <h1>Esta página não foi encontrada</h1>
      <p>O endereço pode ter mudado ou não estar disponível</p>
      <Link className="hero-primary" to="/">Voltar ao início</Link>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    document.title = "Não foi possível carregar esta página | BemViva Farmácia";
  }, []);
  return (
    <main className="error-page">
      <p className="section-kicker">BemViva Farmácia</p>
      <h1>Não foi possível carregar esta página</h1>
      <p>Tente novamente ou volte para o início</p>
      <div className="error-actions">
        <button className="form-submit" type="button" onClick={() => { router.invalidate(); reset(); }}>Tentar novamente</button>
        <a className="hero-secondary" href="/">Voltar ao início</a>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell><Outlet /></SiteShell>
    </QueryClientProvider>
  );
}
