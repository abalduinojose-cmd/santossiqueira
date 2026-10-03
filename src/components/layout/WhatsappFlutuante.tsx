import { MENSAGENS } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";

import { IconeWhatsApp } from "../ui/IconeWhatsApp";

/**
 * Botão flutuante do WhatsApp, no lugar da pílula de agendamento. Entra
 * depois que o hero sai da tela e some com o menu aberto (flags do <html>,
 * lidas pelo CSS). Zero JavaScript de componente.
 */
export function WhatsappFlutuante() {
  return (
    <a
      href={linkWhatsApp(MENSAGENS.hero)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Santos Siqueira no WhatsApp"
      title="WhatsApp"
      className="whats-flutuante fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgb(18_140_70/0.6)] ring-4 ring-white/70 hover:brightness-105 md:bottom-6 md:right-6 md:size-16"
    >
      <IconeWhatsApp className="size-7 md:size-8" />
    </a>
  );
}
