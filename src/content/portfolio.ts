/**
 * Portfólio: fotos de projetos entregues (pasta enviada pelo cliente e posts
 * do @marcenariasantossiqueira), processadas por `npm run fotos`. Posts com
 * "imagem ilustrativa" ficaram de fora. A ordem define o mosaico; as três
 * primeiras carregam sem lazy. [[LEGENDAS: confirmar materiais com o cliente]]
 */
import type { StaticImageData } from "next/image";

import aparadorPalhinhaDetalhe from "@/assets/fotos/aparador-palhinha-detalhe.jpg";
import aparadorRipadoPalhinha from "@/assets/fotos/aparador-ripado-palhinha.jpg";
import armarioPretoAlmofadado from "@/assets/fotos/armario-preto-almofadado.jpg";
import bancadaBrancaTampoPedra from "@/assets/fotos/bancada-branca-tampo-pedra.jpg";
import cozinhaCompactaCooktop from "@/assets/fotos/cozinha-compacta-cooktop.jpg";
import cozinhaIlhaRedonda from "@/assets/fotos/cozinha-ilha-redonda.jpg";
import cozinhaMadeiraIlha from "@/assets/fotos/cozinha-madeira-ilha.jpg";
import cozinhaPretaGeladeira from "@/assets/fotos/cozinha-preta-geladeira.jpg";
import estanteColecao from "@/assets/fotos/estante-colecao.jpg";
import gaveteiroAzul from "@/assets/fotos/gaveteiro-azul.jpg";
import hallPainelRipado from "@/assets/fotos/hall-painel-ripado.jpg";
import homeOfficeGaveteiro from "@/assets/fotos/home-office-gaveteiro.jpg";
import ilhaPretaTampoMadeira from "@/assets/fotos/ilha-preta-tampo-madeira.jpg";
import painelTvIluminado from "@/assets/fotos/painel-tv-iluminado.jpg";
import penteadeiraEspelhoLed from "@/assets/fotos/penteadeira-espelho-led.jpg";
import portaEPainelRipado from "@/assets/fotos/porta-e-painel-ripado.jpg";
import quartoCabeceiraRipada from "@/assets/fotos/quarto-cabeceira-ripada.jpg";
import roupeiroCantosArredondados from "@/assets/fotos/roupeiro-cantos-arredondados.jpg";
import roupeiroPortasPalhinha from "@/assets/fotos/roupeiro-portas-palhinha.jpg";
import salaPainelTvAparador from "@/assets/fotos/sala-painel-tv-aparador.jpg";

export const categorias = ["Cozinhas", "Dormitórios e closets", "Salas", "Home office"] as const;
export type Categoria = (typeof categorias)[number];

export type Projeto = { src: StaticImageData; alt: string; categoria: Categoria; ambiente: string };

export const projetos: Projeto[] = [
  { src: cozinhaMadeiraIlha, categoria: "Cozinhas", ambiente: "Cozinha com ilha", alt: "Cozinha planejada em MDF amadeirado com ilha de tampo em madeira, coifa de inox e torre de micro-ondas" },
  { src: quartoCabeceiraRipada, categoria: "Dormitórios e closets", ambiente: "Dormitório", alt: "Dormitório com painel ripado amadeirado do piso ao teto, cabeceira estofada e iluminação embutida" },
  { src: cozinhaIlhaRedonda, categoria: "Cozinhas", ambiente: "Cozinha com ilha", alt: "Ilha de ponta arredondada com base ripada preta e tampo em madeira clara, junto a armários pretos" },
  { src: painelTvIluminado, categoria: "Salas", ambiente: "Sala de TV", alt: "Painel de TV em MDF amadeirado com recorte iluminado em LED e rack suspenso branco" },
  { src: roupeiroCantosArredondados, categoria: "Dormitórios e closets", ambiente: "Roupeiro", alt: "Roupeiro branco de cantos arredondados com puxador cava em madeira" },
  { src: cozinhaPretaGeladeira, categoria: "Cozinhas", ambiente: "Cozinha", alt: "Cozinha com armários pretos de porta almofadada, bancada em madeira e nicho de prateleiras" },
  { src: salaPainelTvAparador, categoria: "Salas", ambiente: "Sala integrada", alt: "Painel de TV com moldura em madeira e aparador baixo ao lado da área de jantar" },
  { src: aparadorRipadoPalhinha, categoria: "Salas", ambiente: "Aparador", alt: "Aparador de portas em palhinha com painel ripado e prateleiras em madeira para porta-retratos" },
  { src: penteadeiraEspelhoLed, categoria: "Dormitórios e closets", ambiente: "Penteadeira", alt: "Penteadeira suspensa com espelho iluminado por LED e painel ripado amadeirado" },
  { src: ilhaPretaTampoMadeira, categoria: "Cozinhas", ambiente: "Ilha", alt: "Ilha preta de gavetões com tampo arredondado em madeira e cooktop embutido" },
  { src: hallPainelRipado, categoria: "Salas", ambiente: "Hall", alt: "Hall com painel ripado amadeirado, porta oculta no mesmo acabamento e banco branco" },
  { src: homeOfficeGaveteiro, categoria: "Home office", ambiente: "Home office", alt: "Bancada de home office em madeira clara com gaveteiro branco e painel ripado cinza" },
  { src: roupeiroPortasPalhinha, categoria: "Dormitórios e closets", ambiente: "Roupeiro", alt: "Detalhe de roupeiro com portas em palhinha e puxadores redondos" },
  { src: armarioPretoAlmofadado, categoria: "Cozinhas", ambiente: "Cozinha", alt: "Armários de cozinha pretos com portas almofadadas e puxadores em barra" },
  { src: estanteColecao, categoria: "Salas", ambiente: "Estante", alt: "Estante sob medida com prateleiras cinza e laterais amadeiradas para coleção de bonecos" },
  { src: gaveteiroAzul, categoria: "Cozinhas", ambiente: "Bancada", alt: "Gaveteiro azul de puxador cava com bancada em madeira" },
  { src: bancadaBrancaTampoPedra, categoria: "Cozinhas", ambiente: "Bancada", alt: "Bancada de armários brancos com puxadores em couro e tampo de pedra" },
  { src: portaEPainelRipado, categoria: "Salas", ambiente: "Painel", alt: "Porta de correr amadeirada ao lado de painel ripado com arandela" },
  { src: aparadorPalhinhaDetalhe, categoria: "Salas", ambiente: "Aparador", alt: "Detalhe de aparador arredondado com porta em palhinha e pés de madeira" },
  { src: cozinhaCompactaCooktop, categoria: "Cozinhas", ambiente: "Cozinha compacta", alt: "Cozinha compacta com bancada de forno embutido e banco em madeira, logo após a instalação" },
];
