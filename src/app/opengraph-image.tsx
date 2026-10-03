import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Santos Siqueira Marcenaria, em Petrópolis: móveis sob medida há 45 anos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const raiz = process.cwd();
const schibsted = await readFile(join(raiz, "src/assets/fontes/Schibsted-900.ttf"));
const martian = await readFile(join(raiz, "src/assets/fontes/MartianMono-300.ttf"));
const logo = `data:image/png;base64,${(await readFile(join(raiz, "src/assets/fontes/logo-og.png"))).toString("base64")}`;

/* Traços da régua no pé do cartão: mm, meio cm e cm. */
const TRACOS = Array.from({ length: 121 }, (_, i) => i);

/** Cartão de compartilhamento: logo branco sobre o marrom, o H1 e a régua. */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#614631", color: "#FFFFFF" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 64, padding: "0 84px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- o ImageResponse (satori) só aceita <img> */}
          <img src={logo} width={260} height={250} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontFamily: "Martian", fontSize: 22, color: "#D6AB7C" }}>MARCENARIA · PETRÓPOLIS/RJ · 45 ANOS</div>
            <div style={{ fontFamily: "Schibsted", fontSize: 70, lineHeight: 0.98, letterSpacing: -3 }}>Móveis sob medida que transformam o seu espaço</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", height: 54, margin: "0 84px 30px", borderTop: "1px solid rgba(243,236,227,0.5)" }}>
          {TRACOS.map((i) => (
            <div key={i} style={{ width: 8.6, height: i % 10 === 0 ? 26 : i % 5 === 0 ? 16 : 9, borderLeft: `${i % 10 === 0 ? 2 : 1}px solid rgba(243,236,227,0.5)`, display: "flex" }} />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted", data: schibsted, style: "normal", weight: 900 },
        { name: "Martian", data: martian, style: "normal", weight: 300 },
      ],
    },
  );
}
