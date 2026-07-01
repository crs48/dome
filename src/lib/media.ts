import type { ImageMetadata } from 'astro';

// Eagerly import every render PNG so the gallery/design pages can optimize
// them through <Image>. Vite returns { default: ImageMetadata } per file.
const renderModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/renders/*.png',
  { eager: true },
);

export interface Render {
  file: string;
  image: ImageMetadata;
  caption: string;
  step?: number; // iteration-story step; undefined = geometry study / aside
}

// Human captions + the iteration order that drives the /design timeline.
const RENDER_META: Record<string, { caption: string; step?: number }> = {
  'dome_render.png': { caption: 'Bare translucent 5/8-sphere geodesic shell', step: 1 },
  'dome_concrete_floor.png': { caption: 'A polished concrete floor grounds the volume', step: 2 },
  'dome_with_kitchen.png': { caption: 'Perimeter kitchen counter and floating shelves', step: 3 },
  'dome_with_furniture.png': { caption: 'Low furniture blockouts define zones', step: 4 },
  'dome_with_rings.png': { caption: 'Gymnastic rings hung from the apex', step: 5 },
  'dome_with_real_plants.png': { caption: 'Biophilic planting brings the room alive', step: 6 },
  'dome_plants_positioned.png': { caption: 'Plants repositioned along the glazed band', step: 7 },
  'dome_kitchen_final.png': { caption: 'Kitchen study — final framing', step: 8 },
  'dome_5_8_sphere.png': { caption: '5/8-sphere geodesic geometry study' },
  'dome_5_8_sphere_correct.png': { caption: 'Corrected 5/8-sphere geometry' },
};

function baseName(path: string): string {
  return path.split('/').pop() ?? path;
}

// Build the render list: known files in caption order, skipping the raw
// frame dumps (dome_kitchen_final.png0001.png / .png0002.png).
export const renders: Render[] = Object.entries(renderModules)
  .map(([path, mod]) => ({ file: baseName(path), image: mod.default }))
  .filter((r) => RENDER_META[r.file] !== undefined)
  .map((r) => ({ ...r, ...RENDER_META[r.file] }))
  .sort((a, b) => {
    // stepped renders first (by step), then studies alphabetically
    if (a.step && b.step) return a.step - b.step;
    if (a.step) return -1;
    if (b.step) return 1;
    return a.file.localeCompare(b.file);
  });

// The stepped iteration story (Bare → … → Kitchen), for the /design timeline.
export const iterationStory: Render[] = renders.filter((r) => r.step !== undefined);

// A hero-quality render, used as a secondary visual alongside the AI stills.
export const heroRender: Render =
  renders.find((r) => r.file === 'dome_with_real_plants.png') ?? renders[0];

// ── AI-generated stills (Grok Imagine) ───────────────────────────────────
const photoModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/*.{jpg,jpeg,png}',
  { eager: true },
);

export interface Photo {
  file: string;
  image: ImageMetadata;
  caption: string;
}

const PHOTO_META: Record<string, string> = {
  'imagine-cbd1317c.jpg':
    'The one-room dome, whole: a rope net loft under a central oculus, gymnastic rings, a freestanding tub, plants along the glazed band, and wall bars — all in a single daylit room.',
};

export const photos: Photo[] = Object.entries(photoModules)
  .map(([path, mod]) => ({ file: baseName(path), image: mod.default }))
  .map((p) => ({
    ...p,
    caption: PHOTO_META[p.file] ?? 'AI-generated concept of the one-room dome.',
  }));

// The hero still — the highest-fidelity view of the whole concept.
export const heroPhoto: Photo | undefined = photos.find(
  (p) => p.file === 'imagine-cbd1317c.jpg',
);

export interface Clip {
  file: string; // filename in public/videos/
  caption: string;
}

// The 15 AI concept clips. Captions are intentionally generic — these are
// "dollhouse" isometric cutaways and interior fly-throughs of biophilic dome
// interiors (see the About page for provenance).
export const clips: Clip[] = [
  { file: '189b0549-ff66-406d-afe0-0e108efc80c2.mp4', caption: 'Concept clip · isometric cutaway' },
  { file: '3126ffdd-57c6-42bc-a05a-fa160dc85970.mp4', caption: 'Concept clip · interior fly-through' },
  { file: '342cfa18-2294-4dc2-85a2-f21e58017bfc.mp4', caption: 'Concept clip · isometric cutaway' },
  { file: '4bdf51de-a037-4a25-96d1-ba368efbb7f0.mp4', caption: 'Concept clip · interior fly-through' },
  { file: '4ea51c5a-ed29-4dcf-ae93-9bb1fa3d21fb.mp4', caption: 'Concept clip · isometric cutaway' },
  { file: '59f04b2d-63b1-4ea4-8aa1-14c82a2a741d.mp4', caption: 'Concept clip · interior fly-through' },
  { file: '6eea7b3e-482a-4992-9138-166f3989a622.mp4', caption: 'Concept clip · isometric cutaway' },
  { file: '9134f7f9-8175-4eb8-b0b6-f9d0a0573e7d.mp4', caption: 'Concept clip · interior fly-through' },
  { file: '96e39c29-7aeb-441a-af7f-f8cee99306ce.mp4', caption: 'Concept clip · isometric cutaway' },
  { file: '9965236f-3bb0-474a-b2d9-38cff0243041.mp4', caption: 'Concept clip · interior fly-through' },
  { file: 'b8dafdbe-11c7-43c9-a88c-6bc83be1c6c7.mp4', caption: 'Concept clip · isometric cutaway' },
  { file: 'c646c359-464a-4bc5-ad39-f3f6e413ea38.mp4', caption: 'Concept clip · interior fly-through' },
  { file: 'd8cf23b3-a8b8-40cb-b89b-5ed895cd2f6a.mp4', caption: 'Concept clip · isometric cutaway' },
  { file: 'e6b540f9-7b7a-4dd2-87c2-d0172a804181.mp4', caption: 'Concept clip · interior fly-through' },
  { file: 'imagine-b5557a3c.mp4', caption: 'Concept clip · exterior study' },
];

export function posterFor(file: string): string {
  return `/videos/posters/${file.replace(/\.mp4$/, '.jpg')}`;
}

// A small clip used for the muted autoplay loop on the home hero (chosen for
// file size so the vibe lands without a heavy download).
export const featuredClip: Clip =
  clips.find((c) => c.file === 'b8dafdbe-11c7-43c9-a88c-6bc83be1c6c7.mp4') ??
  clips[0];

// A handful of clips to spotlight on the home page (the rest live in /gallery).
export const spotlightClips: Clip[] = clips
  .filter((c) => c.file !== featuredClip.file)
  .slice(0, 6);
