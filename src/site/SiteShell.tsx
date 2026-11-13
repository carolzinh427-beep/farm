import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import { categories, demoNotice, demoProducts } from "./data";
import { CartProvider, useCart } from "./cart";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ label: string; href: string; kind: string }>>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = window.setTimeout(() => {
      const needle = query.trim().toLocaleLowerCase("pt-BR");
      const productMatches = demoProducts
        .filter((product) =>
          (product.name + " " + product.brand + " " + product.category)
            .toLocaleLowerCase("pt-BR")
            .includes(needle),
        )
        .slice(0, 4)
        .map((product) => ({
          label: product.name,
          href: "/produtos/" + product.slug,
          kind: product.category,
        }));
      const categoryMatches = categories
        .filter((category) => category.toLocaleLowerCase("pt-BR").includes(needle))
        .slice(0, 2)
        .map((category) => ({
          label: category,
          href: "/produtos?categoria=" + encodeURIComponent(category),
          kind: "Categoria",
        }));
      setSuggestions([...productMatches, ...categoryMatches]);
      setLoading(false);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [query]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    window.location.assign(value ? "/produtos?q=" + encodeURIComponent(value) : "/produtos");
  }

  return (
    <div className="search-wrap">
      <form className="search-form" role="search" onSubmit={submit}>
        <label className="sr-only" htmlFor="site-search">Buscar produto, marca ou categoria</label>
        <span aria-hidden="true" className="search-glyph">⌕</span>
        <input
          id="site-search"
          name="q"
          type="search"
          value={query}
          autoComplete="off"
          placeholder="Buscar produto, marca ou categoria"
          aria-expanded={open && Boolean(query)}
          aria-controls="search-suggestions"
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
        />
        <button className="search-submit" type="submit">Buscar</button>
      </form>
      {open && query.trim() && (
        <div className="search-suggestions" id="search-suggestions" role="listbox" aria-label="Sugestões de busca">
          {loading ? (
            <p className="suggestion-status" role="status">Buscando no catálogo demonstrativo</p>
          ) : suggestions.length ? (
            suggestions.map((item) => (
              <a key={item.href} className="suggestion-row" href={item.href} role="option">
                <span>{item.label}</span>
                <small>{item.kind}</small>
              </a>
            ))
          ) : (
            <p className="suggestion-status" role="status">
              Nenhum resultado demonstrativo. Tente outro nome ou categoria
            </p>
          )}
          <a className="suggestion-all" href={"/produtos?q=" + encodeURIComponent(query)}>
            Ver resultados da busca
          </a>
        </div>
      )}
    </div>
  );
}

function AccountDialog({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section ref={dialogRef} className="site-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <button ref={closeRef} className="dialog-close" type="button" onClick={onClose} aria-label="Fechar janela">Fechar</button>
        <p className="section-kicker">Acesso</p>
        <h2 id="dialog-title">Conta em configuração</h2>
        <p>O acesso à conta ainda não está conectado nesta versão demonstrativa. Nenhum dado de cliente será criado ou salvo.</p>
        <a className="text-route" href="/atendimento">Falar com a equipe <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}

function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(!window.localStorage.getItem("bemviva-cookie-choice"));
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      window.localStorage.setItem("bemviva-cookie-choice", "essential-only");
    } catch {
      // The notice can still close for the current view.
    }
    setVisible(false);
  }

  if (!visible) return null;
  return (
    <aside className="cookie-notice" aria-label="Aviso de armazenamento">
      <div>
        <strong>Preferências de navegação</strong>
        <p>Esta versão usa armazenamento local para o carrinho demonstrativo e para guardar esta escolha. Não há ferramentas analíticas ou de publicidade conectadas.</p>
      </div>
      <div className="cookie-actions">
        <a href="/cookies">Sobre cookies</a>
        <button type="button" onClick={dismiss}>Entendi</button>
      </div>
    </aside>
  );
}

function SiteHeader({ onAccount, accountTriggerRef }: { onAccount: () => void; accountTriggerRef: RefObject<HTMLButtonElement | null> }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();

  return (
    <>
      <div className="demo-strip">
        <p>{demoNotice}</p>
      </div>
      <header className="site-header">
        <div className="header-main">
          <a className="brand-home" href="/" aria-label="BemViva Farmácia, início">
            <img className="site-logo" src="/assets/bemviva-logo.png" width="204" height="74" alt="BemViva Farmácia" />
          </a>
          <SearchBox />
          <div className="header-actions">
            <a className="region-link" href="/entrega-e-retirada">
              <span>Entrega e retirada</span>
              <strong>{demoProducts.length && "Região a confirmar"}</strong>
            </a>
            <button ref={accountTriggerRef} className="account-action" type="button" onClick={onAccount}>
              <span className="action-symbol" aria-hidden="true">○</span>
              <span>Minha conta</span>
            </button>
            <a className="cart-action" href="/carrinho" aria-label={"Carrinho, " + cart.count + " itens"}>
              <span className="action-symbol" aria-hidden="true">＋</span>
              <span>Carrinho</span>
              <span className="cart-count" aria-live="polite">{cart.count}</span>
            </a>
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "Fechar menu" : "Abrir menu"}
          </button>
        </div>
        <nav className="category-nav" aria-label="Categorias principais">
          {categories.map((category, index) => (
            <a key={category} href={"/produtos?categoria=" + encodeURIComponent(category)} className={index === 0 ? "nav-featured" : ""}>
              {category}
            </a>
          ))}
        </nav>
        {menuOpen && (
          <nav className="mobile-menu" id="mobile-menu" aria-label="Menu principal">
            {categories.map((category) => (
              <a key={category} href={"/produtos?categoria=" + encodeURIComponent(category)} onClick={() => setMenuOpen(false)}>
                {category}
              </a>
            ))}
            <a href="/servicos">Serviços</a>
            <a href="/sobre">Sobre a BemViva</a>
            <a href="/atendimento">Atendimento</a>
          </nav>
        )}
      </header>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a href="/" aria-label="BemViva Farmácia, início">
          <img src="/assets/bemviva-logo.png" width="204" height="74" alt="BemViva Farmácia" />
        </a>
        <p>Seu cuidado de todos os dias, mais perto de você</p>
        <p className="footer-demo">Versão demonstrativa. Dados da loja aguardam confirmação da BemViva</p>
      </div>
      <div className="footer-column">
        <h2>Explorar</h2>
        <a href="/produtos">Produtos</a>
        <a href="/servicos">Serviços</a>
        <a href="/sobre">Sobre a BemViva</a>
        <a href="/atendimento">Atendimento</a>
      </div>
      <div className="footer-column">
        <h2>Informações</h2>
        <a href="/entrega-e-retirada">Entrega e retirada</a>
        <a href="/trocas-e-devolucoes">Trocas e devoluções</a>
        <a href="/privacidade">Privacidade</a>
        <a href="/cookies">Cookies</a>
        <a href="/termos">Termos de uso</a>
      </div>
      <div className="footer-contact">
        <span>Dados da loja</span>
        <p>Endereço, horários e telefone serão incluídos após confirmação oficial</p>
        <a className="footer-contact-link" href="/atendimento">Falar com a equipe <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer-bottom">
        <span>BemViva Farmácia</span>
        <span>Conteúdo demonstrativo sujeito a atualização e revisão</span>
      </div>
    </footer>
  );
}

function MobileNavigation() {
  const cart = useCart();
  return (
    <nav className="mobile-bottom-nav" aria-label="Navegação inferior">
      <a href="/" aria-label="Início"><span aria-hidden="true">⌂</span><small>Início</small></a>
      <a href="/produtos#catalogo" aria-label="Categorias"><span aria-hidden="true">≡</span><small>Categorias</small></a>
      <a href="/produtos#catalog-search" aria-label="Busca"><span aria-hidden="true">⌕</span><small>Busca</small></a>
      <a href="/carrinho" aria-label={"Carrinho, " + cart.count + " itens"}><span aria-hidden="true">＋</span><small>Carrinho {cart.count > 0 ? "(" + cart.count + ")" : ""}</small></a>
    </nav>
  );
}

function ShellContent({ children }: { children: ReactNode }) {
  const [accountOpen, setAccountOpen] = useState(false);
  const accountTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="site-root">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader accountTriggerRef={accountTriggerRef} onAccount={() => setAccountOpen(true)} />
      <main id="conteudo" tabIndex={-1}>{children}</main>
      <SiteFooter />
      <MobileNavigation />
      <CookieNotice />
      {accountOpen && <AccountDialog onClose={() => { setAccountOpen(false); window.setTimeout(() => accountTriggerRef.current?.focus(), 0); }} />}
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ShellContent>{children}</ShellContent>
    </CartProvider>
  );
}
