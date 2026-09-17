import { faqItems, siteInfo } from '@/data/site';
import { absoluteAsset, absoluteUrl } from './urls';

type JsonLdRecord = Record<string, unknown>;

function compactObject<T extends JsonLdRecord>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined && item !== null && item !== '')
  ) as T;
}

export function buildPlaceSchema(site: URL | undefined): JsonLdRecord {
  const url = absoluteUrl('/', site);
  const image = absoluteAsset(siteInfo.ogImage, site);
  const mapsShareUrl = siteInfo.mapsShareUrl;
  const govTourismUrl = siteInfo.govTourismUrl;

  const address = {
    '@type': 'PostalAddress',
    streetAddress: siteInfo.address,
    addressLocality: siteInfo.city,
    addressRegion: siteInfo.district,
    postalCode: siteInfo.postalCode,
    addressCountry: 'TW'
  };

  const base = {
    '@id': url ? `${url}#attraction` : undefined,
    name: siteInfo.fullName,
    alternateName: [siteInfo.name, `${siteInfo.city} ${siteInfo.fullName}`],
    description: siteInfo.description,
    url,
    image: image ? [image] : undefined,
    telephone: siteInfo.phone,
    address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteInfo.latitude,
      longitude: siteInfo.longitude
    },
    hasMap: mapsShareUrl,
    sameAs: [mapsShareUrl, govTourismUrl].filter((value): value is string => Boolean(value)),
    isAccessibleForFree: true,
    openingHoursSpecification: siteInfo.openingHoursSpecification,
    priceRange: siteInfo.priceRange
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      compactObject({
        '@type': 'TouristAttraction',
        ...base
      }),
      compactObject({
        '@type': 'LocalBusiness',
        ...base,
        name: siteInfo.name
      })
    ]
  };
}

export function buildFaqSchema(): JsonLdRecord {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function buildBreadcrumbSchema(
  trail: { name: string; url: string }[],
  site: URL | undefined
): JsonLdRecord {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url, site)
    }))
  };
}
