import fs from 'node:fs';
import matter from 'gray-matter';
for (const file of fs.readdirSync('src/publications').filter(f=>f.endsWith('.md'))) {
 const {data}=matter(fs.readFileSync('src/publications/'+file,'utf8'));
 if (!data.title || !data.summary || !Number.isInteger(data.year) || !['security','hiding'].includes(data.direction)) throw Error('论文必填字段不完整：'+file);
 if(typeof data.draft!=='boolean'||typeof data.featured!=='boolean')throw Error('draft/featured 必须为布尔值：'+file);
 for(const key of ['paper','code','data'])if(data[key]){const url=new URL(data[key]);if(url.protocol!=='https:')throw Error('资源必须使用 HTTPS：'+file);}
}
console.log('论文内容检查通过');
