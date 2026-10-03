import { ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";

import { CONTATO, ENDERECO_LINHA, MENSAGENS, ROTA, site } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";

import { IconeFacebook, IconeInstagram } from "../ui/IconesRedes";
import { SectionHeading } from "../ui/SectionHeading";
import { FormularioContato } from "./FormularioContato";

/**
 * Duas colunas: formulário (alternativa ao WhatsApp, nunca o principal) e
 * bloco NAP com o mapa do Google. O mapa fica abaixo da dobra, com
 * loading="lazy", então não pesa na abertura.
 */
export function Contato() {
  const consulta = `${site.nomeGoogle}, ${ENDERECO_LINHA}`;
  return (
    <section id="contato" aria-labelledby="titulo-contato" className="papel bg-surface-soft py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <SectionHeading id="titulo-contato" eyebrow="Contato" titulo={CONTATO.titulo} texto={CONTATO.texto} />
          <a href={linkWhatsApp(MENSAGENS.contato)} target="_blank" rel="noopener noreferrer" className="link-seta mt-6">
            {CONTATO.atalho}
            <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
          </a>
          <div className="revela cartao mt-8 p-6 sm:p-8">
            <FormularioContato />
          </div>
        </div>

        <div className="min-w-0">
          <div className="revela cartao overflow-hidden">
            <iframe
              title={`Mapa do Google: ${consulta}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(consulta)}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-72 w-full border-0 md:h-96"
            />
            <div className="space-y-5 p-6 sm:p-8">
              <p className="flex gap-3">
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                <span>
                  <span className="block font-semibold text-ink">{site.nomeGoogle}</span>
                  <span className="text-muted">
                    {site.endereco.rua}, {site.endereco.complemento} · {site.endereco.bairro}, {site.endereco.cidade}, {site.endereco.uf} · {site.endereco.cep}
                  </span>
                </span>
              </p>
              <p className="flex gap-3">
                <Clock aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                <span className="text-muted">
                  {site.horario.semana}
                  <br />
                  {site.horario.sexta}
                  <br />
                  {site.horario.fds}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                <a href={`tel:${site.whatsapp}`} className="font-semibold text-ink underline-offset-4 hover:underline">
                  {site.whatsappDisplay}
                </a>
              </p>
              <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
                <a href={ROTA} target="_blank" rel="noopener noreferrer" className="btn btn-madeira h-12 px-6 text-[0.9rem]">
                  <Navigation aria-hidden className="size-4" />
                  {CONTATO.comoChegar}
                </a>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${site.instagramArroba}`} className="grid size-12 place-items-center rounded-full border border-line text-brand transition hover:border-brand hover:bg-brand hover:text-surface">
                  <IconeInstagram className="size-5" />
                </a>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook da Santos Siqueira" className="grid size-12 place-items-center rounded-full border border-line text-brand transition hover:border-brand hover:bg-brand hover:text-surface">
                  <IconeFacebook className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
