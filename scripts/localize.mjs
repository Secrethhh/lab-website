import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
export function localize() {
const md=new MarkdownIt({html:false});
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const dictionary=JSON.parse(fs.readFileSync('src/_data/translations.json','utf8'));
const site=JSON.parse(fs.readFileSync('src/_data/site.json','utf8'));
for(const direction of site.directions)for(const area of direction.subareas||[])for(const key of ['title','description'])dictionary[area[key]]=area[key+'En'];
const papers=new Map();
for(const file of fs.readdirSync('src/publications').filter(f=>f.endsWith('.md'))){const {data}=matter(fs.readFileSync('src/publications/'+file,'utf8'));if(data.draft)continue;papers.set(file.slice(0,-3),data);for(const key of ['title','summary','problem','method','resourceDescription','usage'])if(data[key]&&data[key+'En'])dictionary[data[key]]=data[key+'En'];}
// Translate longest phrases first so a short label cannot consume part of a heading.
const entries=Object.entries(dictionary).sort((a,b)=>b[0].length-a[0].length);
const translate=s=>{for(const [zh,en]of entries)s=s.split(escape(zh)).join(escape(en));return s;};
const files=fs.readdirSync('_site',{recursive:true}).map(f=>f.replaceAll('\\','/')).filter(f=>f.endsWith('.html')&&!f.startsWith('en/'));
for(const file of files){let html=fs.readFileSync('_site/'+file,'utf8');const enFile='en/'+file;const paper=papers.get(file.match(/^publications\/([^/]+)\/index.html$/)?.[1]);
 if(paper?.bodyEn&&!paper.problem)html=html.replace(/<div class="prose">[\s\S]*?<\/div>/,()=>'<div class="prose">'+md.render(paper.bodyEn)+'</div>');
 html=translate(html).replace('<html lang="zh-CN">','<html lang="en">');
 const back=path.posix.relative(path.posix.dirname(enFile),file);
 html=html.replace(/<a class="language"[^>]*>[\s\S]*?<\/a>/,()=>`<a class="language" href="${back}" lang="zh-CN" hreflang="zh-CN" aria-label="切换到中文">中文 ↗</a>`);
 // Relative navigation stays inside /en/. Shared files stay in the root assets directory.
 html=html.replace(/(href|src)="([^"]+)"/g,(all,attr,url)=>{if(/^(https?:|mailto:|#)/.test(url))return all;const target=path.posix.normalize(path.posix.join(path.posix.dirname(file),url));if(!target.startsWith('assets/'))return all;return `${attr}="${path.posix.relative(path.posix.dirname(enFile),target)}"`;});
 fs.mkdirSync(path.posix.dirname('_site/'+enFile),{recursive:true});fs.writeFileSync('_site/'+enFile,html);
}
console.log(`生成 ${files.length} 个英文页面`);
}
