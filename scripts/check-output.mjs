import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
const expectedPapers=fs.readdirSync('src/publications').filter(f=>f.endsWith('.md')).map(f=>({slug:f.slice(0,-3),...matter(fs.readFileSync('src/publications/'+f,'utf8')).data})).filter(p=>!p.draft);
for(const language of ['', 'en/']){
 const html=fs.readFileSync('_site/'+language+'publications/index.html','utf8');
 const rows=html.match(/<article class="paper-row">[\s\S]*?<\/article>/g)||[];
 if(rows.length!==expectedPapers.length)throw Error(`${language}publications：预期 ${expectedPapers.length} 篇成果，实际显示 ${rows.length} 篇`);
 for(const paper of expectedPapers){const matching=rows.filter(row=>row.includes(`href="${paper.slug}/index.html"`));if(matching.length!==1)throw Error('论文缺失或重复：'+paper.slug);const marker=`<h2 class="year">${paper.year}</h2>`;const start=html.indexOf(marker);const next=html.indexOf('<h2 class="year">',start+marker.length);if(start<0||!html.slice(start,next<0?undefined:next).includes(matching[0]))throw Error('论文年份分组错误：'+paper.slug);}
}
console.log('中英文成果列表完整性与年份分组检查通过');
const files=fs.readdirSync('_site',{recursive:true}).filter(f=>f.endsWith('.html'));
for(const f of files){const text=fs.readFileSync(path.join('_site',f),'utf8');for(const [,url]of text.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|mailto:|#|data:)/.test(url))continue;const target=path.resolve('_site',path.dirname(f),url.split('#')[0]);if(!fs.existsSync(target))throw Error(f+' 存在失效站内链接 '+url);}}
console.log(`检查通过：${files.length} 个页面，无失效站内链接`);
for(const f of files.filter(f=>f.replaceAll('\\','/').startsWith('en/'))){const html=fs.readFileSync(path.join('_site',f),'utf8');const main=html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1]||'';if(/[\u4e00-\u9fff]/.test(main.replace(/<[^>]*>/g,'')))throw Error('英文页面存在未翻译正文，请补充对应英文内容或 translations.json：'+f);}
console.log('英文正文覆盖检查通过');
