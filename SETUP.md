# Noreina Studio — Portfolio Setup Guide

## ✅ Step 1: Project Already Initialized
```bash
# Already run — Next.js 15, TypeScript, Tailwind, App Router, src/
npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

---

## 📦 Step 2: Install All Dependencies

### Core Animation & Motion
```bash
npm install framer-motion gsap @gsap/react
```

### 3D Background Effects
```bash
npm install three @react-three/fiber @react-three/drei
```

### Smooth Scrolling
```bash
npm install lenis @studio-freight/lenis
```

### Shadcn UI (CLI setup)
```bash
npx shadcn@latest init
```
> When prompted:
> - Style: **Default**
> - Base color: **Slate**
> - CSS variables: **Yes**

### Install Shadcn Components
```bash
npx shadcn@latest add button badge card dialog form input label separator sheet tabs tooltip
```

### Form Handling & Validation
```bash
npm install react-hook-form zod @hookform/resolvers
```

### Email (Contact Form)
```bash
npm install resend
```

### Utilities & Icons
```bash
npm install lucide-react clsx tailwind-merge class-variance-authority
```

### SEO & Metadata
```bash
npm install next-seo
```

### Type definitions
```bash
npm install --save-dev @types/three
```

---

## 🎨 Step 3: Google Fonts (add to layout.tsx)
Fonts used: **Geist** (already included in Next.js), **Space Grotesk**, **Inter**

```bash
# No install needed — loaded via next/font/google in layout.tsx
```

---

## ⚙️ Step 4: Environment Variables
Create `.env.local` in project root:
```env
# Resend Email API (for contact form)
RESEND_API_KEY=your_resend_api_key_here

# Your email (contact form recipient)
CONTACT_EMAIL=noreina.studio@gmail.com
```

---

## 🚀 Step 5: Run Development Server
```bash
npm run dev
```
Visit: http://localhost:3000

---

## 🏗️ Step 6: Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Step 7: Deploy to Vercel
```bash
# Install Vercel CLI (optional)
npm install -g vercel

# Deploy
vercel

# Or just push to GitHub and connect on vercel.com
```

---

## 📁 Final Project Structure
```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   ├── page.tsx            # Home page (assembles all sections)
│   │   ├── globals.css         # Global styles, CSS variables
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts    # Contact form API route
│   ├── components/
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── Credibility.tsx
│   │   │   └── Contact.tsx
│   │   └── shared/
│   │       ├── LoadingScreen.tsx
│   │       ├── CustomCursor.tsx
│   │       ├── ScrollProgress.tsx
│   │       ├── SmoothScroll.tsx
│   │       └── AnimatedText.tsx
│   ├── lib/
│   │   ├── utils.ts            # cn() helper, utils
│   │   └── animations.ts       # Reusable GSAP/Framer variants
│   └── hooks/
│       ├── useMousePosition.ts
│       └── useSmoothScroll.ts
├── public/
│   ├── images/
│   │   ├── projects/           # Project screenshots
│   │   └── og-image.png        # Open Graph image
│   └── fonts/                  # Optional local fonts
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── SETUP.md
```

---

## ✅ Quick Checklist
- [ ] Run `npm install` commands above
- [ ] Run `npx shadcn@latest init`
- [ ] Add shadcn components
- [ ] Create `.env.local`
- [ ] Run `npm run dev`
- [ ] All sections render correctly
- [ ] Animations smooth on 60fps
- [ ] Mobile responsive
- [ ] Deploy to Vercel

---

## 🎨 Design Tokens (CSS Variables)
These are defined in `globals.css`:
- `--background: #080808`
- `--foreground: #f5f5f5`
- `--accent-blue: #3b82f6` → electric blue
- `--accent-purple: #7c3aed` → subtle glow
- `--graphite: #1a1a1a`
- `--silver: #a8a8b3`
- `--border: rgba(255,255,255,0.08)`
