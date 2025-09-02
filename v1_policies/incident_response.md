# Incident Response Policy

## 1. Introduction
This Incident Management Policy of the Integrated Breeding Platform (IBP) is designed to ensure Breeding Management System, BMS Pro, compliance with the NIS2 Directive, focusing on the detection, response, notification, documentation, and review of cybersecurity incidents. Our goal is to maintain and enhance the security and resilience of our operations, minimizing the impact of incidents on our services and stakeholders.

## 2. Scope
This policy applies to all employees, contractors, and third-party service providers involved in the operation, maintenance, and support of BMS Pro information systems and networks.

## 3. Incident Detection and Response

### 3.1 Detection Mechanisms

#### 3.1.1 Continuous Monitoring
- IBP utilizes CloudWatch for comprehensive monitoring of our AWS resources and applications.  
- The technical team configures CloudWatch logs to collect and monitor log files from our AWS resources, enabling real-time visibility into application and system performance.  
- The technical team tracks CPU, Memory and Network usage of all managed BMS instances, setting alarms to alert us to potential issues promptly.  
- The technical team uses GuardDuty across its AWS environment to leverage intelligent threat detection capabilities:  
  - Immediately analyze events across AWS accounts for suspicious activity without additional log storage solutions.  
  - Customize detection with uploaded threat lists and configure GuardDuty to notify our security team via Amazon SNS when threats are identified.  

#### 3.1.2 Alert System
- The technical team employs Lambda to automate responses to specific security alerts (e.g., isolating compromised BMS instances).  
- The technical team uses SNS to notify the security team promptly, with the following topics:  
  1. **Security Alerts-Critical**: Immediate attention, breaches, high-risk vulnerabilities. Subscribers: senior IT security staff, IRT.  
  2. **Security Alerts-High**: Significant risks (e.g., unusual login attempts, misconfigurations). Subscribers: broader IT security.  
  3. **Security Alerts-Medium**: Medium risks (e.g., patching needs). Handled by IT staff.  
  4. **Security Alerts-Low**: Low risks (e.g., failed logins). Analysts monitor patterns.  
  5. **Operational Alerts-Performance Degradation**: Latency, throughput issues. Ops teams respond.  
  6. **Operational Alerts-Service Disruption**: Outages or disruptions. Ops teams/stakeholders informed.  
  7. **Operational Alerts-Capacity Warnings**: Early capacity issues (e.g., nearing storage limits). Infrastructure team responds.  

#### 3.1.3 Regular Audits
- AWS Config monitors and records AWS resource configurations, ensuring compliance with security policies.  
- CloudTrail logs all account activity across AWS infrastructure for analysis and response, including unauthorized actions.  

### 3.2 Response Plan

#### 3.2.1 Incident Response Team (IRT)
An IRT is designated, comprising IT, legal, and communications staff:  

| Person                | Area          | Role  |
|------------------------|--------------|-------|
| Mariano Crimi          | IT           | Lead  |
| Jean-Marcel Ribaut     | Legal/Finance| Member|
| Gorgui Alioune Mbow    | Communications| Member|

#### 3.2.2 Incident Classification
Incidents are classified using two dimensions: **Likelihood** and **Severity**.  

##### Severity Matrix

| Likelihood      | Negligible | Minor     | Moderate  | Significant | Severe |
|-----------------|------------|-----------|-----------|-------------|--------|
| **Very Likely** | Low Med    | Medium    | Med Hi    | High        | High   |
| **Likely**      | Low        | Low Med   | Medium    | Med Hi      | High   |
| **Possible**    | Low        | Low Med   | Medium    | Med Hi      | Med Hi |
| **Unlikely**    | Low        | Low Med   | Low Med   | Medium      | Med Hi |
| **Very Unlikely** | Low      | Low       | Low Med   | Medium      | Medium |

- **High Risk**: Emergency response, isolate systems, inform leadership/board, may involve external experts. Example: ransomware encrypting critical data.  
- **Medium-High Risk**: Quick assembly of IRT, contain, prevent escalation, stakeholder updates. Example: malware infection on non-critical systems.  
- **Medium Risk**: Contain/remediate with relevant teams, notify directly affected stakeholders. Example: phishing causing unauthorized access.  
- **Low-Medium Risk**: Routine resolution by IT/security without major disruption. Example: suspicious unsuccessful logins.  
- **Low Risk**: Record for analysis, no immediate action. Example: benign anomalies in traffic.  

#### 3.2.3 Containment
1. Network segmentation to isolate affected systems.  
2. Disable compromised accounts.  
3. Quarantine affected systems for analysis.  
4. Restrict/monitor communication channels to prevent exfiltration or C2 activity.  

#### 3.2.4 Eradication and Recovery
Identify and eliminate the cause of the incident, then restore services/systems. Reference: [Atlassian Wiki](https://ibplatform.atlassian.net/wiki/spaces/983042/pages/2990276636/).  

#### 3.2.5 Post-Mortem Meeting
The IRT conducts a post-incident review to improve resilience:  
1. **Timeline Reconstruction**: Collect logs/reports to document the incident from detection to resolution.  
2. **Effectiveness Assessment**: Evaluate detection, response, recovery effectiveness.  
3. **Root Cause Analysis (RCA)**: Identify vulnerabilities, operational gaps, human factors.  
4. **Lessons Learned**: Session with stakeholders, gather feedback, amend plan if needed.  
5. **Impact Assessment**: Evaluate effects on operations, data, finances, reputation.  

### 3.3 Notification

#### 3.3.1 Authorities Notification
- Significant incidents reported to relevant national authority or CSIRT within 72 hours.  
- Affected parties (employees, customers, partners) informed within 24 hours, with transparency to maintain trust.  

#### 3.3.2 Documentation
- All incidents logged and retained for **5 years**, including effects and remedial actions.  
- Records maintained in **Incident Tracker System (Atlassian JIRA)**.  

### 3.4 Regular Review and Testing
- Yearly drill to test incident response plan effectiveness.  
- IRT updates plan based on lessons learned.  
- Annual policy review or after significant operational/regulatory changes.  
- Ensure all employees are trained on latest version.  


## Policy Governance
- **Policy Owner**: Mariano Crimi
- **Security Owner**: Jean-Marcel Ribaut
- **Review Frequency**: Annual
- **Last Updated**: December 2024
- **Next Review**: December 2025
- **Version**: 1.0

## Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 12/12/2024 | Mariano Crimi | Initial policy creation |