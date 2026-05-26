# Noreina Studio — Jaw-Dropping Upgrade Strategy (2026/27)

> **Client outcome we are designing for:**  
> *"If they built **this** for themselves, they can build whatever we ask."*

This document is the execution blueprint. It builds on [`UPGRADE.md`](./UPGRADE.md), reflects what is **already in the repo**, and defines what still separates you from a **premium studio** experience—not just a polished developer portfolio.

---

## 1. What you have today (honest audit)

### Stack & architecture

| Layer | Current state |
|--------|----------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS 4, shadcn/ui primitives, custom brand tokens in `globals.css` |
| **Motion** | GSAP + ScrollTrigger, Framer Motion, Lenis smooth scroll |
| **3D / WebGL** | `@react-three/fiber`, `ParticleField`, `GradientMesh`, shader experiments (`AuroraBackground`, `HeroShader`) |
| **Sections** | Hero → About → Projects → Services → Process → Tech Stack → Credibility → Contact |
| **Global UX** | Custom cursor, mouse spotlight, scroll progress, loading screen, magnetic interactions in several places |
| **Backend** | Contact API via Resend (`/api/contact`) |

### Already “wow-tier” (Phases 1–5 — largely done)

Per `task.md` and code review, these are **implemented or substantially built**:

- **Hero** — Letterbox cinematic intro, GSAP char reveals, 3D mouse parallax, `ParticleField` (desktop), gradient mesh, orbital HUD, scroll zoom-out, `HeroCounter` stats, magnetic CTAs
- **Navbar** — Magnetic links, active pill, logo morph, smart hide/reveal, full-screen mobile menu
- **Projects** — `ProjectMockup` live UI simulations, 3D tilt, conic border glow, GSAP stagger, magnetic actions
- **Services** — Circuit beams, icon micro-animations, detail modal, cursor glow trail
- **Process** — Pinned timeline, SVG path draw, scrambler step numbers, progress track

**Verdict:** You are not starting from zero. The foundation is **above average** for a dev portfolio. The gap to “jaw-dropping” is **cohesion, proof, production polish, and a few signature moments**—not more random effects.

### Not yet at 2026/27 studio level

| Gap | Why clients notice |
|-----|-------------------|
| **No film grain / global cinematic layer applied** | `.noise-overlay` exists in CSS but is **not wired** in `layout.tsx` |
| **Scroll velocity hook unused** | `useScrollVelocity` exists but nothing reacts to scroll speed |
| **Tech stack is a grid, not a signature moment** | UPGRADE Phase 6 (3D orbit) not done |
| **Credibility is values-only** | No counters, logos, testimonials, or before/after proof |
| **Contact is functional, not conversion-optimized** | No Calendly, no particle reaction, no celebration state |
| **No case study depth** | Project `caseUrl: "#"` — clients buy **stories**, not card hover demos |
| **Production blockers** | Resend API key breaks Vercel build; `/og-image.png` referenced but **missing** |
| **No analytics / JSON-LD / sitemap** | Phase 10 incomplete — hurts trust + discoverability |
| **Effect overload risk** | Many animations compete; needs **one hero story** and calmer sections |

---

## 2. The strategic shift: portfolio → studio

Clients do not hire “animations.” They hire **confidence**.

| Portfolio mindset | Studio mindset (target) |
|-------------------|-------------------------|
| “Look at my skills” | “Look at outcomes we create for **you**” |
| Feature checklist (GSAP, Three.js) | **One memorable first 3 seconds**, then proof |
| Generic stats (“50+ projects”) | **Verifiable proof** (live links, metrics, quotes) |
| Hover tricks everywhere | **Intentional motion** — loud at hero, quiet at contact |
| All sections equal weight | **Funnel:** Hook → Proof → Process → Trust → Book |

Your site should feel like **Linear × Vercel × a boutique agency**—not a tutorial showcase.

---

## 3. Design north star (2026/27 references)

| Reference | Steal this | Apply here |
|-----------|------------|------------|
| [Linear](https://linear.app) | Typography, spacing, restraint | Reduce visual noise below the fold; tighten copy |
| [Vercel](https://vercel.com) | Gradient mesh, section rhythm | Section-scoped ambient gradients (scroll-linked) |
| [Stripe](https://stripe.com) | Trust, gradient discipline | Credibility band + client logos (even placeholders) |
| [Apple](https://apple.com) | Scroll pacing, one idea per viewport | Pin **one** section at a time (Process already does this) |
| [Framer](https://framer.com) | Cursor + micro-interaction quality | Unify cursor states (`data-cursor` everywhere) |
| [Raycast](https://raycast.com) | Developer-premium glass | Nav + cards already close — refine contrast |

### Visual system (lock these before more code)

1. **One accent story** — Blue → violet → cyan (already in hero); do not add new hues per section.
2. **Type scale** — Space Grotesk headlines; Inter body; mono only for HUD/meta (hero coordinates, step numbers).
3. **Motion budget** — Max **3** simultaneous motion systems per viewport (e.g. Lenis + one GSAP trigger + one ambient layer).
4. **Depth language** — `translateZ` layers on cards only; avoid mixing CSS 3D + Three.js in the same viewport without reason.

---

## 4. Phased upgrade plan (execution order)

We follow UPGRADE.md’s **implementation order** (global tone → hero → projects → …) but **re-prioritize for client impact**.

### Phase A — Production & trust floor (do first)

**Goal:** Site deploys, shares well, and never embarrasses you in a client call.

| Task | Files / action | Done when |
|------|----------------|-----------|
| Fix Resend build | Lazy-init Resend in `api/contact/route.ts` only when `POST` runs; never at module top level | `npm run build` passes on Vercel without env at build time |
| Add OG image | `public/og-image.png` or `app/opengraph-image.tsx` (generated) | Link preview looks branded on Slack/LinkedIn |
| Wire noise overlay | `layout.tsx` → wrapper with `noise-overlay` | Subtle cinematic grain site-wide |
| `prefers-reduced-motion` audit | All GSAP/Three entry points | Reduced motion = static hero, no cursor, no Lenis |
| Error boundary for 3D | Wrap `ParticleField` / Canvas in fallback UI | Low-end devices see gradient, not blank hero |

**Client signal:** *Professional. Deployed. No broken previews.*

---

### Phase B — Global cinematic layer (UPGRADE Phase 9)

**Goal:** Every scroll feels intentional; the site has a “director.”

| Enhancement | Implementation |
|-------------|----------------|
| **Section ambient gradients** | CSS variables on `<main>` sections updated via ScrollTrigger (`--section-hue`) |
| **Scroll velocity parallax** | Connect `useScrollVelocity` to subtle `filter: blur()` or `scale` on hero exit only |
| **Cursor morph states** | Extend `CustomCursor`: `pointer`, `text`, `drag`, `hidden` via `data-cursor` on all interactables |
| **Clip-path section reveals** | Shared `SectionReveal` wrapper (GSAP once) — replace duplicate Framer `useInView` patterns |
| **Dynamic import discipline** | Three.js + heavy GSAP only in client components with `dynamic(..., { ssr: false })` |

**Client signal:** *This feels like one product, not a pile of demos.*

---

### Phase C — Hero: from impressive to unforgettable (Phase 1 polish)

You already have a strong hero. **Do not rebuild** — **refine**:

| Upgrade | Why |
|---------|-----|
| **Single WebGL story** | Choose **either** `ParticleField` **or** `AuroraBackground` as primary; demote the other to optional reduced-motion fallback |
| **Real stat sourcing** | Replace placeholder “50+” with honest numbers or reframe (“3 live products”, “100% client retention”) |
| **Hero video fallback** | 5s loop WebM of your best project UI (muted) behind mesh on desktop — instant “they build real things” |
| **Stronger H1 for clients** | Lead with outcome: *“Websites and systems that win clients for your business.”* — skills second |
| **LCP optimization** | Poster gradient + defer Canvas until `requestIdleCallback` or intersection |

**Success metric:** Lighthouse LCP &lt; 2.5s mobile; “wow” in first **3 seconds** without 4s loading screen blocking content.

---

### Phase D — Projects: proof that sells (Phase 3 + new)

**This is the highest ROI section for client conversion.**

| Upgrade | Priority |
|---------|----------|
| **Real case studies** | `/work/[slug]` pages: problem → approach → stack → results → live link |
| **Replace `caseUrl: "#"`** | Even one deep case study beats three shallow cards |
| **Hover video** | 3–5s WebM/GIF screen recordings per project (lazy-loaded) |
| **Metrics chips** | “+40% faster load”, “Live in 3 weeks” — only if true |
| **Featured project strip** | Full-width horizontal scroll of 1 hero project above the grid |

**Client signal:** *They have shipped real work for real businesses.*

---

### Phase E — Tech stack signature (Phase 6)

Current grid is competent; **signature moment** wins memorability.

**Recommended approach:** CSS 3D orbital ring (lighter than full Three.js orbit) + hover isolate + proficiency ring SVG.

```
        [ Next.js ]
    /               \
[ TS ]    — YOU —    [ Tailwind ]
    \               /
        [ Node ]
```

- Infinite marquee for “also used” logos at bottom (GPU `transform: translate3d`)
- On mobile: static 2-row marquee, no 3D

**Client signal:** *Technical depth without reading a resume.*

---

### Phase F — Credibility & social proof (Phase 7)

Transform `Credibility.tsx` from values cards into **trust infrastructure**:

| Element | Spec |
|---------|------|
| **Animated counters** | GSAP count-up: projects delivered, countries, response time |
| **Logo wall** | Hamernassa, Spotless, etc. (grayscale → color on hover) |
| **Testimonial** | 1–2 real quotes; typing effect optional |
| **Before/after** | Slider on one redesign (even your own portfolio v1 → v2) |

**Client signal:** *Other businesses already trusted them.*

---

### Phase G — Contact: close the deal (Phase 8)

| Upgrade | Spec |
|---------|------|
| **Cal.com / Calendly embed** | Secondary CTA: “Book a 20-min call” |
| **Form focus theatre** | Label float, border glow, micro particle burst on focus (reuse hero particle lib sparingly) |
| **Submit state machine** | idle → loading → success checkmark → confetti (canvas-lite, 1s) |
| **Dual path** | Form for async; calendar for high-intent |

**Client signal:** *Easy to hire. Low friction.*

---

### Phase H — SEO, analytics, polish (Phase 10)

| Task | Deliverable |
|------|-------------|
| JSON-LD | `Person` + `ProfessionalService` in `layout.tsx` |
| `sitemap.ts` + `robots.ts` | Next.js App Router natives |
| `@vercel/analytics` | Privacy-friendly traffic |
| Lighthouse pass | 95+ Performance, 100 Accessibility target |
| Keyboard nav audit | Focus rings visible; mobile menu trap focus |

---

### Phase I — Signature easter egg (optional, high memorability)

Pick **one**:

- **Konami code** → glitch transition to “terminal mode” with `whoami` / `skills` ASCII
- **Hidden `/lab`** route with shader playground (proves R&D)
- **Sound toggle** in footer (hover clicks, off by default)

**Client signal for dev clients:** *They enjoy craft.*

---

## 5. Content upgrades (non-negotiable for “wow”)

Technology alone will not make a client say wow. **Copy and proof** will.

### Hero

- **Headline:** Outcome-first (revenue, trust, speed)—not “building digital experiences.”
- **Subhead:** Ethiopia-based + worldwide delivery + niche (ecommerce, corporate, SaaS).

### About

- Add **one professional photo** or consistent avatar illustration.
- **3-bullet client outcomes** instead of 4 generic skill bullets.

### Projects

- Minimum **1 case study** with screenshots, your role, timeline, and link.

### Footer

- Clear **availability**, email, LinkedIn/GitHub, timezone (EAT).

---

## 6. Performance & accessibility contract

Every new effect must pass this checklist:

```text
□ transform/opacity only (no layout-thrashing top/left animations)
□ will-change on animated layers during interaction only
□ dynamic import for three, gsap ScrollTrigger batches
□ prefers-reduced-motion: disable Lenis, cursor, Canvas, parallax
□ mobile < 768px: no Three.js; simplified hero (GradientMesh + CSS particles)
□ IntersectionObserver pause for off-screen Canvas (ParticleField already does this)
□ target: LCP < 2.5s, CLS < 0.1, INP < 200ms
```

---

## 7. Implementation timeline (suggested)

| Week | Focus | Outcome |
|------|--------|---------|
| **1** | Phase A + B | Deploys cleanly; global grain; reduced-motion; OG image |
| **2** | Phase C + D | Hero LCP fix; 1 case study page; project videos |
| **3** | Phase E + F | Tech orbit; credibility counters + logos |
| **4** | Phase G + H | Cal embed; form polish; JSON-LD; Lighthouse audit |
| **5** | Phase I + copy pass | Easter egg; headline/copy; final QA on real devices |

---

## 8. Success criteria (how we know it worked)

Use this checklist before calling the upgrade “done”:

- [ ] **3-second rule:** Visitor understands what you do without scrolling
- [ ] **Scroll rule:** Each section has one clear idea; no “animation fatigue” by Services
- [ ] **Proof rule:** At least one case study with metrics and live URL
- [ ] **Trust rule:** Logos or testimonial from real clients
- [ ] **Hire rule:** Contact + calendar visible within 2 scrolls from bottom
- [ ] **Share rule:** OG image + LinkedIn preview look studio-grade
- [ ] **Tech rule:** Lighthouse 90+ mobile performance with effects enabled
- [ ] **Access rule:** Keyboard-only navigation works; reduced motion respected
- [ ] **Client quote test:** Show site to a non-dev business owner—ask “would you hire?”

**Target feeling:**

> *"This is not a developer portfolio. This is a premium tech studio—and I want them on our project."*

---

## 9. What we will NOT do (scope discipline)

To avoid an over-engineered mess:

- ❌ Add Three.js to every section
- ❌ Autoplay sound without explicit toggle
- ❌ Fake client logos or fabricated metrics
- ❌ Block first paint with a long loading screen (> 1.5s)
- ❌ Duplicate animation libraries for the same effect (pick GSAP **or** Framer per interaction)
- ❌ Ship without fixing Vercel build (Resend init)

---

## 10. Immediate next steps (when you say “let’s go”)

1. **Phase A** — Fix Resend lazy init, add OG image, wire `noise-overlay`, verify build on Vercel  
2. **Phase B** — `SectionReveal` + scroll-linked section gradients + cursor states  
3. **Phase D** — First case study route for Hamernassa or Spotless  
4. **Copy pass** — Hero H1 + honest stats  

---

## Appendix: File map (where work lands)

| Area | Primary files |
|------|----------------|
| Global shell | `src/app/layout.tsx`, `src/app/globals.css` |
| Hero | `src/components/sections/Hero.tsx`, `src/components/hero/*` |
| Projects | `src/components/sections/Projects.tsx`, `ProjectMockup.tsx`, new `src/app/work/[slug]/page.tsx` |
| Tech | `src/components/sections/TechStack.tsx` |
| Credibility | `src/components/sections/Credibility.tsx` |
| Contact | `src/components/sections/Contact.tsx`, `src/app/api/contact/route.ts` |
| Shared motion | `src/lib/animations.ts`, `src/hooks/useScrollVelocity.ts`, new `src/components/shared/SectionReveal.tsx` |
| SEO | `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx` |

---

*This plan extends [`UPGRADE.md`](./UPGRADE.md). Phases 1–5 are largely complete; Phases 6–10 plus content and production polish are what turn an impressive build into a client-winning studio presence.*

**Ready to execute:** say **"let's go"** and we start with **Phase A → Phase B → first case study**.
