# ZBUKUROHU Brand Guidelines

Version 1.0.0

## 1. Introduction & Brand Essence
ZBUKUROHU është marketplace modern për makeup & skincare në Kosovë. Ne kombinojmë elegancën, ngrohtësinë dhe profesionalizmin me një UI të pastër dhe premium.

Slogan: “Gjithçka për bukurinë tënde, në një vend.”
Tone of voice: Warm, profesional, elegant, gjuhë e thjeshtë dhe premium.

## 2. Logo Usage
- Primary logo: `assets/logo-primary.svg` (wordmark)
- Secondary mark: `assets/logo-mark.svg` (organic petal/brush)
- Clear space: ≥ 1× lartësia e shkronjave rreth logos
- Minimum width: 120px (web)
- Backgrounds: përdor kontrast të mjaftueshëm (mos e vendos mbi foto pa overlay)
- Don’ts: mos e shtrembëro, mos ndrysho ngjyrën pa arsye, mos shto efekte drop-shadow agresive

## 3. Color System
Primary/Brand: Blush Pink `#F9E7E7`
Secondary: Nude Beige `#E5C6A8`
Accent: Soft Gold `#D4AF37`
Text/Contrast: Anthracite `#2E2E2E`
Base: White `#FFFFFF`

Tints/Shades (example swatches):
<div style="display:flex;gap:12px;margin:12px 0;align-items:flex-end;">
  <div style="width:72px;height:48px;background:#F9E7E7;border:1px solid #eee"></div>
  <div style="width:72px;height:48px;background:#F9E7E7CC;border:1px solid #eee"></div>
  <div style="width:72px;height:48px;background:#F9E7E799;border:1px solid #eee"></div>
</div>

Accessibility (WCAG AA):
- Tekst normal ≥ 4.5:1
- Tekst ≥ 18px ose bold ≥ 3:1
- Sugjerohet tekst i errët (`#2E2E2E`) mbi sfondet e lehta.

## 4. Typography
- Headings: “Playfair Display” ose “Cormorant” (serif)
- Body: “Inter” ose “Poppins” (sans-serif)
- Weights: 400, 600, 700

Hierarchy samples (Tailwind):
```tsx
<h1 className="font-heading text-5xl leading-tight">H1 Heading</h1>
<h2 className="font-heading text-4xl leading-tight">H2 Heading</h2>
<p className="font-body text-base leading-normal">Body text example</p>
```

## 5. Tone of Voice
- Warm, profesional, elegant
- Përdor fjali të shkurtra, të qarta
- Shembuj:
  - Web hero: “Zbulo bukurinë tënde natyrale.”
  - CTA: “Bli tani”, “Zbulo ofertat”
  - Social caption: “Rutina jote e re e lumturisë së lëkurës.”

## 6. UI Components
Buttons (Tailwind examples): shih `brandbook/components/Button.tsx`.
Cards: shih `brandbook/components/Card.tsx`.
Badges: shih `brandbook/components/Badge.tsx`.

State & Focus:
- Focus ring: `outline outline-2 outline-offset-2 outline-accent`
- Hover states me `transition` dhe `duration-fast`

## 7. Layout & Imagery
- Grid bazë: 12-col responsive, max-width 1200–1280px
- Spacing scale: 4,8,12,16,20,24,32,40
- Photography direction: soft, clean, premium; sfond i pastër, dritë natyrale

## 8. Applications
- Web header/footer: përdor primary për highlights, tekst anthracite për lexueshmëri
- Social tile: përdor mark + background blush, tekst kontrast
- Packaging (mock): minimal, me aksent gold të butë

## 9. File Usage & Delivery
- Importo preset-in Tailwind:
```ts
import brandPreset from '@/brandbook/tailwind.brand.preset'
export default { presets: [brandPreset] }
```
- Përdor tokens nga `brandbook/tokens.json` për integrime të tjera (Figma/DesignOps)

## 10. Changelog
- 1.0.0: Versioni i parë i brandbook me tokens, preset dhe komponentë bazë.
