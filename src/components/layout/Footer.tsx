import type { ReactNode } from "react";

import { NAV, PERFIL_GOOGLE, site } from "@/content/site";
import { semMarcador } from "@/lib/marcador";

import { IconeFacebook, IconeInstagram } from "../ui/IconesRedes";
import { Logo } from "../ui/Logo";

/** Bloco de dados centrado, com o rótulo em mono por cima. */
function Bloco({ rotulo, children }: { readonly rotulo: string; readonly children: ReactNode }) {
  return (
    <div className="px-6 py-7 md:py-2">
      <p className="rotulo-caps text-[0.6rem] text-madeira">{rotulo}</p>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-creme/85">{children}</div>
    </div>
  );
}

/**
 * Rodapé centrado: logo e frase, três blocos de dados separados por fios
 * (oficina, horário, contato), redes, menu e a linha legal. Fecha com o
 * nome da marcenaria em tamanho de parede, quase apagado e cortado na
 * borda, como a marca a fogo no fundo de uma gaveta. NAP idêntico ao Google.
 */
export function Footer() {
  const cnpj = semMarcador(site.cnpj);
  const redes = "grid size-12 place-items-center rounded-full border border-white/15 text-creme transition hover:border-madeira hover:bg-madeira hover:text-noite";
  return (
    <footer className="no-escuro relative isolate overflow-hidden bg-noite pt-20 text-center text-creme">
      {/* luz quente vinda do alto, para o fundo não ficar chapado */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgb(214_171_124/0.14),transparent_65%)]" />

      <div className="container-page flex flex-col items-center">
        <Logo cor="branco" sizes="170px" className="w-36 md:w-40" />
        <p className="mt-7 max-w-[26ch] text-[1.35rem] font-bold leading-snug tracking-[-0.02em] text-surface md:text-[1.6rem]">{site.tagline}</p>

        <div className="mt-14 grid w-full max-w-4xl divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0 md:py-8">
          <Bloco rotulo="Oficina">
            <address className="not-italic">
              <span className="block font-semibold text-surface">{site.nomeGoogle}</span>
              {site.endereco.rua}, {site.endereco.complemento}
              <br />
              {site.endereco.bairro}, {site.endereco.cidade} · {site.endereco.uf} · {site.endereco.cep}
            </address>
            <a href={PERFIL_GOOGLE} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-madeira underline-offset-4 hover:underline">
              Ver no Google
            </a>
          </Bloco>
          <Bloco rotulo="Horário">
            <p>{site.horario.semana}</p>
            <p>{site.horario.sexta}</p>
            <p className="text-creme/60">{site.horario.fds}</p>
          </Bloco>
          <Bloco rotulo="Contato">
            <a href={`tel:${site.whatsapp}`} className="text-[1.45rem] font-extrabold tracking-[-0.02em] text-surface hover:underline">
              {site.whatsappDisplay}
            </a>
            <p className="font-mono text-[0.68rem] font-light text-creme/60">WhatsApp</p>
          </Bloco>
        </div>

        <div className="mt-10 flex gap-3">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${site.instagramArroba}`} title="Instagram" className={redes}>
            <IconeInstagram className="size-5" />
          </a>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook da Santos Siqueira" title="Facebook" className={redes}>
            <IconeFacebook className="size-5" />
          </a>
        </div>

        <nav aria-label="Rodapé" className="mt-9">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rotulo-caps text-[0.64rem] text-creme/70 transition hover:text-surface">
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-9 font-mono text-[0.64rem] font-light text-creme/55">
          © {new Date().getFullYear()} {site.nome}
          {cnpj ? ` · CNPJ ${cnpj}` : ""} · Feito em Petrópolis
        </p>
      </div>

      {/* Pseudo-elemento de propósito: é textura, não texto, e assim não
          entra na leitura nem na conta de contraste. */}
      <div aria-hidden className="pointer-events-none mt-10 select-none whitespace-nowrap text-[10.6vw] font-black uppercase leading-[0.78] tracking-[-0.05em] text-white/[0.06] after:content-['Santos_Siqueira']" />
    </footer>
  );
}
