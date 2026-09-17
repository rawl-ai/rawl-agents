# Publishing an agent

Each agent is one `.adf` file named `<name>.adf`. The site build downloads the release asset, verifies its sha256, and reads name, description, instructions, version, README, and every table from inside the file. Nothing about a live agent is curated here except the tagline.

## registry.json entry

```jsonc
{
  "slug": "ash",                     // the agent's given name; also the filename stem
  "status": "live",                  // live | coming-soon
  "version": "0.1.4",                // must equal adf_meta "version" inside the file
  "adfVersion": "0.2",
  "license": "MIT",
  "updatedAt": "2026-09-17",
  "tagline": "One line shown on the card.",
  "file": {
    "tag": "ash-0.1.4",              // release tag: <name>-<version>
    "name": "ash.adf",               // asset name: <name>.adf
    "sha256": "...",                 // node tools/sha256.mjs agents/drafts/ash.adf
    "sizeBytes": 163840
  }
}
```

A `coming-soon` entry adds `name` and `description` and leaves every `file` field null.

## What the file must contain

- `adf_meta`: `adf_name` equal to the slug, `version`, `adf_schema_version` at the current runtime's latest.
- `README.md` (the page body on the site), `mind.md` in index form, `soul.md`, `mind/log.md`.
- Skills under `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`, `adf`, `requires`).
- No instance state: empty `adf_identity`, `adf_tasks`, `adf_logs`, `adf_loop`; no `adf_did` or `status` meta keys.
- Copy that follows the runtime's prompt style: no em dashes, no contrast constructions, exemplars instead of descriptions of voice.

## Checklist

- [ ] File opens in the current ADF Studio without a migration prompt
- [ ] `sha256` and `sizeBytes` from `node tools/sha256.mjs`
- [ ] Release `<name>-<version>` created with asset `<name>.adf` (rawl-ai account)
- [ ] `registry.json` entry updated and pushed to `main`
- [ ] rawl-site redeployed (its build re-verifies the sha256)
