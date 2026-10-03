/** Tons de fundo que dão o ritmo das seções. */
export type Tom = "claro" | "branco" | "noite";

export const TOM_FUNDO: Record<Tom, string> = {
  claro: "bg-surface-soft text-ink",
  branco: "bg-surface text-ink",
  noite: "no-escuro bg-noite text-creme",
};

export const TOM_TEXTO: Record<Tom, string> = {
  claro: "text-surface-soft",
  branco: "text-surface",
  noite: "text-noite",
};

export const ESCURO: Record<Tom, boolean> = { claro: false, branco: false, noite: true };
