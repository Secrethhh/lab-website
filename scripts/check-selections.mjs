import fs from 'node:fs';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
const papers=fs.readdirSync('src/publications').filter(f=>f.endsWith('.md')).map(f=>({slug:f.slice(0,-3),...matter(fs.readFileSync('src/publications/'+f,'utf8')).data})).filter(p=>!p.draft);
for(const lang of ['', 'en/']){
 const html=fs.readFileSync('_site/'+lang+'index.html','utf8');
 assert(html.includes('class="team-count"'));
 for(const direction of ['security','hiding'])for(const modality of ['audio','video']){
  const id=`selected-${direction}-${modality}`;
  const section=html.match(new RegExp(`<section class="selected-group" id="${id}">([\\s\\S]*?)</section>`))?.[1];
  assert(section,`Missing group: ${id}`);
  const expected=papers.filter(p=>p.featured&&p.direction===direction&&p.modality===modality&&/^(Published|Accepted)/.test(p.status));
  assert.equal((section.match(/class="paper-row"/g)||[]).length,expected.length);
  for(const p of expected)assert(section.includes(`data-paper="${p.slug}"`));
  assert(!section.includes('Preprint'));
 }
}
console.log('Four representative groups and preprint exclusion passed in both languages.');
