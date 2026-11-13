import { createFileRoute } from "@tanstack/react-router";
import { ProductDetailPage } from "../site/CatalogPages";
import { demoProducts } from "../site/data";
import { routeHead } from "../site/seo";

export const Route = createFileRoute("/produtos/$slug")({
  head: ({ params }) => {
    const product = demoProducts.find((item) => item.slug === params.slug);
    return routeHead(
      product
        ? {
            title: product.name + " | BemViva Farmácia",
            description: "Item demonstrativo de " + product.category + ". Informações e disponibilidade aguardam confirmação",
          }
        : {
            title: "Item não encontrado | BemViva Farmácia",
            description: "Este item não faz parte do catálogo demonstrativo da BemViva",
          },
      "/produtos/" + params.slug,
    );
  },
  component: ProductDetailRoute,
});

function ProductDetailRoute() {
  const { slug } = Route.useParams();
  return <ProductDetailPage slug={slug} />;
}
