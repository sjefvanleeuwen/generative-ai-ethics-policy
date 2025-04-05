# Transparency & Explainability

**Objective**

Ensure that all AI-driven decisions, processes, and outputs are understandable, traceable, and communicated clearly to relevant stakeholders�internal and external�to foster trust, accountability, and compliance with regulatory transparency requirements.

**Scope**

Applies to every generative AI system classified as medium or high risk under the EU AI Act, as well as any system producing outputs that influence individual rights, significant business decisions, or customer interactions.

**Key Requirements**

|     |     |     |     |
| --- | --- | --- | --- |
| Requirement | Description | Owner | Timeline |
| Model Documentation | Maintain a central repository of model details (architecture, training data, version history, performance metrics). | IT Engineering | Ongoing |
| Explainability Reports | Generate detailed reports explaining how key decisions are made by AI, including input features, decision logic, and confidence scores. | IT Engineering | At deployment and quarterly updates |
| User Disclosures | Provide clear notifications to end users when interacting with AI-generated content, specifying the system�s purpose and limitations. | Business Unit Leads | At rollout |
| Decision Logs | Record all high-risk AI outputs, human overrides, and rationale for review and audit purposes. | IT Engineering | Real-time logging |
| Stakeholder Briefings | Conduct quarterly briefings for internal stakeholders (e.g., senior leadership, HR committees) summarizing AI decisions and performance. | AI Ethics Board | Quarterly |

**Procedures**

1.  **Model Registry Maintenance:** Update the Model Documentation repository whenever a new model is onboarded or an existing model is retrained.
2.  **Explainability Report Generation:** Use standardized templates ([Annex H: Explainability Report](annex-h.md)) to produce reports for each high-risk use case. Share reports with AI Ethics Board and affected business units.
3.  **User-Facing Transparency:** Embed disclosures in user interfaces and customer communications, following standardized wording guidelines ([Annex I: User Disclosure Template](annex-i.md)).
4.  **Decision Logging & Audit Trail:** Implement automated logging of inputs, outputs, and overrides. Store logs securely with access controls.
5.  **Stakeholder Communication:** Schedule and execute quarterly briefings, documenting minutes and action items in the Compliance Register.

**Documentation Requirements**

|     |     |     |     |
| --- | --- | --- | --- |
| Document | Description | Retention Period | Location |
| Model Documentation | Technical specifications, data lineage, performance metrics | Life of model + 3 years | Model Registry Repository |
| Explainability Report | Detailed decision rationale for high-risk outputs | 5 years | Compliance Repository |
| Decision Log | Timestamped record of decisions, overrides, and rationale | 3 years | Secure Audit Log System |
| User Disclosure Records | Evidence of notifications delivered to end users | 3 years | Compliance Repository |
| Stakeholder Briefing Minutes | Records of briefing content and feedback | 5 years | Compliance Repository |

**Roles & Responsibilities**

|     |     |
| --- | --- |
| Role | Responsibility |
| IT Engineering | Create and maintain model documentation, generate explainability reports, ensure decision logging. |
| Business Unit Leads | Ensure user disclosures are implemented in customer-facing and internal tools. |
| AI Ethics Board | Review and approve explainability reports, monitor transparency metrics. |
| DPO | Verify that disclosures and documentation meet GDPR transparency requirements. |
| Legal | Review user-facing language for legal compliance and accuracy. |

**Controls & Metrics**

|     |     |     |     |
| --- | --- | --- | --- |
| Metric | Target | Frequency | Owner |
| % of high-risk models with up-to-date documentation | 100% | Quarterly | IT Engineering |
| % of high-risk decisions with explainability report | 100% | Quarterly | IT Engineering |
| Number of transparency incidents (e.g., missing disclosure) | 0   | Monthly | AI Ethics Board |
| Stakeholder satisfaction score on transparency | ≥ 90% | Semi-annual | AI Ethics Board |

**Review Cycle**

*   Transparency & Explainability processes reviewed semi-annually, with updates applied to templates and communication guidelines.

---

[← Risk Management](06-Risk-Management.md) | [Table of Contents](00-Table-of-Contents.md) | [Human Oversight →](08-Human-Oversight.md)
