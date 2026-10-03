/**
 * Fotos: originais do cliente (midia/Nova pasta) e posts do Instagram
 * (midia/instagram) -> src/assets/fotos, com nome de cena. Posts com texto
 * gravado em cima são recortados antes do texto. Posts marcados como
 * "imagem ilustrativa" (banco de imagens) ficam de fora. O alt mora no catálogo
 * (src/content/portfolio.ts).
 *
 *   npm run fotos
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const DESTINO = path.join(RAIZ, "src", "assets", "fotos");
const N = (id) => `midia/Nova pasta/marcenariasantossiqueira_${id}_40325879896.jpg`;
const IG = (k) => `midia/instagram/ig${k}.jpg`;

/** origem -> [destino, recorte em fração {topo, altura}] */
const CURADORIA = [
  [N("1765374940_3784561763191508264"), "cozinha-madeira-ilha"],
  [N("1769442279_3818680962822051610"), "sala-painel-tv-aparador"],
  [N("1781730476_3921761809970877702"), "cozinha-preta-geladeira"],
  [N("1781730476_3921761810893722214"), "cozinha-ilha-redonda"],
  [N("1782162626_3925386888108236475"), "cozinha-compacta-cooktop"],
  [N("1785964171_3957276632165309840"), "quarto-cabeceira-ripada"],
  /* 1788556407: post com texto "Altura ideal" por cima, fica de fora. */
  [N("1789418300_3986251979590167571"), "obra-antes-da-instalacao"],
  [N("1789418300_3986251980395495608"), "bancada-branca-tampo-pedra"],
  [N("1790629724_3996414052827434480"), "hall-painel-ripado"],
  [N("1790976100_3999319661344263011"), "penteadeira-espelho-led"],
  [IG("56_0"), "ilha-preta-tampo-madeira"],
  [IG("22_0"), "armario-preto-almofadado"],
  [IG("27_0"), "gaveteiro-azul"],
  [IG("35_0"), "roupeiro-cantos-arredondados", { topo: 0, altura: 0.9 }],
  [IG("43_0"), "roupeiro-portas-palhinha"],
  [IG("50_0"), "painel-tv-iluminado"],
  [IG("42_1"), "aparador-ripado-palhinha"],
  [IG("42_2"), "aparador-palhinha-detalhe"],
  [IG("40_0"), "estante-colecao"],
  [IG("51_0"), "porta-e-painel-ripado", { topo: 0, altura: 0.66 }],
  [IG("38_0"), "home-office-gaveteiro"],
  [IG("15_0"), "oficina-montagem"],
  [IG("14_0"), "oficina-marceneiro"],
  [IG("58_0"), "oficina-tupia"],
  [IG("04_0"), "oficina-chapas"],
];

await mkdir(DESTINO, { recursive: true });
for (const [origem, nome, recorte] of CURADORIA) {
  let img = sharp(path.join(RAIZ, origem)).rotate();
  if (recorte) {
    const buf = await img.toBuffer();
    const { width, height } = await sharp(buf).metadata();
    img = sharp(buf).extract({ left: 0, top: Math.round(height * recorte.topo), width, height: Math.round(height * recorte.altura) });
  }
  const { size } = await img
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .sharpen({ sigma: 0.8, m1: 0.35, m2: 0.9 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(DESTINO, `${nome}.jpg`));
  console.log(`${nome.padEnd(32)} ${(size / 1024).toFixed(0)}KB`);
}
