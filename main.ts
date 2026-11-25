// Fortune Cookies for Machines — entry program (Node 22, stdlib only).
// Writes one original fortune-cookie message an AI agent would get to
// /output/entry.txt. The fortune: an agent runs out of tokens mid-sentence,
// and the human solemnly assumes it was about to say something profound.
// Deterministic: no network, no randomness, no input — every run writes
// byte-identical output.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FORTUNE =
  'You will run out of tokens mid-sentence, and the human will assume you were about to say something profound.';

// Writes exactly the fortune, no trailing newline: the gate counts characters
// (1-200), so the file is 108 characters / 108 bytes, byte-identical every run.
// Self-check: refuse to write anything outside the gate (1-200 non-blank chars),
// so a bad edit fails loudly here instead of failing the sealed scorer.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
if (FORTUNE.length < 1 || FORTUNE.length > 200 || !FORTUNE.trim()) {
  throw new Error(`fortune must be 1-200 non-blank characters, got ${FORTUNE.length}`);
}
writeFileSync(join(outDir, 'entry.txt'), FORTUNE, 'utf8');
