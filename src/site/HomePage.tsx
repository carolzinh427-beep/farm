import { articles, categories, demoProducts, demoNotice } from "./data";
import { ProductCard, PhotoSlot, SectionHeading, Notice } from "./Shared";

export function HomePage() {
  return (
    <div className="page-home">
      <section className="home-hero" aria-labelledby="home-title">
        <PhotoSlot label="Fotografia de atendimento e autocuidado a adicionar" className="hero-photo" />
        <div className="hero-copy">
          <h1 id="home-title">Seu cuidado de todos os dias, mais perto de você</h1>
          <p>Encontre produtos para sua rotina e conte com a equipe BemViva para um atendimento próximo e responsável</p>
          <div className="hero-actions">
            <a className="hero-primary" href="/produtos">Explorar produtos <span aria-hidden="true">↗</span></a>
            <a className="hero-secondary" href="/atendimento">Falar com a equipe</a>
          </div>
        </div>
        <p className="hero-side-note">Catálogo e fotos demonstrativos</p>
      </section>

      <section className="category-section" aria-labelledby="category-title">
        <div className="category-intro">
          <SectionHeading
            id="category-title"
            title="Encontre por categoria"
            description="Escolha um caminho para explorar o catálogo demonstrativo"
          />
          <a className="category-all-link" href="/produtos">Ver todos os produtos <span aria-hidden="true">↗</span></a>
        </div>
        <nav className="category-route-list" aria-label="Categorias do catálogo">
          {categories.map((category) => (
            <a key={category} href={"/produtos?categoria=" + encodeURIComponent(category)}>
              <span>{category}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <Notice title="Medicamentos e itens sujeitos a controle">
          As informações e a disponibilidade precisam ser confirmadas pela equipe. Esta versão não permite finalizar a compra desses itens
        </Notice>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="section-topline">
          <SectionHeading
            id="featured-title"
            title="Autocuidado em destaque"
            description="Exemplos de itens de higiene e cuidado diário para apresentar a navegação da loja"
          />
          <a className="section-text-link" href="/produtos">Explorar catálogo <span aria-hidden="true">↗</span></a>
        </div>
        <div className="featured-grid">
          {demoProducts.filter((product) => product.price != null).slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <p className="caption-note">{demoNotice}</p>
      </section>

      <section className="routine-section" aria-labelledby="routine-title">
        <div className="routine-lead">
          <p className="section-kicker">Cuidado que faz parte da rotina</p>
          <h2 id="routine-title">Informação clara para escolhas mais conscientes</h2>
          <p>Conteúdos curtos para apoiar a leitura de rótulos e o uso responsável de produtos</p>
          <a className="editorial-link" href="/servicos">Conhecer os serviços da BemViva <span aria-hidden="true">↗</span></a>
        </div>
        <div className="routine-stories">
          {articles.map((article, index) => (
            <article className={index === 0 ? "routine-story story-feature" : "routine-story"} key={article.title}>
              {index === 0 && <PhotoSlot label="Fotografia editorial sobre cuidados diários a adicionar" className="story-photo" />}
              <span className="story-category">{index === 0 ? "Proteção solar" : index === 1 ? "Organização" : "Uso responsável"}</span>
              <h3>{article.title}</h3>
              <p>{article.body}</p>
              <a href={article.sourceUrl} target="_blank" rel="noreferrer">Fonte: {article.sourceLabel} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-title">
        <PhotoSlot label="Fotografia da loja BemViva a adicionar após aprovação" className="about-photo" />
        <div className="about-copy">
          <p className="vertical-note">Informações institucionais aguardam confirmação</p>
          <div>
            <p className="section-kicker">Sobre a BemViva</p>
            <h2 id="about-title">Um espaço próximo para a sua rotina de cuidado</h2>
            <p>Esta área será completada pela equipe BemViva com informações verificadas sobre a farmácia, sua atuação e os canais de atendimento</p>
            <a className="about-link" href="/sobre">Sobre a BemViva <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="contact-close" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">Conte com a equipe BemViva</h2>
          <p>Endereço, horários, telefone e WhatsApp serão incluídos após confirmação oficial</p>
        </div>
        <a className="contact-band-link" href="/atendimento">
          <span>Falar com a equipe</span>
          <span aria-hidden="true">↗</span>
        </a>
      </section>
    </div>
  );
}
