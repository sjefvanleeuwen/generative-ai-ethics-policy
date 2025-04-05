# Annex-B: AI Incident Response Playbook

## 1. Purpose
Define structured procedures for identifying, reporting, investigating, and resolving security, ethical, and compliance incidents involving AI systems.

## 2. Scope
Applies to all AI-related incidents across the organization, including data breaches, model misuse, biased outputs, technical failures, and unauthorized access.

## 3. Incident Types
| Type | Examples |
|------|----------|
| Data Privacy | Personal data exposure, unauthorized processing |
| Security | Model poisoning, adversarial attacks, DDoS |
| Ethical | Discriminatory decisions, non-transparent output |
| Operational | Model failure, performance degradation |
| Legal/Compliance | Breach of EU AI Act, GDPR non-compliance |

## 4. Incident Response Roles
| Role | Responsibility |
|------|----------------|
| Incident Manager | Coordinates investigation and response |
| IT Security | Contains and resolves technical aspects |
| DPO | Assesses data protection implications |
| Legal | Evaluates legal/regulatory exposure |
| AI Ethics Board | Reviews ethics implications and approves corrective actions |

## 5. Response Workflow
1. **Detection & Logging** – Incident reported via ticket, email, or automated alert; logged in Incident Register.
2. **Initial Triage** – Categorize severity (Minor / Major / Critical).
3. **Notification** – Alert relevant stakeholders within 4 hours (Critical), 24 hours (Major).
4. **Investigation** – Root cause analysis, risk assessment, data forensics.
5. **Containment & Remediation** – Isolate affected systems, apply patches/fixes.
6. **Post-Incident Review** – Lessons learned, policy updates, communication.
7. **Reporting** – Document findings in Incident Report and Compliance Repository.

## 6. Incident Severity Classification
| Severity | Criteria |
|----------|----------|
| Critical | Impact on individuals’ rights, widespread data loss, reputational damage |
| Major | Contained data or security breach, model bias in production |
| Minor | Low-risk output deviation, false positive |

## 7. Documentation Requirements
- Incident Report Template (Annex B1)
- Root Cause Analysis
- Corrective Action Log
- Stakeholder Communication Record

## 8. Metrics
| Metric | Target |
|--------|--------|
| Incident Resolution SLA | ≤ 30 days |
| Critical Incident Notification Time | ≤ 4 hours |
| Root Cause Analysis Completion | 100% |
| Recurrence Rate | 0% for similar incidents |

## 9. Review Cycle
- Reviewed semi-annually and after every Critical incident.