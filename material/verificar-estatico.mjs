/** Serve docs/ em /santossiqueira/ (como o GitHub Pages) e confere a prévia. node material/verificar-estatico.mjs */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";
const TIPOS = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".mp4": "video/mp4", ".txt": "text/plain", ".svg": "image/svg+xml" };
const srv = createServer(async (req, res) => {
  const u = decodeURIComponent(req.url.split("?")[0]);
  if (!u.startsWith("/santossiqueira")) { res.writeHead(404); return res.end(); }
  let f = path.join("docs", u.slice("/santossiqueira".length));
  try {
    if ((await stat(f)).isDirectory()) f = path.join(f, "index.html");
    const dados = await readFile(f);
    const range = req.headers.range && /bytes=(\d+)-(\d*)/.exec(req.headers.range);
    if (range) {
      const ini = +range[1], fim = range[2] ? +range[2] : dados.length - 1;
      res.writeHead(206, { "content-type": TIPOS[path.extname(f)] ?? "application/octet-stream", "content-range": `bytes ${ini}-${fim}/${dados.length}`, "accept-ranges": "bytes" });
      return res.end(dados.subarray(ini, fim + 1));
    }
    res.writeHead(200, { "content-type": TIPOS[path.extname(f)] ?? "application/octet-stream", "accept-ranges": "bytes" }); res.end(dados);
  } catch { res.writeHead(404); res.end(); }
}).listen(5249);
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--autoplay-policy=no-user-gesture-required"] });
for (const [nome, vp] of [["desktop", { width: 1366, height: 820 }], ["celular", { width: 412, height: 860, isMobile: true, hasTouch: true }]]) {
  const p = await b.newPage(); await p.setViewport(vp);
  const falhas = [], erros = [];
  p.on("response", (r) => { if (r.status() >= 400 && r.url().includes("localhost:5249")) falhas.push(`${r.status()} ${r.url()}`); });
  p.on("console", (m) => { if (m.type() === "error") erros.push(m.text()); });
  await p.goto("http://localhost:5249/santossiqueira/", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2500));
  const video = await p.$eval("#topo video", (v) => ({ arquivo: v.currentSrc.split("/").pop(), tocando: !v.paused && v.currentTime > 0, loop: v.loop, mudo: v.muted }));
  const capa = await p.$eval("#topo picture img", (i) => i.currentSrc.split("/").pop());
  for (let y = 0; y < 16000; y += 700) { await p.evaluate((v) => window.scrollTo(0, v), y); await new Promise((r) => setTimeout(r, 70)); }
  await new Promise((r) => setTimeout(r, 1200));
  const quebradas = await p.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
  const avatares = await p.$$eval("#depoimentos img", (is) => is.map((i) => i.naturalWidth));
  console.log(nome, JSON.stringify({ video, capa, falhas, quebradas, erros, avatares }));
  await p.close();
}
await b.close(); srv.close();
