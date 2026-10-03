import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import { TOM_FUNDO, type Tom } from "@/lib/tons";

type Props = {
  readonly children: ReactNode;
  readonly id?: string;
  readonly tom?: Tom;
  readonly rotulo?: string;
  readonly className?: string;
  /** Conteúdo sangrando até as bordas: dispensa o container interno. */
  readonly sangra?: boolean;
};

/** Seção com tom de fundo e padding padrão. */
export function Section({ children, id, tom = "claro", rotulo, className, sangra = false }: Props) {
  return (
    <section id={id} aria-labelledby={rotulo} className={cx(TOM_FUNDO[tom], "relative py-20 md:py-28", className)}>
      {sangra ? children : <div className="container-page">{children}</div>}
    </section>
  );
}
