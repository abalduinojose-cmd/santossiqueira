import { faq } from "@/content/faq";
import { SITE_URL, site } from "@/content/site";

/**
 * JSON-LD. SEM aggregateRating de propósito: avaliação do próprio negócio
 * marcada no próprio site é "self-serving" para LocalBusiness, não gera rich
 * result e pode render ação manual. A nota 4,7 aparece só na tela, com link
 * para o perfil.
 */
export function schemaNegocio() {
  const { endereco, geo } = site;
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${SITE_URL}/#santos-siqueira`,
    name: site.nomeGoogle,
    alternateName: site.nome,
    description: site.descricao,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    logo: `${SITE_URL}/marca/logo-marrom.webp`,
    telephone: site.whatsapp,
    priceRange: "$$$", // [[CONFIRMAR]]
    foundingDate: site.fundacao,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${endereco.rua}, ${endereco.complemento}`,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      postalCode: endereco.cep,
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "16:00" },
    ],
    areaServed: [
      { "@type": "City", name: "Petrópolis" },
      { "@type": "AdministrativeArea", name: "Região Serrana do Rio de Janeiro" },
    ],
    sameAs: [site.instagram, site.facebook, site.google],
  };
}

export function schemaFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta.replace(/\s*\[\[[^\]]*\]\]/g, "") },
    })),
  };
}
