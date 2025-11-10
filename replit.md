# Portfolio Showcase Website

## Overview

A modern portfolio showcase platform that curates and displays exceptional website designs across different industries. The application presents a collection of websites organized by industry verticals (Photography, Roofing & Contractors, Real Estate, Coaching), providing inspiration and examples of effective web design. Built as a single-page application with a clean, visual-first interface that emphasizes the showcased content over the platform itself.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React with TypeScript, built using Vite for fast development and optimized production builds.

**UI Framework**: Implements shadcn/ui component library (New York style variant) with Radix UI primitives for accessible, composable components. Uses Tailwind CSS for styling with a custom design system based on CSS variables for theming.

**Routing**: Utilizes Wouter for lightweight client-side routing. Currently implements a minimal route structure with a home page and 404 handler.

**State Management**: React Query (@tanstack/react-query) for server state management, though currently used minimally. Component state managed through React hooks.

**Form Handling**: React Hook Form with Zod resolver integration for type-safe form validation, though not actively implemented in current pages.

**Design System**: Custom Tailwind configuration with:
- Extended color palette using HSL values with CSS custom properties
- Consistent spacing scale (4, 6, 8, 12, 16, 24 Tailwind units)
- Custom border radius values
- Inter font family (400, 500, 600, 700, 800 weights) via Google Fonts
- Responsive grid layouts (3-column desktop, 2-column tablet, single-column mobile)
- Elevation system using shadow utilities

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Development Mode**: Hot module replacement via Vite middleware integration for seamless development experience. The server proxies Vite's dev server in development and serves static assets in production.

**API Structure**: RESTful API design with `/api` prefix convention. Routes defined in `server/routes.ts` but currently minimal implementation.

**Session Management**: Infrastructure for session handling via connect-pg-simple (PostgreSQL session store), though not actively used.

**Build Process**: esbuild compiles server code for production, bundling as ESM modules with external package references.

### Data Storage

**ORM**: Drizzle ORM for type-safe database operations with Zod schema integration.

**Database**: Configured for PostgreSQL via Neon serverless driver (`@neondatabase/serverless`). Connection managed through `DATABASE_URL` environment variable.

**Schema Design**: Currently defines a basic `users` table with:
- UUID primary key (auto-generated)
- Username (unique, required)
- Password (required)

**Storage Abstraction**: Implements storage interface pattern with in-memory implementation (`MemStorage`) for development/testing. Interface defines methods for user CRUD operations, designed for easy swapping to database-backed implementation.

**Migrations**: Drizzle Kit manages schema migrations in the `migrations` directory.

**Design Decision**: The dual storage approach (interface + in-memory implementation) allows for rapid development and testing without database dependency, while maintaining a clear path to production database integration.

### Authentication and Authorization

**Current State**: Basic infrastructure in place but not actively implemented. User schema exists with username/password fields, suggesting planned traditional authentication.

**Session Infrastructure**: connect-pg-simple package indicates planned PostgreSQL-backed session management.

**Authorization Pattern**: Not yet implemented, but storage interface suggests user-based access control preparation.

## External Dependencies

### UI Component Libraries

- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (accordion, dialog, dropdown, popover, toast, tooltip, etc.)
- **shadcn/ui**: Pre-styled components built on Radix UI with customizable Tailwind styling
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Utility for managing component variants and conditional classes
- **cmdk**: Command menu component for keyboard-driven interfaces
- **Embla Carousel**: Carousel/slider component library
- **Vaul**: Drawer component for mobile-friendly overlays

### Data Fetching and State

- **TanStack Query (React Query)**: Server state management, caching, and data synchronization
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **@hookform/resolvers**: Integrates Zod schemas with React Hook Form

### Database and ORM

- **Drizzle ORM**: TypeScript ORM with type-safe query builder
- **@neondatabase/serverless**: PostgreSQL database driver optimized for serverless environments
- **Drizzle Kit**: CLI tool for schema migrations and database management
- **Drizzle Zod**: Integration package for automatic Zod schema generation from Drizzle tables

### Development Tools

- **Vite**: Build tool and dev server with HMR
- **@vitejs/plugin-react**: React support for Vite
- **Replit Plugins**: Development environment enhancements (`@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`)
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Production bundler for server code

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with Autoprefixer
- **tailwind-merge**: Utility for merging Tailwind classes without conflicts
- **clsx**: Conditional class name composition

### Routing

- **Wouter**: Lightweight routing library for React (minimalist alternative to React Router)

### Date Handling

- **date-fns**: Modern date utility library for formatting and manipulation

### Session Management

- **connect-pg-simple**: PostgreSQL session store for Express sessions (infrastructure present but not actively used)