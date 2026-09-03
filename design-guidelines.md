---
version: 1.0
name: design-guidelines
description: A general-purpose design system for web apps, mobile apps, SaaS dashboards and marketing surfaces. Built on a neutral high-contrast interactive colour (near-black in light theme, near-white in dark theme), a white or deep-neutral canvas, and a small family of pastel tint surfaces used for feature panels and status chips. Pill-shaped controls are the signature interactive shape; a single geometric sans-serif carries the whole type scale from oversized display headlines down to micro labels. Layout is predominantly flat, with elevation reserved for floating media, menus and modals. Both light and dark themes are defined against the same semantic token names.

fonts:
  display: "Display Sans, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, sans-serif"
  text: "Display Sans, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, sans-serif"
  mono: "SF Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

colors:
  primary: "#1c1c1e"
  primary-pressed: "#2c2c34"
  on-primary: "#ffffff"
  accent: "#ffd02f"
  accent-deep: "#fcb900"
  accent-soft: "#fff4c4"
  accent-on-soft: "#746019"
  link: "#4262ff"
  link-pressed: "#2a41b6"
  focus-ring: "#4262ff"
  tint-amber: "#fff8e0"
  tint-amber-on: "#746019"
  tint-coral: "#ffc6c6"
  tint-coral-on: "#600000"
  tint-rose: "#fde0f0"
  tint-rose-on: "#050038"
  tint-teal: "#c3faf5"
  tint-teal-on: "#187574"
  tint-orange: "#ffe6cd"
  tint-orange-on: "#050038"
  tint-violet: "#f5f3ff"
  tint-violet-on: "#4262ff"
  accent-coral: "#ff9999"
  accent-teal: "#0fbcb0"
  canvas: "#ffffff"
  surface: "#f7f8fa"
  surface-soft: "#fafbfc"
  surface-raised: "#ffffff"
  surface-emphasis: "#f5f3ff"
  surface-inverse: "#1c1c1e"
  on-surface-inverse: "#ffffff"
  on-surface-inverse-muted: "#a5a8b5"
  scrim: "rgba(5, 0, 56, 0.55)"
  hairline: "#e0e2e8"
  hairline-soft: "#eef0f3"
  hairline-strong: "#c7cad5"
  ink-deep: "#050038"
  ink: "#1c1c1e"
  charcoal: "#2c2c34"
  slate: "#555a6a"
  steel: "#6b6f7e"
  stone: "#8e91a0"
  muted: "#a5a8b5"
  success: "#00b473"
  success-soft: "#d9f5e9"
  warning: "#fcb900"
  warning-soft: "#fff4c4"
  danger: "#d13c3c"
  danger-soft: "#fbd4d4"
  danger-border: "#e3c5c5"
  info: "#4262ff"
  info-soft: "#f5f3ff"

colors-dark:
  primary: "#ffffff"
  primary-pressed: "#e2e4e9"
  on-primary: "#16161a"
  accent: "#ffd02f"
  accent-deep: "#fcb900"
  accent-soft: "#3b3008"
  accent-on-soft: "#ffe08a"
  link: "#6d84ff"
  link-pressed: "#4262ff"
  focus-ring: "#6d84ff"
  tint-amber: "#382c07"
  tint-amber-on: "#ffe08a"
  tint-coral: "#4a2020"
  tint-coral-on: "#ffc6c6"
  tint-rose: "#3d2536"
  tint-rose-on: "#fde0f0"
  tint-teal: "#10403d"
  tint-teal-on: "#7fe9e0"
  tint-orange: "#402d18"
  tint-orange-on: "#ffe6cd"
  tint-violet: "#1e2140"
  tint-violet-on: "#a9b6ff"
  accent-coral: "#ff9999"
  accent-teal: "#0fbcb0"
  canvas: "#121214"
  surface: "#1a1a1e"
  surface-soft: "#17171b"
  surface-raised: "#24242b"
  surface-emphasis: "#221f33"
  surface-inverse: "#f4f5f7"
  on-surface-inverse: "#16161a"
  on-surface-inverse-muted: "#5c6070"
  scrim: "rgba(0, 0, 0, 0.65)"
  hairline: "#2c2d34"
  hairline-soft: "#23242a"
  hairline-strong: "#414350"
  ink-deep: "#ffffff"
  ink: "#f4f5f7"
  charcoal: "#e2e4e9"
  slate: "#b3b7c2"
  steel: "#9296a3"
  stone: "#787c8a"
  muted: "#5c6070"
  success: "#2fd08a"
  success-soft: "#10321f"
  warning: "#ffd02f"
  warning-soft: "#382c07"
  danger: "#ff8a8a"
  danger-soft: "#3a1c1c"
  danger-border: "#5a2a2a"
  info: "#6d84ff"
  info-soft: "#1e2140"

typography:
  hero-display:
    fontFamily: "{fonts.display}"
    fontSize: 80px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -2px
  display-lg:
    fontFamily: "{fonts.display}"
    fontSize: 60px
    fontWeight: 500
    lineHeight: 1.10
    letterSpacing: -1.5px
  heading-1:
    fontFamily: "{fonts.display}"
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -1px
  heading-2:
    fontFamily: "{fonts.display}"
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: -0.5px
  heading-3:
    fontFamily: "{fonts.display}"
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.25
  heading-4:
    fontFamily: "{fonts.display}"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.30
  heading-5:
    fontFamily: "{fonts.display}"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.40
  subtitle:
    fontFamily: "{fonts.text}"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.50
  body-md:
    fontFamily: "{fonts.text}"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.50
  body-md-medium:
    fontFamily: "{fonts.text}"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.50
  body-sm:
    fontFamily: "{fonts.text}"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
  body-sm-medium:
    fontFamily: "{fonts.text}"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.50
  caption:
    fontFamily: "{fonts.text}"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.40
  caption-bold:
    fontFamily: "{fonts.text}"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.40
  micro:
    fontFamily: "{fonts.text}"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.40
  micro-uppercase:
    fontFamily: "{fonts.text}"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.40
    letterSpacing: 0.5px
  button-md:
    fontFamily: "{fonts.text}"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.30
  button-lg:
    fontFamily: "{fonts.text}"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.30
  stat-display:
    fontFamily: "{fonts.display}"
    fontSize: 64px
    fontWeight: 500
    lineHeight: 1.10
    letterSpacing: -1.5px
  code:
    fontFamily: "{fonts.mono}"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 20px
  xxxl: 28px
  panel: 32px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 40px
  section-sm: 48px
  section: 64px
  section-lg: 96px
  hero: 120px

elevation:
  level-0: "none"
  level-1: "rgba(5, 0, 56, 0.04) 0px 1px 2px 0px"
  level-2: "rgba(5, 0, 56, 0.06) 0px 4px 12px 0px"
  level-3: "rgba(5, 0, 56, 0.08) 0px 12px 32px -4px"
  level-4: "rgba(5, 0, 56, 0.12) 0px 16px 48px -8px"

elevation-dark:
  level-0: "none"
  level-1: "rgba(0, 0, 0, 0.32) 0px 1px 2px 0px"
  level-2: "rgba(0, 0, 0, 0.40) 0px 4px 12px 0px"
  level-3: "rgba(0, 0, 0, 0.48) 0px 12px 32px -4px"
  level-4: "rgba(0, 0, 0, 0.56) 0px 16px 48px -8px"

motion:
  duration-fast: 120ms
  duration-base: 180ms
  duration-slow: 260ms
  easing-standard: "cubic-bezier(0.2, 0, 0, 1)"
  easing-enter: "cubic-bezier(0, 0, 0.2, 1)"
  easing-exit: "cubic-bezier(0.4, 0, 1, 1)"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.hairline}"
    textColor: "{colors.muted}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "#1c1c1e"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-brand-blue:
    backgroundColor: "{colors.link}"
    textColor: "#ffffff"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    border: "1px solid {colors.hairline-strong}"
  button-inverse:
    backgroundColor: "{colors.on-surface-inverse}"
    textColor: "{colors.surface-inverse}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "#ffffff"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.link}"
    typography: "{typography.body-sm-medium}"
    padding: "0"
  button-icon-circular:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 36px
    border: "1px solid {colors.hairline}"
  button-fab:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: 56px
    shadow: "{elevation.level-3}"
  card-base:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline-soft}"
  card-feature:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.xxxl}"
    padding: "{spacing.xxl}"
    border: "1px solid {colors.hairline-soft}"
  card-tint-amber:
    backgroundColor: "{colors.tint-amber}"
    textColor: "{colors.tint-amber-on}"
    rounded: "{rounded.xxxl}"
    padding: "{spacing.xxl}"
  card-tint-coral:
    backgroundColor: "{colors.tint-coral}"
    textColor: "{colors.tint-coral-on}"
    rounded: "{rounded.xxxl}"
    padding: "{spacing.xxl}"
  card-tint-teal:
    backgroundColor: "{colors.tint-teal}"
    textColor: "{colors.tint-teal-on}"
    rounded: "{rounded.xxxl}"
    padding: "{spacing.xxl}"
  card-tint-rose:
    backgroundColor: "{colors.tint-rose}"
    textColor: "{colors.tint-rose-on}"
    rounded: "{rounded.xxxl}"
    padding: "{spacing.xxl}"
  card-tint-orange:
    backgroundColor: "{colors.tint-orange}"
    textColor: "{colors.tint-orange-on}"
    rounded: "{rounded.xxxl}"
    padding: "{spacing.xxl}"
  card-media:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.xxxl}"
    padding: "0"
    border: "1px solid {colors.hairline-soft}"
  card-stat:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.stat-display}"
    padding: "{spacing.lg}"
  list-row:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    padding: "{spacing.md} {spacing.lg}"
    border: "0 0 1px {colors.hairline-soft} solid"
    minHeight: 56px
  plan-card:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
    border: "1px solid {colors.hairline}"
  plan-card-featured:
    backgroundColor: "{colors.surface-emphasis}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
    border: "2px solid {colors.link}"
  plan-card-inverse:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
  text-input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
    border: "1px solid {colors.hairline-strong}"
    height: 44px
  text-input-focused:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.focus-ring}"
  text-input-error:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.danger}"
  text-input-disabled:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    border: "1px solid {colors.hairline}"
  search-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.steel}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.xs} {spacing.md}"
    height: 40px
    border: "1px solid {colors.hairline}"
  filter-chip:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-medium}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.md}"
    border: "1px solid {colors.hairline-strong}"
  pill-tab:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.steel}"
    typography: "{typography.body-sm-medium}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.md}"
    border: "1px solid {colors.hairline}"
  pill-tab-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    border: "1px solid {colors.primary}"
  toggle-segmented:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "4px"
  badge-accent:
    backgroundColor: "{colors.accent}"
    textColor: "#1c1c1e"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-tag-amber:
    backgroundColor: "{colors.tint-amber}"
    textColor: "{colors.tint-amber-on}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-tag-violet:
    backgroundColor: "{colors.tint-violet}"
    textColor: "{colors.tint-violet-on}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-tag-coral:
    backgroundColor: "{colors.tint-coral}"
    textColor: "{colors.tint-coral-on}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "#ffffff"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.accent-on-soft}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-danger:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.tint-coral-on}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-count:
    backgroundColor: "{colors.accent}"
    textColor: "#1c1c1e"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
  banner-announcement:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    typography: "{typography.body-sm-medium}"
    padding: "{spacing.sm} {spacing.md}"
  banner-inline-info:
    backgroundColor: "{colors.info-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
    border: "1px solid {colors.hairline}"
  data-table:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
  data-table-row:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    padding: "{spacing.md} {spacing.lg}"
    border: "0 0 1px {colors.hairline-soft} solid"
  data-table-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.steel}"
    typography: "{typography.micro-uppercase}"
    padding: "{spacing.sm} {spacing.lg}"
  media-frame:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.xl}"
    padding: "0"
    border: "1px solid {colors.hairline-soft}"
    shadow: "{elevation.level-3}"
  thumbnail-card:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.xl}"
    padding: "{spacing.md}"
    border: "1px solid {colors.hairline}"
  tile:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline-soft}"
  accordion-item:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.md}"
    padding: "{spacing.xl}"
    border: "0 0 1px {colors.hairline} solid"
  logo-wall-item:
    backgroundColor: "transparent"
    textColor: "{colors.steel}"
    typography: "{typography.body-md-medium}"
    padding: "{spacing.lg}"
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.hero-display}"
    rounded: "0"
    padding: "{spacing.hero}"
  cta-banner-inverse:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    rounded: "{rounded.panel}"
    padding: "{spacing.section}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-medium}"
    height: 64px
    border: "0 0 1px {colors.hairline-soft} solid"
  app-bar-mobile:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.heading-5}"
    height: 56px
    padding: "0 {spacing.md}"
    border: "0 0 1px {colors.hairline-soft} solid"
  tab-bar-mobile:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.steel}"
    typography: "{typography.micro}"
    height: 56px
    border: "1px 0 0 {colors.hairline-soft} solid"
  side-nav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.slate}"
    typography: "{typography.body-sm-medium}"
    width: 260px
    padding: "{spacing.md}"
    border: "0 1px 0 0 {colors.hairline-soft} solid"
  side-nav-item-active:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "{spacing.xs} {spacing.sm}"
  modal-sheet:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xxl}"
    padding: "{spacing.xxl}"
    shadow: "{elevation.level-4}"
  dropdown-menu:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xs}"
    border: "1px solid {colors.hairline}"
    shadow: "{elevation.level-4}"
  tooltip:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xxs} {spacing.xs}"
  toast:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "{spacing.sm} {spacing.md}"
    shadow: "{elevation.level-4}"
  skeleton-block:
    backgroundColor: "{colors.hairline-soft}"
    rounded: "{rounded.md}"
  divider:
    backgroundColor: "{colors.hairline}"
    height: 1px
  footer-region:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    typography: "{typography.body-sm}"
    padding: "{spacing.section} {spacing.xxl}"
  footer-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-inverse-muted}"
    typography: "{typography.body-sm}"
    padding: "{spacing.xxs} 0"
  rating-badge:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
    border: "1px solid {colors.hairline}"
  store-badge:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
---

## Overview

This is a general-purpose design system. It is written to be dropped into any product surface — a marketing site, a signed-in web app, a SaaS dashboard, a native mobile app, or a mixture of all four — without changing the token names.

The system is built on three ideas:

1. **A neutral interactive colour, not a coloured one.** The dominant action colour is `{colors.primary}`: near-black in the light theme, near-white in the dark theme. Because the interactive colour is neutral, accents stay free for meaning (status, categories, emphasis) instead of being spent on buttons.
2. **A quiet canvas with loud panels.** Pages sit on a plain canvas (`{colors.canvas}`) with hairline-bordered cards. Emphasis comes from a small family of pastel tint surfaces — amber, coral, teal, rose, orange — used for feature panels, category cards and status chips. Two or three tints in one viewport is the intended rhythm; more reads as noise.
3. **One typeface, one shape language.** A single geometric sans-serif carries everything from an 80px display headline to an 11px label. Every button, tab and badge is a full pill (`{rounded.full}`); every container uses one of nine radius steps chosen by size, not by whim.

**Key characteristics**

- Neutral high-contrast primary action (`{colors.primary}` + `{rounded.full}`) as the dominant interactive element on every surface
- Accent colour (`{colors.accent}`) reserved for identity, announcement bars and tag chips — never a default button fill
- Pastel tint panels (`{colors.tint-amber}`, `{colors.tint-coral}`, `{colors.tint-teal}`, `{colors.tint-rose}`, `{colors.tint-orange}`) at `{rounded.xxxl}` corners
- One type family across all surfaces; weights limited to 400 / 500 / 600
- Predominantly flat: hairline borders do the separating, shadows are reserved for things that genuinely float
- Real product screenshots and UI framing as illustration, in a `media-frame` with `{elevation.level-3}`
- Tiered plan cards plus a dense comparison table for commercial surfaces
- Full-width inverse footer (`footer-region`) with multi-column links

## Theming

Light and dark are two value sets over one set of semantic token names. Components never name a raw hex value; they name a token, so a theme switch needs no component changes.

| Token group | Light theme | Dark theme |
|---|---|---|
| Canvas | `{colors.canvas}` `#ffffff` | `#121214` |
| Raised surface | `#ffffff` | `#24242b` |
| Primary action fill | `#1c1c1e` | `#ffffff` |
| Text on primary | `#ffffff` | `#16161a` |
| Body text | `#1c1c1e` | `#f4f5f7` |
| Hairline | `#e0e2e8` | `#2c2d34` |
| Tint panels | pale, dark text | deep, pale text |
| Link | `#4262ff` | `#6d84ff` |

**Rules for theming**

- **Invert the pair, not just the background.** `{colors.primary}` and `{colors.on-primary}` swap together. A near-black button on a dark canvas disappears; a near-white button on it reads as clearly as the black one did on white.
- **Elevate with surface, not with shadow, in dark mode.** In light theme, depth reads through shadow; in dark theme, shadows are nearly invisible, so raised layers step up in lightness (`{colors.canvas}` → `{colors.surface-raised}`) and keep only a soft shadow from `elevation-dark`.
- **Re-cut tints, don't dim them.** Dark-theme tints are deep, desaturated versions of the same hue with a pale foreground, e.g. `{colors.tint-teal}` `#c3faf5` on light becomes `#10403d` with `#7fe9e0` text. Never render a pale pastel panel on a dark canvas.
- **Hold the accent hue.** `{colors.accent}` stays the same value in both themes; it is the one anchor a user recognises across a theme switch. Its *soft* variant flips (`#fff4c4` → `#3b3008`).
- **Lighten saturated blues on dark.** Mid-tone blues lose contrast against a dark canvas, so `{colors.link}` lifts from `#4262ff` to `#6d84ff`.
- **Follow the platform, then allow an override.** Default to the OS or browser preference (`prefers-color-scheme`), and offer an explicit Light / Dark / System control in settings.
- **Test both themes at every step.** Any new component must be checked against both value sets before it is considered done.

## Colors

### Interactive

- **Primary** (`{colors.primary}`): the dominant action fill; neutral by design so accents stay meaningful
- **Primary Pressed** (`{colors.primary-pressed}`): pressed and active state of the primary fill
- **On Primary** (`{colors.on-primary}`): label colour on a primary fill
- **Link** (`{colors.link}`): inline text links, selected-state borders, focus emphasis
- **Link Pressed** (`{colors.link-pressed}`): pressed state for links and blue fills
- **Focus Ring** (`{colors.focus-ring}`): keyboard focus outline, 2px, offset 2px

### Accent & tints

- **Accent** (`{colors.accent}`): the identity colour — logo, announcement bar, tag chips, small emphasis moments
- **Accent Deep** (`{colors.accent-deep}`): darker accent for pressed states and text-safe emphasis
- **Accent Soft** (`{colors.accent-soft}`) / **Accent On Soft** (`{colors.accent-on-soft}`): pale accent background and its readable foreground pair
- **Tint Amber / Coral / Teal / Rose / Orange / Violet**: pastel panel and chip backgrounds. Each tint ships with an `-on` foreground token; always use the pair, never guess a text colour on a tint
- **Accent Coral** (`{colors.accent-coral}`) and **Accent Teal** (`{colors.accent-teal}`): saturated versions of two tints, for illustration, charts and small graphic marks

### Surface

- **Canvas** (`{colors.canvas}`): the page or screen background
- **Surface** (`{colors.surface}`): quiet section bands, input rest states, side navigation
- **Surface Soft** (`{colors.surface-soft}`): the faintest section division
- **Surface Raised** (`{colors.surface-raised}`): cards, sheets, menus — anything sitting above the canvas
- **Surface Emphasis** (`{colors.surface-emphasis}`): a highlighted container, such as the recommended plan card
- **Surface Inverse** (`{colors.surface-inverse}`) / **On Surface Inverse** (`{colors.on-surface-inverse}`): the reversed band used for footers, dark CTAs, toasts and tooltips
- **Scrim** (`{colors.scrim}`): overlay behind modals and over photography
- **Hairline** (`{colors.hairline}`): default 1px borders and dividers
- **Hairline Soft** (`{colors.hairline-soft}`): quieter dividers, table rows, card edges
- **Hairline Strong** (`{colors.hairline-strong}`): input borders and outlined buttons, where the edge must be findable

### Text

Six steps, applied by role rather than by taste:

- **Ink Deep** (`{colors.ink-deep}`): headlines on tint panels
- **Ink** (`{colors.ink}`): primary headlines and body text
- **Charcoal** (`{colors.charcoal}`): emphasised body text
- **Slate** (`{colors.slate}`): secondary text, metadata, descriptions
- **Steel** (`{colors.steel}`): tertiary text, inactive tabs, footer links
- **Stone** (`{colors.stone}`): captions and muted labels
- **Muted** (`{colors.muted}`): placeholders and disabled labels only — never for content a user has to read

### Semantic

- **Success** (`{colors.success}`) / **Success Soft** (`{colors.success-soft}`)
- **Warning** (`{colors.warning}`) / **Warning Soft** (`{colors.warning-soft}`)
- **Danger** (`{colors.danger}`) / **Danger Soft** (`{colors.danger-soft}`) / **Danger Border** (`{colors.danger-border}`)
- **Info** (`{colors.info}`) / **Info Soft** (`{colors.info-soft}`)

Strong tokens are for fills, icons and 1px borders. Soft tokens are for message backgrounds, with `{colors.ink}` or the matching strong token as foreground. Colour never carries a status alone — pair it with an icon or a word.

## Typography

### Font family

One family does all the work. Pick a geometric or neo-grotesque sans-serif with a slightly rounded character, a real 500 weight, and tight apertures at display sizes — the scale below depends on having 400, 500 and 600 available. Declare it once as `{fonts.display}` and `{fonts.text}`; a monospace family (`{fonts.mono}`) is added only for code, IDs and numeric alignment.

Always ship a fallback stack so the layout does not shift if the webfont fails: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, sans-serif`.

If a second family is introduced later, make it clearly different from the first — a near-identical second sans-serif adds weight to the page and reads as an accident.

### Hierarchy

| Token | Size | Weight | Line height | Letter spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 80px | 500 | 1.05 | -2px | Marketing hero headline |
| `{typography.display-lg}` | 60px | 500 | 1.10 | -1.5px | Major section openers |
| `{typography.heading-1}` | 48px | 500 | 1.15 | -1px | Page-level headlines |
| `{typography.heading-2}` | 36px | 500 | 1.20 | -0.5px | Subsection headlines |
| `{typography.heading-3}` | 28px | 500 | 1.25 | 0 | Card and panel titles |
| `{typography.heading-4}` | 22px | 500 | 1.30 | 0 | Tile titles, modal titles |
| `{typography.heading-5}` | 18px | 500 | 1.40 | 0 | Small card titles, accordion questions, mobile app bar |
| `{typography.subtitle}` | 18px | 400 | 1.50 | 0 | Hero and section subtitles |
| `{typography.body-md}` | 16px | 400 | 1.50 | 0 | Primary body text, form values |
| `{typography.body-md-medium}` | 16px | 500 | 1.50 | 0 | Emphasised body, list titles |
| `{typography.body-sm}` | 14px | 400 | 1.50 | 0 | Secondary body, table cells, footer links |
| `{typography.body-sm-medium}` | 14px | 500 | 1.50 | 0 | Nav links, chips, dropdown labels |
| `{typography.caption}` | 13px | 400 | 1.40 | 0 | Helper text, timestamps |
| `{typography.caption-bold}` | 13px | 600 | 1.40 | 0 | Badge and chip labels |
| `{typography.micro}` | 12px | 500 | 1.40 | 0 | Microcopy, mobile tab labels |
| `{typography.micro-uppercase}` | 11px | 600 | 1.40 | 0.5px | Table section dividers, column headers |
| `{typography.button-md}` | 14px | 500 | 1.30 | 0 | Standard button labels |
| `{typography.button-lg}` | 16px | 500 | 1.30 | 0 | Large and full-width mobile buttons |
| `{typography.stat-display}` | 64px | 500 | 1.10 | -1.5px | Metric and stat callouts |
| `{typography.code}` | 13px | 400 | 1.50 | 0 | Code, IDs, keys |

### Principles

- **Tight display leading.** Large headlines use 1.05–1.20; body text stays at 1.50. Display type set at body leading looks slack, and body type set at display leading is hard to read.
- **Negative tracking that decays with size.** -2px at 80px, -1.5px at 60px, -1px at 48px, -0.5px at 36px, then 0 at 28px and below. Small text never gets negative tracking.
- **Three weights only.** 400 for body, 500 for medium emphasis and all headings, 600 for badges and uppercase labels. Bold headline weights (700+) are not part of this system; hierarchy comes from size, not weight.
- **Uppercase is structural.** `{typography.micro-uppercase}` labels a table section or a data column. It is not a decorative label above every heading.
- **Body measure under 80 characters.** Constrain long-form containers to roughly 60–75 characters per line rather than letting text run the full container width.
- **Numerals.** Use tabular figures for tables, prices and dashboards so columns do not jitter; proportional figures elsewhere.

## Layout

### Spacing system

- **Base unit:** 4px, with 8px as the working increment
- **Tokens:** `{spacing.xxs}` (4px) · `{spacing.xs}` (8px) · `{spacing.sm}` (12px) · `{spacing.md}` (16px) · `{spacing.lg}` (20px) · `{spacing.xl}` (24px) · `{spacing.xxl}` (32px) · `{spacing.xxxl}` (40px) · `{spacing.section-sm}` (48px) · `{spacing.section}` (64px) · `{spacing.section-lg}` (96px) · `{spacing.hero}` (120px)
- **Section rhythm:** marketing sections use `{spacing.section-lg}` (96px); dense commercial or data sections tighten to `{spacing.section}` (64px); stacked lists use `{spacing.xxl}` (32px)
- **Card padding:** `{spacing.xl}` (24px) for compact cards, `{spacing.xxl}` (32px) for feature panels, `{spacing.md}` (16px) for mobile cards
- **App screen padding:** `{spacing.md}` (16px) horizontal on mobile, `{spacing.xxl}` (32px) on desktop app shells

### Grid & container

- **Marketing:** 1280px max content width, 32px gutters, 12-column grid
- **App shell:** fixed `side-nav` at 260px plus a fluid content area with a 1440px max width
- **Content-first pages** (articles, settings, forms): 720px max text column
- **Card grids:** 4-up desktop → 3-up small desktop → 2-up tablet → 1-up mobile; `{spacing.xl}` (24px) gap desktop, `{spacing.md}` (16px) mobile
- **Tiered plan grids:** up to four cards in a row at desktop, with the recommended tier using `plan-card-featured`
- **Mobile app:** single column with `app-bar-mobile` fixed on top and `tab-bar-mobile` fixed at the bottom; respect safe-area insets on both

### Whitespace philosophy

Give marketing surfaces generous air — `{spacing.hero}` (120px) around a hero lets a small logo and a short headline carry a whole screen. Functional surfaces invert this: dashboards, tables and settings pages tighten to `{spacing.md}`–`{spacing.xl}` so more decisions fit in one view. The same product can be spacious on the way in and dense once someone is working.

## Elevation & Depth

The system is flat by default. Borders separate; shadows only appear on things that genuinely float above the page.

| Level | Light theme | Dark theme | Use |
|---|---|---|---|
| 0 (flat) | no shadow, `{colors.hairline-soft}` border | same, `{colors.hairline}` border | Default cards, rows, inputs, tiles |
| 1 (subtle) | `{elevation.level-1}` | `rgba(0, 0, 0, 0.32) 0px 1px 2px 0px` | Interactive tiles that lift on pointer |
| 2 (card) | `{elevation.level-2}` | `rgba(0, 0, 0, 0.40) 0px 4px 12px 0px` | Detached cards, sticky bars, mobile cards |
| 3 (floating media) | `{elevation.level-3}` | `rgba(0, 0, 0, 0.48) 0px 12px 32px -4px` | `media-frame` screenshots, floating action button |
| 4 (overlay) | `{elevation.level-4}` | `rgba(0, 0, 0, 0.56) 0px 16px 48px -8px` | Modals, sheets, dropdowns, toasts |

Notes:

- Light-theme shadows are tinted toward the deep ink hue rather than pure black, which keeps them from looking grey and dirty over coloured surfaces.
- In dark theme, add one lightness step of surface *before* adding a shadow; shadow alone will not read.
- Tint panels carry their own visual weight through colour and take no shadow.
- Media over photography uses `{colors.scrim}` rather than a shadow to hold text legibility.

## Shapes

### Border radius scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Micro-controls, checkbox, small chips |
| `{rounded.sm}` | 6px | Count badges, tooltips |
| `{rounded.md}` | 8px | Inputs, search fields, ghost buttons, menu items |
| `{rounded.lg}` | 12px | Standard cards, dropdown menus, toasts |
| `{rounded.xl}` | 16px | Feature cards, plan cards, media frames, thumbnails |
| `{rounded.xxl}` | 20px | Large cards, modal sheets, mobile bottom sheets |
| `{rounded.xxxl}` | 28px | Tint feature panels, media story cards |
| `{rounded.panel}` | 32px | Full-width CTA panels |
| `{rounded.full}` | 9999px | Every button, pill tab, chip, avatar and status badge |

Rule of thumb: radius scales with the size of the container. A 28px radius on a 40px chip looks broken, and an 8px radius on a 600px panel looks unfinished. Pick the step nearest the container's scale and stay on the scale.

### Media & imagery geometry

- Product screenshots and UI captures render in a `media-frame`: `{rounded.xl}` corners, hairline border, `{elevation.level-3}`
- Editorial or story cards use `{rounded.xxxl}` with full-bleed imagery and no internal padding
- Thumbnails use `{rounded.xl}`; avatars use `{rounded.full}`
- Logo walls present marks at one consistent optical height (around 100px desktop, 60px mobile) rather than one consistent width
- Prefer real product UI and real photography over generic stock imagery; if illustration is needed, build it from the tint palette so it belongs to the system

## Motion

Motion explains change. It is not decoration.

- **Durations:** `{motion.duration-fast}` (120ms) for state changes such as pressed, checked or focused; `{motion.duration-base}` (180ms) for menus, tooltips, accordions and toasts; `{motion.duration-slow}` (260ms) for sheets, modals and page-level transitions
- **Easing:** `{motion.easing-standard}` for most transitions, `{motion.easing-enter}` for elements arriving, `{motion.easing-exit}` for elements leaving
- **Properties:** animate `opacity` and `transform` only; avoid animating layout properties like width, height or top
- **Restraint:** one orchestrated moment per screen beats a fade-and-rise on every section. Scroll-triggered entrances on every block read as generic
- **Accessibility:** honour `prefers-reduced-motion` by cutting to the end state, keeping only opacity changes

## Components

Each component lists its default state. Where a state is interactive, define **default**, **hover** (pointer devices only), **pressed**, **focused**, and **disabled** — hover is skipped entirely on touch, so no meaning may live in a hover-only state.

### Buttons

**`button-primary`** — the dominant action on every surface.
- Background `{colors.primary}`, text `{colors.on-primary}`, typography `{typography.button-md}`, padding `12px 24px`, rounded `{rounded.full}`.
- Pressed: `button-primary-pressed`, background `{colors.primary-pressed}`.
- Disabled: `button-primary-disabled`, background `{colors.hairline}`, text `{colors.muted}`.
- One primary per view. If two actions look equally primary, one of them is secondary.

**`button-accent`** — accent-filled pill for identity-led moments such as a promo bar CTA.
- Background `{colors.accent}`, dark text, typography `{typography.button-md}`, padding `12px 24px`, rounded `{rounded.full}`.

**`button-brand-blue`** — blue pill for inline action callouts and links that need a filled treatment.
- Background `{colors.link}`, text white, padding `12px 24px`, rounded `{rounded.full}`.

**`button-secondary`** — outlined pill for the alternative action.
- Transparent background, text `{colors.ink}`, border `1px solid {colors.hairline-strong}`, padding `12px 24px`, rounded `{rounded.full}`.

**`button-inverse`** — light pill used on inverse bands and dark CTA panels.
- Background `{colors.on-surface-inverse}`, text `{colors.surface-inverse}`, padding `12px 24px`, rounded `{rounded.full}`.

**`button-danger`** — destructive confirmation only, never a default state.
- Background `{colors.danger}`, text white, padding `12px 24px`, rounded `{rounded.full}`.

**`button-ghost`** — quiet rectangular action for toolbars and dense rows.
- Transparent background, text `{colors.ink}`, padding `8px 12px`, rounded `{rounded.md}`.

**`button-link`** — inline text action.
- Text `{colors.link}`, typography `{typography.body-sm-medium}`, no padding.

**`button-icon-circular`** — 36×36px circular utility button (44×44px on touch).
- Background `{colors.canvas}`, icon `{colors.ink}`, border `1px solid {colors.hairline}`, rounded `{rounded.full}`.

**`button-fab`** — 56px floating action button for mobile primary actions.
- Background `{colors.primary}`, icon `{colors.on-primary}`, rounded `{rounded.full}`, shadow `{elevation.level-3}`.

Mobile note: primary buttons go full-width at 48–52px height with `{typography.button-lg}`, anchored above the safe area.

### Cards & containers

**`card-base`** — the default content card. Background `{colors.surface-raised}`, rounded `{rounded.xl}`, padding `{spacing.xl}`, border `1px solid {colors.hairline-soft}`.

**`card-feature`** — larger white feature panel. Rounded `{rounded.xxxl}`, padding `{spacing.xxl}`.

**`card-tint-amber` / `card-tint-coral` / `card-tint-teal` / `card-tint-rose` / `card-tint-orange`** — tint feature panels. Background from the tint token, text from its paired `-on` token, rounded `{rounded.xxxl}`, padding `{spacing.xxl}`. Mix tint panels with white panels in the same viewport so the colour reads as emphasis rather than as wallpaper.

**`card-media`** — image-led card. Rounded `{rounded.xxxl}`, padding `0` so the image fills the frame, hairline border.

**`card-stat`** — metric callout. Transparent background, typography `{typography.stat-display}`, padding `{spacing.lg}`, with a `{typography.body-sm}` label beneath.

**`list-row`** — the workhorse row for settings, inboxes and mobile lists. Background `{colors.surface-raised}`, padding `{spacing.md} {spacing.lg}`, bottom border `1px solid {colors.hairline-soft}`, min-height 56px.

**`plan-card` / `plan-card-featured` / `plan-card-inverse`** — tiered commercial cards.
- Standard: background `{colors.surface-raised}`, rounded `{rounded.xl}`, padding `{spacing.xxl}`, border `1px solid {colors.hairline}`.
- Featured: background `{colors.surface-emphasis}`, border `2px solid {colors.link}`.
- Inverse: background `{colors.surface-inverse}`, text `{colors.on-surface-inverse}` — for the top tier or a contact-sales tier.

**`tile`** — compact category or navigation tile. Rounded `{rounded.xl}`, padding `{spacing.xl}`, hairline-soft border.

**`thumbnail-card`** — image thumbnail with a short label. Rounded `{rounded.xl}`, padding `{spacing.md}`.

### Inputs & forms

**`text-input`** — background `{colors.surface-raised}`, text `{colors.ink}`, border `1px solid {colors.hairline-strong}`, rounded `{rounded.md}`, padding `{spacing.sm} {spacing.md}`, height 44px.
- **Focused** (`text-input-focused`): border `2px solid {colors.focus-ring}`.
- **Error** (`text-input-error`): border `2px solid {colors.danger}`, with a `{typography.caption}` message in `{colors.danger}` beneath — never colour alone.
- **Disabled** (`text-input-disabled`): background `{colors.surface}`, text `{colors.muted}`.
- Labels sit above the field in `{typography.body-sm-medium}`; helper text sits below in `{typography.caption}` `{colors.stone}`. Placeholders never replace labels.

**`search-field`** — background `{colors.surface}`, text `{colors.steel}`, rounded `{rounded.md}`, height 40px, hairline border.

**`filter-chip`** — pill-shaped filter or dropdown trigger. Background `{colors.surface-raised}`, typography `{typography.body-sm-medium}`, rounded `{rounded.full}`, border `1px solid {colors.hairline-strong}`.

**`toggle-segmented`** — two-or-three-state pill switch (for example a billing period or a view mode). Track `{colors.surface}`, rounded `{rounded.full}`, padding `4px`; the active segment uses the `pill-tab-active` treatment.

### Tabs & navigation

**`pill-tab` / `pill-tab-active`** — pill tab set.
- Inactive: background `{colors.surface-raised}`, text `{colors.steel}`, border `1px solid {colors.hairline}`.
- Active: background `{colors.primary}`, text `{colors.on-primary}`.

**`top-nav`** — sticky marketing or app header, 64px, background `{colors.canvas}`, bottom hairline. Logo left, links centre or left, actions right ending in a `button-primary`.

**`app-bar-mobile`** — 56px mobile header: back or menu icon, `{typography.heading-5}` title, up to two trailing icon actions.

**`tab-bar-mobile`** — 56px bottom bar with three to five destinations; icon plus `{typography.micro}` label, active item in `{colors.ink}` and inactive in `{colors.steel}`. Sits above the safe-area inset.

**`side-nav`** — 260px app sidebar, background `{colors.surface}`, item labels `{typography.body-sm-medium}` `{colors.slate}`; the active item uses `side-nav-item-active` (raised surface, `{rounded.md}`, `{colors.ink}` text).

### Badges & status

**`badge-accent`** — accent chip for announcements and highlights. Rounded `{rounded.full}`, padding `4px 10px`, typography `{typography.caption-bold}`.

**`badge-tag-amber` / `badge-tag-violet` / `badge-tag-coral`** — categorical tag chips using a tint background and its paired foreground.

**`badge-success` / `badge-warning` / `badge-danger`** — status chips. Success is a filled strong token with white text; warning and danger use soft backgrounds with dark paired text. Always include a word or icon alongside the colour.

**`badge-count`** — small rectangular counter, rounded `{rounded.sm}`, padding `2px 6px`.

**`banner-announcement`** — full-width strip above the header: background `{colors.surface-inverse}`, text `{colors.on-surface-inverse}`, typography `{typography.body-sm-medium}`, padding `{spacing.sm} {spacing.md}`, optionally carrying an inline accent pill. Dismissible, and never stacked two deep.

**`banner-inline-info`** — in-page message block: background `{colors.info-soft}`, hairline border, rounded `{rounded.md}`. Swap the background token for the warning, danger or success soft variant as needed.

### Tables

**`data-table`** — background `{colors.surface-raised}`, typography `{typography.body-sm}`, rounded `{rounded.md}`, border `1px solid {colors.hairline}`.

**`data-table-header`** — background `{colors.surface}`, text `{colors.steel}`, typography `{typography.micro-uppercase}`, padding `{spacing.sm} {spacing.lg}`. Sticky on long tables.

**`data-table-row`** — padding `{spacing.md} {spacing.lg}`, bottom border `1px solid {colors.hairline-soft}`. Long comparison tables break into labelled sections using a `{typography.micro-uppercase}` divider row.

Numeric columns are right-aligned with tabular figures; text columns are left-aligned. Long tables become horizontally scrollable below tablet, with the first column pinned.

### Overlays & feedback

**`modal-sheet`** — background `{colors.surface-raised}`, rounded `{rounded.xxl}`, padding `{spacing.xxl}`, shadow `{elevation.level-4}`, over a `{colors.scrim}` backdrop. Centred dialog on desktop; bottom sheet with a drag handle and top-only corners on mobile.

**`dropdown-menu`** — background `{colors.surface-raised}`, rounded `{rounded.lg}`, padding `{spacing.xs}`, hairline border, shadow `{elevation.level-4}`; items at `{rounded.md}` with `{spacing.xs} {spacing.sm}` padding.

**`tooltip`** — inverse surface, `{typography.caption}`, rounded `{rounded.sm}`. Pointer devices only; never the sole carrier of information.

**`toast`** — inverse surface, rounded `{rounded.lg}`, shadow `{elevation.level-4}`. Bottom-centre on desktop, top or bottom on mobile clear of the tab bar. One line, one optional action.

**`skeleton-block`** — background `{colors.hairline-soft}`, rounded `{rounded.md}`, shaped like the content it replaces. Use skeletons for content areas and a spinner only for short indeterminate waits.

**Empty states** — an illustration or icon on a tint panel, a `{typography.heading-4}` line saying what would be here, one `{typography.body-sm}` `{colors.slate}` line of guidance, and one `button-primary` action.

### Marketing & content

**`hero-band`** — background `{colors.canvas}`, padding `{spacing.hero}`. Centred or left-aligned headline in `{typography.hero-display}`, `{typography.subtitle}` support line, a button row of `button-primary` plus `button-secondary`, then a `media-frame` below.

**`cta-banner-inverse`** — closing CTA panel: background `{colors.surface-inverse}`, rounded `{rounded.panel}`, padding `{spacing.section}`, centred headline, subtitle and `button-inverse`.

**`accordion-item`** — background `{colors.surface-raised}`, rounded `{rounded.md}`, padding `{spacing.xl}`, bottom border `1px solid {colors.hairline}`; question in `{typography.heading-5}`, answer in `{typography.body-md}`.

**`logo-wall-item`** — transparent cell, marks rendered in `{colors.steel}` at one optical height, padding `{spacing.lg}`.

**`media-frame`** — the standard product-screenshot frame: rounded `{rounded.xl}`, hairline border, shadow `{elevation.level-3}`.

**`rating-badge`** and **`store-badge`** — small bordered pills for review scores and app store links, rounded `{rounded.md}`, padding `{spacing.sm} {spacing.md}`.

**`footer-region`** — inverse full-width footer, padding `{spacing.section} {spacing.xxl}`, four to six link columns with `{typography.body-md-medium}` headings and `footer-link` items in `{colors.on-surface-inverse-muted}`. Legal line, locale switcher and store badges sit in a bottom row.

**`divider`** — 1px `{colors.hairline}` rule. Use it to group, not to fill space.

## Do's and Don'ts

### Do

- Keep `{colors.primary}` as the dominant action colour on every surface, in both themes
- Reserve `{colors.accent}` for identity, announcement bars and tag chips
- Use tint panels in pairs or threes alongside white panels, at `{rounded.xxxl}`
- Apply `{rounded.full}` to every button, pill tab, chip and status badge
- Use a tint background together with its paired `-on` foreground token, always
- Define both light and dark values for any new token, and check both before shipping
- Let hairlines separate content, and reserve shadows for overlays and floating media
- Keep one type family, three weights, and the published scale
- Show real product UI in a `media-frame` rather than generic stock imagery
- Match tap target size to the platform: 44×44px minimum, 48×48px on Android

### Don't

- Don't fill standard CTAs with `{colors.accent}`, or use it across large background areas
- Don't introduce accent hues outside the accent plus tint family
- Don't soften button corners below `{rounded.full}` — the pill is the shape signature
- Don't drop hero leading below 1.05, or apply negative tracking to text under 28px
- Don't put a pale pastel panel on a dark canvas, or a near-black button on one
- Don't rely on shadow alone for depth in dark theme
- Don't use `{colors.muted}` for content a user needs to read; it is for placeholders and disabled states
- Don't put meaning in a hover-only state, or in colour without a word or icon
- Don't stack radii arbitrarily — a card at `{rounded.xl}` should not hold a child at `{rounded.xxxl}`
- Don't animate layout properties, and don't add scroll entrances to every section

## Responsive Behavior

### Breakpoints

| Name | Width | Key changes |
|---|---|---|
| Mobile (small) | < 480px | Single column. Hero at 36px. Nav collapses to a hamburger or tab bar. Tiers and cards stack 1-up. Buttons go full-width. |
| Mobile (large) | 480–767px | Card grids 2-up. Hero at 48px. |
| Tablet | 768–1023px | 2-column grids. Pill tabs return. Side nav becomes a drawer. |
| Desktop | 1024–1279px | Up to 4 tier cards in a row, 3-up card grids, persistent side nav. Hero at 64px. |
| Wide desktop | ≥ 1280px | Full 1280px container, 80px hero display, 4-up grids. |

### Touch targets

- Pill buttons render at 40–44px effective height on pointer devices and 48px on touch
- Circular icon buttons: 36×36px desktop, 44×44px touch
- Form inputs and list rows: 44px and 56px minimum respectively
- Filter chips: about 36px desktop, 44px touch
- Keep at least 8px between adjacent targets

### Collapsing strategy

- **Announcement banner:** stays full-width, truncates below 480px, always dismissible
- **Top nav:** collapses to a hamburger below 1024px; on mobile apps it is replaced by `app-bar-mobile` plus `tab-bar-mobile`
- **Side nav:** 260px persistent at desktop → icon rail at tablet → overlay drawer at mobile
- **Hero:** 2-column becomes stacked below 1024px, with the media frame moving beneath the copy
- **Tier grids:** 4-column → 2-column tablet → 1-column mobile, recommended tier first
- **Comparison tables:** horizontal scroll with a pinned first column below tablet, or a per-tier accordion
- **Card grids:** 4-up → 3-up → 2-up → 1-up
- **Type scale:** 80px → 60px tablet → 48px large mobile → 36px small mobile; body stays at 16px everywhere
- **Footer:** 6-column → 3-column tablet → 2-column mobile → accordion at small mobile
- **Modals:** centred dialog on desktop, full-height or bottom sheet on mobile

### Image behavior

- Media frames keep their aspect ratio and lazy-load below the fold
- Editorial imagery uses a 16:9 ratio with full-bleed scaling inside `{rounded.xxxl}` corners
- Serve 1x/2x/3x assets and reserve the space before load to avoid layout shift
- Provide theme-specific assets where an illustration or screenshot would not survive a theme flip

## Accessibility

- **Contrast:** body text meets at least 4.5:1 against its background, large display text at least 3:1, and interface borders and icons at least 3:1 — in both themes. `{colors.stone}` and `{colors.muted}` are safe on `{colors.canvas}` and `{colors.surface}` only, not on tint panels.
- **Accent text:** `{colors.accent}` is a background colour, not a text colour. Use `{colors.accent-on-soft}` on `{colors.accent-soft}` and `{colors.ink}` on `{colors.accent}`.
- **Focus:** every interactive element shows a visible 2px `{colors.focus-ring}` outline at 2px offset. Focus is never removed without a replacement.
- **Semantics:** headings run in order, buttons are buttons and links are links, icon-only controls carry an accessible label.
- **Status:** never colour alone — pair with an icon, a word, or both.
- **Motion:** honour `prefers-reduced-motion`.
- **Text scaling:** layouts survive 200% text zoom and platform large-text settings without clipping; avoid fixed-height text containers.

## Iteration Guide

1. Work on one component at a time, and name tokens rather than raw values.
2. Add every new variant as its own `components:` entry instead of overriding an existing one inline.
3. Any new colour needs a light value, a dark value and a checked contrast pair before it enters the system.
4. Default to `{typography.body-md}` for body copy and `{typography.subtitle}` for emphasis; reach up the scale only for genuine headings.
5. Keep `{colors.accent}` confined to identity, announcement bars and tag chips.
6. Pill shape (`{rounded.full}`) on all buttons, tabs and badges; container radius chosen by container size.
7. Review each change at 375px, 768px and 1440px, in both themes, before considering it done.
8. If a new token duplicates an existing one within a step or two, use the existing one — a small scale that is actually followed beats a large one that is not.

## Known Gaps

- Chart and data-visualisation palettes are not defined; derive a categorical series from the tint hues and check it for colour-blind safety
- Icon set, stroke weight and optical sizes are not specified; assume a 24px grid with a 1.5–2px stroke
- Illustration style beyond the tint palette is undefined
- High-contrast and forced-colours modes are not covered
- Right-to-left mirroring rules are not documented
- Density modes (comfortable vs compact) for data-heavy tables are not covered
- Motion values are recommendations rather than measured; confirm them against the platform's own conventions
- Localisation headroom for long strings in buttons and tabs is untested
