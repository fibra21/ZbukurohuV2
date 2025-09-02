# ZBUKUROHU Brandbook

This folder contains the brand system for ZBUKUROHU: design tokens, Tailwind preset, guidelines, and example UI components. It is intended for both developers and marketers.

## Contents
- `brand-guidelines.md`: The primary brand guideline document.
- `tokens.json`: Design tokens (colors, typography, spacing, radii, shadows, motion).
- `tailwind.brand.preset.ts`: Tailwind preset that maps tokens into `theme.extend`.
- `components/`: Sample UI components using tokens (Button, Card, Badge).
- `assets/`: Brand assets (logos, favicon) as SVG placeholders.
- `tools/`: Utilities to export guidelines to PDF and preview.

## How to Use
1. Install fonts in your product (web):
   - Headings: Playfair Display or Cormorant (serif fallback)
   - Body: Inter or Poppins (sans-serif fallback)
2. Import the Tailwind preset in your Tailwind config:
```ts
// tailwind.config.ts
import brandPreset from './brandbook/tailwind.brand.preset'

export default {
  presets: [brandPreset],
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './brandbook/components/**/*.{ts,tsx}',
  ],
}
```
3. Use example components under `brandbook/components` as a reference.
4. Export PDF guidelines:
```bash
node brandbook/tools/export-pdf.mjs
```
The PDF will be saved as `brandbook/ZBUKUROHU_Brandbook.pdf`.

## Notes
- Colors meet WCAG AA contrast guidelines as documented in `brand-guidelines.md`.
- Do not distort or modify the logos. Maintain clear space and minimum sizes.
