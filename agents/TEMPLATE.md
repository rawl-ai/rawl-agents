# Agent metadata template

When publishing an agent, add an entry to [`../registry.json`](../registry.json)
and the matching entry in `rawl-site` (`src/registryManifest.mjs`). They share
this shape:

```jsonc
{
  "slug": "chief-of-staff",          // url-safe id; also the filename stem
  "name": "Chief of Staff",
  "tagline": "One-line description shown on the card.",
  "category": "Productivity",         // a gallery filter tab
  "icon": "Fingerprint",              // lucide-react icon name (site only)
  "tags": ["memory", "telegram"],
  "version": "0.1.0",
  "adfVersion": "0.2",
  "license": "MIT",
  "updatedAt": "2026-06-16",
  "description": "## What it does\n\nLonger markdown shown on the detail page.",
  "capabilities": {                   // the "know what you're opening" disclosure
    "tools": ["filesystem", "web"],
    "channels": ["telegram", "email"],
    "sandbox": "js",                  // none | js | container | host
    "network": true,
    "mcp": []
  },
  "file": {
    "name": "chief-of-staff-0.1.0.adf",
    "url": "https://github.com/rawl-ai/rawl-agents/releases/download/v0.1.0/chief-of-staff-0.1.0.adf",
    "sha256": "…",                    // node tools/sha256.mjs <file>
    "sizeBytes": 0
  },
  "source": null                       // optional repo/source URL
}
```

## Checklist

- [ ] Asset named `<slug>-<version>.adf`
- [ ] `sha256` + `sizeBytes` from `node tools/sha256.mjs`
- [ ] `capabilities` reflect what the agent actually requests
- [ ] Entry added to `registry.json` with `"published": true`
- [ ] Matching entry updated in `rawl-site/src/registryManifest.mjs`
