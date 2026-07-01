#!/usr/bin/env node
// Generate a poster JPG from the first frame of each concept clip in
// public/videos/ into public/videos/posters/. Requires ffmpeg on PATH.
// Run with: npm run posters
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const VIDEOS = 'public/videos';
const POSTERS = join(VIDEOS, 'posters');

if (!existsSync(VIDEOS)) {
  console.error(`No ${VIDEOS} directory — nothing to do.`);
  process.exit(0);
}
mkdirSync(POSTERS, { recursive: true });

const clips = readdirSync(VIDEOS).filter((f) => f.endsWith('.mp4'));
if (clips.length === 0) {
  console.error('No .mp4 clips found.');
  process.exit(0);
}

let made = 0;
for (const clip of clips) {
  const out = join(POSTERS, clip.replace(/\.mp4$/, '.jpg'));
  try {
    execFileSync(
      'ffmpeg',
      ['-y', '-loglevel', 'error', '-i', join(VIDEOS, clip), '-vframes', '1', '-q:v', '3', out],
      { stdio: 'inherit' },
    );
    made++;
  } catch (err) {
    console.error(`Failed to make poster for ${clip}:`, err.message);
  }
}
console.log(`Generated ${made}/${clips.length} poster frame(s) in ${POSTERS}`);
