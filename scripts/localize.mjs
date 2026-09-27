import fs from 'node:fs';
import path from 'node:path';
export function localize() {
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const dictionary=JSON.parse(fs.readFileSync('src/_data/translations.json','utf8'));
const faculty=JSON.parse(fs.readFileSync('src/_data/faculty.json','utf8'));
dictionary[faculty.role]=faculty.roleEn;
for(const section of faculty.sections){dictionary[section.title]=section.titleEn;for(const entry of section.entries)dictionary[entry.text]=entry.textEn;}
const team=JSON.parse(fs.readFileSync('src/_data/team.json','utf8'));
dictionary[`目前实验室博士 ${team.doctoral} 人，硕士 ${team.masters} 人。`]=`The lab currently has ${team.doctoral} doctoral students and ${team.masters} master's students.`;
const site=JSON.parse(fs.readFileSync('src/_data/site.json','utf8'));
for(const direction of site.directions)for(const area of direction.subareas||[])for(const key of ['title','description'])dictionary[area[key]]=area[key+'En'];
// Translate longest phrases first so a short label cannot consume part of a heading.
const entries=Object.entries(dictionary).sort((a,b)=>b[0].length-a[0].length);
const translate=s=>{for(const [zh,en]of entries)s=s.split(escape(zh)).join(escape(en));return s;};
const files=fs.readdirSync('_site',{recursive:true}).map(f=>f.replaceAll('\\','/')).filter(f=>f.endsWith('.html')&&!f.startsWith('en/'));
for(const file of files){let html=fs.readFileSync('_site/'+file,'utf8');const enFile='en/'+file;
 html=translate(html).replace('<html lang="zh-CN">','<html lang="en">');
 const back=path.posix.relative(path.posix.dirname(enFile),file);
 html=html.replace(/<a class="language"[^>]*>[\s\S]*?<\/a>/,()=>`<a class="language" href="${back}" lang="zh-CN" hreflang="zh-CN" aria-label="切换到中文">中文 ↗</a>`);
 // Relative navigation stays inside /en/. Shared files stay in the root assets directory.
 html=html.replace(/(href|src)="([^"]+)"/g,(all,attr,url)=>{if(/^(https?:|mailto:|#)/.test(url))return all;const target=path.posix.normalize(path.posix.join(path.posix.dirname(file),url));if(!target.startsWith('assets/'))return all;return `${attr}="${path.posix.relative(path.posix.dirname(enFile),target)}"`;});
 fs.mkdirSync(path.posix.dirname('_site/'+enFile),{recursive:true});fs.writeFileSync('_site/'+enFile,html);
}
console.log(`生成 ${files.length} 个英文页面`);
}
