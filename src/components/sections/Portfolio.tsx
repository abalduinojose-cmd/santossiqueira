import { categorias, projetos } from "@/content/portfolio";
import { MENSAGENS, PORTFOLIO_TEXTO } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { PortfolioFiltro } from "./PortfolioFiltro";

/** O momento visual da página: filtro segmentado, mosaico e lightbox, sobre o papel milimetrado. */
export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="titulo-portfolio" className="papel bg-surface-soft py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="titulo-portfolio" eyebrow="Projetos" titulo={PORTFOLIO_TEXTO.titulo} texto={PORTFOLIO_TEXTO.texto} />
        <PortfolioFiltro projetos={projetos} categorias={[...categorias]} />
        <Button href={linkWhatsApp(MENSAGENS.portfolio)} seta whatsapp className="mt-12">
          {PORTFOLIO_TEXTO.cta}
        </Button>
      </div>
    </section>
  );
}
