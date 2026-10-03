import Image from "next/image";

import chapas from "@/assets/fotos/oficina-chapas.jpg";
import marceneiro from "@/assets/fotos/oficina-marceneiro.jpg";
import { FRASE } from "@/content/site";

/* As fotos da oficina são verticais: no desktop entram duas lado a lado
   (cada uma com nitidez de sobra; montagem e tupia já estão no Sobre), no
   celular só o marceneiro. */
const OFICINA = [marceneiro, chapas];

/**
 * A frase sobre a oficina de verdade, onde "o que mudou foi a ferramenta"
 * se vê. As pontes fazem o creme de cima e o branco de baixo vazarem na foto.
 */
export function Frase() {
  return (
    <section aria-label="A oficina" className="no-escuro relative isolate flex min-h-[92svh] items-end overflow-hidden bg-noite pb-16 pt-40 text-surface md:min-h-[80svh]">
      <div aria-hidden className="absolute inset-0 -z-20 grid lg:grid-cols-2 lg:gap-1">
        {OFICINA.map((foto, i) => (
          <div key={foto.src} className={i === 0 ? "relative" : "relative hidden lg:block"}>
            <Image quality={90} src={foto} alt="" fill sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "50vw"} loading="lazy" className="object-cover object-[50%_30%]" />
          </div>
        ))}
      </div>
      <div aria-hidden className="veu-foto absolute inset-0 -z-10" />
      {/* reforço: o fundo claro da oficina come o contraste do texto */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-gradient-to-t from-noite/85 via-noite/55 to-transparent" />
      <div aria-hidden className="ponte-topo-claro absolute inset-x-0 top-0 -z-10 h-28 md:h-36" />
      <div aria-hidden className="ponte-base-branco absolute inset-x-0 bottom-0 -z-10 h-20 md:h-28" />

      <div className="container-page pb-16 md:pb-24">
        <div className="revela max-w-3xl">
          <p className="text-[clamp(2.1rem,1.2rem+3.6vw,4rem)] font-black leading-[1] tracking-[-0.045em] [text-shadow:0_2px_28px_rgb(20_14_10/0.6)]">{FRASE.frase}</p>
          <p className="mt-4 font-mono text-[clamp(0.95rem,0.8rem+0.7vw,1.3rem)] font-light leading-snug text-madeira [text-shadow:0_2px_20px_rgb(20_14_10/0.6)]">{FRASE.apoio}</p>
        </div>
        <dl className="revela mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/20 pt-6">
          {FRASE.fatos.map((f) => (
            <div key={f.valor} className="flex flex-col-reverse items-baseline gap-1 sm:flex-row-reverse sm:gap-2.5">
              <dt className="text-sm text-surface/80">{f.rotulo}</dt>
              <dd className="text-[1.75rem] font-extrabold tracking-[-0.03em] text-surface">{f.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
