# rawl-agents

First-party ADF agents, built and maintained by Rawl. This repo **hosts the
agent files** and is the source of record for their versions and checksums. It
powers the agent gallery at **[rawl.ai/registry](https://rawl.ai/registry)**.

Every agent is a single [`.adf`](https://rawl.ai/adf-protocol) file — a portable,
inspectable SQLite container holding an agent's identity, memory, files, tools,
timers, messages, and state. Download one, open it in
[ADF Studio](https://rawl.ai/adf-studio), connect a model, and it runs. You own
the file outright: inspect it, change it, move it.

## How it works

- Each agent version ships as a **GitHub Release asset** on this repo.
- The asset is named **`<slug>-<version>.adf`** (e.g. `chief-of-staff-0.1.0.adf`),
  which matches the filename the website derives and displays.
- [`registry.json`](registry.json) is the index: slug, version, download URL,
  `sha256`, and size for every published agent.
- The website (`rawl-site`) mirrors this in its on-site manifest to render the
  gallery. This repo owns the **files + checksums**; the site owns presentation.

## Publishing a new agent version

1. Build the agent into a `.adf` file named `<slug>-<version>.adf`.
2. Compute its checksum and size:
   ```bash
   node tools/sha256.mjs path/to/chief-of-staff-0.1.0.adf
   ```
3. Create a GitHub Release tagged `v<version>` and upload the `.adf` as an asset:
   ```bash
   gh release create v0.1.0 chief-of-staff-0.1.0.adf --title "v0.1.0" --notes "…"
   ```
4. Add/update the agent's entry in [`registry.json`](registry.json) with the
   asset `url`, `sha256`, `sizeBytes`, and set `"published": true`.
5. Update the matching entry in `rawl-site` (`src/registryManifest.mjs`) —
   `file.url`, `file.sha256`, `file.sizeBytes` — and merge. The site
   auto-deploys and the agent goes live in the gallery.

See [`agents/TEMPLATE.md`](agents/TEMPLATE.md) for the metadata shape.

## Verifying a download

The gallery shows each file's `sha256`. After downloading, confirm it matches:

```bash
shasum -a 256 chief-of-staff-0.1.0.adf   # macOS / Linux
node tools/sha256.mjs chief-of-staff-0.1.0.adf
```

A matching hash means the file wasn't altered. (Integrity, not authorship —
authorship signing may come later.)

## Layout

```
registry.json        index of published agents (files + checksums)
agents/TEMPLATE.md   metadata template for a new agent
tools/sha256.mjs     print sha256 + byte size of a file
```

## License

Agents and code in this repo are MIT licensed. See [LICENSE](LICENSE).
