---
title: "RTCFake：实时通信中的语音深度伪造检测"
year: 2026
direction: "security"
venue: "Findings of ACL 2026, pp. 5763–5775"
status: "已发表"
authors: "Jun Xue, Zhuolin Yi, Yihuan Huang, Yanzhen Ren, Yujie Chen, Cunhang Fan, Zicheng Su, Yongcheng Zhang, Bo Cai"
summary: "通过真实通信平台构建传输前后配对的语音数据集，并采用音素引导的一致性学习，研究检测模型在跨平台和噪声条件下的泛化能力。"
featured: true
draft: false
paper: "https://aclanthology.org/2026.findings-acl.285/"
code: ""
data: "https://huggingface.co/datasets/JunXueTech/RTCFake"
source: "公开论文及团队成果汇报"
---

## 研究问题

检测器在离线语音上表现良好，并不意味着它能直接适用于真实通话。实时通信平台的传输处理与噪声，会改变语音中的伪造痕迹。

## 工作内容

RTCFake 构建传输前后的配对语音，围绕平台差异和真实通信退化开展评估。方法使用音素引导的一致性学习，以增强跨场景检测能力。

## 开放资源

数据集可从本页的“开放数据集”访问；完整设置、实验结论和使用要求请见论文及数据集说明。
