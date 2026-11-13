import { storeInfo, pageMeta } from "./data";
import { DemoContactForm, Notice, PageHeading, PhotoSlot } from "./Shared";

function StoreData() {
  const rows: Array<[string, string]> = [
    ["Endereço", storeInfo.address],
    ["Horários", storeInfo.hours],
    ["Telefone", storeInfo.phone],
    ["WhatsApp", storeInfo.whatsappNumber],
    ["Razão social", storeInfo.legalName],
    ["CNPJ", storeInfo.cnpj],
    ["Responsável técnico", storeInfo.responsibleProfessional],
    ["Registro profissional", storeInfo.professionalRegistration],
  ];
  return (
    <div className="store-data">
      {rows.map(([label, value]) => (
        <div className="store-data-row" key={label}>
          <span>{label}</span>
          <strong>{value || "A informar pela BemViva"}</strong>
        </div>
      ))}
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="page-wrap institutional-page">
      <PageHeading
        eyebrow="Sobre a BemViva"
        title="Um espaço para conhecer a farmácia"
        description="Esta área está pronta para receber informações institucionais verificadas pela equipe BemViva"
      />
      <div className="institutional-feature">
        <PhotoSlot label="Foto oficial da farmácia a adicionar" className="institutional-photo" />
        <div>
          <p className="section-kicker">Identidade e atuação</p>
          <h2>Informação próxima, apresentada com clareza</h2>
          <p>O texto sobre a história, a equipe e a atuação da BemViva será incluído depois de confirmado pela farmácia</p>
          <p>Esta versão não informa tempo de mercado, quantidade de clientes, prêmios ou serviços que não foram confirmados</p>
          <a className="editorial-link" href="/atendimento">Falar com a equipe <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <section className="institutional-details">
        <h2>Dados da loja</h2>
        <StoreData />
      </section>
    </div>
  );
}

export function ServicesPage() {
  return (
    <div className="page-wrap institutional-page">
      <PageHeading
        eyebrow="Atendimento e serviços"
        title="Serviços da BemViva"
        description="A estrutura está preparada para apresentar somente os serviços confirmados pela farmácia"
      />
      <div className="services-intro">
        <div>
          <h2>O que está disponível</h2>
          <p>Nenhum procedimento presencial foi informado para esta demonstração. A equipe poderá preencher este espaço com os serviços efetivamente oferecidos</p>
        </div>
        <PhotoSlot label="Foto de atendimento farmacêutico a adicionar" className="services-photo" />
      </div>
      <section className="service-route-list" aria-label="Caminhos de atendimento">
        <a href="/produtos"><span>Explorar categorias</span><span>Higiene, autocuidado e outros itens demonstrativos</span><b aria-hidden="true">↗</b></a>
        <a href="/atendimento"><span>Falar com a equipe</span><span>Canal de contato demonstrativo, sem envio de mensagem</span><b aria-hidden="true">↗</b></a>
        <a href="/entrega-e-retirada"><span>Entrega e retirada</span><span>Região e condições aguardam confirmação</span><b aria-hidden="true">↗</b></a>
      </section>
      <Notice title="Informações sujeitas à confirmação">
        Vacinação, testes, aplicação de medicamentos e outros procedimentos não estão anunciados nesta versão
      </Notice>
      <section className="institutional-details">
        <h2>Informações da unidade</h2>
        <StoreData />
      </section>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="page-wrap contact-page">
      <PageHeading
        eyebrow="Atendimento"
        title="Fale com a equipe BemViva"
        description="O telefone, WhatsApp, endereço e horário da farmácia serão exibidos depois de confirmação oficial"
      />
      <div className="contact-layout">
        <div className="contact-guidance">
          <h2>Um canal próximo e responsável</h2>
          <p>Não inclua informações de saúde, receitas ou documentos neste formulário de demonstração</p>
          <div className="contact-status">
            <span>Telefone</span><strong>A informar</strong>
            <span>WhatsApp</span><strong>A informar</strong>
            <span>Atendimento</span><strong>Horário a confirmar</strong>
          </div>
          <a className="contact-route" href="/servicos">Ver serviços da BemViva <span aria-hidden="true">↗</span></a>
        </div>
        <DemoContactForm />
      </div>
    </div>
  );
}

export function DeliveryPage() {
  return (
    <div className="page-wrap policy-page">
      <PageHeading
        eyebrow="Entrega e retirada"
        title="Consulte as condições da sua região"
        description="As informações abaixo aguardam configuração operacional pela BemViva"
      />
      <div className="policy-grid">
        <section>
          <h2>Região atendida</h2>
          <p>{storeInfo.region || "A região de entrega ainda não foi informada"}</p>
        </section>
        <section>
          <h2>Prazos e valores</h2>
          <p>Prazo, taxa e disponibilidade de entrega não estão conectados nesta demonstração</p>
        </section>
        <section>
          <h2>Retirada</h2>
          <p>Endereço e horários de retirada serão exibidos após confirmação pela farmácia</p>
        </section>
      </div>
      <Notice title="Nenhum cálculo de entrega é feito nesta versão">
        O atendimento poderá confirmar região, prazo e modalidade quando os dados oficiais e a integração estiverem disponíveis
      </Notice>
      <a className="hero-secondary" href="/atendimento">Falar com a equipe</a>
    </div>
  );
}

export function ReturnsPage() {
  return (
    <div className="page-wrap policy-page">
      <PageHeading
        eyebrow="Trocas e devoluções"
        title="Política em revisão"
        description="Esta página apresenta a estrutura inicial e não substitui a política operacional ou a revisão jurídica"
      />
      <div className="policy-copy">
        <section>
          <h2>Antes de publicar</h2>
          <p>A BemViva precisa confirmar prazos, condições de embalagem, tratamento de itens sujeitos a controle, canal de solicitação e responsabilidades de cada etapa</p>
        </section>
        <section>
          <h2>Produtos sujeitos a regras específicas</h2>
          <p>As condições aplicáveis a medicamentos e demais itens regulados devem ser revisadas pela equipe responsável antes de habilitar vendas ou trocas no site</p>
        </section>
        <section>
          <h2>Como falar com a equipe</h2>
          <p>Os canais oficiais ainda não foram informados para esta versão demonstrativa</p>
          <a className="editorial-link" href="/atendimento">Abrir atendimento demonstrativo <span aria-hidden="true">↗</span></a>
        </section>
      </div>
      <p className="review-note">Conteúdo demonstrativo sujeito à revisão jurídica e operacional antes de qualquer publicação comercial</p>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="page-wrap policy-page">
      <PageHeading
        eyebrow="Privacidade"
        title="Como esta demonstração usa dados"
        description="Esta página descreve o comportamento desta versão e precisa ser revisada antes da operação comercial"
      />
      <div className="policy-copy">
        <section>
          <h2>Formulários</h2>
          <p>Os formulários servem para demonstrar a interface. As mensagens não são enviadas nem armazenadas. Não informe dados reais, informações de saúde, receitas ou documentos</p>
        </section>
        <section>
          <h2>Carrinho</h2>
          <p>Os itens do carrinho demonstrativo ficam no armazenamento local deste navegador. Nome, endereço, e-mail e informações de pagamento não são guardados</p>
        </section>
        <section>
          <h2>Integrações</h2>
          <p>Não há autenticação, pagamento, envio de pedidos, rastreamento ou integração analítica conectados nesta versão</p>
        </section>
        <section>
          <h2>Dados legais e contato</h2>
          <p>Razão social, CNPJ, endereço, responsável pelo tratamento e canal de privacidade precisam ser fornecidos pela BemViva</p>
        </section>
      </div>
      <p className="review-note">Este texto inicial não é uma política jurídica final. Revise-o antes de ativar coleta ou processamento de dados</p>
    </div>
  );
}

export function CookiesPage() {
  return (
    <div className="page-wrap policy-page">
      <PageHeading
        eyebrow="Cookies e armazenamento"
        title="Preferências de navegação"
        description="Esta demonstração não conecta cookies analíticos nem de publicidade"
      />
      <div className="policy-copy">
        <section>
          <h2>Armazenamento essencial</h2>
          <p>O carrinho de demonstração e a escolha de fechar o aviso de armazenamento ficam salvos localmente neste navegador</p>
        </section>
        <section>
          <h2>Ferramentas opcionais</h2>
          <p>Não há ferramenta opcional de análise ou publicidade ativa. Se uma integração for adicionada, esta página e as escolhas de preferência devem ser atualizadas</p>
        </section>
        <section>
          <h2>Limpar dados locais</h2>
          <p>Você pode limpar os dados do site nas configurações de armazenamento do navegador. Isso também remove os itens do carrinho demonstrativo</p>
        </section>
      </div>
      <p className="review-note">As práticas definitivas devem ser confirmadas pela BemViva e revisadas antes da publicação comercial</p>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="page-wrap policy-page">
      <PageHeading
        eyebrow="Termos de uso"
        title="Condições demonstrativas"
        description="Esta experiência serve para demonstrar a organização de um site de farmácia"
      />
      <div className="policy-copy">
        <section>
          <h2>Catálogo</h2>
          <p>Produtos, apresentações, marcas, valores e disponibilidade são exemplos. Não constituem oferta de venda</p>
        </section>
        <section>
          <h2>Medicamentos</h2>
          <p>Não há medicamentos à venda nesta demonstração. Produtos sujeitos a receita ou validação precisam de um fluxo seguro e revisão profissional antes de qualquer integração</p>
        </section>
        <section>
          <h2>Pedidos e pagamentos</h2>
          <p>Nenhum pedido, pagamento, entrega ou retirada é realizado por esta versão</p>
        </section>
        <section>
          <h2>Identificação da farmácia</h2>
          <p>Dados legais, endereço, responsável técnico e regras comerciais aguardam confirmação</p>
        </section>
      </div>
      <p className="review-note">Os termos finais precisam de revisão jurídica e operacional</p>
    </div>
  );
}

export function NotAvailablePage() {
  return (
    <div className="page-wrap">
      <PageHeading title="Página não encontrada" description="O endereço não corresponde a uma página desta demonstração" />
      <a className="hero-primary" href="/">Voltar ao início</a>
    </div>
  );
}

export const staticPageMeta = pageMeta;
