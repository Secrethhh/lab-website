import path from 'node:path';
export default function(config) {
  config.on('eleventy.after',async()=>{
    const {localize}=await import('./scripts/localize.mjs');
    localize();
  });
  config.addPassthroughCopy('src/assets');
  config.addFilter('relative',(target,current='/')=>{
    const [url,hash]=target.split('#');
    const file=(url.endsWith('/')?url+'index.html':url);
    const result=path.posix.relative(path.posix.dirname(current.endsWith('/')?current+'index.html':current),file)||'index.html';
    return result+(hash?'#'+hash:'');
  });
  config.addFilter('direction',(items,id)=>items.filter(p=>p.data.direction===id));
  config.addFilter('years',items=>[...new Set(items.map(p=>p.data.year))].sort((a,b)=>b-a).map(year=>({year,papers:items.filter(p=>p.data.year===year)})));
  const published=api=>api.getFilteredByTag('paper').filter(p=>!p.data.draft).sort((a,b)=>b.data.year-a.data.year||a.data.title.localeCompare(b.data.title));
  config.addCollection('published',published);
  config.addCollection('featured',api=>published(api).filter(p=>p.data.featured));
  config.addCollection('resources',api=>published(api).filter(p=>p.data.code||p.data.data));
  config.addPreprocessor('drafts','njk,md',data=>data.draft?false:undefined);
  return {dir:{input:'src',output:'_site'},markdownTemplateEngine:'njk',htmlTemplateEngine:'njk'};
}
