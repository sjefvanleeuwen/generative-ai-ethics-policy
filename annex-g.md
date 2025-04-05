# Annex-G: Risk Scoring Matrix

## 1. Purpose
Provide a standardized methodology for scoring and prioritizing risks associated with AI systems based on likelihood and impact.

## 2. Likelihood Scale
| Score | Description              | Frequency Estimate            |
|-------|--------------------------|-------------------------------|
| 1     | Rare                     | May occur only in exceptional circumstances |
| 2     | Unlikely                 | Could occur at some time     |
| 3     | Possible                 | Might occur occasionally     |
| 4     | Likely                   | Will probably occur in most cases |
| 5     | Almost Certain           | Expected to occur frequently |

## 3. Impact Scale
| Score | Description              | Example Consequences           |
|-------|--------------------------|--------------------------------|
| 1     | Negligible               | Minimal user inconvenience, no regulatory concern |
| 2     | Minor                    | Slight user impact, recoverable error |
| 3     | Moderate                 | Some regulatory exposure, internal escalation required |
| 4     | Major                    | Potential fines, media attention, significant service impact |
| 5     | Critical                 | High regulatory risk, reputational damage, legal liability |

## 4. Risk Rating Matrix

| Likelihood →  \ Impact ↓ | 1 (Negligible) | 2 (Minor) | 3 (Moderate) | 4 (Major) | 5 (Critical) |
|---------------------------|----------------|-----------|---------------|-----------|--------------|
| 1 (Rare)                  | 1 (Low)        | 2 (Low)   | 3 (Medium)    | 4 (Medium)| 5 (High)     |
| 2 (Unlikely)              | 2 (Low)        | 4 (Medium)| 6 (Medium)    | 8 (High)  | 10 (High)    |
| 3 (Possible)              | 3 (Medium)     | 6 (Medium)| 9 (High)      | 12 (High) | 15 (High)    |
| 4 (Likely)                | 4 (Medium)     | 8 (High)  | 12 (High)     | 16 (Critical)| 20 (Critical)|
| 5 (Almost Certain)        | 5 (High)       | 10 (High) | 15 (High)     | 20 (Critical)| 25 (Critical)|

## 5. Risk Levels

| Score Range | Level      | Action Required                       |
|-------------|------------|----------------------------------------|
| 1–4         | Low        | Monitor; no immediate action required |
| 5–9         | Medium     | Mitigation required; monitor closely  |
| 10–15       | High       | Immediate mitigation and review       |
| 16–25       | Critical   | Escalate to Ethics Board; urgent action required |

## 6. Notes
- Scores are calculated by multiplying likelihood × impact.
- Risk levels must be reviewed and approved by the AI Ethics Board for all High and Critical items.