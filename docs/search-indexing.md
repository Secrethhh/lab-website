# 搜索引擎收录维护

网站：https://secrethhh.github.io/lab-website/

站点地图：https://secrethhh.github.io/lab-website/sitemap.xml

构建时 `scripts/seo.mjs` 在中英文生成完成后写入标题、描述、canonical、语言版本链接、结构化信息和站点地图。调整网址或新增页面时同步修改该文件。资源跳转页不列入站点地图。

## 首次提交（需维护者登录）

1. 在 [Google Search Console](https://search.google.com/search-console/) 添加 **网址前缀** `https://secrethhh.github.io/lab-website/`，不要选择需要 DNS 控制权的域名验证。
2. 选择 HTML 标签验证，将平台给出的 `content` 值填入 `src/_data/searchVerification.json` 对应项，提交后等待部署成功，再点击验证。
3. 在 [Bing Webmaster Tools](https://www.bing.com/webmasters/) 添加同一网址，可用 HTML 标签验证，或在 Google 验证后导入。
4. 在 [百度搜索资源平台](https://ziyuan.baidu.com/) 登录并按账号当前开放的网站添加、验证和链接提交功能操作。若平台不接受项目子路径，需另行解决域名根目录控制权，不能把项目路径验证文件误当作根目录文件。
5. 验证后，在可用的站点地图提交入口提交上面的 sitemap 地址，并检查首页的抓取/索引状态。不要填写虚构验证码；JSON 中空值表示尚未验证。

验证标签是公开标识，可以入库；账号密码、访问令牌和 API 密钥不能入库。交接时在各平台给接任者授权，避免只保留个人账号权限。

## robots.txt 的位置限制

当前是 GitHub Pages 项目站，爬虫读取的是 `https://secrethhh.github.io/robots.txt`，而非 `/lab-website/robots.txt`。本仓库不能通过发布项目内文件控制域名根目录，因此不生成无效的子目录 robots.txt。页面已显式设置 `index,follow`；无禁止规则时不必专门创建 robots.txt 才能抓取。

若将来维护域名根目录站点，可在其 robots.txt 中加入本项目的 Sitemap 地址；不要覆盖同一域名其他项目的规则。

## 持续维护

- 请老师或学院在正式个人主页添加实验室链接，需由有权限的负责人操作。
- 更新论文时正常构建即可，无需反复修改标题或堆积关键词。
- 提交不等于收录，不承诺收录时间、排名或展示样式。

官方说明：[Google 站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)、[robots.txt 位置](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)、[Bing 网站验证](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b)。
