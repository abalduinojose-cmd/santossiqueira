import type { Metadata, Viewport } from "next";
import { Martian_Mono, Schibsted_Grotesk } from "next/font/google";

import { SITE_URL, site } from "@/content/site";
import { schemaNegocio } from "@/lib/schema";

import "./globals.css";

/* Linguagem de prancha técnica: Schibsted Grotesk (grotesca de jornal, de
   400 a 900) nos títulos e no corpo; Martian Mono, de traço fino, nas cotas,
   rótulos e números, a "voz da medida". O contraste é de extremos: título
   em 900 contra mono em 200/300. As duas self-hosted pelo next/font. */
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted",
});

/* Fallback calibrado à mão (ver "Martian Fallback" no globals.css): o
   automático do next/font usa uma fonte proporcional, e na troca o
   "sob medida" do H1 mudava de largura e empurrava a linha (CLS 0,06). */
const martian = Martian_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-martian",
  adjustFontFallback: false,
  fallback: ["Martian Fallback", "monospace"],
});

const descricao =
  "Marcenaria em Petrópolis com 45 anos de oficina: móveis planejados sob medida para residências e empresas, com projeto 3D antes da execução e garantia.";

export const metadata: Metadata = {
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: {
    default: "Marcenaria em Petrópolis | Móveis Planejados Sob Medida · Santos Siqueira",
    template: "%s · Santos Siqueira Marcenaria",
  },
  description: descricao,
  alternates: { canonical: SITE_URL },
  applicationName: site.nome,
  keywords: ["marcenaria Petrópolis", "móveis planejados Petrópolis", "marceneiro sob medida Petrópolis", "cozinha planejada Petrópolis"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: site.nome,
    title: "Santos Siqueira Marcenaria, em Petrópolis",
    description: descricao,
  },
  twitter: { card: "summary_large_image", title: "Santos Siqueira Marcenaria, em Petrópolis", description: descricao },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#614631",
};

/* Cabeçalho que ganha fundo e WhatsApp flutuante que aparece depois do
   hero: dois flags no <html> lidos pelo CSS. Um script de 300 bytes em vez
   de Client Components, e roda antes da hidratação, então não pisca. */
const scriptRolagem = `(()=>{const d=document.documentElement;let p=0;const f=()=>{const y=scrollY;d.dataset.rolou=y>24?"1":"0";d.dataset.dobra=y>innerHeight*.8?"1":"0";p=0};f();addEventListener("scroll",()=>{p||(p=requestAnimationFrame(f))},{passive:!0})})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${schibsted.variable} ${martian.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-surface"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaNegocio()) }} />
        <script dangerouslySetInnerHTML={{ __html: scriptRolagem }} />
      </body>
    </html>
  );
}
