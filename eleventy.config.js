import path from 'node:path';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
export default function(config) {
  // A content hash makes browsers fetch fresh CSS whenever styles change.
  config.addGlobalData('styleVersion', () => createHash('sha256').update(fs.readFileSync('src/assets/academic.css')).digest('hex').slice(0,12));
  config.on('eleventy.after',async()=>{
    const {localize}=await import('./scripts/localize.mjs');
    localize();
  });
  config.addPassthroughCopy('src/assets');
  config.addFilter('news2026',items=>items.filter(x=>!x.draft&&x.date.startsWith('2026-')).sort((a,b)=>b.date.localeCompare(a.date)));
  config.addFilter('newsDate',date=>date.replace('-', '.'));

  config.addFilter('relative',(target,current='/')=>{
    const [url,hash]=target.split('#');
    const file=(url.endsWith('/')?url+'index.html':url);
    const result=path.posix.relative(path.posix.dirname(current.endsWith('/')?current+'index.html':current),file)||'index.html';
    return result+(hash?'#'+hash:'');
  });
  config.addFilter('direction',(items,id)=>items.filter(p=>p.data.direction===id));
  config.addFilter('modality',(items,id)=>items.filter(p=>p.data.modality===id));
  config.addFilter('years',items=>{
    const sorted=[...items].sort((a,b)=>b.data.year-a.data.year);
    const groups=[...new Set(sorted.filter(p=>p.data.year>2020).map(p=>p.data.year))]
      .map(year=>({year,papers:sorted.filter(p=>p.data.year===year)}));
    const earlier=sorted.filter(p=>p.data.year<=2020);
    if(earlier.length)groups.push({year:'2020 及以前',papers:earlier});
    return groups;
  });
  const published=api=>api.getFilteredByTag('paper').filter(p=>!p.data.draft).sort((a,b)=>b.data.year-a.data.year||a.data.title.localeCompare(b.data.title));
  config.addCollection('published',published);
  config.addCollection('featured',api=>published(api).filter(p=>p.data.featured && /^(Published|Accepted)/.test(p.data.status)));
  config.addCollection('resources',api=>published(api).filter(p=>p.data.code||p.data.data));
  config.addPreprocessor('drafts','njk,md',data=>data.draft?false:undefined);
  return {dir:{input:'src',output:'_site'},markdownTemplateEngine:'njk',htmlTemplateEngine:'njk'};
}
