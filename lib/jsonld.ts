import { site } from "./site";

/**
 * JSON-LD @graph untuk root layout.
 * Node saling direferensikan lewat @id supaya Google membacanya sebagai satu entitas,
 * bukan tiga blok terpisah.
 */
export function buildOrganizationGraph() {
  const orgId = `${site.url}/#organization`;
  const siteId = `${site.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        url: site.url,
        description: site.description,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/logo.svg`,
        },
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": orgId },
        inLanguage: site.lang,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: site.name,
        url: site.url,
        description: site.description,
        provider: { "@id": orgId },
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
        serviceType: [
          "AI Customer Service",
          "AI Content Generation",
          "AI Business Intelligence",
          "AI Workflow Automation",
        ],
      },
    ],
  };
}
