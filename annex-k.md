# Annex-K: AI Threat Modeling Template

## 1. AI System Metadata
- **System Name:**  
- **Owner Department:**  
- **Model Type (e.g., LLM, ML classifier):**  
- **Version:**  
- **Date of Assessment:**  
- **Assessed By:**  

## 2. Purpose of Threat Modeling
Describe the scope, objectives, and context of the threat modeling process for this AI system.

## 3. System Architecture Overview
Provide a diagram or summary of the components involved:
- Data sources
- Preprocessing pipelines
- Model training and inference
- Interfaces and outputs
- Users and roles
- Third-party dependencies

## 4. Asset Inventory
| Asset | Description | Criticality (High/Med/Low) | Owner |
|-------|-------------|----------------------------|-------|
|       |             |                            |       |

## 5. Threat Identification (STRIDE)

| Threat Type | Description | Applicable? (Y/N) | Notes |
|-------------|-------------|-------------------|-------|
| Spoofing    | Impersonation of user/system    |                   |       |
| Tampering   | Unauthorized modification        |                   |       |
| Repudiation | Denial of action or responsibility |                 |       |
| Information Disclosure | Data leakage or unauthorized access |         |       |
| Denial of Service | System disruption           |                   |       |
| Elevation of Privilege | Gaining unauthorized rights |               |       |

## 6. AI-Specific Threats

| Threat Category | Description | Likelihood (1–5) | Impact (1–5) | Mitigation Strategy |
|-----------------|-------------|------------------|--------------|----------------------|
| Model Poisoning | Inserting corrupted training data |                  |              |                      |
| Adversarial Inputs | Malicious input to force misclassification |           |              |                      |
| Data Drift | Gradual change in input data characteristics |          |              |                      |
| Prompt Injection | Prompt manipulation in LLMs |                   |              |                      |

## 7. Controls & Residual Risk

| Control Implemented | Description | Effectiveness (High/Med/Low) |
|---------------------|-------------|------------------------------|
|                     |             |                              |

## 8. Reviewer Sign-Off

| Name | Role | Signature | Date |
|------|------|-----------|------|
|      |      |           |      |