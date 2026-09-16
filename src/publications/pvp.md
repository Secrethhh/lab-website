---
title: PVP：特定说话人的语音伪造检测
year: 2026
direction: security
venue: IJCAI 2026
status: 已录用
authors: >-
  Jun Xue, Tong Zhang, Zhuolin Yi, Yihuan Huang, Yi Chai, Yiyang Zhang, Yanzhen
  Ren
summary: 通过音素级身份特征建模，研究面向特定说话人的可解释伪造检测。
featured: true
draft: false
paper: 'https://arxiv.org/abs/2605.17737'
code: 'https://github.com/JunXue-tech/PVP'
data: ''
source: 公开论文及团队成果汇报
titleEn: 'PVP: Speaker-Specific Speech Deepfake Detection'
summaryEn: >-
  Models speaker identity at the phoneme level to provide interpretable
  detection of speech deepfakes targeting a particular person.
resourceName: PVP
problem: 通用伪造检测模型容易忽略某个人特有的发音习惯，也难以解释一段语音为什么被判断为伪造。
problemEn: >-
  Generic detectors can overlook an individual speaker’s pronunciation habits
  and offer limited explanation for why speech is classified as fake.
method: 从目标说话人的真实参考语音中学习音素级声学分布，用轻量高斯混合模型建立声音特征档案，进行个性化、可解释的检测。
methodEn: >-
  Learns phoneme-level acoustic distributions from a target speaker’s genuine
  reference speech, using lightweight Gaussian mixture models for personalized,
  interpretable detection.
resourceDescription: 公开代码与数据入口，包含用于特定人物语音伪造研究的中文数据集相关说明；统一从项目仓库访问。
resourceDescriptionEn: >-
  The project repository provides code and data access, including information
  about a Chinese dataset for person-specific speech deepfake research.
usage: 适合研究针对特定人物的声音冒用检测，以及音素级证据分析和未见伪造攻击的泛化。
usageEn: >-
  Useful for person-specific voice impersonation detection, phoneme-level
  evidence analysis and generalization to unseen spoofing attacks.
---

