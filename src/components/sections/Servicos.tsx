import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { servicos } from "@/content/servicos";
import { MENSAGENS } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";

import { IconeServico } from "../ui/IconeServico";
import { SectionHeading } from "../ui/SectionHeading";
import { Trilho } from "../ui/Trilho";

/**
 * Um cartão por ambiente, em trilho que sangra à direita. Cada cartão é o
 * próprio link de WhatsApp, com o ambiente já escrito na mensagem. Sem foto
 * real daquele ambiente, o cartão vira prancha: papel milimetrado escuro e o
 * ícone desenhado, em vez de uma foto de outro cômodo.
 */
export function Servicos() {
  return (
    <section id="servicos" aria-labelledby="titulo-servicos" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="titulo-servicos" eyebrow="Serviços" titulo="Cada ambiente, desenhado para o seu espaço." texto="Escolha o ambiente e a conversa já começa com ele." />
      </div>
      <div className="mt-6">
        <Trilho rotulo="Ambientes atendidos" className="trilho-recuo" setasClassName="container-page mb-5 max-md:hidden">
          {servicos.map((s, i) => (
            <li key={s.slug} className="w-[76vw] max-w-[20rem] shrink-0 snap-start sm:w-[20rem]">
              <a href={linkWhatsApp(MENSAGENS.servico(s.titulo))} target="_blank" rel="noopener noreferrer" draggable={false} className="cartao cartao-vivo group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden bg-noite">
                  {s.foto ? (
                    <Image quality={90} src={s.foto.src} alt={s.foto.alt} fill draggable={false} loading={i < 2 ? "eager" : "lazy"} sizes="(min-width: 640px) 20rem, 76vw" className="object-cover transition-transform duration-700 ease-[var(--ease-oficina)] group-hover:scale-[1.04]" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:22px_22px]">
                      <IconeServico tipo={s.icone} className="size-24 text-madeira" />
                      <span className="rotulo-caps absolute bottom-5 left-5 text-[0.62rem] text-creme/70">Sob medida</span>
                    </div>
                  )}
                  <span aria-hidden className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-surface/90 text-brand transition group-hover:bg-accent group-hover:text-surface">
                    <ArrowUpRight className="size-4" strokeWidth={2} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[1.35rem] text-ink">{s.titulo}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] text-muted">{s.texto}</p>
                  <span className="rotulo-caps mt-5 text-[0.66rem] text-accent-texto">Pedir orçamento</span>
                </div>
              </a>
            </li>
          ))}
        </Trilho>
      </div>
    </section>
  );
}
