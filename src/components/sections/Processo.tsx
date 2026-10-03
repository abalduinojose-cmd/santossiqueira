import { MENSAGENS, PROCESSO } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * Quatro etapas na faixa escura, em cartões ligados por um fio de régua.
 * Tira a ansiedade de quem nunca contratou marcenaria e termina chamando
 * para a primeira etapa.
 */
export function Processo() {
  return (
    <section id="processo" aria-labelledby="titulo-processo" className="no-escuro bg-noite py-20 text-creme md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="titulo-processo" eyebrow="Processo" titulo={PROCESSO.titulo} texto={PROCESSO.texto} escuro />
          <Button href={linkWhatsApp(MENSAGENS.hero)} variante="claro" seta whatsapp className="revela self-start lg:self-auto">
            {PROCESSO.cta}
          </Button>
        </div>
        <ol className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PROCESSO.etapas.map((e, i) => (
            <li key={e.titulo} className="revela rounded-[1.25rem] border border-white/10 bg-noite-soft p-7" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[2.4rem] font-extralight leading-none tracking-[-0.06em] text-madeira">{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden className="h-2.5 flex-1 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.25)_0_1px,transparent_1px_8px)] [mask-image:linear-gradient(90deg,#000,transparent)]" />
              </div>
              <h3 className="mt-6 text-[1.4rem] text-surface">{e.titulo}</h3>
              <p className="mt-2 text-[0.95rem] text-creme/75">{e.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
