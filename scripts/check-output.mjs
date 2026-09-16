import fs from 'node:fs';
import path from 'node:path';
const files=fs.readdirSync('_site',{recursive:true}).filter(f=>f.endsWith('.html'));
for(const f of files){const text=fs.readFileSync(path.join('_site',f),'utf8');for(const [,url]of text.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|mailto:|#|data:)/.test(url))continue;const target=path.resolve('_site',path.dirname(f),url.split('#')[0]);if(!fs.existsSync(target))throw Error(f+' 存在失效站内链接 '+url);}}
console.log(`检查通过：${files.length} 个页面，无失效站内链接`);
