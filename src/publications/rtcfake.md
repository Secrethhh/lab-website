---
title: RTCFake：实时通信中的语音深度伪造检测
year: 2026
direction: security
venue: 'Findings of ACL 2026, pp. 5763–5775'
status: 已发表
authors: >-
  Jun Xue, Zhuolin Yi, Yihuan Huang, Yanzhen Ren, Yujie Chen, Cunhang Fan,
  Zicheng Su, Yongcheng Zhang, Bo Cai
summary: 通过真实通信平台构建传输前后配对的语音数据集，并采用音素引导的一致性学习，研究检测模型在跨平台和噪声条件下的泛化能力。
featured: true
draft: false
paper: 'https://aclanthology.org/2026.findings-acl.285/'
code: ''
data: 'https://huggingface.co/datasets/JunXueTech/RTCFake'
source: 公开论文及团队成果汇报
titleEn: 'RTCFake: Speech Deepfake Detection in Real-Time Communication'
summaryEn: >-
  Builds paired speech data before and after real communication platforms, and
  uses phoneme-guided consistency learning to study cross-platform and
  noisy-condition generalization.
resourceName: RTCFake
problem: 语音经过实时通信平台后，会受到编解码、传输处理与噪声影响。离线数据上的检测能力难以直接代表真实通话中的表现。
problemEn: >-
  Speech is altered by codecs, transmission processing and noise in real-time
  communication. Performance on offline recordings may not transfer to actual
  calls.
method: 构建通信前后的配对语音，结合音素引导的一致性学习，研究检测器在不同平台和干扰条件下的泛化。
methodEn: >-
  Pairs speech before and after communication processing and applies
  phoneme-guided consistency learning to study generalization across platforms
  and disturbances.
resourceDescription: 公开 RTCFake 数据集，提供面向真实通信场景的伪造语音检测研究数据；数据组织和获取方式见 Hugging Face 页面。
resourceDescriptionEn: >-
  The RTCFake dataset provides research data for speech deepfake detection in
  real communication settings. Data organization and access instructions are
  available on Hugging Face.
usage: 适合评估通话场景下的伪造检测、跨平台泛化，以及传输退化对模型的影响。
usageEn: >-
  Useful for evaluating deepfake detection in calls, cross-platform
  generalization and the effects of transmission degradation.
---

