# Design Guidelines: Portfolio Showcase Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern portfolio platforms like Dribbble, Behance, and Awwwards for showcase presentation combined with clean SaaS landing page structures for navigation and hierarchy.

**Core Principles**: 
- Visual prominence for showcased content
- Clean, modern aesthetic that doesn't compete with showcased sites
- Effortless navigation and discovery
- Professional credibility through polished execution

---

## Layout System

**Spacing Scale**: Use Tailwind units of 4, 6, 8, 12, 16, and 24 for consistent rhythm (p-4, gap-6, my-8, py-12, etc.)

**Container Strategy**:
- Hero: Full-width with centered content (max-w-6xl)
- Navigation: Sticky/fixed header with full-width background
- Section containers: max-w-7xl for content, full-width colored backgrounds
- Card grids: Responsive with proper gutters (gap-6 to gap-8)

**Grid Layouts**:
- Desktop (lg:): 3-column grid for website cards
- Tablet (md:): 2-column grid
- Mobile: Single column stack

---

## Typography

**Font Families** (via Google Fonts):
- Headlines: Inter (700, 800 weights) - modern, clean
- Body: Inter (400, 500 weights)
- Accent/Labels: Inter (600 weight)

**Hierarchy**:
- Hero Title: text-5xl lg:text-7xl, font-bold
- Section Headers: text-3xl lg:text-5xl, font-bold
- Section Descriptions: text-lg lg:text-xl, font-normal
- Card Titles: text-base, font-semibold
- Navigation Links: text-sm, font-medium

---

## Component Library

### Hero Section
- Full viewport height (min-h-screen) with centered content
- Large, bold headline introducing the showcase
- Subheadline explaining the purpose
- Smooth scroll indicator/CTA to first section
- Background: Subtle gradient or geometric pattern (CSS-based, no image needed)

### Navigation
- Sticky header with blur backdrop effect
- Logo/site name on left
- Horizontal nav links to each niche section (auto-scroll on click)
- Minimal, clean design that doesn't distract
- Mobile: Hamburger menu with slide-in navigation

### Niche Sections
Each section contains:
- Section number/label (e.g., "01 / Photography")
- Large section title
- Descriptive paragraph (2-3 lines)
- Card grid below description

**Section Backgrounds**: Alternate between subtle background variations (light/white alternation) to create visual separation

### Website Cards
Interactive card design per link:
- Card container with subtle border and shadow
- Hover state: Lift effect (transform translateY) with enhanced shadow
- Favicon/icon placeholder in top-left
- Website title/name (extracted from URL or generic like "Example 1")
- "Visit Site" label with external link icon
- Smooth transitions on all interactive states
- Rounded corners (rounded-lg)

### Icons
**Library**: Heroicons (via CDN)
- External link icon for cards
- Scroll indicator arrow in hero
- Hamburger menu icon for mobile
- Section decorative icons (optional minimal accent)

---

## Interactions & Animations

**Card Hover Effects**:
- Subtle lift: transform translateY(-4px)
- Shadow enhancement: from shadow-sm to shadow-lg
- Transition duration: 200-300ms ease-out

**Smooth Scroll**:
- Navigation links trigger smooth scroll to sections
- Scroll behavior: smooth CSS property

**Navigation Scroll State**:
- Slight background opacity change when scrolled past hero
- Active section indicator in navigation

**Minimal Animation Budget**: 
- Keep animations functional, not decorative
- Focus on hover states and scroll smoothness
- Avoid excessive motion that distracts from content

---

## Responsive Behavior

**Breakpoints**:
- Mobile: Base (< 768px) - Single column, stacked navigation
- Tablet: md (768px+) - 2-column grid, horizontal nav
- Desktop: lg (1024px+) - 3-column grid, full layout

**Mobile Considerations**:
- Reduce spacing scale (py-8 instead of py-16)
- Smaller typography sizes
- Touch-friendly card sizes (min-h-32)
- Collapsible navigation menu

---

## Images

**Hero Section**: No large hero image required - use CSS gradient or geometric pattern background for modern, lightweight aesthetic

**Favicon/Thumbnails**: Each website card should have a placeholder for site favicon or thumbnail (can use placeholder service or generic icons initially)

---

## Accessibility

- Semantic HTML5 elements (nav, section, article)
- Proper heading hierarchy (h1 for hero, h2 for sections, h3 for cards)
- Focus states for all interactive elements (ring-2 ring-offset-2)
- Sufficient color contrast for all text
- Skip-to-content link for keyboard users
- Descriptive link text ("Visit [Website Name]" not just "Click here")

---

## Key Quality Standards

- Polished, professional appearance suitable for a showcase platform
- Consistent spacing and alignment throughout
- Smooth, purposeful interactions
- Fast load times (minimal dependencies)
- Clean code structure with clear comments