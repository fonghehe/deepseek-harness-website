# Shared editor configuration

Open the repository root in VS Code or Cursor. Install the recommended extensions when prompted, then run `Dependencies: install`. Recommendations do not install extensions automatically. The project uses pnpm, `.node-version` and the TypeScript version installed in `node_modules`.

- `settings.json`: Oxfmt on save, explicit Oxlint fixes, workspace TypeScript, shared whitespace and generated-file exclusions. The modern `js/ts.tsdk.*` settings target current VS Code; in an editor with an older bundled TypeScript extension, select the workspace version manually from the TypeScript status item.
- `extensions.json`: Oxc (Oxlint and Oxfmt), Vue language support for the VitePress theme, Playwright and EditorConfig.
- `tasks.json`: dependency installation, website/docs development, lint/fix, format/check, typecheck, build, E2E, `Verify` and `Verify: full`. Website development builds the docs first. E2E builds both applications before starting the production test server on port 3101.
- `launch.json`: website server plus Chrome debugging, Chrome attached to an existing website server, and VitePress browser debugging. The website uses port 3100; standalone docs use port 5173.

The Oxc extension resolves the installed project binaries in `node_modules` and reads `.oxlintrc.json` and `.oxfmtrc.json`. Install the recommended `oxc.oxc-vscode` extension in each editor to activate formatting and diagnostics. The command-line workflow is `pnpm lint`, `pnpm lint:fix`, `pnpm format` and `pnpm format:check`. **Verify** runs `pnpm verify`: formatting, lint, resource and translation checks, unit tests, types and build. **Verify: full** also runs the three-browser suite and performance budgets; first install the browsers with `pnpm exec playwright install chromium firefox webkit`.

Use **Terminal → Run Task** to select a task, **Run and Debug** to select a debug configuration, and the default build command to build both applications. Server tasks stay in dedicated terminals; stop them through the task/terminal controls when finished. Starting the docs browser debugger leaves its development task running.

If a port is occupied, use the existing website server's browser configuration when suitable, or update the corresponding task and debug URL together. Do not stop unrelated servers. The full-stack debugger launches its own Next.js server; do not run the website development task on the same port at the same time. Browser debugging requires a local Chrome installation and the editor's JavaScript debugger.

The page and animations are maintained in React/CSS/WebGL source. Debug client components and normal App Router routes; public assets contain only static inputs, while generated framework chunks stay ignored.

Only the shared files in this folder are allowlisted by `.gitignore`. Keep personal workspace files, environment variables and machine-specific paths local. Agent instructions live in [AGENTS.md](../AGENTS.md); Cursor project rules live in [`.cursor/rules`](../.cursor/rules/project.mdc).

References: [Oxc editor integration](https://github.com/oxc-project/oxc-vscode), [VS Code tasks](https://code.visualstudio.com/docs/debugtest/tasks), [Next.js debugging](https://nextjs.org/docs/app/guides/debugging).
