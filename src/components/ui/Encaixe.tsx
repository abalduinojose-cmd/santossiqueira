import { cx } from "@/lib/cx";
import { TOM_FUNDO, TOM_TEXTO, type Tom } from "@/lib/tons";

/* Dentes do rabo de andorinha: raiz estreita embaixo, ponta larga em cima.
   18 módulos de 80 no viewBox de 1440. */
const DENTES = Array.from({ length: 18 }, (_, i) => {
  const x = i * 80;
  return `L${x + 26} 40 L${x + 16} 18 L${x + 64} 18 L${x + 54} 40`;
}).join(" ");

/**
 * Divisor de seção: a emenda rabo de andorinha, o encaixe mais clássico da
 * marcenaria. A cor da seção de baixo sobe nos dentes e trava na de cima,
 * como duas peças encaixadas. Com um fio de régua laranja na linha de base.
 */
export function Encaixe({ de, para }: { readonly de: Tom; readonly para: Tom }) {
  return (
    <div aria-hidden className={cx("relative -mb-px", TOM_FUNDO[de])}>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" focusable="false" className={cx("block h-4 w-full md:h-6", TOM_TEXTO[para])}>
        <path d={`M0 48 L0 40 ${DENTES} L1440 40 L1440 48 Z`} fill="currentColor" />
      </svg>
    </div>
  );
}
