// Lists every `ss-*` class DEFINED as a selector in GLOBAL_CSS that no className in
// src/App.tsx ever carries. A CSS rule whose selector matches nothing fails silently:
// tsc cannot see it and eslint cannot see it, so a rename that moves the JSX and leaves
// the sheet behind is invisible until someone measures the page. That is exactly what
// happened to `.ss-chapter-pair` in 1e47206 (see CLAUDE.md §6). Run this after any rename.
//   node scratchpad/deadcss.cjs
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/../src/App.tsx', 'utf8');

const classes = new Set();
for (const m of src.matchAll(/\.(ss-[a-zA-Z0-9_-]+)/g)) classes.add(m[1]);

const dead = [];
for (const c of [...classes].sort()) {
  // as a selector: preceded by a dot
  const defs = (src.match(new RegExp('\\.' + c + '(?![a-zA-Z0-9_-])', 'g')) || []).length;
  // as a NAME: a bare token, i.e. inside a className string or a closest() argument
  const uses = (src.match(new RegExp('(?<![.a-zA-Z0-9_-])' + c + '(?![a-zA-Z0-9_-])', 'g')) || []).length;
  if (uses === 0) dead.push({ c, defs });
}

console.log(`${classes.size} ss- classes defined in the sheet`);
if (!dead.length) { console.log('none orphaned'); process.exit(0); }
console.log(`\n${dead.length} matched by NO className:\n`);
for (const d of dead) console.log(`  ${d.c.padEnd(30)} ${d.defs} selector hit${d.defs === 1 ? '' : 's'}`);
console.log(`\nEach is either dead weight to delete or, if the rule looks load bearing,
a rename that left its rule behind. Check the JSX before deleting either way.`);
