import type { IconeServico as Tipo } from "@/content/servicos";

/** Ícones de traço fino (1.4px), desenhados para os ambientes. */
const TRACOS: Record<Tipo, string> = {
  cozinha: "M4 20V9h16v11M4 13h16M9 9v4M15 9v4M7 5h10l1 4H6z",
  dormitorio: "M3 19v-6h18v6M3 13V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M7 13v-2h4v2M13 13v-2h4v2M3 19v2M21 19v2",
  office: "M3 10h18M5 10v10M19 10v10M13 10v6h6M9 6h6v4H9z",
  sala: "M4 6h16v9H4zM8 19h8M12 15v4M2 20h20",
  banheiro: "M5 4h14v6H5zM6 10v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6M12 6.5v1M9 21h6",
  gourmet: "M3 11h18v9H3zM3 15h18M7 11V7M12 11V5M17 11V7M8 4c0 1-1 1-1 2M13 3c0 1-1 1-1 2",
  corporativo: "M4 21V5l8-2v18M12 7h8v14M7 8h2M7 12h2M7 16h2M15 11h2M15 15h2",
  especial: "M4 20l4-1L19 8l-3-3L5 16zM14 7l3 3M3 21h18",
};

export function IconeServico({ tipo, className = "size-8" }: { readonly tipo: Tipo; readonly className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d={TRACOS[tipo]} />
    </svg>
  );
}
