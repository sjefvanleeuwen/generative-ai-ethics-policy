# Annex-G: Risk Scoring Matrix

## 1. Risk Scoring Framework

This matrix provides a standardized method for evaluating AI-related risks across the organization. All generative AI systems must be assessed using this framework during design, before deployment, and at regular intervals thereafter.

## 2. Likelihood Assessment

| Rating | Score | Description | Frequency |
|--------|-------|-------------|-----------|
| **Very Low** | 1 | Highly unlikely to occur | Less than once per 5 years |
| **Low** | 2 | Unlikely to occur | Once per 2-5 years |
| **Medium** | 3 | Possible to occur | Once per 1-2 years |
| **High** | 4 | Likely to occur | Multiple times per year |
| **Very High** | 5 | Almost certain to occur | Monthly or more frequently |

## 3. Impact Assessment

### 3.1 Impact to Individuals

| Rating | Score | Privacy Impact | Rights & Freedoms | Financial/Economic | Psychological/Social |
|--------|-------|---------------|-------------------|--------------------|--------------------|
| **Very Low** | 1 | No personal data affected | No impact on rights | No financial impact | No psychological impact |
| **Low** | 2 | Limited personal data affected | Minor, temporary restriction | Minor financial impact (<€100) | Minor discomfort or inconvenience |
| **Medium** | 3 | Sensitive data affected | Moderate restrictions on rights | Moderate financial impact (€100-1,000) | Moderate distress or reputational damage |
| **High** | 4 | Special category data affected | Significant impact on fundamental rights | Significant financial impact (€1,000-10,000) | Significant distress or discrimination |
| **Very High** | 5 | Comprehensive profile affected | Severe restriction of fundamental rights | Severe financial impact (>€10,000) | Severe psychological impact or physical harm |

### 3.2 Impact to Organization

| Rating | Score | Financial | Operational | Reputational | Legal/Regulatory |
|--------|-------|----------|-------------|--------------|------------------|
| **Very Low** | 1 | <€10,000 | Minimal disruption | Limited visibility | Minor compliance issues |
| **Low** | 2 | €10,000-50,000 | Limited disruption | Local negative publicity | Limited legal exposure |
| **Medium** | 3 | €50,000-250,000 | Moderate disruption | National negative publicity | Regulatory investigation |
| **High** | 4 | €250,000-1,000,000 | Major disruption | International negative publicity | Significant fines or sanctions |
| **Very High** | 5 | >€1,000,000 | Critical business failure | Severe, lasting reputational damage | Criminal charges or existential legal threat |

## 4. Overall Risk Rating

Multiply the Likelihood score by the highest applicable Impact score to determine the Overall Risk Rating.

| Overall Score | Risk Level | Required Actions |
|--------------|------------|------------------|
| **1-4** | **Low Risk** | Standard controls, annual review |
| **5-9** | **Medium Risk** | Enhanced controls, quarterly review, DPO notification |
| **10-15** | **High Risk** | Comprehensive controls, monthly review, DPIA required, AI Ethics Board approval |
| **16-25** | **Critical Risk** | Executive approval required, continuous monitoring, full risk treatment plan, possible prohibition |

## 5. Risk Heat Map

The risk heat map visually represents the intersection of likelihood (rows) and impact (columns):

- **Critical Risk (16-25)**: Very high impact + high/very high likelihood; or Very high likelihood + high/very high impact
- **High Risk (10-15)**: Medium impact + high/very high likelihood; High impact + medium/high likelihood; Very high impact + low/medium likelihood
- **Medium Risk (5-9)**: Low impact + high/very high likelihood; Medium impact + medium likelihood; High impact + low likelihood
- **Low Risk (1-4)**: Very low/low impact + very low/low likelihood; Very low impact + any likelihood; Very low likelihood + any impact

*Note: Use the risk heat map to quickly identify the highest risk areas requiring immediate attention.*

## 6. Risk Treatment Options

| Treatment | Description | When to Apply |
|-----------|-------------|---------------|
| **Accept** | Acknowledge and accept the risk | Only for Low risks within tolerance |
| **Mitigate** | Implement controls to reduce likelihood or impact | Primary approach for Medium and High risks |
| **Transfer** | Share risk with third party (insurance, contractual) | Where financial impact is primary concern |
| **Avoid** | Eliminate the risk by avoiding the activity | For Critical risks that cannot be sufficiently mitigated |

## 7. Control Effectiveness Assessment

| Rating | Description | Criteria |
|--------|-------------|----------|
| **Low** | Minimal effectiveness | Controls are ad hoc, undocumented, or untested |
| **Medium** | Moderate effectiveness | Controls are documented but may have gaps or limited testing |
| **High** | Strong effectiveness | Controls are comprehensive, documented, tested, and regularly reviewed |

## 8. Residual Risk

After assessing control effectiveness, re-evaluate the risk using this formula:

Residual Risk = Inherent Risk × (1 - Control Effectiveness Factor)

Control Effectiveness Factors:
- Low: 0.25
- Medium: 0.50
- High: 0.75

## 9. Review Cycle

| Risk Level | Review Frequency | Approval Authority |
|------------|-----------------|-------------------|
| Low | Annual | Business Unit Manager |
| Medium | Quarterly | Risk Management Team |
| High | Monthly | AI Ethics Board |
| Critical | Monthly + Continuous Monitoring | Executive Committee |