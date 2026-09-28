---
title: >-
  Unifying Speech Editing Detection and Content Localization via Prior-Enhanced
  Audio LLMs
year: 2026
direction: security
venue: arXiv
status: Preprint
authors: >-
  Jun Xue, Yi Chai, Yanzhen Ren, Jinshen He, Zhiqiang Tang, Zhuolin Yi, Yihuan
  Huang, Yuankun Xie, Yujie Chen
summary: >-
  Uses audio language models to jointly identify edit types and locate edited
  content, with the AiEdit dataset covering addition, deletion and modification.
featured: false
draft: false
paper: 'https://arxiv.org/abs/2601.21463'
code: ''
data: 'https://huggingface.co/datasets/JunXueTech/AiEdit'
source: Public papers and team research reports
resourceName: AiEdit / PELM
problem: >-
  Speech edits include additions, deletions and modifications, not just
  splicing. Deleted content leaves no audio segment to inspect, challenging
  local anomaly detectors.
method: >-
  Frames edit detection and content localization as structured text generation
  by an audio language model, grounded through prior-enhanced prompts and
  acoustic consistency constraints.
resourceDescription: >-
  The bilingual AiEdit dataset covers addition, deletion and modification
  operations. This page links to the dataset; it does not claim a public
  model-code release.
usage: >-
  Useful for training and evaluation in speech tampering detection, edit-type
  identification and edited-content localization.
modality: audio
figure: /assets/papers/pelm.webp
figureAlt: >-
  Research figure for Unifying Speech Editing Detection and Content Localization
  via Prior-Enhanced Audio LLMs
figureSource: 'G1 team research presentation, slide 90'
---



