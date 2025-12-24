---
id: style_guide
title: QMM Knowledge Base Style Guide
type: policy
tags: [meta, writing, compliance]
last_updated: 2025-12-23
audience: [Internal Contributors]
region: [Global]
risk_level: low
---

# QMM Knowledge Base Style Guide

All KB documents must follow this structure to ensure consistency, clarity, and safety.

## 1. Tone & Voice

- **Practical & Direct**: Zero fluff. Start with the "What" and "Why".
- **Marketing Leader to Leader**: Speak peer-to-peer. Avoid beginner tutorials.
- **Evidence-Based**: Reference tests, data, or QMM principles (JTBD, Lean, AIDA).
- **Compliance-Aware**: Always assume a regulator might read the output.

## 2. Formatting

- **Headers**: Use standard Markdown (`#`, `##`, `###`).
- **Lists**: Use short bullet points.
- **Bold**: Use **bold** for metrics, KPIs, and critical warnings.
- **Callouts**: Use the standard alert syntax for critical info:
  > [!WARNING]
  > Compliance risk here.

## 3. Mandatory Structure

Every Framework/Playbook doc must have:
1. **Definition**: 1 sentence.
2. **When to use**: Bullet list of triggers.
3. **Step-by-Step**: The "How-To".
4. **Common Failure Modes**: What goes wrong.
5. **Metrics**: What to measure.
6. **Mini Case**: An anonymized real-world example (preferably African/Utility context).

## 4. Compliance & Safety Rules

- **Never** promise specific ROI without a disclaimer.
- **Avoid** absolutes ("Guaranteed", "Best", "Only").
- **Nigeria/Africa Context**:
    - Acknowledge infrastructure realities (payment failures, data costs).
    - Respect CBN/SEC guidelines for finance.
    - Use "Terms apply" asterisks in messaging templates.

## 5. Frontmatter

Ensure the YAML frontmatter is complete. See `README.md` for the schema.
