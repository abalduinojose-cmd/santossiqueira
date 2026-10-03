/**
 * Ambientes atendidos. [[CONFIRMAR LISTA REAL]]: base sugerida no briefing.
 * Cada card tem o próprio link de WhatsApp com o ambiente na mensagem.
 * Foto só quando existe um projeto real daquele ambiente; sem foto o card
 * vira prancha desenhada (banheiro e corporativo, por enquanto).
 */
import type { StaticImageData } from "next/image";

import cozinha from "@/assets/fotos/cozinha-ilha-redonda.jpg";
import especial from "@/assets/fotos/estante-colecao.jpg";
import office from "@/assets/fotos/home-office-gaveteiro.jpg";
import gourmet from "@/assets/fotos/ilha-preta-tampo-madeira.jpg";
import dormitorio from "@/assets/fotos/roupeiro-portas-palhinha.jpg";
import sala from "@/assets/fotos/sala-painel-tv-aparador.jpg";

export type IconeServico = "cozinha" | "dormitorio" | "office" | "sala" | "banheiro" | "gourmet" | "corporativo" | "especial";

export type Servico = { slug: string; titulo: string; texto: string; icone: IconeServico; foto?: { src: StaticImageData; alt: string } };

export const servicos: Servico[] = [
  { slug: "cozinha", titulo: "Cozinha planejada", texto: "Armários, ilha e torre quente desenhados para a sua rotina.", icone: "cozinha", foto: { src: cozinha, alt: "Ilha de ponta arredondada com base ripada preta e tampo em madeira clara, junto a armários pretos" } },
  { slug: "dormitorio", titulo: "Dormitório e closet", texto: "Roupeiros, cabeceiras e closets que aproveitam cada centímetro.", icone: "dormitorio", foto: { src: dormitorio, alt: "Roupeiro branco com portas em palhinha e puxadores redondos" } },
  { slug: "office", titulo: "Home office", texto: "Bancada, gaveteiro e prateleiras na altura certa para trabalhar.", icone: "office", foto: { src: office, alt: "Home office com bancada suspensa em madeira e gaveteiro branco" } },
  { slug: "sala", titulo: "Sala e painel de TV", texto: "Painéis, racks e aparadores com fiação escondida.", icone: "sala", foto: { src: sala, alt: "Sala com painel de TV, aparador e nichos em madeira clara" } },
  { slug: "banheiro", titulo: "Banheiro", texto: "Gabinetes e penteadeiras com material próprio para umidade.", icone: "banheiro" },
  { slug: "gourmet", titulo: "Área gourmet", texto: "Bancadas e armários para receber, dentro e fora de casa.", icone: "gourmet", foto: { src: gourmet, alt: "Ilha preta de gavetões com tampo arredondado em madeira e cooktop embutido" } },
  { slug: "corporativo", titulo: "Móveis corporativos", texto: "Escritórios, lojas e consultórios feitos para o uso diário.", icone: "corporativo" },
  { slug: "especial", titulo: "Projetos especiais", texto: "Peças sob medida que não existem em catálogo.", icone: "especial", foto: { src: especial, alt: "Estante sob medida para coleção, com nichos azuis e madeira" } },
];

export const AMBIENTES_FORM: [string, ...string[]] = [servicos[0].titulo, ...servicos.slice(1).map((s) => s.titulo), "Outro"];
