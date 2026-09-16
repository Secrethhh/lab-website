---
title: PELM：语音编辑检测与内容定位
year: 2026
direction: security
venue: arXiv
status: 预印本
authors: >-
  Jun Xue, Yi Chai, Yanzhen Ren, Jinshen He, Zhiqiang Tang, Zhuolin Yi, Yihuan
  Huang, Yuankun Xie, Yujie Chen
summary: 利用音频大模型联合识别语音编辑类型与内容位置，结合 AiEdit 数据集研究增、删、改等编辑场景。
featured: false
draft: false
paper: 'https://arxiv.org/abs/2601.21463'
code: ''
data: 'https://huggingface.co/datasets/JunXueTech/AiEdit'
source: 公开论文及团队成果汇报
titleEn: 'PELM: Speech Editing Detection and Content Localization'
summaryEn: >-
  Uses audio language models to jointly identify edit types and locate edited
  content, with the AiEdit dataset covering addition, deletion and modification.
resourceName: AiEdit / PELM
problem: 语音编辑不只有拼接，还包括增加、删除和修改内容。删除操作不留下被删音频，使仅依赖局部声学异常的检测更加困难。
problemEn: >-
  Speech edits include additions, deletions and modifications, not just
  splicing. Deleted content leaves no audio segment to inspect, challenging
  local anomaly detectors.
method: 把编辑检测与内容定位统一为音频大模型的结构化文本生成任务，并通过先验提示和声学一致性约束引入声学证据。
methodEn: >-
  Frames edit detection and content localization as structured text generation
  by an audio language model, grounded through prior-enhanced prompts and
  acoustic consistency constraints.
resourceDescription: 公开 AiEdit 双语语音编辑数据集，涵盖增加、删除与修改操作；本页提供数据集入口，未标注为已公开模型代码。
resourceDescriptionEn: >-
  The bilingual AiEdit dataset covers addition, deletion and modification
  operations. This page links to the dataset; it does not claim a public
  model-code release.
usage: 适合语音篡改检测、编辑类型识别和被编辑内容定位等任务的训练与评估。
usageEn: >-
  Useful for training and evaluation in speech tampering detection, edit-type
  identification and edited-content localization.
---

