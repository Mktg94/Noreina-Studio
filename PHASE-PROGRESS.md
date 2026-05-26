# Upgrade phase tracker

Check off after you review each phase in the browser.

| Phase | Status | Focus |
|-------|--------|--------|
| **A** — Production & trust | ✅ Done | Build, OG, noise, Resend, error boundary, sitemap, JSON-LD |
| **B** — Global cinematic layer | ✅ **Ready for review** | Ambient gradients, section reveals, cursor morph, faster loader |
| **C** — Hero polish | ⏳ Next | Copy, honest stats, LCP, single WebGL story |
| **D** — Projects / proof | ⏳ Partial | Case studies exist; videos, metrics, featured strip |
| **E** — Tech stack | ⏳ Partial | CSS orbit added; refine mobile |
| **F** — Credibility | ✅ Done | Counters, logos, testimonial |
| **G** — Contact | ⏳ Partial | Cal link; form focus theatre, embed |
| **H** — SEO & analytics | ⏳ Partial | Add Vercel Analytics, Lighthouse pass |
| **I** — Easter egg | ⏳ Pending | Optional |

---

## Phase B — What to test

1. Scroll the page — background tint should subtly shift (blue → purple → cyan, etc.) per section.
2. Each section (below hero) should **reveal once** with a soft clip-path wipe (not on hero).
3. **Cursor** on desktop: default ring → grows on links/buttons → text I-beam on inputs.
4. **Loading screen** — shorter (~1.2s); skipped entirely if `prefers-reduced-motion`.
5. Confirm scroll still feels **smooth** (no new lag).

Say **"next phase"** when ready for **Phase C (Hero polish)**.
