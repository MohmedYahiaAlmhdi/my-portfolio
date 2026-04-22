
## Dark Mode Color Overhaul — globals.css

**Date:** 2025-04-21
**Scope:** Overhaul dark mode palette, premium glassmorphism, new utility classes

### Changes Made

#### 1. Dark Mode CSS Variables (`.dark` block)
- **Background:** Changed from flat `oklch(0.12 0.005 160)` to rich deep navy-black `oklch(0.13 0.015 260)` — adds depth with subtle blue undertones
- **Foreground/Text:** Near-white `oklch(0.95 0.005 260)` with very slight blue tint (not pure white) for premium feel
- **Cards:** `oklch(0.17 0.012 260)` — subtle navy tint instead of flat dark gray
- **Muted text:** `oklch(0.55 0.01 260)` — proper contrast with blue undertone for secondary text
- **Borders:** `oklch(0.30 0.015 260 / 60%)` — subtle blue-tinted borders with proper transparency, not just `white/10%`
- **Ring:** `oklch(0.55 0.02 260)` — tinted to match the navy palette
- **Sidebar:** Darker at `oklch(0.16 0.012 260)` for visual separation

#### 2. Premium Glassmorphism (`.glass-card` dark mode)
- Background changed from flat `rgba(255,255,255,0.05)` to navy-tinted `rgba(20,30,60,0.35)`
- Enhanced `backdrop-filter: blur(24px) saturate(1.2)` for richer glass effect
- Added `inset 0 1px 0 rgba(255,255,255,0.04)` inner top-edge highlight for premium depth
- Border uses subtle blue tint `rgba(100,160,255,0.08)` instead of plain white
- Hover state gains layered box-shadows with emerald outer glow ring

#### 3. Hero Gradient Enhancement
- Added secondary cyan radial gradient overlay for dual-tone atmospheric effect
- Emerald top glow + subtle cyan accent from the right side

#### 4. New Premium Utility Classes
- **`.premium-card`** — Gradient border (emerald→teal→cyan), outer glow blur, hover lift with smooth cubic-bezier transition. Light mode uses darker emerald shades.
- **`.text-gradient-gold`** — Warm gold gradient text
- **`.shimmer-bg`** — Animated sweeping shimmer effect using emerald-to-teal gradient. Respects prefers-reduced-motion.
- **`.glow-border`** — Layered emerald outer glow with 3-stage shadow system. Hover intensifies the glow.
- **`.deep-bg-gradient`** — Dark mode only class: multi-layer radial gradient combining emerald glow, cyan accent, and navy-black linear base.

#### 5. Card Lift Shadow Refinement
- `.card-lift:hover` now uses dual-layer shadows for more realistic depth

#### 6. Accessibility
- All new animations include prefers-reduced-motion: reduce overrides

### What Was NOT Changed
- All existing CSS classes remain intact — zero removals
- Light mode color variables in `:root` untouched
- All existing animations, keyframes, and hover effects preserved
- Tailwind theme inline configuration unchanged

### Lint Status: PASSED (0 errors, 0 warnings)
