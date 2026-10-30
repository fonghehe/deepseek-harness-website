# Editor setup

Open the repository root in VS Code and install the recommended extensions when prompted. Run `Dependencies: install` from **Terminal → Run Task**. Use the Node version in `.node-version` and the project's TypeScript version from `node_modules`.

| File              | Purpose                                                                        |
| ----------------- | ------------------------------------------------------------------------------ |
| `settings.json`   | Oxfmt on save, explicit Oxlint fixes, workspace TypeScript and file exclusions |
| `extensions.json` | Oxc, Vue, Playwright and EditorConfig recommendations                          |
| `tasks.json`      | Install, develop, format, lint, typecheck, build and verify                    |
| `launch.json`     | Next.js and VitePress debugging with local Chrome                              |

Website development tasks build the docs first. E2E tasks build both applications before starting a production test server. **Verify** runs `pnpm verify`; **Verify: full** adds browser tests and performance budgets. Install browsers first with `pnpm exec playwright install chromium firefox webkit`.

Use **Run and Debug** for a launch configuration. The website uses port 3100 and standalone docs use 5173. The full-stack debugger starts its own website server; use the attach configuration if one is already running. When changing a port, update the task and debug URL together. Stop owned servers from their terminal; leave unrelated servers running.

Oxc reads the installed project binaries and `.oxlintrc.json` / `.oxfmtrc.json`. If diagnostics or formatting are missing, check that `oxc.oxc-vscode` is enabled. If the editor does not recognize the workspace TypeScript setting, select the version manually from the TypeScript status item. Browser debugging requires local Chrome.

Keep personal workspace files, environment variables and machine paths local. Shared files are allowlisted in `.gitignore`. See [DEVELOPMENT.md](../DEVELOPMENT.md) for commands, source locations and deployment.
