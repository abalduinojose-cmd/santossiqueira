import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsappFlutuante } from "@/components/layout/WhatsappFlutuante";
import { ChamadaFinal } from "@/components/sections/ChamadaFinal";
import { Contato } from "@/components/sections/Contato";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Faq } from "@/components/sections/Faq";
import { Frase } from "@/components/sections/Frase";
import { Hero } from "@/components/sections/Hero";
import { Parceiros } from "@/components/sections/Parceiros";
import { Portfolio } from "@/components/sections/Portfolio";
import { Processo } from "@/components/sections/Processo";
import { Servicos } from "@/components/sections/Servicos";
import { Sobre } from "@/components/sections/Sobre";
import { ValorPercebido } from "@/components/sections/ValorPercebido";
import { Videos } from "@/components/sections/Videos";
import { Encaixe } from "@/components/ui/Encaixe";
import { Cota, FaixaRegua } from "@/components/ui/FaixaRegua";
import { NUMEROS, PERFIL_GOOGLE } from "@/content/site";

/**
 * One-page no ritmo do Cabana Afrodite, com a linguagem da prancha técnica:
 * três faixas de régua dividem a página (a primeira traz os números da
 * marcenaria como cotas), o encaixe rabo de andorinha emenda as faixas
 * escuras e claras, e toda seção termina num caminho para o WhatsApp.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />

        <FaixaRegua rotulo="A Santos Siqueira em números">
          <dl className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:divide-x md:divide-creme/15">
            {NUMEROS.itens.map((n) => (
              <Cota key={n.rotulo} valor={n.valor} rotulo={n.rotulo} href={n.rotulo === "nota no Google" ? PERFIL_GOOGLE : undefined} />
            ))}
          </dl>
          <p className="rotulo-caps mt-12 flex items-center justify-center gap-4 text-center text-[0.6rem] text-creme/85">
            <span aria-hidden className="hidden h-px w-16 bg-creme/25 sm:block" />
            {NUMEROS.legenda}
            <span aria-hidden className="hidden h-px w-16 bg-creme/25 sm:block" />
          </p>
        </FaixaRegua>

        <ValorPercebido />
        <Frase />
        <Servicos />

        <Encaixe de="branco" para="noite" />
        <Processo />

        <FaixaRegua />
        <Portfolio />

        <Encaixe de="claro" para="noite" />
        <Videos />

        <Encaixe de="noite" para="claro" />
        <Depoimentos />
        <Sobre />
        <Parceiros />
        <Faq />

        <FaixaRegua />
        <Contato />
        <ChamadaFinal />
      </main>
      <Footer />
      <WhatsappFlutuante />
    </>
  );
}
