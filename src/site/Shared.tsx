import { useState, type FormEvent, type ReactNode } from "react";
import type { Product } from "./data";
import { formatPrice, useCart } from "./cart";

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="page-heading">
      {eyebrow && <p className="section-kicker">{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p className="page-intro">{description}</p>}
    </div>
  );
}

export function SectionHeading({
  id,
  title,
  description,
}: {
  id?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function PhotoSlot({
  label = "Fotografia oficial ainda não disponível",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={"photo-slot " + className} role="img" aria-label={label}>
      <span className="photo-slot-mark" aria-hidden="true">+</span>
      <span className="photo-slot-label">{label}</span>
      <small>Área reservada para foto aprovada pela BemViva</small>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  function addItem() {
    cart.add(product.slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className="product-card">
      <a className="product-visual-link" href={"/produtos/" + product.slug} aria-label={"Ver " + product.name}>
        <PhotoSlot label={"Foto demonstrativa pendente: " + product.name} className="product-photo" />
      </a>
      <div className="product-card-copy">
        <div className="product-card-meta">
          <span>{product.category}</span>
          <span>Item ilustrativo</span>
        </div>
        <h3><a href={"/produtos/" + product.slug}>{product.name}</a></h3>
        <p className="product-brand">{product.brand}, {product.presentation}</p>
        <p className="availability-label">
          {product.availability === "demo"
            ? "Disponibilidade ilustrativa"
            : "Consulte a equipe"}
        </p>
        {product.price != null ? (
          <div className="product-card-bottom">
            <div>
              <span className="price-label">Preço de exemplo</span>
              <strong className="product-price">{formatPrice(product.price)}</strong>
            </div>
            {product.purchaseMode === "demo" ? (
              <button className="product-add" type="button" onClick={addItem} aria-label={"Adicionar " + product.name + " ao carrinho demonstrativo"}>
                {added ? "Adicionado" : "Adicionar"}
              </button>
            ) : (
              <a className="product-consult" href="/atendimento">Consultar</a>
            )}
          </div>
        ) : (
          <a className="product-consult full" href="/atendimento">Falar com a equipe <span aria-hidden="true">↗</span></a>
        )}
      </div>
      <span className="sr-only" aria-live="polite">{added ? product.name + " adicionado ao carrinho demonstrativo" : ""}</span>
    </article>
  );
}

export function Notice({
  title,
  children,
  tone = "soft",
}: {
  title: string;
  children: ReactNode;
  tone?: "soft" | "plain";
}) {
  return (
    <aside className={"content-notice notice-" + tone}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function DemoContactForm() {
  const [status, setStatus] = useState<"idle" | "error" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !email.includes("@") || !message) {
      setStatus("error");
      setError("Preencha nome, e-mail válido e mensagem para continuar a demonstração");
      return;
    }

    setError("");
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 320);
  }

  if (status === "done") {
    return (
      <div className="form-result" role="status" aria-live="polite">
        <h2>Simulação concluída</h2>
        <p>Nenhuma mensagem foi enviada ou armazenada. O canal será ativado após a configuração dos dados oficiais da BemViva.</p>
        <button type="button" className="form-reset" onClick={() => setStatus("idle")}>Voltar ao formulário</button>
      </div>
    );
  }

  return (
    <form className="site-form" onSubmit={handleSubmit} noValidate>
      <div className="form-intro">
        <h2>Falar com a equipe</h2>
        <p>Este formulário demonstra a experiência. Não informe dados reais nem informações de saúde</p>
      </div>
      <label>
        Nome
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        E-mail
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Mensagem geral
        <textarea name="message" rows={4} required maxLength={500} />
        <small>Não inclua documentos, dados de saúde ou informações sensíveis</small>
      </label>
      {status === "error" && <p className="form-error" role="alert">{error}</p>}
      <button className="form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Preparando demonstração" : "Continuar demonstração"}
      </button>
      <p className="form-footnote">Nenhum dado é transmitido ou salvo por este formulário</p>
    </form>
  );
}
