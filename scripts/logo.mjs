/**
 * Logo da Santos Siqueira: o arquivo do cliente é branco com fundo
 * transparente. Daqui saem o logo completo e só o monograma "MS", em branco
 * (para fundo marrom) e em marrom #614631 (para fundo claro), e os ícones.
 *
 *   npm run logo
 */
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ORIGEM = path.join(RAIZ, "midia", "logo", "logo-original.png");
const MARCA = path.join(RAIZ, "public", "marca");
const MARROM = { r: 0x61, g: 0x46, b: 0x31 };

const completo = await sharp(ORIGEM).trim({ threshold: 1 }).toBuffer();
/* O monograma ocupa o quadrado de cima do arquivo original (linhas 164 a
   542, medidas pelo alfa). extract e trim na mesma cadeia do sharp se
   atrapalham: o recorte vira buffer antes do trim. */
const recorteMs = await sharp(ORIGEM).extract({ left: 410, top: 150, width: 410, height: 410 }).toBuffer();
const monograma = await sharp(recorteMs).trim({ threshold: 1 }).toBuffer();

/** Troca a cor mantendo o alfa: a forma vem do canal alfa do branco. */
async function pinta(buf, cor) {
  const { width, height } = await sharp(buf).metadata();
  const alfa = await sharp(buf).ensureAlpha().extractChannel(3).toBuffer();
  return sharp({ create: { width, height, channels: 3, background: cor } }).joinChannel(alfa).png().toBuffer();
}

const salva = (buf, nome, largura) => sharp(buf).resize({ width: largura }).webp({ quality: 90, alphaQuality: 95 }).toFile(path.join(MARCA, nome));

await salva(completo, "logo-branco.webp", 640);
await salva(await pinta(completo, MARROM), "logo-marrom.webp", 640);
await salva(monograma, "monograma-branco.webp", 160);
await salva(await pinta(monograma, MARROM), "monograma-marrom.webp", 160);

/* Ícone: monograma branco sobre quadrado marrom. */
const icone = async (lado, nome) => {
  const m = await sharp(monograma).resize({ width: Math.round(lado * 0.62) }).toBuffer();
  await sharp({ create: { width: lado, height: lado, channels: 4, background: { ...MARROM, alpha: 1 } } })
    .composite([{ input: m, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(RAIZ, "src", "app", nome));
};
await icone(96, "icon.png");
await icone(180, "apple-icon.png");
console.log("logo, monograma e ícones gerados");
