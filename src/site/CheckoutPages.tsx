import { useState, type FormEvent } from "react";
import { demoProducts } from "./data";
import { formatPrice, useCart } from "./cart";
import { Notice, PageHeading } from "./Shared";

function CartLine({ slug, quantity }: { slug: string; quantity: number }) {
  const cart = useCart();
  const product = demoProducts.find((item) => item.slug === slug);
  if (!product) return null;

  return (
    <article className="cart-line">
      <div className="cart-item-visual" aria-hidden="true">BV</div>
      <div className="cart-item-copy">
        <p className="section-kicker">{product.category}</p>
        <h2><a href={"/produtos/" + product.slug}>{product.name}</a></h2>
        <p>{product.brand}, {product.presentation}</p>
        <span className="availability-label">Item demonstrativo, sem estoque conectado</span>
      </div>
      <label className="quantity-control">
        Quantidade
        <input
          type="number"
          min="1"
          max="20"
          step="1"
          value={quantity}
          onChange={(event) => cart.setQuantity(product.slug, Number(event.target.value))}
        />
      </label>
      <strong className="cart-line-total">{formatPrice((product.price ?? 0) * quantity)}</strong>
      <button className="remove-line" type="button" onClick={() => cart.remove(product.slug)}>Remover</button>
    </article>
  );
}

function CartSummary({ checkout }: { checkout?: boolean }) {
  const cart = useCart();
  return (
    <aside className="cart-summary">
      <h2>Resumo ilustrativo</h2>
      <div><span>Subtotal de exemplo</span><strong>{formatPrice(cart.subtotal)}</strong></div>
      <div><span>Entrega</span><strong>A confirmar</strong></div>
      <div className="summary-total"><span>Total ilustrativo</span><strong>{formatPrice(cart.subtotal)}</strong></div>
      <p>Valores de demonstração. Frete e pagamento não estão conectados</p>
      {!checkout && (
        <a className="summary-checkout" href="/finalizar" aria-disabled={cart.count === 0}>Continuar para revisão demonstrativa</a>
      )}
    </aside>
  );
}

export function CartPage() {
  const cart = useCart();
  const lines = Object.entries(cart.lines).filter(([, quantity]) => quantity > 0);

  return (
    <div className="page-wrap cart-page">
      <PageHeading
        eyebrow="Carrinho demonstrativo"
        title="Revise seus itens"
        description="Este carrinho mostra uma experiência de compra sem transmitir pedido ou pagamento"
      />
      {cart.count === 0 ? (
        <div className="empty-cart" role="status">
          <span aria-hidden="true">＋</span>
          <h2>Seu carrinho demonstrativo está vazio</h2>
          <p>Explore os itens ilustrativos para ver como a navegação funciona</p>
          <a className="hero-primary" href="/produtos">Explorar produtos</a>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
            {lines.map(([slug, quantity]) => <CartLine key={slug} slug={slug} quantity={quantity} />)}
            <button className="clear-cart" type="button" onClick={cart.clear}>Remover todos os itens</button>
          </div>
          <CartSummary />
        </div>
      )}
      <Notice title="Nenhum pedido será enviado">
        A finalização é uma simulação de interface. Nenhum dado de cliente é guardado e nenhum pagamento é processado
      </Notice>
    </div>
  );
}

type CheckoutValues = {
  name: string;
  email: string;
  address: string;
  receiving: string;
};

export function CheckoutPage() {
  const cart = useCart();
  const [stage, setStage] = useState<"form" | "review" | "complete">("form");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [receiving, setReceiving] = useState("delivery");
  const [values, setValues] = useState<CheckoutValues | null>(null);
  const items = Object.entries(cart.lines)
    .map(([slug, quantity]) => ({
      product: demoProducts.find((item) => item.slug === slug),
      quantity,
    }))
    .filter((item) => item.product);

  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      address: String(data.get("address") ?? "").trim(),
      receiving: String(data.get("receiving") ?? "delivery"),
    };
    if (!next.name || !next.email.includes("@") || !next.address) {
      setError("Preencha nome, e-mail válido e endereço para ver a revisão demonstrativa");
      return;
    }
    setError("");
    setValues(next);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStage("review");
    }, 260);
  }

  if (stage === "complete") {
    return (
      <div className="page-wrap checkout-complete" role="status" aria-live="polite">
        <span className="success-symbol" aria-hidden="true">✓</span>
        <p className="section-kicker">Demonstração encerrada</p>
        <h1>Nenhum pedido foi enviado</h1>
        <p>Nenhum pagamento foi processado. Os dados digitados ficaram apenas nesta página e não foram armazenados</p>
        <a className="hero-primary" href="/produtos">Voltar ao catálogo</a>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="page-wrap">
        <PageHeading title="Carrinho vazio" description="Adicione um item demonstrativo antes de abrir a revisão" />
        <a className="hero-primary" href="/produtos">Explorar produtos</a>
      </div>
    );
  }

  if (stage === "review" && values) {
    return (
      <div className="page-wrap checkout-page">
        <PageHeading
          eyebrow="Revisão demonstrativa"
          title="Confira esta simulação"
          description="Esta tela não cria pedido e não processa pagamento"
        />
        <div className="checkout-review-grid">
          <section className="review-details">
            <h2>Dados desta página</h2>
            <p><strong>Nome:</strong> {values.name}</p>
            <p><strong>E-mail:</strong> {values.email}</p>
            <p><strong>Endereço:</strong> {values.address}</p>
            <p><strong>Recebimento:</strong> {values.receiving === "pickup" ? "Retirada, a confirmar" : "Entrega, a confirmar"}</p>
            <p><strong>Pagamento:</strong> Integração não disponível</p>
            <button type="button" className="form-submit" onClick={() => setStage("form")}>Voltar e editar</button>
          </section>
          <CartSummary checkout />
        </div>
        <Notice title="Sem envio ou cobrança">
          Os dados acima não saem desta página e são descartados ao sair. Não informe dados reais
        </Notice>
        <button className="finish-demo" type="button" onClick={() => {
          cart.clear();
          setStage("complete");
        }}>Encerrar demonstração</button>
      </div>
    );
  }

  return (
    <div className="page-wrap checkout-page">
      <PageHeading
        eyebrow="Finalização demonstrativa"
        title="Dados para revisão"
        description="Preencha apenas com dados fictícios. Esta etapa demonstra o fluxo e não transmite informações"
      />
      <div className="checkout-review-grid">
        <form className="site-form checkout-form" onSubmit={review} noValidate>
          <h2>Identificação para demonstração</h2>
          <label>
            Nome
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            E-mail
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Endereço demonstrativo
            <input name="address" autoComplete="street-address" required />
          </label>
          <label>
            Modalidade de recebimento
            <select name="receiving" value={receiving} onChange={(event) => setReceiving(event.target.value)}>
              <option value="delivery">Entrega, condição a confirmar</option>
              <option value="pickup">Retirada, local a confirmar</option>
            </select>
          </label>
          <fieldset className="payment-demo">
            <legend>Pagamento</legend>
            <p>Integração de pagamento não disponível nesta demonstração</p>
          </fieldset>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="form-submit" type="submit" disabled={loading}>
            {loading ? "Preparando revisão" : "Revisar simulação"}
          </button>
          <p className="form-footnote">Não use dados reais. Nenhum campo é armazenado ou enviado</p>
        </form>
        <CartSummary checkout />
      </div>
    </div>
  );
}
