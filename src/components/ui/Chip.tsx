import type { LucideIcon } from "lucide-react";

import { cx } from "@/lib/cx";

/** Selo em pílula com ícone. */
export function Chip({ rotulo, Icone, escuro = false }: { readonly rotulo: string; readonly Icone: LucideIcon; readonly escuro?: boolean }) {
  return (
    <li
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.88rem] font-medium",
        escuro ? "border-white/15 bg-white/5 text-creme" : "border-line bg-surface text-ink",
      )}
    >
      <Icone aria-hidden className="size-4 text-accent" strokeWidth={1.8} />
      {rotulo}
    </li>
  );
}
