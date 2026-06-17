// Print the sha256 and byte size of a file, for publishing .adf agents.
// Usage: node tools/sha256.mjs path/to/agent-0.1.0.adf
import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node tools/sha256.mjs <file.adf>');
  process.exit(1);
}

const buf = readFileSync(file);
const sha256 = createHash('sha256').update(buf).digest('hex');
const sizeBytes = statSync(file).size;

console.log(JSON.stringify({ file, sha256, sizeBytes }, null, 2));
