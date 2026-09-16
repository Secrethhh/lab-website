# MALab 多媒体安全官网

武汉大学国家网络安全学院。研究方向：多媒体安全、信息隐藏。

中文网站：https://secrethhh.github.io/lab-website/ 。英文网站：https://secrethhh.github.io/lab-website/en/ 。右上角 English / 中文切换到当前页面的对应语言版本，语言切换不依赖浏览器翻译或 JavaScript。

## 两种建设方案

| 方案 | 平时如何更新 | 成本与维护 | 适用情况 |
|---|---|---|---|
| **方案一：Eleventy + Pages CMS + GitHub Pages（本项目）** | 浏览器表单填写论文，保存后自动生成和发布 | 公开仓库的 Pages 托管免费；不必买域名；无需自己维护数据库 | 本团队，季度更新，以成果展示为主 |
| 方案二：WordPress + 学校服务器或商业托管 | WordPress 后台编辑 | 学校提供服务器时视校内安排；商业服务按实际报价，需更新系统、插件和备份 | 需要复杂栏目权限、频繁编辑、其他动态功能 |

这里使用标准框架 Eleventy，不是手动逐页维护 HTML。每篇论文只存一份 Markdown 内容，首页、成果列表、研究方向和开放资源页面自动同步。网站输出是静态文件，但内容维护使用表单或 Markdown。Pages CMS 是独立的在线编辑服务，需要首次登录 GitHub 并授权，不是内置在官网中的管理页面。

## 第一次上线：只需在网页上操作

1. 打开 https://github.com/Secrethhh/lab-website/settings/pages 。
2. 找到 **Build and deployment**（构建和部署）。在 **Source**（来源）下拉框中选择 **GitHub Actions**。
3. 打开 https://github.com/Secrethhh/lab-website/actions ，找到 **Publish website**。若之前失败，点进该次运行，选择 **Re-run all jobs**。也可以在工作流页点击 **Run workflow**。
4. 等待运行变成绿色，再访问上面的公开地址。

README 是给维护者看的说明书，不是网站首页。github.com 是存放文件的地方；github.io 才是公众浏览的网站。

## 每三个月更新：推荐使用表单

1. 打开 https://app.pagescms.org ，用拥有本仓库权限的 GitHub 账号登录。
2. 按提示安装/授权 Pages CMS，只选择此仓库即可；选中 `Secrethhh/lab-website` 和 `main` 分支。
3. 打开“论文与成果”，新增或修改记录。填写中英文标题、中英文简介、年份、研究方向；填写真实的发表状态，别把在审写成录用。英文标题可以使用论文原题，简介请人工核对。
4. 在同一记录填写论文、代码、数据集链接。有代码或数据集时，还需填写“资源简称”和中英文的“研究问题、核心方法、开放内容、适用场景”。资源页面与论文详情共用这些字段，不必重复录入。没有开放资源的论文使用“详细介绍”和“英文详细介绍”两个正文字段。
5. 勾选“首页重点展示”可放入首页。内容确认后关闭“草稿”，保存。草稿只是不显示在网站，**公开仓库中的草稿文件仍然公开，不能存未公开或敏感资料**。
6. 等待 GitHub Actions 变绿，检查网页和资源链接。最后更新 `src/_data/site.json` 的 `updated` 日期。

若 Pages CMS 暂不可用，打开 GitHub 中 `src/publications`，点击论文文件，再点铅笔即可编辑。文件上方 `---` 之间是字段，下方是详细正文。复制现有文件作为新论文最方便，文件名使用英文短名且不要重复。删除文件后，该论文及其资源会在下一次发布自动消失。

## 其他栏目怎么改

| 要修改的内容 | 文件 |
|---|---|
| 实验室名称、介绍、方向概述、更新日期 | `src/_data/site.json` |
| 实验室详细介绍 | `src/about.njk` |
| 任延珍老师个人页 | `src/people/ren-yanzhen.njk` |
| 一篇论文及对应开放资源 | `src/publications/英文短名.md` |
| 网站外观 | `src/assets/academic.css` |
| 栏目、导航等公共文字的中英文对应 | `src/_data/translations.json` |
| CMS 编辑表单 | `.pages.yml` |

## 交接与回退

给下一位维护者添加本仓库协作者权限，带着他完成一次“修改简介 → 保存 → 发布成功 → 检查官网”。不要共享个人密码。推荐后续移到实验室 GitHub 组织中，避免毕业后账号交接困难；迁移时需调整仓库链接和公开地址。

改错时打开文件的 History，找到上一版本复制恢复并保存。发布失败时，上一版已发布网站通常仍可访问；查看 Actions 中红色步骤的日志。不要删除仓库或强制覆盖历史。

## 开发与本地预览

需要 Node.js 24 和 pnpm 11.19.0。

```sh
npm install --global pnpm@11.19.0
pnpm install --frozen-lockfile
pnpm dev
```

打开终端给出的本地地址。发布检查：

```sh
pnpm build
pnpm check
```

`_site/index.html` 可直接双击离线预览。`_site` 与 `node_modules` 不上传，由 Actions 根据锁文件重建。修改依赖后需一并提交 `pnpm-lock.yaml`。

## 域名选择

目前不买域名，使用免费 github.io。之后可申请学校子域名，或购买独立域名再在 Pages 设置中绑定。买域名前核对首年价和续费价，使用团队可持续管理的账号。域名只改变网址，不改善 GitHub Pages 在各地的网络可达性；正式推广前应在校内网和常用移动网络试访问。

## 内容与参考

内容来自提供的成果汇报与公开论文，详见 SOURCES.md。成员名单没有从论文作者列表推断。未公开的在研条目未上传。网站结构参考 Greene Lab 等研究团队的“研究、成果、团队、资源”栏目组织，视觉与代码为本项目制作，不复制他人照片、标志或整站内容。

- 框架：https://www.11ty.dev/
- 表单编辑：https://pagescms.org/docs/
- 研究网站范式：https://greene-lab.gitbook.io/lab-website-template-docs
- GitHub Pages：https://docs.github.com/en/pages

本项目未为论文、数据、代码等第三方研究成果重新授权；使用时请查看其原始许可。

## 双语与资源介绍维护示例

新增一项数据集时，先用一两句话填写简介，再分别回答：

- **研究问题**：原有方法在哪种场景遇到什么问题？
- **核心方法**：这篇论文用什么主要思路解决？不必照抄摘要。
- **开放内容**：具体开放了代码、数据、模型中的哪些内容？未开放的不要填写。
- **适用场景**：其他研究者可以用它训练、测试或比较什么？

中英文字段保存在同一篇论文文件里，年份、作者、资源链接共用。`titleEn`、`summaryEn` 是英文标题和简介；`problemEn`、`methodEn`、`resourceDescriptionEn`、`usageEn` 对应四项英文说明。有完整四项说明的资源论文会直接用这些内容生成详情页；其他论文使用 Markdown 正文及 `bodyEn` 英文正文。

如果改团队的公共介绍，需要同步维护 `translations.json` 的对应英文。研究方向细分介绍在 `site.json` 的 `subareas` 内，已有 `title/titleEn`、`description/descriptionEn` 成对字段。构建检查会提示缺失英文、异常年份、资源说明不全或失效站内链接。

`pnpm build` 会重新生成 `_site`（不要在此目录编辑内容），再生成 `_site/en`。`pnpm dev` 也会生成双语页面；删除文件或将已发布内容改回草稿后，请完整运行 `pnpm build` 清除旧预览。线上每次发布使用全新构建目录。

2026-09-16 版式参考：https://fdmas.github.io/index.html 。借鉴简洁学术导航、蓝色栏目标题、分隔线和逐项项目说明；使用本团队内容与独立样式。新增英文版与资源说明不改变原中文页面地址。
