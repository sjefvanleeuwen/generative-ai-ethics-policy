# Data Governance

**Objective**

Ensure that all data used by generative AI systems is collected, stored, processed, and disposed of in a lawful, secure, and ethical manner, preserving data quality, privacy, and compliance with regulatory requirements.

**Scope**

Applies to all personal, proprietary, and third-party data used throughout the AI lifecycle&mdash;including data ingestion, storage, processing, sharing, and deletion&mdash;for all business units and AI use cases.

**Key Requirements**

|     |     |     |     |
| --- | --- | --- | --- |
| Requirement | Description | Owner | Timeline |
| Data Quality Standards | Define criteria for accuracy, completeness, consistency, and relevance of data used by AI models. | Data Owners | Ongoing |
| Data Minimisation | Collect and retain only data necessary for specific AI use cases; implement automated filters. | DPO | Design phase |
| Anonymisation & Pseudonymisation | Apply techniques to remove or mask personal identifiers in datasets. | IT Engineering | Before model training |
| Access Controls | Enforce role-based access permissions and encryption for data at rest and in transit. | IT Security | Ongoing |
| Data Lineage & Provenance | Maintain records of data sources, transformations, and usage for traceability. | IT Engineering | Ongoing |
| Retention & Disposal | Define retention periods and secure deletion protocols in accordance with legal requirements. | DPO | Ongoing |
| Third-Party Data Management | Ensure vendor data contracts include GDPR-compliant clauses and ethical use restrictions. | Procurement | Contract signing |

**Procedures**

1.  **Data Inventory:** Maintain a centralized data catalog documenting all datasets used by AI systems, including classification (personal, sensitive, proprietary).
2.  **Data Quality Reviews:** Conduct quarterly data quality audits, documenting findings and remediation actions.
3.  **Anonymisation Process:** Use approved anonymisation toolkits and validate de-identification through re-identification risk testing.
4.  **Access Management:** Implement least-privilege access controls and multi-factor authentication for AI data repositories.
5.  **Retention & Disposal:** Automate data deletion based on retention schedules; document disposal actions in a secure log.
6.  **Vendor Assessments:** Perform data governance reviews for all third-party AI data providers before onboarding and annually thereafter.

## Data Governance Process Diagram

<div class="bpmn-viewer-container" id="bpmn-viewer-data-governance-process-bpmn-container">
  <div class="bpmn-toolbar">
    <span>AI Data Governance Lifecycle</span>
    <div>
      <button class="zoom-in" data-viewer="bpmn-viewer-data-governance-process-bpmn">Zoom In</button>
      <button class="zoom-out" data-viewer="bpmn-viewer-data-governance-process-bpmn">Zoom Out</button>
      <button class="reset-view" data-viewer="bpmn-viewer-data-governance-process-bpmn">Reset View</button>
    </div>
  </div>
  <div class="bpmn-canvas" id="bpmn-viewer-data-governance-process-bpmn" data-bpmn-file="data-governance-process.bpmn"></div>
</div>

[View/download BPMN XML](bpmn/data-governance-process.bpmn)

**Documentation Requirements**

|     |     |     |     |
| --- | --- | --- | --- |
| Document | Description | Retention Period | Location |
| Data Catalog | Master inventory of AI datasets with classification metadata | Indefinite | Central Data Repository |
| Data Quality Audit Reports | Results of quarterly quality reviews and remediation plans | 5 years | Compliance Repository |
| Anonymisation Validation Reports | Evidence of de-identification and risk testing outcomes | 5 years | Compliance Repository |
| Access Logs | Records of data access events, changes, and permission grants | 3 years | Secure Audit Log System |
| Data Disposal Records | Logs documenting secure deletion of data per retention schedule | 5 years | Compliance Repository |
| Vendor Data Compliance Reports | Evidence of third-party data governance assessments | 5 years | Compliance Repository |

**Roles & Responsibilities**

|     |     |
| --- | --- |
| Role | Responsibility |
| Data Owners | Define data requirements, ensure data quality, approve data usage requests |
| DPO | Oversee data minimisation, retention, anonymisation, and compliance with GDPR |
| IT Engineering | Implement data lineage, anonymisation, and cataloging processes |
| IT Security | Enforce access controls, monitor data usage, manage encryption |
| Procurement | Validate vendor data governance practices and contractual compliance |
| AI Ethics Board | Oversee data governance adherence and approve policy exceptions |
| Legal | Review data processing agreements for compliance and risk |

**Controls & Metrics**

|     |     |     |     |
| --- | --- | --- | --- |
| Metric | Target | Frequency | Owner |
| Data Catalog Coverage | 100% of AI datasets documented | Quarterly | IT Engineering |
| Data Quality Issue Resolution | ≥ 95% of identified issues remediated within SLA | Quarterly | Data Owners |
| Percentage of Data Anonymised | 100% for personal data used in AI | Monthly | DPO |
| Access Control Violations | 0 incidents | Monthly | IT Security |
| Vendor Compliance Completion | 100% of AI data vendors assessed | Annual | Procurement |

**Review Cycle**

*   Data Governance policies and procedures reviewed annually, incorporating audit findings, technological advances, and regulatory changes.

---

[← Employee Rights & Consent](09-Employee-Rights-and-Consent.md) | [Table of Contents](00-Table-of-Contents.md) | [Cybersecurity →](11-Cybersecurity.md)
