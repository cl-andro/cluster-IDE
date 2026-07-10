# Rebranding Guide — Cluster

This file documents every change needed to rebrand VSCodium to **Cluster**.
Use it as a checklist if you need to rename/rebrand again in the future.

---

## Core Variables

These are the master variables. Everything else derives from them.

| Variable        | Current Value        | Description              |
|-----------------|----------------------|--------------------------|
| `APP_NAME`      | `Cluster`        | Human-readable name      |
| `APP_NAME_LC`   | `cluster`        | Lowercase (filesystem)   |
| `BINARY_NAME`   | `cluster`        | CLI binary name          |
| `ORG_NAME`      | `ClusterFamily`      | GitHub org / author      |
| `ASSETS_REPOSITORY` | `ClusterFamily/cluster` | GitHub repo       |
| `GH_REPO_PATH`  | `ClusterFamily/cluster` | GitHub repo path   |

---

## Files to Edit (full list)

### 1. `dev/build.sh`
- `APP_NAME`, `APP_NAME_LC`, `BINARY_NAME`, `ASSETS_REPOSITORY`, `GH_REPO_PATH`, `ORG_NAME` (line 8-14)
- Insider variant: `BINARY_NAME="cluster-insiders"` (line 27)
- GYP backup prefix: `.pre-cluster` (lines ~130-141)

### 2. `dev/build_docker.sh`
- `APP_NAME` (line 6)

### 3. `dev/cli.sh`
- `VSCODE_CLI_APP_NAME` (line 2)
- `VSCODE_CLI_BINARY_NAME` (line 3)
- `VSCODE_CLI_DOWNLOAD_URL` (line 4)
- `VSCODE_CLI_UPDATE_URL` (line 6)
- Binary paths in `cp` and serve commands (lines 10, 12)

### 4. `utils.sh`
- Defaults for `APP_NAME`, `APP_NAME_LC`, `BINARY_NAME`, `ASSETS_REPOSITORY`, `GH_REPO_PATH`, `ORG_NAME` (lines 3-8)
  - `APP_NAME_LC` auto-derives from `APP_NAME` with `sed 's/ /-/g'`

### 5. `prepare_vscode.sh`
#### product.json URLs
- `licenseUrl` → ClusterFamily/cluster (line 45)
- `reportIssueUrl` → ClusterFamily/cluster (line 48)
- `updateUrl` → ClusterFamily/versions (line 57)
- `downloadUrl` → ClusterFamily/cluster[-insiders] (lines 57-59)

#### product.json names (stable block, lines 96-121)
- `nameShort` / `nameLong` → `Cluster`
- `applicationName` → `cluster`
- `linuxIconName` → `cluster`
- `urlProtocol` → `cluster`
- `serverApplicationName` → `cluster-server`
- `serverDataFolderName` → `.cluster-server`
- `darwinBundleIdentifier` → `com.cluster`
- `win32AppUserModelId` → `Cluster.Cluster`
- `win32DirName` → `Cluster`
- `win32MutexName` → `cluster`
- `win32NameVersion` → `Cluster`
- `win32RegValueName` → `Cluster`
- `win32ShellNameShort` → `Cluster`
- `tunnelApplicationName` → `cluster-tunnel`
- `win32TunnelServiceMutex` → `cluster-tunnelservice`
- `win32TunnelMutex` → `cluster-tunnel`

#### product.json names (insider block, lines 68-94)
- Same pattern as stable with `- Insiders` suffix
- `darwinBundleIdentifier` → `com.cluster.insiders`

#### package.json / resources
- `Microsoft Corporation` → `Cluster` in `package.json` (line 236)
- Server manifest: `name` / `short_name` → `Cluster` (lines 241-245)
- `electron.ts`: `Microsoft Corporation` → `Cluster` (lines 253-254)

#### Linux package metadata (lines 259-288)
- `postinst.template`: `code-oss` → `cluster`
- `code.appdata.xml`: URLs, names, descriptions
- `debian/control.template`: author, name, URLs
- `rpm/code.spec.template`: author, name, URLs

#### Windows installer (lines 290-292)
- `code.iss`: URLs, author

### 6. `build_cli.sh`
- `VSCODE_CLI_UPDATE_ENDPOINT` (line 10)
- `VSCODE_CLI_DOWNLOAD_ENDPOINT` URLs (lines 13, 15)

### 7. `build/windows/msi/build.sh`
- `PRODUCT_NAME` / `PRODUCT_CODE` (lines 13-20)
- `OUTPUT_BASE_FILENAME` (lines 38, 40)
- `ManufacturerName` → `Cluster Family`
- File refs: `vscodium` → `cluster` (wixobj, xsl, wxs, cab-cache, wxl)

### 8. `build/linux/appimage/build.sh`
- AppImage update URL (lines 26, 28)
- Comment about path (line 45)
- `rm -rf VSCodium*` (line 51)

### 9. `src/stable/resources/linux/code.appdata.xml`
- URL, summary, description (lines 7-14)

### 10. `src/stable/resources/linux/code.desktop`
- Keywords (line 14)

### 11. `src/stable/resources/linux/code-url-handler.desktop`
- Keywords (line 12)

### 12. `src/stable/resources/win32/VisualElementsManifest.xml`
- `ShortDisplayName` (line 8)

### 13. `src/stable/resources/linux/code.svg`
- SVG group `id` attribute (line 18)

### 14. `src/stable/src/vs/workbench/browser/parts/editor/media/letterpress-*.svg`
- SVG group `id` attributes (4 files)

### 15. `src/insider/` (mirror of `src/stable/`)
- Same 7 files as above, insider variants

---

## What stays untouched

These are kept from VSCodium and do NOT need rebranding:

| Item | Reason |
|------|--------|
| `undo_telemetry.sh` | Blocks MS telemetry endpoints → `0.0.0.0` |
| `patches/*.patch` / `patches/*.json` | Use `!!APP_NAME!!`, `!!BINARY_NAME!!` etc. placeholders — auto-substituted at build time |
| `product.json` (root) | Merged into cloned VS Code's product.json during build |
| Docker image refs (`vscodium/vscodium-linux-build-agent:*`) | External resources; replace only if you publish your own images |
| Icon SVGs in `icons/` | Replace with your own Cluster logo; filenames referenced in `icons/build_icons.sh` |
| Binary `.gypi` backup prefix (`.pre-cluster`) | Internal; safe to ignore |

---

## Quick rebrand procedure

To rename everything to a different name (e.g. `MyEditor`):

1. Search all files for `Cluster`, `cluster`, `ClusterFamily`, `cluster.dev`
2. Replace with your new name following the casing pattern
3. Regenerate UUIDs for `win32AppId` etc. in `prepare_vscode.sh` (optional)
4. Replace SVG icons in `src/stable/resources/` and `src/insider/resources/`
5. Run `./dev/build.sh`
