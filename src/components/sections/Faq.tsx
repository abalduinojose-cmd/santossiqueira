import { ArrowRight, Plus } from "lucide-react";

import { faq } from "@/content/faq";
import { MENSAGENS } from "@/content/site";
import { semMarcador } from "@/lib/marcador";
import { schemaFaq } from "@/lib/schema";
import { linkWhatsApp } from "@/lib/whatsapp";

import { SectionHeading } from "../ui/SectionHeading";

/** <details> nativo, sem JavaScript, com o JSON-LD FAQPage junto. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="titulo-faq" className="bg-surface py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading id="titulo-faq" eyebrow="Dúvidas" titulo="Antes da primeira conversa." />
          <a href={linkWhatsApp(MENSAGENS.contato)} target="_blank" rel="noopener noreferrer" className="link-seta mt-8">
            Não achou sua dúvida? Pergunte no WhatsApp
            <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
          </a>
        </div>
        <div className="revela cartao divide-y divide-line">
          {faq.map((f) => (
            <details key={f.pergunta} name="faq" className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-body text-[1.02rem] font-semibold text-ink">{f.pergunta}</h3>
                <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-accent-texto transition group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-surface">
                  <Plus className="size-4" strokeWidth={2} />
                </span>
              </summary>
              <p className="max-w-[65ch] px-6 pb-6 text-muted">{semMarcador(f.resposta)}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq()) }} />
    </section>
  );
}
