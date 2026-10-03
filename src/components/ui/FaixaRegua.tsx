import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

const NUMEROS = Array.from({ length: 24 }, (_, i) => i);

/** A escala: traços de mm, meio cm e cm, numerada a cada cm, com o cursor laranja. */
function Escala({ className }: { readonly className?: string }) {
  return (
    <div aria-hidden className={cx("relative", className)}>
      <div className="regua-escala text-creme/45" />
      <div className="regua-numeros rotulo-caps mt-1 text-[0.6rem] text-creme/55">
        {NUMEROS.map((n) => (
          <span key={n} className="pl-1">
            {n === 0 ? "" : n}
          </span>
        ))}
      </div>
      <span className="regua-cursor" />
    </div>
  );
}

type Props = {
  /** Conteúdo acima da escala (as cotas da 1a faixa). Sem ele, só a régua. */
  readonly children?: ReactNode;
  readonly rotulo?: string;
};

/**
 * Faixa de régua entre seções: o fundo marrom da madeira e a escala de fita
 * métrica, como no detalhe que o cliente escolheu. Com conteúdo vira seção
 * (os números da marcenaria como cotas de desenho técnico); sem conteúdo é
 * só divisor, oculto para leitor de tela.
 */
export function FaixaRegua({ children, rotulo }: Props) {
  if (!children) {
    return (
      <div aria-hidden className="no-escuro relative overflow-hidden bg-brand py-7 md:py-9">
        <div className="container-page">
          <Escala />
        </div>
      </div>
    );
  }
  return (
    <section aria-label={rotulo} className="no-escuro relative overflow-hidden bg-brand pb-8 pt-14 text-creme md:pb-10 md:pt-16">
      <div className="container-page">
        {children}
        <Escala className="mt-12" />
      </div>
    </section>
  );
}

/**
 * Cota de desenho técnico, centrada: a linha de cota com as duas pontas por
 * cima, o número grande no meio e o rótulo em mono embaixo (o <dt> vem
 * antes no HTML, como pede a lista de definição, e desce pelo order-last).
 */
export function Cota({ valor, rotulo, href }: { readonly valor: string; readonly rotulo: string; readonly href?: string }) {
  const numero = <span className="block text-[clamp(3rem,2rem+3.6vw,5.2rem)] font-black leading-none tracking-[-0.06em] text-surface">{valor}</span>;
  return (
    <div className="revela flex flex-col items-center px-2 text-center md:px-6">
      <span aria-hidden className="mb-5 flex w-full max-w-[9rem] items-center">
        <span className="h-3 w-px bg-creme/45" />
        <span className="h-px flex-1 bg-creme/30" />
        <span className="h-3 w-px bg-creme/45" />
      </span>
      <dt className="rotulo-caps order-last mt-4 text-[0.6rem] text-madeira-clara">{rotulo}</dt>
      <dd>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-8 hover:underline">
            {numero}
          </a>
        ) : (
          numero
        )}
      </dd>
    </div>
  );
}
