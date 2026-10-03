/** Testes do layout no ritmo do Cabana: trilho, WhatsApp flutuante, réguas e âncoras. URL=... node material/testes-layout.mjs */
import puppeteer from "puppeteer-core";
const URL = process.env.URL ?? "http://localhost:5247/";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.setViewport({ width: 1366, height: 820 });
await p.goto(URL, { waitUntil: "networkidle2" });
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const ok = (nome, cond, extra = "") => console.log(`${cond ? "OK   " : "FALHA"} ${nome} ${extra}`);

const whats = () => p.$eval(".whats-flutuante", (el) => getComputedStyle(el).visibility);
ok("WhatsApp flutuante oculto no hero", (await whats()) === "hidden");
ok("sem pílula de agendar", (await p.$(".pilula-fixa")) === null);
ok("três faixas de régua", (await p.$$eval(".regua-escala", (r) => r.length)) === 3);
await p.evaluate(() => window.scrollTo({ top: innerHeight * 1.5, behavior: "instant" }));
await espera(700);
ok("WhatsApp flutuante aparece depois do hero", (await whats()) === "visible");
await p.evaluate(() => document.getElementById("contato").scrollIntoView({ behavior: "instant" }));
await espera(700);
ok("WhatsApp flutuante segue no formulário", (await whats()) === "visible");

await p.evaluate(() => document.getElementById("servicos").scrollIntoView({ behavior: "instant" }));
await espera(600);
const antes = await p.$eval('#servicos ul[aria-label]', (u) => u.scrollLeft);
await p.click('#servicos button[aria-label="Próximo"]');
await espera(900);
const depois = await p.$eval('#servicos ul[aria-label]', (u) => u.scrollLeft);
ok("seta do trilho rola os serviços", depois > antes, `(${antes} -> ${Math.round(depois)})`);
ok("seta anterior acende", !(await p.$eval('#servicos button[aria-label="Anterior"]', (x) => x.disabled)));

for (const h of ["#servicos", "#portfolio", "#processo", "#sobre", "#contato"]) {
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await p.click(`header nav a[href="${h}"]`);
  await espera(2200);
  const topo = await p.$eval(h, (s) => Math.round(s.getBoundingClientRect().top));
  ok(`menu leva a ${h}`, Math.abs(topo - 80) <= 4, `(topo ${topo})`);
}
const sem = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
ok("sem rolagem lateral no desktop", sem === 0, `(${sem}px)`);
await p.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
await p.goto(URL, { waitUntil: "networkidle2" });
for (let y = 0; y < 30000; y += 700) { await p.evaluate((v) => window.scrollTo(0, v), y); await espera(60); }
const semCel = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
ok("sem rolagem lateral no celular", semCel === 0, `(${semCel}px)`);
await b.close();
