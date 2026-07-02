# UNIQLO Clone

A modern, minimal UNIQLO website clone built with React, TypeScript, Tailwind CSS, and GSAP. Features editorial design, scroll-driven animations, and a clean, light aesthetic.

![UNIQLO Clone Preview](https://773n4kd6xf33s.kimi.page)

## Features

- **Editorial Design Language** - Clean, minimal aesthetic inspired by UNIQLO's brand identity
- **Scroll-Driven Animations** - GSAP ScrollTrigger-powered pinned sections with entrance/settle/exit phases
- **Global Scroll Snap** - Smooth snap-to-section navigation
- **Responsive Layout** - Mobile-first design with adaptive components
- **Light Theme Only** - Clean white and soft gray palette with UNIQLO red accents
- **15 AI-Generated Images** - Custom editorial fashion photography

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- GSAP + ScrollTrigger
- shadcn/ui components
- Lucide React icons

## Project Structure

```
src/
  components/
    Navbar.tsx          # Fixed navigation with logo and icons
  sections/
    HeroSection.tsx     # Editorial collage hero with card CTA
    StatementCard.tsx   # Copy-first typographic cards
    PanelRack.tsx       # 2/3-panel collection showcases
    CollageFeature.tsx  # Magazine spread layout
    ClosingSection.tsx  # CTA card + footer
  App.tsx               # Main app with scroll snap config
  index.css             # Global styles + CSS variables
```

## Sections

1. **Hero** - Editorial collage with model image and CTA card
2. **Statement Card: Accessories** - "Finish the look"
3. **3-Panel Rack: Lounge** - Soft layers collection
4. **Statement Card: Blazers** - "Structure, simplified"
5. **2-Panel Rack: Blazers** - Tailored comfort
6. **Statement Card: Modern Classics** - "Made to mix"
7. **3-Panel Rack: Linen Tees** - Breathe easy
8. **Statement Card: Essentials** - "Everyday, elevated"
9. **2-Panel Rack: Bras** - Support, simply
10. **Collage Feature: Linen** - Magazine spread
11. **Closing + Footer** - CTA and links

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Live Demo

[View Live Site](https://773n4kd6xf33s.kimi.page)

## Design

- **Background Primary**: #F4F4F2 (soft gallery gray)
- **Background Secondary**: #FFFFFF (pure white)
- **Accent**: #D12D2D (UNIQLO red)
- **Text Primary**: #0B0B0B (near-black)
- **Text Secondary**: #6B6B6B (muted gray)

## License

This project is for educational purposes only.
