# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TecnoShared Gestión Web** is a billing/invoicing management system built with Bun, React 19, and Tailwind CSS. The application manages invoices (facturas), credit notes (notas de crédito), sales notes (notas de venta), and reports for accounting purposes.

## Development Commands

```bash
# Install dependencies
bun install

# Start development server with hot module reloading
bun dev

# Production server
bun start

# Build for production (includes custom build script)
bun run build.ts

# Build with custom options (see build.ts --help for full list)
bun run build.ts --outdir=dist --minify --sourcemap=linked
```

## Tech Stack & Runtime

- **Runtime**: Bun (not Node.js)
- **Frontend**: React 19 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **Styling**: Tailwind CSS 4.x with custom theme via bun-plugin-tailwind
- **Icons**: Material Symbols Outlined (Google Fonts)
- **Server**: Bun.serve() with native routes and HMR support

### Bun-Specific Guidelines

- Use `Bun.serve()` for HTTP server (NOT Express)
- Use `bun:sqlite` for SQLite (NOT better-sqlite3)
- Use `Bun.redis` for Redis (NOT ioredis)
- Use `Bun.sql` for Postgres (NOT pg or postgres.js)
- Use `Bun.file` instead of `node:fs` readFile/writeFile
- Use `Bun.$\`command\`` for shell commands instead of execa
- Bun automatically loads `.env` files (no dotenv package needed)
- WebSocket is built-in (don't use ws package)

## Architecture

### Server Architecture (src/index.ts)

The server uses Bun's native routing system:
- Serves `src/index.html` for all unmatched routes (SPA fallback)
- API routes are defined using object notation with HTTP method handlers
- HMR (Hot Module Reloading) enabled in development
- Browser console logs echoed to server in development

### Frontend Architecture

**Entry Flow**: `src/index.html` → `src/frontend.tsx` → `src/App.tsx`

- **src/index.html**: HTML entry point with inline Tailwind config and Material Symbols font
- **src/frontend.tsx**: React 19 DOM root initialization, waits for DOMContentLoaded
- **src/App.tsx**: Main application with routing and page components

**Component Structure**:
- `Sidebar`: Navigation sidebar with Material icons, shared across all pages
- `BillingPage`: Main invoicing page with stats cards and invoice table
- `ReportsPage`: Reports page (currently showing placeholder UI)
- `StatsCard`: Reusable stat display component
- `InvoiceRow`: Table row component for invoices

**Routing**: Uses Wouter for client-side routing with two main routes:
- `/` - BillingPage (Facturación)
- `/reportes` - ReportsPage

### TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Module system: Preserve (bundler mode)
- JSX: react-jsx (React 19 automatic runtime)
- Strict mode enabled with additional strict flags
- No emit (bundling handled by Bun)

### Build System (build.ts)

Custom build script using Bun.build with:
- Automatic HTML entry point detection via Glob
- Tailwind CSS processing via bun-plugin-tailwind
- CLI argument parsing for build configuration
- Production defaults: minification, linked sourcemaps, browser target
- Environment: Sets `process.env.NODE_ENV` to "production"

**CLI options** (run `bun run build.ts --help`):
- `--outdir`, `--minify`, `--sourcemap`, `--target`, `--format`, `--splitting`, `--external`, etc.

### Styling

Custom Tailwind theme defined in `src/index.html`:
- **Primary color**: `#1173d4`
- **Dark mode**: Class-based with custom background colors
- **Fonts**: Inter (Google Fonts)
- **Icons**: Material Symbols Outlined

## Application Domain

The system manages:
- **Facturas** (Invoices) with folio, client, date, amount, and status (Pagada/Pendiente/Vencida)
- **Notas de Crédito** (Credit notes) - UI only
- **Notas de Venta** (Sales notes) - UI only
- **Reportes** (Reports) - planned feature for sales by location

## When Adding Features

1. **API Routes**: Add to `src/index.ts` using Bun.serve routes object
2. **Pages**: Add components to `App.tsx` and routes to Wouter Router
3. **Navigation**: Update `Sidebar` component with new links
4. **Styling**: Follow existing Tailwind + dark mode pattern
5. **Icons**: Use Material Symbols Outlined class names

## Testing

Use `bun test` for testing:

```ts
import { test, expect } from "bun:test";

test("example", () => {
  expect(1).toBe(1);
});
```

No test files currently exist in the codebase.
