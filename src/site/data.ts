export type Product = {
  slug: string;
  name: string;
  category: string;
  brand: string;
  presentation: string;
  price: number | null;
  availability: "demo" | "consult";
  purchaseMode: "demo" | "consult";
  summary: string;
};

export const siteName = "BemViva Farmácia";

export const demoNotice =
  "Catálogo demonstrativo. Itens, valores e disponibilidade são ilustrativos. Nenhum pedido será enviado.";

export const storeInfo = {
  region: "",
  address: "",
  hours: "",
  phone: "",
  whatsappNumber: "",
  legalName: "",
  cnpj: "",
  responsibleProfessional: "",
  professionalRegistration: "",
};

export const categories = [
  "Medicamentos",
  "Higiene pessoal",
  "Dermocosméticos",
  "Infantil",
  "Vitaminas",
  "Cuidados diários",
];

export const demoProducts: Product[] = [
  {
    slug: "sabonete-liquido",
    name: "Sabonete líquido",
    category: "Higiene pessoal",
    brand: "Marca demonstrativa A",
    presentation: "250 ml, apresentação ilustrativa",
    price: 18.9,
    availability: "demo",
    purchaseMode: "demo",
    summary: "Item de demonstração para navegação pelo catálogo",
  },
  {
    slug: "creme-hidratante",
    name: "Creme hidratante corporal",
    category: "Cuidados diários",
    brand: "Marca demonstrativa B",
    presentation: "200 ml, apresentação ilustrativa",
    price: 32.5,
    availability: "demo",
    purchaseMode: "demo",
    summary: "Item de demonstração para navegação pelo catálogo",
  },
  {
    slug: "escova-dental",
    name: "Escova dental",
    category: "Higiene pessoal",
    brand: "Marca demonstrativa A",
    presentation: "Apresentação ilustrativa",
    price: 12.9,
    availability: "demo",
    purchaseMode: "demo",
    summary: "Item de demonstração para navegação pelo catálogo",
  },
  {
    slug: "protetor-solar",
    name: "Protetor solar facial",
    category: "Dermocosméticos",
    brand: "Marca demonstrativa B",
    presentation: "Apresentação ilustrativa",
    price: 48.9,
    availability: "demo",
    purchaseMode: "demo",
    summary: "Item de demonstração para navegação pelo catálogo",
  },
  {
    slug: "shampoo-infantil",
    name: "Shampoo infantil",
    category: "Infantil",
    brand: "Marca demonstrativa A",
    presentation: "Apresentação ilustrativa",
    price: 24.9,
    availability: "demo",
    purchaseMode: "demo",
    summary: "Item de demonstração para navegação pelo catálogo",
  },
  {
    slug: "vitaminas",
    name: "Vitaminas e suplementos",
    category: "Vitaminas",
    brand: "Marca demonstrativa B",
    presentation: "Consulte a equipe",
    price: null,
    availability: "consult",
    purchaseMode: "consult",
    summary: "Exemplos sujeitos à confirmação da equipe e às regras aplicáveis",
  },
];

export const articles = [
  {
    title: "Proteção solar no dia a dia",
    body: "A escolha do produto deve considerar as instruções do rótulo. O Ministério da Saúde também orienta evitar exposição prolongada nos períodos de maior intensidade solar.",
    sourceLabel: "Ministério da Saúde",
    sourceUrl:
      "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/i/insolacao",
  },
  {
    title: "Organizar os cuidados",
    body: "Mantenha os produtos identificados e confira as orientações de uso e conservação de cada embalagem. Para dúvidas sobre medicamentos, converse com um profissional de saúde.",
    sourceLabel: "Anvisa",
    sourceUrl:
      "https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/bulas-e-rotulos/perguntas-e-respostas-sobre-bulas",
  },
  {
    title: "Uso responsável de medicamentos",
    body: "Medicamentos devem ser usados conforme a prescrição, a bula e a orientação do profissional responsável. Não altere o tratamento por conta própria.",
    sourceLabel: "Ministério da Saúde",
    sourceUrl:
      "https://www.gov.br/saude/pt-br/composicao/sectics/daf/uso-racional-de-medicamentos",
  },
];

export const pageMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: "BemViva Farmácia | Seu cuidado de todos os dias",
    description:
      "Conheça o catálogo demonstrativo da BemViva Farmácia, encontre produtos de autocuidado e veja como falar com a equipe",
  },
  products: {
    title: "Produtos | BemViva Farmácia",
    description:
      "Explore categorias e itens demonstrativos da BemViva Farmácia. Valores e disponibilidade ainda não são reais",
  },
  services: {
    title: "Serviços | BemViva Farmácia",
    description:
      "Consulte os espaços de informação sobre os serviços oferecidos pela BemViva Farmácia",
  },
  contact: {
    title: "Atendimento | BemViva Farmácia",
    description:
      "Veja como o canal de atendimento da BemViva poderá funcionar quando os dados oficiais forem configurados",
  },
  about: {
    title: "Sobre a BemViva | BemViva Farmácia",
    description:
      "Informações institucionais da BemViva Farmácia aguardam confirmação da equipe",
  },
  delivery: {
    title: "Entrega e retirada | BemViva Farmácia",
    description:
      "Informações de região, prazo e retirada serão configuradas pela BemViva antes de ativar pedidos",
  },
  returns: {
    title: "Trocas e devoluções | BemViva Farmácia",
    description:
      "Conteúdo inicial de trocas e devoluções sujeito à revisão operacional e jurídica",
  },
  privacy: {
    title: "Privacidade | BemViva Farmácia",
    description:
      "Informações sobre o uso de dados nesta experiência demonstrativa da BemViva Farmácia",
  },
  cookies: {
    title: "Cookies | BemViva Farmácia",
    description:
      "Conheça o armazenamento local utilizado nesta experiência demonstrativa",
  },
  terms: {
    title: "Termos de uso | BemViva Farmácia",
    description:
      "Condições de uso demonstrativas, sujeitas à revisão jurídica e operacional",
  },
  cart: {
    title: "Carrinho demonstrativo | BemViva Farmácia",
    description:
      "Revise os itens ilustrativos selecionados no carrinho demonstrativo",
  },
  checkout: {
    title: "Finalização demonstrativa | BemViva Farmácia",
    description:
      "Confira como será a etapa de finalização. Nenhum pagamento ou pedido será enviado",
  },
};
