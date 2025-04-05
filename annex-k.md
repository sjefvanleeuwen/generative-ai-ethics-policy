# Annex-K: AI Threat Modeling Template

## 1. System Overview
- **AI System Name:**  
- **Version:**  
- **Business Purpose:**  
- **Risk Classification:** Low / Medium / High
- **Data Types Processed:**  
- **Deployment Environment:**  
- **Integration Points:**  

## 2. System Architecture
- **Model Type/Framework:**  
- **API Dependencies:**  
- **Data Storage:**  
- **Authentication Mechanisms:**  

_Include architecture diagram here_

## 3. Trust Boundaries
| Boundary | Description | Protection Mechanism | Assessed Strength |
|----------|-------------|---------------------|-------------------|
| External-Internal |  |  | Low/Medium/High |
| Model-Infrastructure |  |  | Low/Medium/High |
| Data Processing Zones |  |  | Low/Medium/High |
| User-System |  |  | Low/Medium/High |
| Third-Party Components |  |  | Low/Medium/High |

## 4. Threat Categories & Risk Assessment

### 4.1 Model Security Threats

| Threat | Likelihood | Impact | Risk Rating | Controls |
|--------|------------|--------|-------------|----------|
| **Prompt injection** |  |  |  |  |
| **Model extraction** |  |  |  |  |
| **Training data poisoning** |  |  |  |  |
| **Adversarial examples** |  |  |  |  |
| **Model inversion attacks** |  |  |  |  |
| **Membership inference** |  |  |  |  |

### 4.2 Infrastructure Threats

| Threat | Likelihood | Impact | Risk Rating | Controls |
|--------|------------|--------|-------------|----------|
| **API abuse** |  |  |  |  |
| **DDoS attacks** |  |  |  |  |
| **Supply chain attacks** |  |  |  |  |
| **Data exfiltration** |  |  |  |  |
| **Authentication bypass** |  |  |  |  |

### 4.3 Data Security Threats

| Threat | Likelihood | Impact | Risk Rating | Controls |
|--------|------------|--------|-------------|----------|
| **Training data leakage** |  |  |  |  |
| **Sensitive info in outputs** |  |  |  |  |
| **Data poisoning** |  |  |  |  |
| **Unauthorized access** |  |  |  |  |

### 4.4 Operational Threats

| Threat | Likelihood | Impact | Risk Rating | Controls |
|--------|------------|--------|-------------|----------|
| **Availability disruption** |  |  |  |  |
| **Performance degradation** |  |  |  |  |
| **Dependency failures** |  |  |  |  |

## 5. Attack Vectors & Scenarios
| ID | Attack Vector | Attack Scenario | Impact | Mitigation |
|----|--------------|-----------------|--------|------------|
| AV-1 |  |  |  |  |
| AV-2 |  |  |  |  |
| AV-3 |  |  |  |  |

## 6. Security Controls Matrix
| Control Category | Control | Implementation Status | Testing Method | Testing Frequency |
|------------------|---------|----------------------|---------------|-------------------|
| **Input Validation** |  |  |  |  |
| **Authentication** |  |  |  |  |
| **Authorization** |  |  |  |  |
| **Data Protection** |  |  |  |  |
| **Monitoring & Detection** |  |  |  |  |
| **Response & Recovery** |  |  |  |  |

## 7. Vulnerability Testing Plan
| Test Type | Scope | Methodology | Schedule | Responsible Team |
|-----------|-------|-------------|----------|------------------|
| Prompt injection testing |  |  |  |  |
| Fuzzing |  |  |  |  |
| Adversarial testing |  |  |  |  |
| Penetration testing |  |  |  |  |
| Supply chain review |  |  |  |  |

## 8. Risk Mitigation Plan
| Risk | Mitigation Action | Owner | Timeline | Success Criteria | Status |
|------|-------------------|-------|----------|------------------|--------|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

## 9. Security Monitoring Requirements
- **Logging Requirements:**  
- **Alert Thresholds:**  
- **Incident Response Integration:**  

## 10. Approvals & Reviews

| Role | Name | Signature | Date |
|------|------|-----------|------|
| AI Security Architect |  |  |  |
| IT Security Officer |  |  |  |
| DPO |  |  |  |
| AI Ethics Board Rep |  |  |  |

**Threat Model Version:** ______  
**Review Date:** ____/____/20__  
**Next Review Due:** ____/____/20__