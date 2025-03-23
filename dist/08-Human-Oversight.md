# Human Oversight

**Objective**

Ensure that all generative AI systems operate under meaningful human supervision, enabling human intervention or override of automated outputs to prevent harm, correct errors, and uphold accountability.

**Scope**

Covers all AI use cases classified as medium or high risk under the EU AI Act, particularly those affecting individual rights, safety, or significant business decisions.

**Key Requirements**

|     |     |     |     |
| --- | --- | --- | --- |
| Requirement | Description | Owner | Timeline |
| Human-in-the-Loop Design | Embed checkpoints in AI workflows where a human must review and approve AI-generated outputs before action. | Business Unit Leads | Design phase |
| Override Mechanism | Implement functionality allowing humans to override AI decisions, with documented rationale logged. | IT Engineering | Deployment |
| Escalation Protocol | Define criteria for escalating uncertain or high-impact AI outputs to senior decision-makers. | AI Ethics Board | Ongoing |
| Decision Thresholds | Establish quantitative thresholds (confidence scores, risk ratings) that trigger human review. | AI Ethics Board | Design phase |

**Procedures**

1.  **Design Integration:** During system design, document where and how humans will interact with AI outputs, using the Human Oversight Checklist (Annex J).
2.  **Review Workflow:** Configure workflows so that any AI output exceeding defined risk thresholds is paused pending human approval.
3.  **Override Logging:** Require users to record override decisions, rationale, and outcome in the Decision Log.
4.  **Escalation:** Route complex or contested decisions to designated senior reviewers within 24 hours.

**Documentation Requirements**

|     |     |     |     |
| --- | --- | --- | --- |
| Document | Description | Retention Period | Location |
| Human Oversight Plan | Detailed description of oversight checkpoints and decision thresholds for each AI system | Life of system + 3 years | Compliance Repository |
| Override Log | Timestamped records of all overrides with rationale and reviewer identity | 3 years | Secure Audit Log System |
| Escalation Records | Documentation of escalated decisions, actions taken, and resolution | 5 years | Compliance Repository |

**Roles & Responsibilities**

|     |     |
| --- | --- |
| Role | Responsibility |
| Business Unit Leads | Define oversight requirements for their AI use cases and ensure implementation in workflows |
| IT Engineering | Build and maintain human-in-the-loop and override capabilities; ensure logging functionality |
| AI Ethics Board | Approve oversight plans, review escalation reports, and adjust decision thresholds as needed |
| HR (for HR systems) | Conduct fairness review of human-AI decisions affecting employees |
| DPO | Ensure oversight processes comply with data protection principles |
| IT Security | Monitor system integrity and ensure override functionality cannot be abused |

**Controls & Metrics**

|     |     |     |     |
| --- | --- | --- | --- |
| Metric | Target | Frequency | Owner |
| % of high-risk AI decisions with documented human review | 100% | Monthly | AI Ethics Board |
| Average time to complete human review | ≤ 24 hours | Monthly | Business Unit Leads |
| Number of override incidents | Tracked | Monthly | AI Ethics Board |
| % of escalated decisions resolved within SLA | 100% within 48 hours | Monthly | AI Ethics Board |

**Review Cycle**

*   Human Oversight processes reviewed semi-annually to adjust thresholds, refine workflows, and incorporate lessons learned from override and escalation data.

---

[← Transparency & Explainability](07-Transparency-and-Explainability.md) | [Table of Contents](00-Table-of-Contents.md) | [Employee Rights & Consent →](09-Employee-Rights-and-Consent.md)

## Human Oversight Process Diagram

![Human Oversight Process](bpmn/svg/human-oversight-process.svg)

[View larger diagram or download BPMN XML](bpmn/human-oversight-process.bpmn)

