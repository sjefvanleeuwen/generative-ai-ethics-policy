# Cybersecurity

**Objective**

Protect AI systems, models, and data from unauthorized access, manipulation, or exploitation, ensuring integrity, confidentiality, and availability throughout the AI lifecycle.

**Scope**

Applies to all generative AI systems, infrastructure, data repositories, and model deployments regardless of risk classification or business unit.

**Key Requirements**

|     |     |     |     |
| --- | --- | --- | --- |
| Requirement | Description | Owner | Timeline |
| Secure Development | Follow secure coding standards and DevSecOps practices for AI systems | IT Engineering | Design & Development |
| Access Controls | Implement role-based access with least privilege principle and MFA | IT Security | Ongoing |
| Adversarial Testing | Conduct systematic testing to identify and remediate model vulnerabilities | IT Security | Quarterly |
| Encryption | Apply encryption for data at rest, in transit, and for model weights/parameters | IT Security | Ongoing |
| Monitoring & Detection | Implement real-time monitoring and anomaly detection for AI workloads | IT Security | Ongoing |
| Incident Response | Maintain AI-specific incident response playbooks and conduct regular drills | IT Security | Semi-annual |
| Supply Chain Security | Validate security of third-party models, libraries, and frameworks | Procurement | Before deployment |

**Procedures**

1.  **Secure Development:** Integrate security reviews into AI development lifecycle using the Secure AI Development Checklist ([Annex K: AI Threat Modeling](annex-k.md)).
2.  **Vulnerability Management:** Scan AI infrastructure and dependencies monthly for CVEs and other vulnerabilities.
3.  **Adversarial Testing:** Conduct formal adversarial testing including prompt injection, model extraction, and evasion attacks.
4.  **Key Management:** Apply robust key management for all cryptographic operations, with regular key rotation.
5.  **Security Monitoring:** Deploy specialized monitoring for AI workloads, including model input/output analysis.
6.  **Incident Drills:** Conduct tabletop exercises for AI-specific security incidents (data poisoning, model theft, etc.).

**Documentation Requirements**

|     |     |     |     |
| --- | --- | --- | --- |
| Document | Description | Retention Period | Location |
| Security Assessment Reports | Results of security reviews and penetration tests | 3 years | Secure Repository |
| Vulnerability Scan Results | Monthly scan outputs and remediation status | 2 years | Security Dashboard |
| Adversarial Test Reports | Findings from model security testing | 3 years | Secure Repository |
| Incident Response Playbooks | Documented procedures for AI security incidents | Until updated + 1 year | Incident Response System |
| Security Configuration Records | Documentation of security controls implemented | Life of system + 1 year | Configuration Management DB |

**Roles & Responsibilities**

|     |     |
| --- | --- |
| Role | Responsibility |
| IT Security | Lead security assessments, monitoring, incident response |
| IT Engineering | Implement security controls, remediate vulnerabilities |
| AI Ethics Board | Review security metrics, approve high-risk mitigations |
| DPO | Advise on security controls for personal data protection |
| Procurement | Ensure vendor security assessments are completed |
| Business Unit Leads | Support security requirements and incident response |

**Controls & Metrics**

|     |     |     |     |
| --- | --- | --- | --- |
| Metric | Target | Frequency | Owner |
| Critical Vulnerability Closure | 100% within 14 days | Monthly | IT Security |
| Adversarial Test Coverage | 100% of high-risk models | Quarterly | IT Security |
| Security Incident Response Time | ≤ 4 hours (detection to containment) | Per incident | IT Security |
| Failed Access Attempts | ≤ 1% unauthorized attempt rate | Monthly | IT Security |
| Security Control Implementation | 100% of required controls | Quarterly | IT Engineering |

**Review Cycle**

*   Cybersecurity requirements and controls reviewed quarterly, with comprehensive updates to address emerging threats.

---

[← Data Governance](10-Data-Governance.md) | [Table of Contents](00-Table-of-Contents.md) | [Accessibility & Inclusion →](12-Accessibility-and-Inclusion.md)
