# Client Architecture: Desktop App as Service Host

The LoreHaven desktop client is an Electron app that acts as a service host — it manages three separate concerns (MCP server, file watching, cloud sync) from a single process that runs in the system tray.

## Initialization Sequence

The main process follows a nine-step startup:

1. Register IPC handlers (renderer ↔ main communication)
2. Ensure vault folder structure exists at `~/LoreHaven/`
3. Start the MCP server subprocess
4. Silent auth refresh (if stored refresh token exists in OS keychain)
5. Fetch and cache account data
6. Pull Lore from cloud if not locally present
7. Rebuild permanent vault index
8. Start file watcher on `~/LoreHaven/`
9. Initialize system tray

The order matters. The MCP server starts before auth completes — because the server provides value locally even when cloud is unreachable. A user who loses internet connectivity still has their Lore loaded in Claude.

## Service Layer

Eight services, each with a single responsibility:

| Service | Responsibility |
|---------|---------------|
| SettingsService | electron-store wrapper — vault path, MCP port, preferences |
| VaultService | Reads/writes lore.md and vault folder structure |
| McpService | Spawns and manages MCP server subprocess |
| ClaudeDesktopService | Detects installation, merges config (atomic key-level merge) |
| SyncService | Calls API for lore backup (GET/PUT /vault/lore) |
| AuthService | OS keychain via keytar, OAuth browser-based sign-in |
| VaultWatcher | fs.watch on ~/LoreHaven/, rebuilds index on changes |
| TrayService | System tray icon and menu |

## Configuration Merge (ARCH-003)

The trickiest service interaction is configuring Claude Desktop to use the LoreHaven MCP server. Claude Desktop stores its config in a JSON file that other tools also modify. LoreHaven must add its entry without breaking anything else.

The strategy: atomic key-level merge. Read the file. Set exactly one key (`mcpServers.lorehaven`). Write to a temp file. Atomic rename. The implementation handles five edge cases: missing file, no `mcpServers` key, missing `lorehaven` key, correct key already present, and stale key needing update. It never touches anything outside its own key. It never reformats the file. If the JSON is invalid, it aborts and surfaces the error — it will not silently overwrite a broken config.

This level of care matters because the config file is shared state between multiple tools. A naive write-the-whole-file approach would lose other tools' configurations. The atomic merge preserves everything and only touches what's ours.

## Browser-Based OAuth

Authentication uses the system browser, not an embedded webview:

1. Generate a random state token
2. Spawn a localhost HTTP server
3. Open the system browser to the LoreHaven web app
4. User authenticates in the browser (familiar, trusted)
5. Browser redirects back to localhost with an authorization code
6. Desktop client exchanges the code for tokens
7. Refresh token stored in OS keychain (keytar)

This avoids embedding credentials in the app, uses a sign-in flow users already trust, and works identically on macOS and Windows. The OS keychain handles secure storage — the app never writes tokens to disk.

## The IPC Contract

The renderer (React UI) communicates with the main process through a typed IPC bridge defined in the shared package. Every operation — reading the Lore, starting the MCP server, checking connection status — flows through this contract. The types are shared between packages, so a breaking change in the API surface is caught at compile time, not at runtime.

## Monorepo Structure

```
packages/
├── app/           — Electron main + renderer (TypeScript, Vite, React)
├── mcp-server/    — MCP server (TypeScript, Anthropic SDK)
├── shared/        — Types, IPC contract, shared constants
└── app-tauri/     — Tauri 2 alternative (experimental)
```

npm workspaces manage the dependencies. The shared package is the contract that keeps the other three honest.
