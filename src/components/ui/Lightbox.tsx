import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import type { Projeto } from "@/content/portfolio";
import { cx } from "@/lib/cx";

type Props = { readonly fotos: readonly Projeto[]; readonly inicial: number; readonly aoFechar: () => void };

/**
 * <dialog> nativo: o navegador prende o foco, fecha no Esc e deixa o fundo
 * inerte. Setas do teclado navegam; showModal() roda num efeito, depois do
 * conteúdo montado.
 */
export default function Lightbox({ fotos, inicial, aoFechar }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(inicial);
  const total = fotos.length;
  const foto = fotos[i];

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const ir = (passo: number) => setI((v) => (v + passo + total) % total);
  const tecla = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") ir(1);
    if (e.key === "ArrowLeft") ir(-1);
  };
  const botao = "grid size-12 place-items-center rounded-full border border-white/25 bg-black/30 text-white transition hover:bg-white hover:text-ink";

  return (
    <dialog
      ref={ref}
      aria-label="Projetos ampliados"
      onKeyDown={tecla}
      onCancel={(e) => {
        e.preventDefault();
        aoFechar();
      }}
      className="galeria m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-sm tabular-nums text-white/75" aria-live="polite">{`${i + 1} de ${total} · ${foto.ambiente}`}</p>
          <button type="button" autoFocus onClick={aoFechar} aria-label="Fechar galeria" className={botao}>
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <figure className="relative min-h-0 flex-1">
          <Image key={foto.alt} quality={90} src={foto.src} alt={foto.alt} fill sizes="100vw" placeholder="blur" className="object-contain px-3 md:px-20" />
          <button type="button" onClick={() => ir(-1)} aria-label="Foto anterior" className={cx(botao, "absolute left-3 top-1/2 -translate-y-1/2 md:left-6")}>
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={() => ir(1)} aria-label="Próxima foto" className={cx(botao, "absolute right-3 top-1/2 -translate-y-1/2 md:right-6")}>
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </figure>
        <p className="mx-auto max-w-3xl px-5 py-5 text-center text-sm text-white/75">{foto.alt}</p>
      </div>
    </dialog>
  );
}
