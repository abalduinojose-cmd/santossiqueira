import Image from "next/image";

import aparador from "@/assets/fotos/aparador-palhinha-detalhe.jpg";
import gaveteiro from "@/assets/fotos/gaveteiro-azul.jpg";
import armario from "@/assets/fotos/armario-preto-almofadado.jpg";
import escolha from "@/assets/videos/escolha-dos-acabamentos.jpg";
import movel from "@/assets/videos/o-movel-por-dentro.jpg";
import tudoComeca from "@/assets/videos/tudo-comeca-na-oficina.jpg";
import { SOBRE, VIDEOS, site } from "@/content/site";
import { asset } from "@/lib/asset";

import { IconeInstagram } from "../ui/IconesRedes";
import { SectionHeading } from "../ui/SectionHeading";

const CAPAS = { "tudo-comeca-na-oficina": tudoComeca, "o-movel-por-dentro": movel, "escolha-dos-acabamentos": escolha } as const;
const FEED = [aparador, gaveteiro, armario];

/**
 * Os vídeos do Instagram da marcenaria, na faixa escura, com o cartão do
 * perfil ao lado. <video controls preload="none">: nada baixa antes do play
 * e não há JavaScript nenhum. Trilho no toque, grade no desktop.
 */
export function Videos() {
  return (
    <section id="videos" aria-labelledby="titulo-videos" className="no-escuro bg-noite py-20 text-creme md:py-28">
      <div className="container-page">
        <SectionHeading id="titulo-videos" eyebrow="Da oficina" titulo={VIDEOS.titulo} texto={VIDEOS.texto} escuro />
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <ul aria-label="Vídeos da oficina" className="scrollbar-none relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:gap-5 lg:col-span-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
            {SOBRE.videos.map((v) => (
              <li key={v.id} className="revela w-[64vw] max-w-[16rem] shrink-0 snap-start sm:w-[15rem] lg:w-auto lg:max-w-none">
                <figure>
                  <video
                    controls
                    preload="none"
                    playsInline
                    poster={CAPAS[v.id].src}
                    src={asset(`/videos/${v.id}.mp4`)}
                    className="aspect-[9/16] w-full rounded-[1.25rem] bg-noite-soft object-cover ring-1 ring-white/10"
                    aria-label={`Vídeo: ${v.titulo}`}
                  />
                  <figcaption className="mt-4">
                    <span className="rotulo-caps block text-[0.6rem] text-madeira">{site.instagramArroba}</span>
                    <span className="mt-1 block font-semibold text-surface">{v.titulo}</span>
                    <span className="text-[0.9rem] text-creme/70">{v.legenda}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <article className="revela group overflow-hidden rounded-3xl border border-white/10 bg-noite-soft lg:col-span-4">
            <div className="relative grid grid-cols-3 gap-px bg-white/10">
              {FEED.map((foto, i) => (
                <div key={i} className="relative aspect-square overflow-hidden bg-noite">
                  <Image quality={90} src={foto} alt="" fill sizes="10rem" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              ))}
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-noite-soft via-noite-soft/55 to-transparent" />
            </div>
            <div className="relative -mt-9 px-7 pb-7">
              <span className="inline-flex size-13 items-center justify-center rounded-2xl border border-white/20 bg-noite-soft text-creme">
                <IconeInstagram className="size-5" />
              </span>
              <p className="mt-4 font-mono text-[0.78rem] font-light text-madeira">{site.instagramArroba}</p>
              <h3 className="mt-3 text-[1.35rem] leading-snug text-surface">{VIDEOS.instagramTitulo}</h3>
              <p className="mt-2.5 text-[0.95rem] text-creme/70">{VIDEOS.instagramTexto}</p>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-contorno-claro mt-6 h-12 w-full px-6 text-[0.9rem]">
                <IconeInstagram className="size-[1.1rem]" />
                {VIDEOS.instagramCta}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
