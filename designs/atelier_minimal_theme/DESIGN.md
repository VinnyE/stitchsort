# Design System: The Tailored Atelier

## 1. Overview & Creative North Star

**Creative North Star: The Tailored Atelier**

This design system moves away from the "industrial utility" of standard e-commerce and into the curated, tactile world of a master artisan. The objective is to evoke the feeling of a sunlit, organized sewing studio—where every tool has a place, and every choice is intentional.

We break the "template" look by treating the UI as a digital editorial piece. We embrace **The Luxury of Space**, using generous white space (`spacing-12` to `spacing-24`) not as a void, but as a core trust signal. Layouts should favor intentional asymmetry—for example, pairing a high-contrast `display-lg` headline with a condensed `body-md` column—to create a sophisticated, non-linear flow that mimics a premium lookbook.

---

## 2. Colors & Surface Philosophy

The palette is rooted in the warmth of natural materials: the cream of unbleached linen (`surface`), the deep mineral tone of `primary`, and the earthy grit of `secondary`.

### The "No-Line" Rule

To achieve a high-end feel, this system **prohibits 1px solid borders for sectioning.** Structural boundaries must be defined through background color shifts. A section intended to stand out should move from `surface` to `surface-container-low` or `surface-container-high`.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers. We use tonal layering to define importance:

- **Base:** `surface` (#fcf9f4) – The "Alabaster" floor of the workshop.
- **Sections:** `surface-container-low` (#f6f3ee) – Used for large logical groupings.
- **Interactive Cards:** `surface-container-highest` (#e5e2dd) – To denote the highest level of prominence.
- **The Glass Rule:** For floating elements like navigation bars or filter drawers, use semi-transparent `surface` with a `20px` backdrop blur. This ensures the "sunlit" vibe persists even when the UI is layered.

### Signature Gradients

For primary CTAs or Hero sections, apply a subtle linear gradient from `primary` (#076767) to `primary_container` (#308080) at a 135-degree angle. This adds "soul" and depth that prevents the interface from feeling flat or sterile.

---

## 3. Typography: The Editorial Voice

Our typography pairings balance the authoritative weight of a heritage brand with the modern clarity of a tech tool.

- **Headings (Newsreader/Serif):** Used for storytelling and brand-led moments. High-contrast scales (e.g., `display-lg` at 3.5rem) provide an editorial rhythm that feels premium and curated.
- **Body (Inter/Sans-Serif):** The workhorse. Used for technical specs and machine recommendations. Its neutrality provides the "low noise" required for high-trust decision making.

**Hierarchy Tip:** Always pair a `display-md` headline with a `label-md` uppercase tag above it to create a "Title & Subtitle" lockup that feels like a magazine layout.

---

## 4. Elevation & Depth

We eschew traditional drop shadows in favor of **Tonal Elevation.**

- **The Layering Principle:** Depth is achieved by "stacking" the surface-container tiers. Place a `surface_container_lowest` card atop a `surface_container_low` background to create a soft, natural lift.
- **Ambient Shadows:** If a floating effect is required (e.g., a "Match Found" modal), use a shadow with a `32px` blur and `4%` opacity, tinted with the `secondary` (#8a4f34) color to mimic natural, warm ambient light.
- **The Ghost Border:** If a boundary is strictly required for accessibility, use the `outline_variant` at **20% opacity**. Never use 100% opaque borders; they clutter the "Clean Workshop."

---

## 5. Components

### Buttons: The Tactile Touch

- **Primary:** A solid fill of `primary` (#076767) with `on_primary` text. Radius: `4px` (rounded-sm).
- **Secondary:** A "Ghost" style. No fill, but a `ghost border` (outline-variant at 20%) with `primary` text.
- **Interaction:** On hover, primary buttons should shift to `primary_container`.

### Cards & Recommendations

- **Structure:** No divider lines. Use `spacing-6` (2rem) of vertical white space to separate the product image from its description.
- **Surface:** Use `surface_container_low`. On hover, transition to `surface_container_high` with a subtle `2px` upward translation.

### Input Fields: The Minimalist Tool

- **Style:** Subtle `surface_container_highest` background with no border.
- **Focus State:** A 1px `primary` border appears only on focus, signaling active "work" is being done.

### Signature Component: The "Thread" Progress Tracker

Instead of a standard bar, use a 1.5px `secondary` (Clay) line with `primary` (Teal) dots at milestones, mimicking a line of stitching moving through fabric.

---

## 6. Do's and Don'ts

### Do

- **Do** use asymmetrical layouts (e.g., 60/40 splits) to create visual interest.
- **Do** use `secondary_container` (#ffb191) for "Tip" or "Pro Advice" callouts to add warmth.
- **Do** ensure all icons use a consistent 1.5px stroke to match the "delicate but durable" feel of a sewing needle.

### Don't

- **Don't** use 100% Black (#000000). Use `on_surface` (#1c1c19) for all text to maintain the "Dark Graphite" softness.
- **Don't** use standard 1px borders to separate list items; use `spacing-3` (1rem) of clear space instead.
- **Don't** use heavy animations. Transitions should be "Slow & Intentional" (300ms ease-out), reflecting the pace of craftsmanship.
