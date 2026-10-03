import { ArrowRight } from "lucide-react";

import Image from "next/image";

import reviews from "@/content/reviews.json";
import { DEPOIMENTOS_TEXTO, MENSAGENS, NOTA, PERFIL_GOOGLE, PROVA_GOOGLE, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { linkWhatsApp } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { StarRating } from "../ui/StarRating";
import { Trilho } from "../ui/Trilho";

export type Review = {
  autor: string;
  nota: 1 | 2 | 3 | 4 | 5;
  data: string;
  texto: string;
  fonte: "google";
  /** Foto do perfil no Google, baixada em public/avaliacoes (o site não depende do Google). */
  foto: `/${string}`;
};

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const dataPtBr = (iso: string) => {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return `${dia} de ${MESES[mes - 1]} de ${ano}`;
};
function MarcaGoogle() {
  return (
    <svg viewBox="0 0 24 24" aria-label="Google" role="img" className="mx-auto size-7">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.1a11 11 0 0 0 0 9.8z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}

/**
 * Só avaliações reais do Google (content/reviews.json). À esquerda o resumo
 * com a nota real do perfil (4,7, nunca arredondada), à direita o trilho
 * com os depoimentos. Estado vazio se o arquivo estiver vazio.
 */
export function Depoimentos() {
  const lista = reviews as Review[];
  return (
    <section id="depoimentos" aria-labelledby="titulo-depoimentos" className="bg-surface-soft py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="titulo-depoimentos" eyebrow="Avaliações" titulo={DEPOIMENTOS_TEXTO.titulo} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="revela lg:col-span-4">
            <div className="cartao p-8 text-center lg:sticky lg:top-24">
              <MarcaGoogle />
              <p className="mt-4 text-[4.5rem] font-black leading-none tracking-[-0.06em] text-ink">{NOTA}</p>
              <StarRating nota={site.avaliacoes.nota} className="size-5" />
              <p className="mt-3 text-[0.95rem] text-muted">{PROVA_GOOGLE.split(" · ")[1]} no Google</p>
              <div className="mt-7 border-t border-line pt-6">
                <a href={PERFIL_GOOGLE} target="_blank" rel="noopener noreferrer" className="link-seta">
                  {DEPOIMENTOS_TEXTO.resumo}
                  <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            {lista.length === 0 ? (
              <p className="rounded-[1.25rem] border border-dashed border-line p-8 text-center text-muted">{DEPOIMENTOS_TEXTO.vazio}</p>
            ) : (
              <Trilho rotulo="Avaliações de clientes no Google" setasClassName="mb-5 max-md:hidden">
                {lista.map((r) => (
                  <li key={r.autor + r.data} className="w-[82vw] max-w-[22rem] shrink-0 snap-start sm:w-[22rem]">
                    <figure className="cartao flex h-full flex-col p-7">
                      <figcaption className="flex items-center gap-3.5">
                        <Image quality={90} src={asset(r.foto)} alt={`Foto de perfil de ${r.autor} no Google`} width={48} height={48} unoptimized className="size-12 shrink-0 rounded-full object-cover ring-2 ring-surface shadow-[0_6px_16px_-8px_rgb(43_31_23/0.5)]" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-semibold text-ink">{r.autor}</span>
                          <time dateTime={r.data} className="rotulo-caps mt-0.5 block text-[0.58rem] text-muted">
                            {dataPtBr(r.data)}
                          </time>
                        </span>
                      </figcaption>
                      <StarRating nota={r.nota} className="mt-5 size-4" />
                      <blockquote className="mt-3 flex-1 text-[0.98rem] text-ink/85">
                        <p>{r.texto}</p>
                      </blockquote>
                      <p className="rotulo-caps mt-5 text-[0.56rem] text-muted">Avaliação no Google</p>
                    </figure>
                  </li>
                ))}
              </Trilho>
            )}
            <Button href={linkWhatsApp(MENSAGENS.hero)} variante="contornoEscuro" whatsapp className="mt-8">
              Agende uma conversa
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
