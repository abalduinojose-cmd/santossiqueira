import { MENSAGENS, NAV } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";

import { IconeWhatsApp } from "../ui/IconeWhatsApp";
import { Logo } from "../ui/Logo";
import { MobileNav } from "./MobileNav";

/**
 * Fixo e transparente sobre o hero (texto branco); depois de rolar ganha o
 * creme sólido e o texto escuro. Tudo pelo flag data-rolou do <html>, lido
 * pelo CSS (.cabecalho), sem JavaScript de componente.
 */
export function Header() {
  return (
    <header className="cabecalho fixed inset-x-0 top-0 z-50">
      <div className="container-page flex h-[4.5rem] items-center gap-6">
        <a href="#topo" aria-label="Santos Siqueira Marcenaria, voltar ao início" className="flex shrink-0 items-center gap-3">
          <Logo cor="branco" tipo="monograma" sizes="40px" className="size-10 drop-shadow-[0_1px_8px_rgb(0_0_0/0.45)] [html[data-rolou='1']:not([data-menu='1'])_&]:hidden" />
          <Logo cor="marrom" tipo="monograma" sizes="40px" className="hidden size-10 [html[data-rolou='1']:not([data-menu='1'])_&]:block" />
          <span className="text-[1.1rem] font-extrabold leading-none tracking-[-0.03em]">Santos Siqueira</span>
        </a>
        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-3.5 py-2 font-mono text-[0.64rem] uppercase tracking-[0.03em] opacity-80 transition hover:bg-current/10 hover:opacity-100">
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-2">
          <a href={linkWhatsApp(MENSAGENS.hero)} target="_blank" rel="noopener noreferrer" className="btn btn-madeira hidden h-11 px-5 text-[0.8125rem] sm:inline-flex">
            <IconeWhatsApp className="size-4" />
            WhatsApp
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
