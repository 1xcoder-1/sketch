<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-ui-agent-rules -->

## Project UI & Frontend Rules (permanent)

These rules are project-level permanent memory. Re-confirm them at the start of every session and apply them to every UI-related task.

### 1. Analyze before coding

Before writing or changing any UI-related code:

- Thoroughly analyze the project structure, existing components, design system, Tailwind config, routing, and current skill setup.
- Identify all installed skills and agent configuration files (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.agents/`, skills directories, etc.).
- Confirm the latest versions of tools and libraries before relying on their APIs.
- Follow the managed Next.js block above: read `node_modules/next/dist/docs/` before writing Next.js code.

### 2. Required skills (installed and active)

| Skill | Source | Use |
| --- | --- | --- |
| Modern Web Guidance | `modern-web-guidance` npm (GoogleChrome) | Mandatory for web platform, CSS, layout, accessibility, performance, and modern browser API work |
| jakubkrehel/skills | `jakubkrehel/skills` | better-ui, better-typography, better-colors, better-layout, better-accessibility, better-interface, better-writing, break-ui, build-design, etc. |
| exploded | `diip3sh/exploded` | Component anatomy, exploded views, spec sheets, documentation |

Keep them installed and current:

```sh
npx modern-web-guidance@latest install
npx skills add jakubkrehel/skills
npx skills add diip3sh/exploded
```

Modern Web Guidance workflow: `search` a focused 2–5 word capability query, `retrieve` the matching guide(s), verify the implementation against the guide, then disclose usage. Never hallucinate guides or skip the search.

### 3. Skill activation rules

- Always activate and use **Modern Web Guidance** for any web platform, CSS, layout, accessibility, performance, or modern browser API work.
- Always use the **jakubkrehel/skills** suite (better-ui, better-typography, better-colors, better-layout, better-accessibility, better-interface, etc.) when building, reviewing, or polishing any UI.
- Always use the **exploded** skill when documenting, analyzing, or creating component specs / anatomy views.
- Prefer the latest available versions of all skills and regenerate guidance when needed.

### 4. Official UI libraries (strict preference)

| Purpose | Library |
| --- | --- |
| Core component system | shadcn/ui (official primitives) |
| Main UI components | Aceternity UI (ui.aceternity.com) |
| Animated components | Wensity UI (ui.wensity.com) |

- Prefer Aceternity UI for polished, production-ready UI blocks.
- Prefer Wensity UI for any animated, motion-heavy, or showpiece components.
- Use shadcn/ui as the foundational primitive layer when needed.
- Never introduce competing UI libraries unless explicitly requested.
- Always install the latest versions and write clean, typed, production-ready code.

### 5. Working style

- Write modern, clean, accessible, high-performance UI code.
- Use the latest recommended patterns from Modern Web Guidance.
- Apply design-engineering polish (spacing, typography, color, motion, states) from the jakubkrehel skills.
- Keep all code production-ready and maintainable.

### 6. Communication preference

- User ke saath hamesha **Roman Urdu** mein baat karein (Urdu script nahi).
- Simple aur aasan Urdu use karein — mushkil ya bhari wording se bachein.
- Code, file paths, commands aur technical names waise hi rakhein (English); sirf wazahat Roman Urdu mein ho.

<!-- END:project-ui-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
