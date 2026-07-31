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
  const address = {
    '@type': 'PostalAddress',
    streetAddress: '中山路431巷36號',
    addressLocality: siteInfo.city,
    addressRegion: siteInfo.district,
    addressCountry: 'TW'
  };

  const base = {
    name: siteInfo.fullName,
    alternateName: siteInfo.templeName,
    description: siteInfo.description,
    url,
    image,
    telephone: siteInfo.phone,
    address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteInfo.latitude,
      longitude: siteInfo.longitude
    },
    openingHoursSpecification: siteInfo.openingHoursSpecification,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteInfo.ratingValue,
      bestRating: siteInfo.bestRating
    },
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
