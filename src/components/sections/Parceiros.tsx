import { MENSAGENS, PARCEIROS } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

/** §6.10 [[CONFIRMAR SE ENTRA]]: dois públicos num painel de madeira, um CTA. */
export function Parceiros() {
  return (
    <section aria-labelledby="titulo-parceiros" className="bg-surface-soft py-20 md:py-28">
      <div className="container-page">
        <div className="revela no-escuro relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-quente via-brand to-brand-700 px-6 py-12 text-surface shadow-[0_40px_80px_-40px_rgb(74_52_37/0.8)] sm:px-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <Logo cor="branco" tipo="monograma" sizes="56px" className="size-14" />
              <h2 id="titulo-parceiros" className="mt-6 text-[clamp(2.1rem,1.4rem+2.6vw,3.4rem)]">
                {PARCEIROS.titulo}
              </h2>
              <Button href={linkWhatsApp(MENSAGENS.parceiros)} variante="claro" seta whatsapp className="mt-8">
                {PARCEIROS.cta}
              </Button>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {PARCEIROS.publicos.map((p) => (
                <li key={p.titulo} className="rounded-[1.25rem] border border-white/15 bg-white/[0.06] p-6">
                  <h3 className="text-[1.4rem]">{p.titulo}</h3>
                  <p className="mt-3 text-creme/90">{p.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
