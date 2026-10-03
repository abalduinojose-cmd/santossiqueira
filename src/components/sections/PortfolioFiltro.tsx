"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";

import type { Categoria, Projeto } from "@/content/portfolio";
import { cx } from "@/lib/cx";

/* O lightbox só é baixado no primeiro clique. */
const Lightbox = dynamic(() => import("../ui/Lightbox"), { ssr: false });

/* Mosaico em módulos de seis fotos, para não virar grade de miniaturas
   iguais: uma grande (4x2) e cinco médias no desktop; no celular, a grande
   ocupa as duas colunas e a sexta também, então toda linha fecha. */
const SPANS = [
  "col-span-2 row-span-2 md:col-span-4",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "col-span-2 md:col-span-2",
];

/* As fotos que sobram depois do último módulo inteiro dividem a linha
   entre si, para a grade nunca terminar com um buraco. */
const SOBRA_MD = ["", "md:col-span-6", "md:col-span-3", "md:col-span-2", "md:col-span-3"];
function vao(i: number, total: number) {
  const inteiros = Math.floor(total / SPANS.length) * SPANS.length;
  if (i < inteiros) return SPANS[i % SPANS.length];
  const resto = total - inteiros;
  const j = i - inteiros;
  const md = resto === 5 ? (j < 3 ? "md:col-span-2" : "md:col-span-3") : SOBRA_MD[resto];
  return cx(resto % 2 === 1 && j === resto - 1 && "col-span-2", md);
}

type Props = { readonly projetos: readonly Projeto[]; readonly categorias: readonly Categoria[] };

export function PortfolioFiltro({ projetos, categorias }: Props) {
  const [filtro, setFiltro] = useState<Categoria | "Todos">("Todos");
  const [aberto, setAberto] = useState<number | null>(null);
  const origem = useRef<HTMLButtonElement | null>(null);
  const visiveis = filtro === "Todos" ? projetos : projetos.filter((p) => p.categoria === filtro);

  const fechar = () => {
    setAberto(null);
    requestAnimationFrame(() => origem.current?.focus());
  };

  const conta = (c: Categoria | "Todos") => (c === "Todos" ? projetos.length : projetos.filter((p) => p.categoria === c).length);

  return (
    <>
      {/* Seletor segmentado: uma peça só, com a contagem de cada ambiente. */}
      <div className="scrollbar-none -mx-5 mt-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div role="group" aria-label="Filtrar projetos por ambiente" className="inline-flex gap-1 rounded-full border border-line bg-surface/80 p-1.5 shadow-[0_10px_30px_-24px_rgb(43_31_23/0.6)] backdrop-blur-sm">
          {(["Todos", ...categorias] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFiltro(c)}
              aria-pressed={filtro === c}
              className={cx(
                "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[0.88rem] font-semibold transition",
                filtro === c ? "bg-ink text-surface" : "text-ink/70 hover:bg-surface-warm hover:text-ink",
              )}
            >
              {c}
              <span className={cx("font-mono text-[0.62rem] font-light", filtro === c ? "text-madeira" : "text-muted")}>{String(conta(c)).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-8 grid auto-rows-[11rem] grid-cols-2 gap-2 sm:auto-rows-[14rem] md:auto-rows-[13.5rem] md:grid-cols-6 md:gap-3">
        {visiveis.map((p, i) => (
          <li key={p.alt} className={cx("revela min-w-0", vao(i, visiveis.length))}>
            <button
              type="button"
              onClick={(e) => {
                origem.current = e.currentTarget;
                setAberto(i);
              }}
              aria-label={`Ampliar: ${p.alt}`}
              className="group relative block size-full overflow-hidden rounded-[1.1rem] bg-surface-warm"
            >
              <Image quality={90}
                src={p.src}
                alt=""
                fill
                loading={i < 3 ? "eager" : "lazy"}
                sizes={vao(i, visiveis.length).includes("md:col-span-4") ? "(min-width: 768px) 62vw, 100vw" : vao(i, visiveis.length).startsWith("col-span-2") ? "(min-width: 768px) 32vw, 100vw" : "(min-width: 768px) 32vw, 50vw"}
                className="object-cover transition duration-700 ease-[var(--ease-oficina)] group-hover:scale-[1.05]"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-noite/70 via-noite/0 to-noite/0 transition duration-500 group-hover:from-noite/85 group-hover:via-noite/25" />
              {/* Etiqueta de peça: índice e ambiente, sempre à vista. */}
              <span aria-hidden className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-left md:bottom-4 md:left-4 md:right-4">
                <span className="min-w-0">
                  <span className="block font-mono text-[0.58rem] font-light text-madeira">{String(i + 1).padStart(2, "0")}</span>
                  <span className="block truncate text-[0.82rem] font-semibold text-surface md:text-[0.92rem]">{p.ambiente}</span>
                </span>
                <span className="hidden size-9 shrink-0 translate-y-1 place-items-center rounded-full bg-surface text-ink opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 md:grid">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {aberto !== null ? <Lightbox fotos={visiveis} inicial={aberto} aoFechar={fechar} /> : null}
    </>
  );
}
