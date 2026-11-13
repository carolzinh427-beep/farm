import { useEffect, useMemo, useState } from "react";
import { categories, demoProducts } from "./data";
import type { Product } from "./data";
import { useCart, formatPrice } from "./cart";
import { Notice, PageHeading, PhotoSlot, ProductCard } from "./Shared";

type Filters = {
  category: string;
  brand: string;
  availability: string;
  min: string;
  max: string;
};

const emptyFilters: Filters = {
  category: "",
  brand: "",
  availability: "",
  min: "",
  max: "",
};

function FilterFields({
  values,
  onChange,
  onClear,
  onApply,
}: {
  values: Filters;
  onChange: (name: keyof Filters, value: string) => void;
  onClear: () => void;
  onApply?: () => void;
}) {
  const brands = Array.from(new Set(demoProducts.map((product) => product.brand)));
  return (
    <div className="filter-fields">
      <label>
        Categoria
        <select value={values.category} onChange={(event) => onChange("category", event.target.value)}>
          <option value="">Todas as categorias</option>
          {categories.map((category) => <option value={category} key={category}>{category}</option>)}
        </select>
      </label>
      <label>
        Marca demonstrativa
        <select value={values.brand} onChange={(event) => onChange("brand", event.target.value)}>
          <option value="">Todas as marcas</option>
          {brands.map((brand) => <option value={brand} key={brand}>{brand}</option>)}
        </select>
      </label>
      <label>
        Disponibilidade
        <select value={values.availability} onChange={(event) => onChange("availability", event.target.value)}>
          <option value="">Todas</option>
          <option value="demo">Exemplos no catálogo</option>
          <option value="consult">Consultar a equipe</option>
        </select>
      </label>
      <fieldset className="price-range">
        <legend>Faixa de preço ilustrativa</legend>
        <div>
          <label>
            Mínimo
            <input type="number" min="0" step="0.01" inputMode="decimal" value={values.min} onChange={(event) => onChange("min", event.target.value)} />
          </label>
          <label>
            Máximo
            <input type="number" min="0" step="0.01" inputMode="decimal" value={values.max} onChange={(event) => onChange("max", event.target.value)} />
          </label>
        </div>
      </fieldset>
      <div className="filter-actions">
        <button type="button" className="filter-apply" onClick={onApply}>Aplicar filtros</button>
        <button type="button" className="filter-clear" onClick={onClear}>Limpar filtros</button>
      </div>
    </div>
  );
}

function ProductResults({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="empty-results" role="status">
        <span className="empty-mark" aria-hidden="true">+</span>
        <h2>Nenhum item encontrado</h2>
        <p>Tente ajustar a categoria, a faixa de preço ou os termos da busca</p>
        <a href="/atendimento">Falar com a equipe <span aria-hidden="true">↗</span></a>
      </div>
    );
  }
  return (
    <div className="catalog-grid">
      {products.map((product) => <ProductCard key={product.slug} product={product} />)}
    </div>
  );
}

export function CatalogPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState("relevance");
  const [filterOpen, setFilterOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [sourceUnavailable, setSourceUnavailable] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
    setFilters((current) => ({
      ...current,
      category: params.get("categoria") ?? "",
    }));
    const timer = window.setTimeout(() => setReady(true), 180);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("pt-BR");
    let result = demoProducts.filter((product) => {
      const matchesQuery =
        !needle ||
        (product.name + " " + product.brand + " " + product.category)
          .toLocaleLowerCase("pt-BR")
          .includes(needle);
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      const matchesAvailability = !filters.availability || product.availability === filters.availability;
      const matchesMin = !filters.min || (product.price != null && product.price >= Number(filters.min));
      const matchesMax = !filters.max || (product.price != null && product.price <= Number(filters.max));
      return matchesQuery && matchesCategory && matchesBrand && matchesAvailability && matchesMin && matchesMax;
    });
    if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    if (sort === "price-asc") result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "price-desc") result = [...result].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    return result;
  }, [filters, query, sort]);

  function updateFilter(name: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function clearFilters() {
    setFilters(emptyFilters);
    setQuery("");
    setSort("relevance");
    window.history.replaceState({}, "", "/produtos");
  }

  return (
    <div className="page-wrap catalog-page">
      <PageHeading
        eyebrow="Catálogo demonstrativo"
        title="Produtos para a sua rotina"
        description="Explore os exemplos de categorias, marcas, preços e disponibilidade. As informações desta versão não representam estoque ou oferta real"
      />
      <form className="catalog-search" role="search" onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const value = String(data.get("q") ?? "");
        setQuery(value);
        window.history.replaceState({}, "", value ? "/produtos?q=" + encodeURIComponent(value) : "/produtos");
      }}>
        <label htmlFor="catalog-search">Buscar no catálogo</label>
        <div className="catalog-search-controls">
          <input id="catalog-search" name="q" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome do produto, marca ou categoria" />
          <button type="submit">Buscar</button>
        </div>
      </form>

      <div className="catalog-toolbar">
        <button
          type="button"
          className="filter-toggle"
          aria-expanded={filterOpen}
          aria-controls="mobile-filter-panel"
          onClick={() => setFilterOpen((value) => !value)}
        >
          {filterOpen ? "Fechar filtros" : "Abrir filtros"}
        </button>
        <p className="result-count" aria-live="polite">{ready ? filtered.length + (filtered.length === 1 ? " item demonstrativo" : " itens demonstrativos") : "Carregando catálogo"}</p>
        <label className="sort-control">
          Ordenar por
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="relevance">Relevância</option>
            <option value="name">Nome</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
          </select>
        </label>
      </div>

      <div className="catalog-layout" id="catalogo">
        <aside className="desktop-filter" aria-label="Filtros do catálogo">
          <h2>Filtrar itens</h2>
          <FilterFields values={filters} onChange={updateFilter} onClear={clearFilters} />
        </aside>
        {filterOpen && (
          <section className="mobile-filter-panel" id="mobile-filter-panel" role="region" aria-label="Painel de filtros">
            <div className="mobile-filter-heading">
              <h2>Filtros</h2>
              <button type="button" onClick={() => setFilterOpen(false)}>Fechar</button>
            </div>
            <FilterFields values={filters} onChange={updateFilter} onClear={clearFilters} onApply={() => setFilterOpen(false)} />
          </section>
        )}
        <section className="catalog-results" aria-label="Resultados do catálogo" aria-busy={!ready}>
          {!ready ? (
            <div className="loading-state" role="status">Carregando itens demonstrativos</div>
          ) : sourceUnavailable ? (
            <div className="empty-results" role="alert">
              <h2>Catálogo temporariamente indisponível</h2>
              <p>Não foi possível consultar os dados demonstrativos</p>
              <button type="button" onClick={() => setSourceUnavailable(false)}>Tentar novamente</button>
            </div>
          ) : (
            <ProductResults products={filtered} />
          )}
        </section>
      </div>
      <Notice title="Medicamentos e itens controlados">
        Esta demonstração não contém medicamentos. Itens sujeitos a receita ou validação profissional precisam de conferência pela equipe da farmácia antes de qualquer atendimento
      </Notice>
    </div>
  );
}

export function ProductDetailPage({ slug }: { slug: string }) {
  const product = demoProducts.find((item) => item.slug === slug);
  const cart = useCart();

  if (!product) {
    return (
      <div className="page-wrap">
        <PageHeading title="Item não encontrado" description="Este item não faz parte do catálogo demonstrativo" />
        <a className="hero-primary" href="/produtos">Voltar ao catálogo</a>
      </div>
    );
  }

  return (
    <div className="page-wrap product-detail-page">
      <nav className="breadcrumbs" aria-label="Trilha de navegação">
        <a href="/">Início</a><span aria-hidden="true">/</span><a href="/produtos">Produtos</a><span aria-hidden="true">/</span><span>{product.name}</span>
      </nav>
      <div className="product-detail-grid">
        <div className="detail-gallery">
          <PhotoSlot label={"Imagem do produto pendente de foto aprovada: " + product.name} className="detail-main-photo" />
          <div className="detail-gallery-slots" aria-label="Espaços reservados para imagens adicionais">
            <PhotoSlot label="Imagem adicional 1 a configurar" />
            <PhotoSlot label="Imagem adicional 2 a configurar" />
            <PhotoSlot label="Imagem adicional 3 a configurar" />
          </div>
        </div>
        <div className="product-detail-copy">
          <p className="section-kicker">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-brand">{product.brand}, {product.presentation}</p>
          <p className="detail-summary">{product.summary}</p>
          <p className="availability-label">{product.availability === "demo" ? "Disponibilidade ilustrativa, sem conexão de estoque" : "Disponibilidade e condições a confirmar com a equipe"}</p>
          {product.price != null && <p className="detail-price"><small>Preço de exemplo</small><strong>{formatPrice(product.price)}</strong></p>}
          <Notice title="Demonstração de catálogo">
            Produtos, apresentações, preços e disponibilidade são exemplos. Nenhuma compra será processada
          </Notice>
          {product.purchaseMode === "demo" ? (
            <button className="detail-add" type="button" onClick={() => cart.add(product.slug)}>Adicionar ao carrinho demonstrativo</button>
          ) : (
            <a className="detail-consult" href="/atendimento">Falar com a equipe <span aria-hidden="true">↗</span></a>
          )}
          <p className="delivery-line"><a href="/entrega-e-retirada">Consultar entrega e retirada</a></p>
        </div>
      </div>

      <section className="product-information" aria-labelledby="product-info-title">
        <h2 id="product-info-title">Informações do produto</h2>
        <div className="product-info-list">
          {[
            ["Descrição", "Conteúdo demonstrativo, a substituir por informação oficial do fabricante"],
            ["Composição", "Não informada nesta demonstração"],
            ["Modo de uso", "Consulte a embalagem do produto real e a orientação profissional quando aplicável"],
            ["Advertências", "Informações oficiais do fabricante ainda não foram adicionadas"],
            ["Conservação", "Informações oficiais do fabricante ainda não foram adicionadas"],
          ].map(([label, value]) => (
            <details key={label}>
              <summary>{label}</summary>
              <p>{value}</p>
            </details>
          ))}
        </div>
        <p className="professional-note">Medicamentos e itens sujeitos a receita exigem validação adequada. Esta página não substitui bula, rótulo ou orientação profissional</p>
      </section>
    </div>
  );
}
