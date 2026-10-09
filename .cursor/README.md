# Cursor project configuration

Cursor uses the shared `.vscode` editor settings, tasks, extensions and debug configurations. See [.vscode/README.md](../.vscode/README.md) for the development workflow.

The always-applied rule in `rules/project.mdc` points to the canonical [AGENTS.md](../AGENTS.md). Shared rules are committed; personal `.cursor` state and MCP configuration are ignored. No account, model or approval preferences are imposed by the project.

`.cursorignore` excludes local secrets from Cursor context. `.cursorindexingignore` omits generated output, reports and binary assets from background indexing, while leaving them available for explicit investigation. Neither file restricts terminal commands or MCP tools.

References: [Cursor rules](https://cursor.com/docs/rules) · [Ignore files](https://cursor.com/docs/reference/ignore-file)
