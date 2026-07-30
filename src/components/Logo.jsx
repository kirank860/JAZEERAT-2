/**
 * JAH Logo — Inline SVG component
 * Matches the Jazeerat Al Hadeed brand identity.
 * Uses the site's colour tokens so it feels native on the dark theme.
 *
 * Props:
 *   className  – extra Tailwind classes (sizing, spacing, etc.)
 *   showText   – if true, renders the full lockup with company name (default: true)
 *   variant    – 'light' (for dark backgrounds) | 'dark' (for light backgrounds)
 */
export default function Logo({ className = '', showText = true, variant = 'light' }) {
  // Colours — logo icon keeps brand red, all text is white for contrast
  const textColor = '#FFFFFF'
  const accentColor = '#d62f22' // Brand red

  // The viewBox adapts depending on whether we show the full lockup or icon-only
  const viewBox = showText ? '0 0 650 140' : '0 0 200 140'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
      aria-label="Jazeerat Al Hadeed Logo"
      role="img"
    >
      <g transform="translate(20, 80)">
        {/* ── Red roof bars ─────────────────────────────── */}
        <g fill={accentColor} transform="skewY(-18)">
          <rect x="0" y="-10" width="145" height="14" />
          <rect x="50" y="12" width="65" height="14" />
        </g>

        {/* ── TM ────────────────────────────────────────── */}
        <text
          x="150"
          y="-45"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="14"
          fill={textColor}
        >
          TM
        </text>

        {/* ── "JAH" letterforms ─────────────────────────── */}
        <text
          x="15"
          y="45"
          fontFamily="'Arial Black', Impact, sans-serif"
          fontWeight="900"
          fontSize="76"
          letterSpacing="-2"
          fill={textColor}
        >
          JAH
        </text>
      </g>

      {/* ── Full lockup text ──────────────────────────── */}
      {showText && (
        <g transform="translate(225, 95)">
          <text
            x="0"
            y="0"
            fontFamily="'Arial Black', Arial, sans-serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="0.5"
            fill={textColor}
          >
            JAZEERAT AL HADEED
          </text>
          <text
            x="0"
            y="28"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="20"
            fill={textColor}
          >
            Metalic Cont Ind LLC
          </text>
        </g>
      )}
    </svg>
  )
}
