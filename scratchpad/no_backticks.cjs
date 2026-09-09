/* GLOBAL_CSS IS A TEMPLATE LITERAL, so ONE backtick anywhere inside it ends the string and
   breaks the file with syntax errors far from the edit. It is the most repeated mistake in
   this file's history: four separate times in the 2026-09-09 pass alone, each time inside a
   CSS comment naming a property or a filename in backticks out of markdown habit.
   tsc DOES catch it, but only after the fact and with a confusing message pointing at the
   line where the resulting garbage stops parsing rather than at the backtick. This says
   exactly where it is. Run it before tsc after touching GLOBAL_CSS. */
const fs = require('fs');
const src = fs.readFileSync('src/App.tsx', 'utf8');
const start = src.indexOf('const GLOBAL_CSS');
const open = src.indexOf('`', start);
const close = src.indexOf('\n`;', open);
if (start < 0 || open < 0 || close < 0) { console.error('could not locate GLOBAL_CSS'); process.exit(2); }
const body = src.slice(open + 1, close);
const before = src.slice(0, open + 1);
let line = before.split('\n').length, bad = [];
for (let i = 0; i < body.length; i++) {
  if (body[i] === '\n') line++;
  else if (body[i] === '`') bad.push(line);
}
if (bad.length) {
  console.error(`FAIL ${bad.length} backtick(s) inside GLOBAL_CSS, at line(s): ${bad.join(', ')}`);
  console.error('Each one ends the template literal. Write the name without backticks.');
  process.exit(1);
}
console.log(`PASS no backticks inside GLOBAL_CSS (${body.split('\n').length} lines checked)`);
