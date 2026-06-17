# rawl-agents

First-party ADF agents, **built and maintained by Rawl**. This repo hosts the
agent files and is the source of record for their versions and checksums. It
powers the agent gallery at **[rawl.ai/registry](https://rawl.ai/registry)**.

Every agent is a single [`.adf`](https://rawl.ai/adf-protocol) file — a portable,
inspectable SQLite container holding an agent's identity, memory, files, tools,
timers, messages, and state. Download one, open it in
[ADF Studio](https://rawl.ai/adf-studio), connect a model, and it runs. You own
the file outright: inspect it, change it, move it.

> These agents are curated by Rawl. We're **not accepting third-party
> submissions yet** — that may open up later.

## How it works

- Each agent version ships as a **GitHub Release asset**, named
  `<slug>-<version>.adf` (e.g. `chief-of-staff-0.1.0.adf`).
- [`registry.json`](registry.json) indexes every published agent: slug, version,
  download URL, `sha256`, and size.

## Verifying a download

The gallery shows each file's `sha256`. After downloading, confirm it matches:

```bash
shasum -a 256 chief-of-staff-0.1.0.adf   # macOS / Linux
node tools/sha256.mjs chief-of-staff-0.1.0.adf
```

A matching hash means the file wasn't altered in transit (integrity, not
authorship — signing may come later).

## Maintainers

Publishing a version (Rawl only): build the `.adf`, run
`node tools/sha256.mjs <file>` for its checksum, attach it to a
`v<version>` GitHub Release, then update [`registry.json`](registry.json) and
the matching entry in `rawl-site`. See [`agents/TEMPLATE.md`](agents/TEMPLATE.md)
for the metadata shape.

## License

MIT — see [LICENSE](LICENSE).
