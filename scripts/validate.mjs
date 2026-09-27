import fs from 'node:fs';
import matter from 'gray-matter';
for (const file of fs.readdirSync('src/publications').filter(f=>f.endsWith('.md'))) {
 const {data,content}=matter(fs.readFileSync('src/publications/'+file,'utf8'));
 if (!data.title || !data.summary || !Number.isInteger(data.year) || data.year<1900 || data.year>2100 || !['security','hiding'].includes(data.direction)) throw Error('论文必填字段不完整或年份无效：'+file);
 if(!['audio','video','image'].includes(data.modality))throw Error('请填写模态 audio/video/image：'+file);
 if(data.featured&&(!/^(Published|Accepted)/.test(data.status)||!['audio','video'].includes(data.modality)))throw Error('首页代表作必须已发表或已录用，且归入语音或视频：'+file);
 if(typeof data.draft!=='boolean'||typeof data.featured!=='boolean')throw Error('draft/featured 必须为布尔值：'+file);
 for(const key of ['paper','code','data'])if(data[key]){const url=new URL(data[key]);if(url.protocol!=='https:')throw Error('资源必须使用 HTTPS：'+file);}
 if(!data.draft){
  for(const key of ['title','summary','problem','method','resourceDescription','usage'])if(data[key]&&/[\u4e00-\u9fff]/.test(data[key]))throw Error('论文内容请填写英文 '+key+'：'+file);
  if(/[\u4e00-\u9fff]/.test(content))throw Error('论文详细介绍请填写英文：'+file);
  if(data.code||data.data)for(const key of ['resourceName','problem','method','resourceDescription','usage'])if(!data[key])throw Error('开放资源说明未填完整 '+key+'：'+file);
  if(!data.problem&&!content.trim())throw Error('请补充英文详细介绍：'+file);
 }
}
const {items:news}=JSON.parse(fs.readFileSync('src/_data/news.json','utf8'));
for(const item of news){
 if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(item.date)||typeof item.draft!=='boolean')throw Error('News 年月或草稿状态无效');
 if(!item.draft){
  for(const key of ['text','title','url','source'])if(!item[key])throw Error('News 缺少 '+key);
  for(const key of ['url','source'])if(new URL(item[key]).protocol!=='https:')throw Error('News 链接必须使用 HTTPS');
 }
}
console.log('论文与 News 内容检查通过');
