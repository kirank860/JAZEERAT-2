import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://jazeerat-2.vercel.app' // 🔁 Update to custom domain when ready
const SITE_NAME = 'Jazeerat Al Hadeed'
const DEFAULT_IMAGE = `${SITE_URL}/assets/slides/slide-1.webp`

const JSONLD_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  description:
    'Precision steel fabrication and integrated machine workshop delivering structural steel projects across the MENA region.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: DEFAULT_IMAGE,
  // 🔁 Fill in real details when ready:
  telephone: '+971-XX-XXXXXXX',
  email: 'info@jahsteel.ae',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AE',
    addressRegion: 'UAE',
  },
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Oman' },
    { '@type': 'Country', name: 'Qatar' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'Bahrain' },
    { '@type': 'Country', name: 'Kuwait' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Steel Fabrication Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CNC Plasma & Laser Cutting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Structural Steel Fabrication' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CNC Machine Workshop' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Welding & QA' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Surface Finishing & Coating' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Delivery & Installation' } },
    ],
  },
  sameAs: [
    // 🔁 Add your social media links when ready
    // 'https://www.linkedin.com/company/jazeerat-al-hadeed',
    // 'https://www.instagram.com/jazeeratalhadeed',
  ],
}

/**
 * SEO component — add to the top of every page component.
 *
 * Props:
 *  - title       : Page title (without site name suffix)
 *  - description : Meta description (150–160 chars ideal)
 *  - path        : URL path e.g. '/about' (default: '')
 *  - image       : OG image URL (default: slide-1)
 *  - noIndex     : Set true to block indexing (e.g. thank-you pages)
 */
export default function SEO({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Steel Fabrication & Machine Workshop UAE`
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph (Facebook / LinkedIn / WhatsApp) ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_AE" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ── Geo targeting (MENA) ── */}
      <meta name="geo.region" content="AE" />
      <meta name="geo.country" content="UAE" />

      {/* ── JSON-LD Structured Data ── */}
      <script type="application/ld+json">
        {JSON.stringify(JSONLD_ORGANIZATION)}
      </script>
    </Helmet>
  )
}
