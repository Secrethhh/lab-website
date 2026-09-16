import fs from 'node:fs';
import matter from 'gray-matter';
for (const file of fs.readdirSync('src/publications').filter(f=>f.endsWith('.md'))) {
 const {data}=matter(fs.readFileSync('src/publications/'+file,'utf8'));
 if (!data.title || !data.summary || !Number.isInteger(data.year) || data.year<1900 || data.year>2100 || !['security','hiding'].includes(data.direction)) throw Error('论文必填字段不完整或年份无效：'+file);
 if(typeof data.draft!=='boolean'||typeof data.featured!=='boolean')throw Error('draft/featured 必须为布尔值：'+file);
 for(const key of ['paper','code','data'])if(data[key]){const url=new URL(data[key]);if(url.protocol!=='https:')throw Error('资源必须使用 HTTPS：'+file);}
 if(!data.draft){
  for(const key of ['titleEn','summaryEn'])if(!data[key])throw Error('缺少英文内容 '+key+'：'+file);
  if(data.code||data.data)for(const key of ['resourceName','problem','problemEn','method','methodEn','resourceDescription','resourceDescriptionEn','usage','usageEn'])if(!data[key])throw Error('开放资源说明未填完整 '+key+'：'+file);
  if(!data.problem&&!data.bodyEn)throw Error('请补充英文详细介绍 bodyEn：'+file);
 }
}
console.log('论文内容检查通过');
