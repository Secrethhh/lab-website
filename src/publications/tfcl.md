---
title: TFCL：时频一致性伪造语音检测
year: 2026
direction: security
venue: ACM MM 2026
status: 已录用
authors: >-
  Jun Xue, Zhuolin Yi, Yanzhen Ren, Yihuan Huang, Jiayu Xiong, Yi Chai,
  Guanxiang Feng, Jiajun Liu, Tong Zhang
summary: 研究声学前端处理引入的耦合失真，通过时域与频域的一致性学习增强检测鲁棒性。
featured: true
draft: false
paper: 'https://arxiv.org/abs/2607.17761'
code: 'https://github.com/JunXue-tech/TFCL'
data: ''
source: 公开论文及团队成果汇报
titleEn: 'TFCL: Time-Frequency Consistency for Speech Deepfake Detection'
summaryEn: >-
  Studies coupled distortions caused by acoustic front-end processing, using
  time- and frequency-domain consistency to improve detection robustness.
resourceName: TFCL
problem: 回声消除、降噪、自动增益控制和语音活动检测会共同改变语音信号，造成时序错位和频谱线索损失，影响伪造检测。
problemEn: >-
  Echo cancellation, noise suppression, gain control and voice activity
  detection jointly alter speech, causing temporal misalignment and loss of
  spectral cues for deepfake detection.
method: 通过注意力驱动的软对齐捕捉时序对应关系，并引入频域结构一致性约束，使处理前后的伪造特征保持稳定。
methodEn: >-
  Attention-driven soft alignment captures temporal correspondence, while
  frequency-structure consistency encourages stable spoofing representations
  before and after processing.
resourceDescription: 公开 TFCL 研究代码；项目仓库提供实验使用说明和相关数据入口，可结合论文理解模型与评估设置。
resourceDescriptionEn: >-
  The TFCL repository provides research code, experiment instructions and
  related data links. Read the paper alongside the repository for model and
  evaluation details.
usage: 适合研究经过声学前端处理的语音伪造检测，或比较不同前端处理对检测鲁棒性的影响。
usageEn: >-
  Useful for studying deepfake detection after acoustic front-end processing and
  comparing robustness across processing conditions.
---

