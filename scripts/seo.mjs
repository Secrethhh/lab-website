import fs from 'node:fs';

const base = 'https://secrethhh.github.io/lab-website/';
const escape = s => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export function generateSeo() {
  const verification = JSON.parse(fs.readFileSync('src/_data/searchVerification.json', 'utf8'));
  const pages = {
    'index.html': ['任延珍教授团队｜MMSLAB 多媒体安全实验室｜武汉大学', 'Yanzhen Ren’s Research Team | MMSLAB | Wuhan University'],
    'publications/index.html': ['论文成果｜任延珍教授团队｜MMSLAB', 'Publications | Yanzhen Ren’s Team | MMSLAB'],
    'research/index.html': ['研究成果｜任延珍教授团队｜MMSLAB', 'Research | Yanzhen Ren’s Team | MMSLAB'],
    'people/ren-yanzhen/index.html': ['任延珍教授｜武汉大学国家网络安全学院｜MMSLAB', 'Professor Yanzhen Ren | Wuhan University | MMSLAB']
  };
  const descriptions = [
    '任延珍教授团队（MMSLAB 多媒体安全实验室）依托武汉大学国家网络安全学院，研究语音与视频安全、深度伪造检测、信息隐藏与隐写分析。了解团队介绍、论文成果及开放代码与数据集。',
    'MMSLAB is Professor Yanzhen Ren’s research team at the School of Cyber Science and Engineering, Wuhan University. Explore audio and video security, deepfake detection, information hiding, publications, code and datasets.'
  ];
  const urls = [];
  for (const [file, titles] of Object.entries(pages)) for (const en of [false, true]) {
    const prefix = en ? 'en/' : '';
    const url = base + prefix + file.replace(/index\.html$/, '');
    const zhUrl = base + file.replace(/index\.html$/, '');
    const enUrl = base + 'en/' + file.replace(/index\.html$/, '');
    const filename = '_site/' + prefix + file;
    let html = fs.readFileSync(filename, 'utf8');
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(titles[Number(en)])}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(descriptions[Number(en)])}">`);
    const organization = {'@context':'https://schema.org','@type':'ResearchOrganization',name:en?'MMSLAB Multimedia Security Laboratory':'MMSLAB 多媒体安全实验室',alternateName:en?'Yanzhen Ren’s Research Team':'任延珍教授团队',url:base,logo:base+'assets/mmslab-logo.png',parentOrganization:{'@type':'CollegeOrUniversity',name:en?'Wuhan University':'武汉大学'},member:{'@type':'Person',name:en?'Yanzhen Ren':'任延珍',jobTitle:en?'Professor':'教授',url:base+'people/ren-yanzhen/'}};
    html = html.replace('</head>', `<meta name="robots" content="index,follow"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="zh-CN" href="${zhUrl}"><link rel="alternate" hreflang="en" href="${enUrl}"><link rel="alternate" hreflang="x-default" href="${zhUrl}"><meta property="og:title" content="${escape(titles[Number(en)])}"><meta property="og:description" content="${escape(descriptions[Number(en)])}"><meta property="og:url" content="${url}"><meta property="og:type" content="website"><script type="application/ld+json">${JSON.stringify(organization).replaceAll('<','\\u003c')}</script></head>`);
    fs.writeFileSync(filename, html);
    if (file === 'index.html') {
      const tags = Object.entries(verification).filter(([,value])=>value).map(([name,value])=>`<meta name="${escape(name)}" content="${escape(value)}">`).join('');
      fs.writeFileSync(filename, html.replace('</head>', tags+'</head>'));
    }
    urls.push(url);
  }
  fs.writeFileSync('_site/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(url=>`  <url><loc>${url}</loc></url>`).join('\n')+'\n</urlset>\n');
}
