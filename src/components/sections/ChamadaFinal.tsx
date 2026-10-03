import { Phone } from "lucide-react";
import Image from "next/image";

import penteadeira from "@/assets/fotos/penteadeira-espelho-led.jpg";
import { CHAMADA_FINAL, MENSAGENS, site } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";

import { Button } from "../ui/Button";

/** Fecho em foto inteira: logo branco, o convite e o WhatsApp. Deságua no rodapé escuro. */
export function ChamadaFinal() {
  return (
    <section aria-labelledby="titulo-final" className="no-escuro relative isolate flex min-h-[36rem] items-center overflow-hidden bg-noite py-24 text-surface md:min-h-[42rem]">
      <Image quality={90} src={penteadeira} alt="" fill sizes="100vw" className="deriva-foto -z-20 object-cover object-[50%_40%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-noite/55" />
      <div aria-hidden className="ponte-topo-claro absolute inset-x-0 top-0 -z-10 h-28 md:h-36" />
      <div aria-hidden className="ponte-base-noite absolute inset-x-0 bottom-0 -z-10 h-44 md:h-64" />

      <div className="container-page">
        <div className="revela mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="rotulo-caps flex items-center gap-3 text-madeira">
            <span aria-hidden className="h-px w-9 bg-accent" />
            Próximo passo
            <span aria-hidden className="h-px w-9 bg-accent" />
          </p>
          <h2 id="titulo-final" className="mt-6 text-[clamp(2.3rem,1.5rem+3.4vw,4rem)] [text-shadow:0_2px_28px_rgb(20_14_10/0.5)]">
            {CHAMADA_FINAL.titulo}
          </h2>
          <Button href={linkWhatsApp(MENSAGENS.contato)} variante="claro" tamanho="lg" seta whatsapp className="mt-9">
            {CHAMADA_FINAL.cta}
          </Button>
          <a href={`tel:${site.whatsapp}`} className="btn btn-discreto mt-5 h-11 px-5 text-[0.85rem]">
            <Phone aria-hidden className="size-4" />
            {CHAMADA_FINAL.apoio}
          </a>
        </div>
      </div>
    </section>
  );
}
