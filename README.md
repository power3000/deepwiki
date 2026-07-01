# DeepWiki Redirect

A Chrome extension (Manifest V3) that bridges GitHub repositories and [DeepWiki](https://deepwiki.com) — navigate between the two with one click.

## Features

### 🔄 One-Click Toggle (via Browser Icon)
Click the extension icon in the toolbar to instantly switch:
- **GitHub → DeepWiki**: redirects to the corresponding DeepWiki page
- **DeepWiki → GitHub**: redirects back to the original repository

### 🏷️ Smart Badge
The extension icon shows a badge indicating the current site:
| Badge | Site | Color |
|-------|------|-------|
| `DW` | GitHub | Indigo (`#6366f1`) |
| `GH` | DeepWiki | Green (`#059669`) |
| *(empty)* | Other sites | — |

### 🫧 Floating Bubble
On any GitHub repo or DeepWiki page, a floating circular button appears in the bottom-right corner:
- Click to jump to the counterpart site
- Hover for a scale + shadow effect
- Label shows `DW` (on GitHub) or `GH` (on DeepWiki)

### 🔀 Declarative Net Request (optional)
`rules.json` provides a static declarative redirect rule for automatic redirection from GitHub to DeepWiki. To enable it, add `"declarative_net_request"` to `manifest.json`.

## Install

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this directory

## Project Structure

```
├── manifest.json       # Extension manifest (MV3)
├── background.js       # Service worker — badge & icon click handler
├── content.js          # Content script — floating bubble UI
├── rules.json          # Declarative net request rule (standby)
├── .gitignore          # Ignores _metadata/
└── LICENSE             # MIT
```

## License

MIT
