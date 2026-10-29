import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/portfolioNavigation.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const { readPortfolioRoute, routeHash, mediaId } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
const catalog = [{id:'creative-projects',media:[{src:'/assets/Porsche_GT3_RS.mp4'},{src:'/assets/resume-design/resume.png'}]}];
test('project links restore the correct category and asset',()=>{
 const route={page:'work',projectId:'creative-projects',mediaId:'porsche-gt3-rs'};
 assert.deepEqual(readPortfolioRoute(routeHash(route),catalog),route);
});
test('unknown links degrade to a valid parent view',()=>{
 assert.deepEqual(readPortfolioRoute('#work/missing/item',catalog),{page:'work'});
 assert.deepEqual(readPortfolioRoute('#work/creative-projects/missing',catalog),{page:'work',projectId:'creative-projects'});
 assert.deepEqual(readPortfolioRoute('#%broken',catalog),{page:'home'});
});
test('page links and nested asset paths round-trip',()=>{
 for(const page of ['home','work','about','contact']) assert.deepEqual(readPortfolioRoute(routeHash({page}),catalog),{page});
 assert.equal(mediaId('/assets/resume-design/resume.png'),'resume-design-resume');
 assert.equal(mediaId('/assets/Porsche_GT3_RS.mp4'),'porsche-gt3-rs');
});

test('every real project has a unique, resolvable link and valid related links', async () => {
 const app = ts.createSourceFile('App.tsx', readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
 let initializer;
 for (const statement of app.statements) {
  if (ts.isVariableStatement(statement)) for (const declaration of statement.declarationList.declarations) {
   if (declaration.name.getText(app) === 'PROJECTS') initializer = declaration.initializer.getText(app);
  }
 }
 assert.ok(initializer);
 const { projects } = await import('data:text/javascript;base64,' + Buffer.from('export const projects = ' + initializer).toString('base64'));
 const titles = new Set(projects.flatMap(project => project.media.map(item => item.title)));
 for (const project of projects) {
  const ids = project.media.map(item => mediaId(item.src));
  assert.equal(new Set(ids).size, ids.length, `Duplicate asset link in ${project.id}`);
  for (const item of project.media) {
   const route = {page:'work', projectId:project.id, mediaId:mediaId(item.src)};
   assert.deepEqual(readPortfolioRoute(routeHash(route), projects), route);
   for (const related of item.relatedItems || []) assert.ok(titles.has(related), `Missing related project: ${related}`);
  }
 }
});
