import { getImageProps } from "next/image";

import capaCelular from "@/assets/fotos/hero-video-celular.jpg";
import capaDesktop from "@/assets/fotos/hero-video-desktop.jpg";
import { HERO, MENSAGENS, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { linkWhatsApp } from "@/lib/whatsapp";

import { Button } from "../ui/Button";

/* Vídeo de fundo em HTML cru: o React não escreve o atributo `muted` no
   HTML do servidor, e sem ele o navegador não dá autoplay antes da
   hidratação. Cada tela pega o seu arquivo pelo `media` do <source>: o
   horizontal (1280x720) no desktop, o vertical (720x1280) no celular. Sem
   JavaScript nenhum. */
const VIDEO = `<video autoplay muted loop playsinline preload="auto" aria-hidden="true" tabindex="-1" class="absolute inset-0 size-full object-cover">
  <source src="${asset("/videos/hero-desktop.mp4")}" type="video/mp4" media="(min-width: 768px)">
  <source src="${asset("/videos/hero-celular.mp4")}" type="video/mp4">
</video>`;

/**
 * Hero de tela cheia com o vídeo dos ambientes rodando em loop. Enquanto o
 * vídeo carrega aparece o 1º quadro dele, com art direction (cada tela
 * baixa só a sua capa). A capa é o LCP: fetchPriority alta, quality 90.
 */
export function Hero() {
  const [antes, depois] = site.h1.split(HERO.destaque);
  const comum = { alt: "", fill: true, sizes: "100vw", quality: 90, priority: true } as const;
  const { props: desktop } = getImageProps({ ...comum, src: capaDesktop });
  const { props: celular } = getImageProps({ ...comum, src: capaCelular });

  return (
    <section id="topo" aria-labelledby="titulo-hero" className="no-escuro relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-noite">
      <div aria-hidden className="absolute inset-0 -z-20">
        <picture>
          {/* Na prévia estática (imagens sem otimização) não há srcSet: vai o src. */}
          <source media="(min-width: 768px)" srcSet={desktop.srcSet ?? desktop.src} sizes={desktop.sizes} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- capa com art direction via getImageProps (o alt vem nas props) */}
          <img {...celular} className="object-cover" />
        </picture>
        <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: VIDEO }} />
      </div>
      <div aria-hidden className="veu-hero absolute inset-0 -z-10" />

      <div className="container-page pb-14 pt-32 md:pb-20">
        <div className="max-w-4xl">
          {/* Selo: o tempo de oficina num botão claro, o lugar ao lado, tudo
              numa pílula de vidro. */}
          <p className="sobe inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-white/20 bg-white/10 p-1 pr-4 text-surface backdrop-blur-md">
            <span className="rounded-full bg-surface px-3 py-1 font-mono text-[0.66rem] font-medium uppercase tracking-[0.02em] text-ink">{HERO.selo.tempo}</span>
            <span className="text-[0.84rem] font-semibold tracking-[0.01em]">{HERO.selo.lugar}</span>
          </p>

          <h1 id="titulo-hero" className="sobe mt-7 text-[clamp(2.75rem,1.4rem+5.6vw,6rem)] font-black leading-[0.98] tracking-[-0.045em] text-surface" style={{ animationDelay: "80ms" }}>
            {antes}
            <span className="destaque-mono">{HERO.destaque}</span>
            {depois}
          </h1>

          <p className="sobe mt-7 max-w-[40ch] text-[1.0625rem] leading-relaxed text-surface/85 md:text-[1.25rem]" style={{ animationDelay: "160ms" }}>
            {HERO.subtitulo}
          </p>

          <div className="sobe mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4" style={{ animationDelay: "240ms" }}>
            <Button href={linkWhatsApp(MENSAGENS.hero)} variante="claro" tamanho="lg" seta whatsapp>
              {HERO.ctaPrincipal}
            </Button>
            <Button href="#portfolio" variante="contornoClaro" tamanho="lg">
              {HERO.ctaSecundario}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
