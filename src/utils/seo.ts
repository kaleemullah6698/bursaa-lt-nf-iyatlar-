/**
 * High Performance Client-Side SEO & Schema.org Structured Data Engine
 * Aligned with Google Search Essentials and AI Studio SEO skill
 */

import { CityConfig } from '../types/city';

interface UpdateSeoOptions {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  city?: CityConfig;
}

export const updateDocumentSeo = (options: UpdateSeoOptions): void => {
  if (typeof document === 'undefined') return;

  const { title, description, keywords, canonicalPath = window.location.pathname, city } = options;

  // 1. Title
  document.title = title;

  // 2. Meta Helper
  const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', contentVal);
  };

  // 3. Description & Keywords
  setMetaTag('name', 'description', description);
  if (keywords) {
    setMetaTag('name', 'keywords', keywords);
  }

  // 4. OpenGraph & Twitter Cards
  const origin = window.location.origin || 'https://www.bursaaltinfiyatlari.com';
  const fullUrl = `${origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', fullUrl);
  setMetaTag('property', 'og:site_name', city ? `${city.name} Altın Fiyatları` : 'Altın Fiyatları Canlı');
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:locale', 'tr_TR');

  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);

  // 5. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullUrl);

  // 6. GEO-First Local Metadata
  if (city) {
    setMetaTag('name', 'geo.region', city.geoRegion);
    setMetaTag('name', 'geo.placename', city.geoPlacename);
    setMetaTag('name', 'geo.position', city.geoPosition);
    setMetaTag('name', 'ICBM', city.geoPosition.replace(';', ', '));
    setMetaTag('name', 'coverage', city.districts.join(', '));
  }

  // 7. Schema.org JSON-LD Structured Data
  let scriptEl = document.getElementById('seo-schema-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'seo-schema-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const currentYear = new Date().getFullYear(); // 2026
  const cityName = city ? city.name : 'Bursa';
  const marketName = city ? city.marketName : 'Tarihi Kapalı Çarşı';
  const address = city ? city.address : 'Nalbantoğlu Mah. Tarihi Kapalı Çarşı Osmangazi/Bursa';
  const phone = city ? city.phone : '+90-224-221-1616';

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${fullUrl}#website`,
        'url': fullUrl,
        'name': `${cityName} Altın Fiyatları`,
        'description': description,
        'inLanguage': 'tr',
        'dateModified': new Date().toISOString()
      },
      {
        '@type': 'FinancialService',
        '@id': `${fullUrl}#organization`,
        'name': `${cityName} Altın Fiyatları & ${marketName}`,
        'url': fullUrl,
        'telephone': phone,
        'priceRange': '₺₺₺',
        'currenciesAccepted': 'TRY, USD, EUR, XAU',
        'paymentAccepted': 'Cash, Credit Card, Bank Wire',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': address,
          'addressLocality': cityName,
          'addressRegion': cityName,
          'postalCode': city?.postalCode || '16010',
          'addressCountry': 'TR'
        },
        ...(city?.geoPosition ? {
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': parseFloat(city.geoPosition.split(';')[0]),
            'longitude': parseFloat(city.geoPosition.split(';')[1])
          }
        } : {})
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${fullUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Ana Sayfa',
            'item': `${origin}/`
          },
          ...(city ? [
            {
              '@type': 'ListItem',
              'position': 2,
              'name': `${city.name} Altın Fiyatları`,
              'item': fullUrl
            }
          ] : [])
        ]
      },
      ...(city && city.faqs && city.faqs.length > 0 ? [
        {
          '@type': 'FAQPage',
          '@id': `${fullUrl}#faq`,
          'mainEntity': city.faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        }
      ] : [])
    ]
  };

  scriptEl.textContent = JSON.stringify(schemaGraph);
};
