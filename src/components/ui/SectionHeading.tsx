import { cx } from "@/lib/cx";

type Props = {
  readonly id: string;
  readonly eyebrow: string;
  readonly titulo: string;
  readonly texto?: string;
  readonly escuro?: boolean;
  readonly centro?: boolean;
  readonly className?: string;
};

/** Traço + eyebrow em caps, H2 e apoio. Um tamanho de H2 para a página inteira. */
export function SectionHeading({ id, eyebrow, titulo, texto, escuro = false, centro = false, className }: Props) {
  return (
    <div className={cx("revela max-w-2xl", centro && "mx-auto flex flex-col items-center text-center", className)}>
      <p className={cx("rotulo-caps flex items-center gap-3", escuro ? "text-madeira" : "text-accent-texto")}>
        <span aria-hidden className="h-px w-9 bg-accent" />
        {eyebrow}
      </p>
      <h2 id={id} className={cx("mt-4 text-[clamp(2.1rem,1.4rem+2.6vw,3.4rem)]", escuro ? "text-surface" : "text-ink")}>
        {titulo}
      </h2>
      {texto ? <p className={cx("mt-5 max-w-[60ch] text-[1.0625rem]", escuro ? "text-creme/80" : "text-muted")}>{texto}</p> : null}
    </div>
  );
}
