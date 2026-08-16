import { siteConfig } from "@/packages/configs/data.config";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.brand.name,
    areaServed: siteConfig.footer.areasServed,
    geo: { "@type": "GeoCoordinates", latitude: 28.6139, longitude: 77.209 },
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <script> tag used for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
