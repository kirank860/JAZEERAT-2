# Jazeerat Al Hadeed — Website

Modern, animated marketing site for Jazeerat Al Hadeed (steel fabrication / integrated machine workshop).

## Stack
- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (animations)
- React Router (Home / About / Services / Contact)
- lucide-react (icons)

## Run it
```bash
npm install
npm run dev
```

## Design system
- Colors, fonts and grid utilities are defined in `src/index.css` under `@theme`.
- Accent color (weld orange) = #FF5A1F, used sparingly for CTAs and highlights.
- `Cutline` and `CoordinateTicker` components are the site's signature motifs — they evoke the plasma-cutting / CNC workshop identity. Reuse them if you add more pages/sections.

## Next steps
- Swap placeholder phone/email/address in `src/components/Footer.jsx` and `src/pages/Contact.jsx`.
- Wire the contact form (`src/pages/Contact.jsx`) to a real backend or email endpoint.
- Replace stat figures (`src/pages/Home.jsx`) and timeline milestones (`src/pages/About.jsx`) with real company data.
- Add real project photography if you want to mix in raster imagery alongside the line-drawing motif.
