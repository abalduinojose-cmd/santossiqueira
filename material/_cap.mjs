import puppeteer from "puppeteer-core";
const [url, dir, modo] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
const cel = modo === "cel";
await p.setViewport(cel ? { width: 412, height: 860, deviceScaleFactor: 1, isMobile: true, hasTouch: true } : { width: 1366, height: 820 });
await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await p.goto(url, { waitUntil: "networkidle2", timeout: 120000 });
for (let y = 0; y < 30000; y += 600) { await p.evaluate((v) => window.scrollTo(0, v), y); await new Promise((r) => setTimeout(r, 120)); }
await p.evaluate(() => window.scrollTo(0, 0));
const alturas = await p.evaluate(() => [...document.querySelectorAll("main > section, footer")].map((s) => [s.id || s.getAttribute("aria-labelledby") || s.getAttribute("aria-label") || s.tagName, Math.round(s.getBoundingClientRect().top + scrollY)]));
let n = 0;
for (const [nome, topo] of alturas) {
  await p.evaluate((y) => window.scrollTo({ top: y - 2, behavior: "instant" }), topo);
  await new Promise((r) => setTimeout(r, 900));
  await p.screenshot({ path: `${dir}/${modo}-${String(n++).padStart(2, "0")}-${String(nome).replace(/[^a-z0-9-]/gi, "_").slice(0, 24)}.jpg`, quality: 70 });
}
console.log(alturas.map((a) => a.join("@")).join("  "));
await b.close();
