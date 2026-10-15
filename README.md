# MMSLAB 多媒体安全实验室网站

武汉大学国家网络安全学院 · 任延珍教授团队

本文用于日常更新与人员交接。**以 GitHub `main` 分支和成功部署的线上页面为准，本地预览不代表发布完成。** 修改网站功能、人数、栏目或维护流程时，应同时核对本说明。

## 常用入口

- [中文官网](https://secrethhh.github.io/lab-website/) · [English](https://secrethhh.github.io/lab-website/en/)
- [GitHub 仓库](https://github.com/Secrethhh/lab-website)
- [Pages CMS 在线编辑](https://app.pagescms.org)
- [Actions 发布记录](https://github.com/Secrethhh/lab-website/actions)
- [搜索收录与账号验证说明](docs/search-indexing.md)

## 当前状态（2026-10-15 核对）

| 项目 | 当前情况 |
|---|---|
| 在校学生 | 博士生 **4 人**，硕士生 **16 人**；数据源为 `src/_data/team.json` |
| 论文成果 | 24 篇，24 篇均有配图 |
| 首页近期重点成果 | 9 篇：语音安全 5、视频安全 1、语音信息隐藏 2、视频信息隐藏 1 |
| 主导航 | 团队简介、News、近期重点成果、论文成果 |
| News | 仅显示 2026 年的非草稿动态，按年月倒序 |
| 完整论文列表 | 按年份倒序；2020 年及以前合并为一组 |
| 开放资源 | 在对应论文下显示 Code、Dataset、Demo Page 按钮，没有独立开放资源栏目 |
| 论文详情 | 不生成独立站内论文详情页；点击论文标题访问 `paper` 链接 |
| 老师介绍 | 点击首页或左侧的任延珍姓名进入站内个人页，在当前标签页打开 |
| 外部网页 | 在新标签页打开；站内导航保持当前页跳转 |
| 搜索收录 | 搜索信息与站点地图已上线；搜索平台账号验证与提交尚未完成 |

以上数量是核对时的实际值，不是占位符或必须凑齐的目标。以后修改对应数据时同步更新本表。三篇历史 AMR 论文（TIFS 2019、2017、2015）保留在完整论文列表，不在首页重点成果展示。

## 运行与发布流程

维护者修改 Markdown、JSON 或模板 → 保存到 GitHub `main` → Actions 校验资料 → Eleventy 生成中文页面 → 生成英文页面与搜索信息、站点地图 → 检查页面 → GitHub Pages 发布。

一篇论文只维护一份记录，完整列表与入选的首页重点成果共用它。中英文页面共用英文论文标题、作者和研究简介；团队介绍、News 和老师履历使用维护者提供的双语文字，不是在线机器翻译。

旧 `/research/` 页面仍保留但不在导航中；旧 `/resources/` 地址转到论文成果页；独立 About 页面已删除。没有页面页脚，也没有访客登录、评论或投稿系统。

## 在线编辑入口

1. 登录 Pages CMS，使用拥有仓库编辑权限的 GitHub 账号。
2. 首次使用按平台提示授权 GitHub App，范围限定为本仓库。
3. 打开 `Secrethhh/lab-website` 的 `main` 分支。
4. 选择“团队人数”“首页 News（2026 年）”“任延珍老师个人介绍”或“论文与成果”。

表单由 `.pages.yml` 配置；已提供配置不代表个人账号已授权。也可以直接在 GitHub 编辑对应文件并提交。不要共享个人密码。

## 日常更新

### 团队人数与介绍

- 人数：CMS“团队人数”，或 `src/_data/team.json`，`doctoral` 为博士人数，`masters` 为硕士人数。目前分别为 `4`、`16`，中英文首页同步读取。
- 首页团队介绍：`src/index.njk`；修改中文句子时同步维护 `src/_data/translations.json` 中的完整对应英文。
- 实验室单位和方向资料：`src/_data/site.json`。其中 `updated` 是资料字段，当前页面不显示“资料更新”页脚，修改它不会自动更新所有内容。

### 论文与重点成果

编辑 `src/publications/*.md` 或 CMS“论文与成果”。

| 字段 | 用途 |
|---|---|
| `title`、`authors`、`summary` | 正式英文原题、作者、英文研究概述；概述不是逐字原文摘要 |
| `year`、`venue`、`status` | 年份、会议/期刊简称、发表状态；不把在审写成录用 |
| `direction` | `security` 或 `hiding` |
| `modality` | `audio`、`video` 或 `image`；纯图像论文不归为视频 |
| `featured` | 是否进入首页重点成果；必须已发表或已录用，且为语音或视频分类 |
| `draft` | 为 true 时不生成公开论文条目；仓库文件和历史仍公开 |
| `paper` | 论文标题的 HTTPS 跳转地址；空值则标题不可跳转 |
| `figure`、`figureAlt`、`figureSource` | 网站用图路径、英文图像说明和来源图号/页码 |

首页选题需人工审核，校验脚本只检查状态和分类，不能判断会议等级或验证录用事实。取消 `featured` 只移除首页展示；不要为了移除重点成果而删除论文文件或开启草稿。

保留一段英文 Markdown 正文作为维护记录；当前校验要求正文非空或有 `problem`。正文不会生成独立论文详情页。已有 `problem`、`method`、`resourceDescription`、`usage` 可保留作资料，但不是新增资源按钮的必填项。

论文文件名作为内部标识供模板、教师代表作等引用；重命名前检查引用，不是为了生成论文详情地址。

### 代码、数据集与演示按钮

| 字段 | 显示效果 |
|---|---|
| `code` | Code · GitHub |
| `data` + `datasetName` | Dataset · 数据集名称；旧数据可从 `resourceName` 取简称 |
| `datasets` | 多个具名数据集按钮，每项含 `name`、`url` |
| `demo` | Demo Page · Online |

链接使用 HTTPS。`data` 与 `demo` 相同则只显示 Demo 按钮，避免重复入口。添加代码链接不再要求填写旧开放资源栏目的四项说明。

多数据集示例（TIFS 2026 解耦音频隐写论文当前配置）：

```yaml
datasets:
  - name: VCTK-Corpus
    url: https://huggingface.co/datasets/badayvedat/VCTK
  - name: MUSDB18-HQ
    url: https://zenodo.org/records/3338373
```

数据集按钮表示该论文使用或关联的资源，不意味着这些数据集由本团队创建。大型数据和外部代码保留原项目链接，不上传到网站仓库。

### 论文图片

网站用图放在 `src/assets/papers/`，当前主要使用 WebP。可用 CMS 上传，或在 GitHub 加入图片并填写 `figure`，例如 `/assets/papers/vfd-net.webp`。

图片必须对应这篇论文；记录论文 Figure 编号、PDF 页码或团队 PPT 页码。英文图像说明填写在 `figureAlt`。左上角标签由 `venue` 与 `year` 自动组成。缺图时显示占位框；目前 24 篇已全部配图。不要把原始 PDF、PPT、裁图脚本或预览截图放进仓库。

### News

CMS“首页 News（2026 年）”对应 `src/_data/news.json`。填写年月、中文句子 `textZh`、英文句子 `text`、链接标题、公开链接和核实来源，按需填写两种语言的补充说明。

论文标题保留英文原题。年月表示消息发生或公开月份，不一定是会议召开月份。当前 `eleventy.config.js` 的 `news2026` 筛选只展示 2026 年；跨年时需同步调整筛选、CMS 栏目名和本说明。

### 任延珍老师介绍

CMS 对应 `src/_data/faculty.json`，维护职称、邮箱、履历栏目、中文和英文、核对日期与来源。保留栏目英文标识，新增中文时间表达后检查英文页面。

照片为 `src/assets/ren-yanzhen.jpg`；个人页排版和代表论文选列在 `src/people/ren-yanzhen.njk`。老师姓名链接在当前页打开；论文和资源等外部网页在新标签页打开。

## 发布确认与故障排查

1. 找到 Actions 中与本次提交 SHA 对应的 **Publish website**。
2. 确认 **build 和 deploy 都成功**，不是仅文件已保存或本地构建通过。
3. 打开线上中英文页面，检查修改、图片和按钮跳转；必要时使用无痕窗口或强制刷新。
4. 只有完成以上核对，才向使用者报告上线。

| 现象 | 检查方法 |
|---|---|
| 保存了但线上没变化 | 先检查对应提交的 build/deploy，失败时线上可能仍是旧版，再排查缓存 |
| 重点成果不显示 | 检查 featured、draft、发表状态和模态 |
| 完整论文列表缺失 | 检查 draft、最新构建和资料格式 |
| 新增资源导致报错 | 检查 HTTPS、数据集名称与列表结构；不需要补旧资源页说明 |
| 英文检查失败 | 核对中文原句与翻译字典；论文研究内容应填写英文 |
| 图片不显示 | 检查 figure 路径、文件是否提交、figureAlt 和部署结果 |
| CMS 看不到项目 | 检查账号编辑权限和 App 授权 |
| 窄窗口没有横向条 | 页面优先自适应；仅电脑内容实际超宽时显示底部拖动条 |

错误内容可通过 GitHub 文件 History 找回旧版本并提交；不要删除整个项目，也不要随意强制改写历史。自动检查不代替人工核实论文信息或外部链接可用性。

## 文件位置与开发

| 路径 | 用途 |
|---|---|
| `src/index.njk` | 首页团队简介、News 和重点成果结构 |
| `src/publications.njk`、`src/publications/*.md` | 完整论文列表与论文记录 |
| `src/_includes/cards.njk` | 共用论文图文行与资源按钮 |
| `src/_includes/layout.njk` | 导航、侧栏、外链新标签页及按需横向滚动控件 |
| `src/_data/team.json` | 已确认的团队人数 |
| `src/_data/faculty.json`、`src/people/ren-yanzhen.njk` | 教师资料与页面 |
| `src/_data/site.json`、`translations.json`、`news.json` | 实验室配置、公共翻译、动态 |
| `src/assets/academic.css` | 字号、留白、分隔线和响应式样式 |
| `scripts/validate.mjs` | 发布前资料校验 |
| `scripts/localize.mjs`、`scripts/seo.mjs` | 英文页面、搜索元信息与站点地图生成 |
| `src/_data/searchVerification.json` | 搜索平台公开验证标签；当前空值表示未配置验证 |
| `docs/search-indexing.md` | 搜索收录步骤与域名根目录 robots.txt 限制 |
| `.pages.yml` | CMS 表单字段 |
| `.github/workflows/pages.yml` | 自动构建与部署 |
| `_site/` | 生成结果，不直接修改或提交 |

使用 Node.js 24、pnpm 11.19.0：

```sh
npm install --global pnpm@11.19.0
pnpm install --frozen-lockfile
pnpm dev
```

提交前运行完整流程：

```sh
pnpm build
pnpm check
```

`build` 包含资料校验、清理旧输出、生成中英文页面和 SEO 信息；只运行 Eleventy 不等于完成全部发布检查。

桌面采用顶部吸顶导航、靠上固定侧栏和右侧正文；大屏左右留白，小窗口自适应。内容确实超宽时电脑底部显示横向拖动条。老师个人页使用独立布局。论文成果页有年份和论文分隔线，首页重点成果不套用这些分隔线。

## 季度更新与交接

- 核对人数、老师资料、新成果与 News，同时更新 README 状态表。
- 检查配图、正式论文地址、代码与数据集链接；人工审核重点成果选列。
- 完整构建，检查中英文、电脑和手机，再确认线上部署。
- 交接仓库协作者权限、Pages CMS 授权、搜索平台管理权限；不共享密码。
- 接任者实际完成一次“修改 → 提交 → 部署 → 线上核对”。

仓库只保留网站必需代码、资料、图片和维护说明，不提交 `node_modules`、`_site`、原始论文/PPT、临时脚本、截图或密钥。公开仓库的草稿与历史也公开。依赖升级同时提交 `package.json` 和锁文件并完成检查。

迁移到实验室组织或新域名时，一起检查 Pages 设置、CMS 授权、外部引用、`scripts/seo.mjs` 的基址、站点地图和搜索平台验证。重建部署时 Settings → Pages → Source 选择 GitHub Actions。

## 内容来源

研究资料来源见 [SOURCES.md](SOURCES.md)，教师信息依据[学院主页](https://cse.whu.edu.cn/info/3421/40341.htm)。排版参考 [Li Kai 学术主页](https://cslikai.cn/)。论文、代码和数据许可遵循原项目说明。
