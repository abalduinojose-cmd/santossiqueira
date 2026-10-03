"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

import { cx } from "@/lib/cx";

type Props = {
  readonly children: ReactNode;
  readonly rotulo: string;
  /** Classes do <ul> rolável (gap, recuo etc.). */
  readonly className?: string;
  /** Onde ficam as setas: acima do trilho, à direita. */
  readonly setasClassName?: string;
};

/**
 * Carrossel arrastável: rola um cartão por vez nas setas, aceita arrasto com
 * o mouse (no toque o scroll nativo resolve) e apaga as setas nas pontas.
 * Sem JavaScript ele continua sendo um scroll-snap comum.
 */
export function Trilho({ children, rotulo, className, setasClassName }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const arrasto = useRef<{ x: number; inicio: number } | null>(null);
  const [noInicio, setNoInicio] = useState(true);
  const [noFim, setNoFim] = useState(false);

  const medir = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setNoInicio(el.scrollLeft <= 8);
    setNoFim(el.scrollLeft >= el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [medir]);

  const passo = (direcao: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const cartao = el.querySelector("li");
    const largura = cartao ? cartao.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: largura * direcao, behavior: "smooth" });
  };

  const desce = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    arrasto.current = { x: e.clientX, inicio: ref.current.scrollLeft };
  };
  const move = (e: PointerEvent<HTMLUListElement>) => {
    const el = ref.current;
    const a = arrasto.current;
    if (!el || !a) return;
    const delta = e.clientX - a.x;
    if (Math.abs(delta) > 4) {
      el.classList.add("snap-none", "cursor-grabbing", "select-none");
      el.scrollLeft = a.inicio - delta;
    }
  };
  const solta = () => {
    ref.current?.classList.remove("snap-none", "cursor-grabbing", "select-none");
    arrasto.current = null;
  };

  return (
    <div>
      <div className={cx("flex justify-end gap-2.5", setasClassName)}>
        <button type="button" onClick={() => passo(-1)} disabled={noInicio} aria-label="Anterior" className="seta-trilho">
          <ChevronLeft aria-hidden className="size-5" strokeWidth={1.75} />
        </button>
        <button type="button" onClick={() => passo(1)} disabled={noFim} aria-label="Próximo" className="seta-trilho">
          <ChevronRight aria-hidden className="size-5" strokeWidth={1.75} />
        </button>
      </div>
      <ul
        ref={ref}
        onScroll={medir}
        onPointerDown={desce}
        onPointerMove={move}
        onPointerUp={solta}
        onPointerLeave={solta}
        tabIndex={0}
        aria-label={rotulo}
        /* `relative` de propósito: descendente absolute ancora aqui dentro e
           fica clipado pelo scroll, em vez de esticar a página inteira. */
        className={cx("scrollbar-none relative flex cursor-grab snap-x snap-proximity gap-5 overflow-x-auto pb-3 pt-1", className)}
      >
        {children}
      </ul>
    </div>
  );
}
