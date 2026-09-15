import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

// Check literal public URLs in every active entry point. Keep dynamic variants explicit.
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const sources = [...walk('src'), 'index.html', 'public/lego.html',
  'public/realm-support.js', 'public/realm-unsupported.html'];
const references = new Set([
  '/vendor/draco/draco_decoder.wasm', '/vendor/draco/draco_wasm_wrapper.js',
  '/vendor/draco/draco_decoder.js',
  ...['Everly_Cover_Image'].flatMap(name =>
    [640, 1280].map(width => `/assets/${name}-${width}.webp`)),
]);
for (const file of sources) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/(?:\.?\/)((?:assets|vendor|fonts)\/[^"'`\s<>]+\.(?:jpg|jpeg|png|webp|svg|glb|mp4|js|wasm|ttf))(?=["'`\s<>?])/gi)) {
    references.add(`/${match[1]}`);
  }
}
references.add('/My Resume.pdf');
references.add('/favicon.svg');
const missing = [...references].filter(url => !existsSync(resolve('public', decodeURIComponent(url.slice(1)))));
if (missing.length) {
  console.error('Missing site assets:\n' + missing.join('\n'));
  process.exitCode = 1;
} else console.log(`Verified ${references.size} local asset references.`);
