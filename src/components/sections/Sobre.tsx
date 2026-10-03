import { Check } from "lucide-react";
import Image from "next/image";

import oficinaMontagem from "@/assets/fotos/oficina-montagem.jpg";
import oficinaTupia from "@/assets/fotos/oficina-tupia.jpg";
import { MENSAGENS, SOBRE, site } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

/** A oficina de verdade: fotos do Instagram da marcenaria, nada de banco de imagens. */
export function Sobre() {
  return (
    <section id="sobre" aria-labelledby="titulo-sobre" className="bg-surface py-20 md:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="relative lg:col-span-6">
          <div className="cortina relative aspect-[4/5] w-[78%] overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-30px_rgb(43_31_23/0.5)]">
            <Image quality={90} src={oficinaMontagem} alt="Marceneiro da Santos Siqueira montando a estrutura de um móvel na oficina com pinadora pneumática" fill sizes="(min-width: 1024px) 36vw, 74vw" className="object-cover" />
          </div>
          <div className="absolute bottom-[-2rem] right-0 aspect-[3/4] w-[44%] overflow-hidden rounded-[1.25rem] border-[6px] border-surface shadow-[0_24px_50px_-24px_rgb(43_31_23/0.55)]">
            <Image quality={90} src={oficinaTupia} alt="Mãos guiando uma peça de madeira na tupia da oficina" fill sizes="(min-width: 1024px) 20vw, 42vw" className="object-cover" />
          </div>
          <p className="absolute left-4 top-4 rounded-full bg-noite/80 px-4 py-2 font-mono text-[0.72rem] font-light uppercase text-surface">
            desde {site.fundacao}
          </p>
        </div>

        <div className="lg:col-span-6">
          <SectionHeading id="titulo-sobre" eyebrow="Sobre" titulo={SOBRE.titulo} />
          <div className="revela mt-6 max-w-[60ch] space-y-4 text-muted">
            {SOBRE.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="revela mt-8 space-y-3">
            {SOBRE.compromissos.map((c) => (
              <li key={c} className="flex items-center gap-3 font-medium text-ink">
                <span aria-hidden className="grid size-7 place-items-center rounded-full bg-accent/12 text-accent-texto">
                  <Check className="size-4" strokeWidth={2.4} />
                </span>
                {c}
              </li>
            ))}
          </ul>
          <Button href={linkWhatsApp(MENSAGENS.hero)} seta whatsapp className="revela mt-10">
            Agende uma conversa
          </Button>
        </div>
      </div>
    </section>
  );
}
