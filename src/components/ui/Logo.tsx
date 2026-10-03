import Image from "next/image";

import logoBranco from "../../../public/marca/logo-branco.webp";
import logoMarrom from "../../../public/marca/logo-marrom.webp";
import monoBranco from "../../../public/marca/monograma-branco.webp";
import monoMarrom from "../../../public/marca/monograma-marrom.webp";

type Props = { readonly cor: "branco" | "marrom"; readonly tipo?: "completo" | "monograma"; readonly className?: string; readonly sizes?: string };

/** Logo real do cliente: branco sobre o marrom, marrom sobre o claro. */
export function Logo({ cor, tipo = "completo", className, sizes = "160px" }: Props) {
  const src = tipo === "completo" ? (cor === "branco" ? logoBranco : logoMarrom) : cor === "branco" ? monoBranco : monoMarrom;
  return <Image src={src} alt="Santos Siqueira Marcenaria" sizes={sizes} className={className} />;
}
