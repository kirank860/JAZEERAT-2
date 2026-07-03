# Domain Migration Checklist

When you purchase your custom domain (e.g., `jazeerat.ae`), follow these steps to update your site and SEO settings.

## 1. Vercel & DNS Setup (Outside of Code)
- [ ] Go to your Vercel Project Settings > Domains
- [ ] Add your new domain (`jazeerat.ae`)
- [ ] Log in to where you bought the domain (e.g., GoDaddy, Namecheap) and add the DNS records Vercel gives you.

## 2. Codebase Updates
Update the URL in these 4 files:

### `src/components/SEO.jsx`
- [ ] Line 3: Change `SITE_URL` to `'https://jazeerat.ae'`
- [ ] Line 17-23: Update the placeholder phone number, email, and address in `JSONLD_ORGANIZATION`.
- [ ] Line 44-48: Uncomment and add your real social media links.

### `public/robots.txt`
- [ ] Update the `Sitemap:` URL at the bottom to `https://jazeerat.ae/sitemap.xml`

### `public/sitemap.xml`
- [ ] Find and replace all `https://jazeerat-2.vercel.app` with `https://jazeerat.ae` inside all `<loc>` tags.

### `index.html`
- [ ] Update `og:image` content URL
- [ ] Update `og:url` content URL
- [ ] Update `twitter:image` content URL

## 3. Google Search Console
- [ ] Go to Google Search Console
- [ ] Click "Add Property" and enter your new domain (`https://jazeerat.ae`)
- [ ] Click Verify (Google will read the meta tag we already added)
- [ ] Go to "Sitemaps" on the left menu and submit `sitemap.xml`
