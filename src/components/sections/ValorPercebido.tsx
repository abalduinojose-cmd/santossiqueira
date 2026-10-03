import { Box, Hammer, ShieldCheck, Truck } from "lucide-react";

import { MENSAGENS, VALOR } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";

const CHIPS = [
  { rotulo: "Projeto 3D", Icone: Box },
  { rotulo: "Oficina própria", Icone: Hammer },
  { rotulo: "Instalação pela equipe", Icone: Truck },
  { rotulo: "Garantia", Icone: ShieldCheck },
] as const;

/** §6.3: copy literal do cliente, centrada sobre o papel milimetrado, sem foto. */
export function ValorPercebido() {
  return (
    <section aria-labelledby="titulo-valor" className="papel bg-surface-soft py-24 md:py-32">
      <div className="container-page flex flex-col items-center text-center">
        <p className="revela rotulo-caps flex items-center gap-3 text-accent-texto">
          <span aria-hidden className="h-px w-9 bg-accent" />
          Valor do imóvel
          <span aria-hidden className="h-px w-9 bg-accent" />
        </p>
        <h2 id="titulo-valor" className="revela mt-6 max-w-[22ch] text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] leading-[1.05] text-ink">
          {VALOR.paragrafos[0]}
        </h2>
        <p className="revela mt-7 max-w-[58ch] text-[1.0625rem] text-muted md:text-[1.15rem]">{VALOR.paragrafos[1]}</p>
        <p className="revela mt-9 max-w-[40ch] text-[clamp(1.2rem,1.05rem+0.7vw,1.5rem)] font-bold leading-snug tracking-[-0.02em] text-brand">{VALOR.destaque}</p>
        <ul className="revela mt-9 flex flex-wrap justify-center gap-2.5">
          {CHIPS.map((c) => (
            <Chip key={c.rotulo} rotulo={c.rotulo} Icone={c.Icone} />
          ))}
        </ul>
        <Button href={linkWhatsApp(MENSAGENS.hero)} seta whatsapp className="revela mt-10">
          Agende uma conversa
        </Button>
      </div>
    </section>
  );
}
