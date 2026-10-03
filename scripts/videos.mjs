/**
 * Vídeos da oficina (Instagram): videos/ (originais) -> public/videos em
 * H.264 720p com áudio e faststart, mais a capa em src/assets/videos. No
 * site entram com <video controls preload="none">: nada baixa até o play e
 * não há JavaScript nenhum. A capa (poster) baixa sempre, mesmo fora da
 * tela, então sai em 540px e ~30 KB para não disputar banda com o hero.
 *
 *   npm run videos
 */
import { spawnSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const SAIDA = path.join(RAIZ, "public", "videos");
const CAPAS = path.join(RAIZ, "src", "assets", "videos");
const V = (id) => `marcenariasantossiqueira_${id}_40325879896.mp4`;

/** origem -> nome, segundo da capa */
const VIDEOS = [
  [V("1788902149_3981921487009062507"), "tudo-comeca-na-oficina", 1],
  [V("1787087479_3966699396047508495"), "o-movel-por-dentro", 2],
  [V("1779230077_3900786631567335154"), "escolha-dos-acabamentos", 12],
];

const roda = (args, captura = false) => {
  const r = spawnSync(ffmpeg, ["-v", "error", "-y", ...args], { stdio: ["ignore", captura ? "pipe" : "inherit", "inherit"], maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`ffmpeg falhou: ${args.join(" ")}`);
  return r.stdout;
};

await mkdir(SAIDA, { recursive: true });
await mkdir(CAPAS, { recursive: true });
for (const [origem, nome, capa] of VIDEOS) {
  const entrada = path.join(RAIZ, "videos", origem);
  const saida = path.join(SAIDA, `${nome}.mp4`);
  roda(["-i", entrada, "-vf", "scale=720:-2", "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", saida]);
  const quadro = roda(["-ss", String(capa), "-i", entrada, "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "-"], true);
  await sharp(quadro).resize({ width: 540 }).jpeg({ quality: 66, mozjpeg: true }).toFile(path.join(CAPAS, `${nome}.jpg`));
  console.log(`${nome.padEnd(26)} ${((await stat(saida)).size / 1048576).toFixed(1)} MB`);
}

/* Hero: dois vídeos de IA enviados pelo cliente, um por tela. O vertical
   (celular) sai por cópia do fluxo, sem reencodar: qualidade original. O
   horizontal (desktop) começa com 1,4 s de tarja preta, então perde 1,5 s
   e é reencodado em CRF 16 (quase sem perda). Os dois sem áudio, com a
   capa = 1º quadro em src/assets/fotos. */
const FOTOS = path.join(RAIZ, "src", "assets", "fotos");
const celular = path.join(RAIZ, "videos", "hero-original.mp4");
const desktop = path.join(RAIZ, "videos", "hero-desktop-original.mp4");
roda(["-i", celular, "-c:v", "copy", "-an", "-movflags", "+faststart", path.join(SAIDA, "hero-celular.mp4")]);
roda(["-i", celular, "-frames:v", "1", "-q:v", "1", path.join(FOTOS, "hero-video-celular.jpg")]);
roda(["-ss", "1.5", "-i", desktop, "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", path.join(SAIDA, "hero-desktop.mp4")]);
roda(["-ss", "1.5", "-i", desktop, "-frames:v", "1", "-q:v", "1", path.join(FOTOS, "hero-video-desktop.jpg")]);
console.log("hero-celular e hero-desktop gerados");
