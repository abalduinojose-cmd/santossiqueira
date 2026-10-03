/**
 * Fonte única dos dados do negócio. Header, rodapé, contato, JSON-LD e todo
 * link de WhatsApp importam daqui. Endereço, coordenadas, horário e nota
 * vêm do Perfil da Empresa no Google (conferidos em 03/10/2026): o NAP tem
 * de bater com o perfil caractere por caractere.
 *
 * Marcadores [[assim]] são pendências do cliente (ver PENDENCIAS.md); o
 * semMarcador os tira de tudo que é exibido.
 */
export const site = {
  nome: "Santos Siqueira Marcenaria",
  nomeCurto: "Santos Siqueira",
  nomeGoogle: "Marcenaria Santos Siqueira",
  anos: 45, // [[CONFIRMAR 45 ANOS]]: aparece em vários pontos da página
  fundacao: "1981", // [[CONFIRMAR]] derivado dos 45 anos
  h1: "Móveis sob medida que transformam o seu espaço",
  tagline: "Há 45 anos, transformando projetos em móveis que inspiram confiança.",
  descricao: "Marcenaria sob medida para residências e empresas.",
  whatsapp: "+5524992640736",
  whatsappDisplay: "(24) 99264-0736",
  instagram: "https://www.instagram.com/marcenariasantossiqueira/",
  instagramArroba: "@marcenariasantossiqueira",
  facebook: "https://www.facebook.com/ssiqueira/",
  google: "https://share.google/EH1Qi5oegBihU1OTx",
  endereco: {
    rua: "Av. Getúlio Vargas, 2311A",
    complemento: "Ponto final",
    bairro: "Quitandinha",
    cidade: "Petrópolis",
    uf: "RJ",
    cep: "25600-000",
  },
  geo: { lat: -22.523198, lng: -43.2077617 },
  placeId: "ChIJG-37UOAJmQARIUntLg0sPMQ",
  horario: {
    semana: "Segunda a quinta, 8h às 18h",
    sexta: "Sexta, 8h às 16h",
    fds: "Sábado e domingo fechado",
  },
  avaliacoes: { nota: 4.7, total: 15 },
  cnpj: "[[CNPJ]]",
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.santossiqueira.com.br"; // [[DOMÍNIO DEFINITIVO]]

export const NOTA = site.avaliacoes.nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 });
export const PROVA_GOOGLE = `${NOTA} no Google · ${site.avaliacoes.total} avaliações`;
export const ENDERECO_LINHA = `${site.endereco.rua}, ${site.endereco.complemento}, ${site.endereco.bairro}, ${site.endereco.cidade}, ${site.endereco.uf}`;
export const PERFIL_GOOGLE = `https://www.google.com/maps/place/?q=place_id:${site.placeId}`;
export const ROTA = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}&destination_place_id=${site.placeId}`;

/** Mensagens pré-preenchidas por origem: qualificam o lead antes da resposta. */
export const MENSAGENS = {
  hero: "Olá! Vim pelo site e quero desenvolver meu projeto sob medida.",
  portfolio: "Olá! Vi os projetos no site e gostaria de um orçamento.",
  contato: "Olá! Gostaria de agendar uma conversa.",
  parceiros: "Olá! Sou arquiteto(a)/corretor(a) e quero conversar sobre parceria.",
  servico: (ambiente: string) => `Olá! Tenho interesse em ${ambiente.toLowerCase()}.`,
} as const;

export const NAV = [
  { href: "#servicos", rotulo: "Serviços" },
  { href: "#portfolio", rotulo: "Projetos" },
  { href: "#processo", rotulo: "Processo" },
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#contato", rotulo: "Contato" },
] as const;

export const HERO = {
  /* Selo do topo: lugar e tempo de oficina, em duas partes. */
  /* Selo do topo: a marca de tempo num botão claro e o lugar ao lado. */
  selo: { tempo: `${site.anos} anos`, lugar: "Marcenaria em Petrópolis" },
  /* O H1 é o site.h1 com este trecho marcado pela régua. */
  destaque: "sob medida",
  subtitulo: "Do projeto 3D à instalação, móveis pensados para o seu espaço e feitos na nossa oficina, com garantia.",
  ctaPrincipal: "Agende uma conversa",
  ctaSecundario: "Ver projetos",
} as const;

/** Faixa de números logo abaixo do hero: só fatos verificáveis. */
export const NUMEROS = {
  itens: [
    { valor: String(site.anos), rotulo: "anos de oficina" },
    { valor: NOTA, rotulo: "nota no Google" },
    { valor: String(site.avaliacoes.total), rotulo: "avaliações no Google" },
    { valor: "3D", rotulo: "projeto antes do corte" },
  ],
  legenda: "Escala 1:1 · medidas tiradas no local",
} as const;

/** Frase sobre a foto inteira do painel ripado. */
export const FRASE = {
  frase: `Em ${site.anos} anos, o que mudou foi a ferramenta.`,
  apoio: "O cuidado com a medida continua o mesmo.",
  fatos: [
    { valor: "Visita", rotulo: "e medição no local" },
    { valor: "Chapa", rotulo: "certa para cada uso" },
    { valor: "Equipe", rotulo: "própria na instalação" },
  ],
} as const;

export const VIDEOS = {
  titulo: "Da oficina para a sua casa.",
  texto: "Vídeos do nosso Instagram: a oficina onde tudo é feito, o móvel por dentro e a escolha dos acabamentos.",
  instagramTitulo: "Acompanhe as obras no Instagram",
  instagramTexto: "Projetos entregues, bastidores da oficina e combinações de acabamento.",
  instagramCta: "Seguir no Instagram",
} as const;

export const CHAMADA_FINAL = {
  titulo: "O seu espaço, desenhado sob medida.",
  cta: "Agende uma conversa",
  apoio: `Ou ligue: ${site.whatsappDisplay}`,
} as const;


/** §6.3: copy literal do cliente. Não reescrever. */
export const VALOR = {
  paragrafos: [
    "Quem já visitou um imóvel para comprar ou alugar sabe o quanto a marcenaria influencia na percepção do espaço.",
    "Um ambiente com projeto bem executado parece maior, mais organizado e mais cuidado. E isso tem impacto direto no valor percebido do imóvel, seja na hora de vender, alugar ou simplesmente receber alguém em casa.",
  ],
  destaque: `Há ${site.anos} anos transformando projetos em móveis que inspiram confiança.`,
  cta: "Agende uma conversa e desenvolva o seu projeto sob medida",
} as const;

export const TRUST = [
  { rotulo: `${site.anos} anos de mercado`, icone: "anos" },
  { rotulo: `${NOTA} no Google`, icone: "estrela" },
  { rotulo: "Projeto 3D antes da execução", icone: "projeto" },
  { rotulo: "Garantia em todos os produtos", icone: "garantia" },
] as const;

export const PROCESSO = {
  titulo: "Do primeiro metro medido à última dobradiça.",
  texto: "Quem nunca contratou marcenaria quer saber o que acontece depois do primeiro contato. São quatro etapas, e você acompanha todas.",
  etapas: [
    { titulo: "Visita e medição", texto: "Vamos até o local, entendemos o uso e medimos tudo." },
    { titulo: "Projeto 3D e aprovação", texto: "Você vê o móvel antes de existir e aprova cada detalhe." },
    { titulo: "Fabricação na oficina", texto: "Produção própria, com acompanhamento do prazo." },
    { titulo: "Instalação e garantia", texto: "Montagem feita pela nossa equipe, com garantia." },
  ],
  cta: "Começar pela visita",
} as const;

export const SOBRE = {
  titulo: "Quatro décadas e meia de oficina.",
  /* [[CONFIRMAR: Nilton e Diego aparecem citados em avaliação do Google. Se
     forem os responsáveis, nomeá-los aqui aumenta a confiança.]] */
  paragrafos: [
    "A Santos Siqueira é uma marcenaria de oficina própria, no Quitandinha, em Petrópolis. Cada móvel é desenhado para o espaço, cortado, montado e instalado pela nossa equipe.",
    "O que muda em 45 anos é a ferramenta. O que não muda é o cuidado com a medida, com a chapa certa para cada uso e com o acabamento que ninguém vê, mas que faz o móvel durar.",
  ],
  compromissos: ["Projeto aprovado antes do primeiro corte", "Prazo combinado e acompanhado", "Garantia em todos os produtos"],
  videosTitulo: "Da oficina",
  videos: [
    { id: "tudo-comeca-na-oficina", titulo: "Tudo começa aqui", legenda: "A oficina onde os móveis são feitos" },
    { id: "o-movel-por-dentro", titulo: "O móvel por dentro", legenda: "Estrutura, chapa e acabamento explicados" },
    { id: "escolha-dos-acabamentos", titulo: "Escolha dos acabamentos", legenda: "Combinações de MDF para o projeto" },
  ],
} as const;

/* [[CONFIRMAR SE ENTRA]] seção 6.10 */
export const PARCEIROS = {
  titulo: "Para arquitetos, designers e imobiliárias.",
  publicos: [
    { titulo: "Arquitetos e designers", texto: "Execução que respeita o projeto, o detalhamento e o prazo da obra. Você desenha, a oficina entrega como foi desenhado." },
    { titulo: "Corretores e imobiliárias", texto: "Marcenaria bem executada faz o imóvel parecer maior e mais cuidado, e isso pesa na hora de vender ou alugar." },
  ],
  cta: "Conversar sobre parceria",
} as const;

export const CONTATO = {
  titulo: "Vamos conversar sobre o seu projeto.",
  texto: "Conte o ambiente e a gente retorna para combinar a visita.",
  atalho: "Prefere WhatsApp? Chame agora",
  enviar: "Solicitar orçamento",
  sucessoTitulo: "Pedido recebido.",
  sucessoTexto: `Vamos retornar pelo WhatsApp que você informou. Se preferir, chame agora no ${site.whatsappDisplay}.`,
  comoChegar: "Como chegar",
} as const;

export const PORTFOLIO_TEXTO = {
  titulo: "Feitos na nossa oficina.",
  texto: "Projetos entregues em casas e empresas de Petrópolis. Toque em uma foto para ver maior.",
  cta: "Quero algo assim no meu espaço",
} as const;

export const DEPOIMENTOS_TEXTO = {
  titulo: "O que dizem de quem já contratou.",
  link: "Ver todas as avaliações no Google",
  resumo: "Ver avaliações no Google",
  vazio: "As avaliações do Google aparecem aqui assim que forem selecionadas.",
} as const;
