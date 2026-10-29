# Wanderlust — Travel & Adventure Platform

A modern, high-performance travel and adventure landing platform built with Next.js 16 (App Router, Turbopack, React Compiler), React 19, Tailwind CSS v4, and shadcn/ui (Base UI `base-nova` style).

## Tech Stack & Architecture

- **Framework**: Next.js 16.4.3 (App Router with Cache Components, Partial Prerendering, and Turbopack)
- **Runtime & UI**: React 19.3.0 with React Compiler enabled
- **UI Components**: shadcn/ui configured with the `base-nova` style powered by `@base-ui/react` primitives
- **Styling**: Tailwind CSS v4 (CSS-first `@theme inline` configuration in `src/app/globals.css`)
- **Typography**: Google Fonts (`Josefin_Sans`, `Playfair_Display`, and `Montserrat`)
- **Carousel**: Embla Carousel React (`embla-carousel-react`)
- **Icons**: Lucide React (`lucide-react`)

## Project Structure

```
wanderlust/
├── public/
│   └── images/              # Assets (hero banner, CTA, icons, portraits)
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css      # Tailwind v4 theme, brand colors, and shadcn tokens
│   │   ├── layout.tsx       # Root layout with fonts, SEO metadata & shell
│   │   └── page.tsx         # Home page assembling sections
│   ├── components/
│   │   ├── banner.tsx       # Hero section with search bar and CTAs
│   │   ├── cta-section.tsx  # Bottom Call-To-Action banner
│   │   ├── footer.tsx       # Newsletter form, navigation, and social links
│   │   ├── navbar.tsx       # Responsive header with desktop and sheet mobile menu
│   │   ├── testimonials.tsx # Customer reviews carousel with accessible controls
│   │   ├── why-choose.tsx   # Feature value cards composed with shadcn Card
│   │   └── ui/              # shadcn/ui primitives (@base-ui/react)
│   │       ├── badge.tsx
│   │       ├── button.tsx   # Button primitive with brand, glass, and hero variants
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── input.tsx
│   │       ├── separator.tsx
│   │       └── sheet.tsx
│   └── lib/
│       ├── fonts.ts         # Typography declarations
│       └── utils.ts         # Utility functions (cn class combiner)
├── components.json          # shadcn configuration (base-nova style)
├── next.config.ts           # Next.js configuration (Turbopack, cache components)
└── tsconfig.json            # Strict TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 20+ (recommended Node.js 22 or 24)
- npm (package-lock.json)

### Installation

```bash
npm install
```

### Development Server

Run the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality & Build Verification

```bash
# Run ESLint check
npm run lint

# Run TypeScript type check
npx tsc --noEmit --incremental false

# Build for production
npm run build

# Start production server
npm run start
```
