# Repository Guidelines

## Project Structure & Module Organization
- `src/main.tsx` mounts the Vite app and pulls page routes from `src/routes`; views stay under `src/pages`.
- Domain-specific admin features belong in `src/admin`; shared UI and logic live in `src/components`, `src/hooks`, `src/store` (Zustand), and `src/utils`.
- Use `src/_mock` for MSW handlers and fixtures, `src/theme` and `tailwind.config.ts` for design tokens, and keep processed assets in `src/assets` while static files stay in `public/`.
- Centralize runtime defaults in `src/global-config.ts`; avoid scattering environment fallbacks elsewhere.

## Build, Test, and Development Commands
- `pnpm install` installs dependencies (Node 20.x required).
- `pnpm dev` launches the Vite dev server with hot reload.
- `pnpm build` runs `tsc --noEmit` plus the production bundle, ensuring type safety and output in `dist/`.
- `pnpm preview` serves the built bundle locally for QA checks.
- `pnpm exec lefthook run pre-commit` reproduces the formatting and lint checks enforced by git hooks.

## Coding Style & Naming Conventions
- Formatting is handled by Biome; do not hand-format or bypass lefthook.
- Favor PascalCase React components (`UserCard.tsx`), camelCase utilities (`useUserPermissions`), and SCREAMING_SNAKE_CASE for exported constants.
- Compose UIs with Tailwind utility classes; extract repeated patterns into shared helpers or theme tokens.

## Testing Guidelines
- Treat `pnpm build` as the baseline regression gate; add colocated specs as `*.test.ts(x)` when logic warrants automation.
- Mock network traffic through MSW handlers in `src/_mock`; keep fixtures adjacent to the consuming feature.
- Document any manual verification steps in PRs until automated coverage expands.

## Commit & Pull Request Guidelines
- Use Conventional Commits (`feat:`, `fix:`, `chore:`) with imperative, user-focused summaries.
- PRs should link a relevant issue, outline risk, list verification commands (e.g., `pnpm build`), and attach UI screenshots or GIFs when visuals change.
- Ensure lefthook passes before review and limit scope to the touched feature.

## Security & Configuration Tips
- Check secrets and API endpoints into environment files, not source; reference them via `import.meta.env`.
- Update shared defaults through `src/global-config.ts` so agents stay aligned across environments.
