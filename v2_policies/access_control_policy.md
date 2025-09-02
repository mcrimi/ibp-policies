# Access Control and Identity Management Policy

## 1. Purpose
This policy establishes requirements for managing access to IBP systems, data, and resources, ensuring appropriate access levels while maintaining security in our remote work environment.

## 2. Scope
This policy covers access to all IBP systems including:
- Breeding Management System (BMS) and related databases
- AWS cloud infrastructure and services
- Business applications (email, collaboration tools, financial systems)
- Development and administrative tools

## 3. Access Control Principles

### 3.1 Core Security Principles
- **Least Privilege**: Users receive minimum access necessary for their role
- **Need to Know**: Access granted only for legitimate business purposes  
- **Segregation of Duties**: Critical functions require multiple people
- **Regular Reviews**: Access permissions reviewed and updated regularly

### 3.2 Access Control Framework
IBP uses a simplified two-tier access model appropriate for a small remote team:

| Access Level | Description | MFA Required | Review Frequency |
|--------------|-------------|--------------|------------------|
| **Standard** | Regular business applications and data | Yes | Annually |
| **Administrative** | System administration and sensitive data | Yes (enhanced) | Semi-annually |

## 4. Identity Management

### 4.1 Account Management Process

#### Account Creation
1. **Manager approval** for all new accounts
2. **Role-based provisioning** using predefined access templates
3. **Multi-factor authentication setup** required before access
4. **Security briefing** completed within first week

#### Account Modification  
1. **Change request** with business justification
2. **Manager approval** for access changes
3. **Implementation** with verification testing
4. **Documentation** updated in access records

#### Account Termination
1. **Immediate access revocation** upon departure notice
2. **Asset recovery** including devices and access tokens
3. **Account archival** for audit purposes (6 months)
4. **Documentation** of termination process completion

### 4.2 Authentication Requirements

#### Password Policy
- **Minimum 12 characters** with complexity requirements (mixed case, numbers, symbols)
- **Unique passwords** across all systems (password manager encouraged)
- **90-day expiration** for administrative accounts only
- **Account lockout** after 5 failed attempts
- **Password history** prevention of last 12 passwords reuse
- **Strong entropy requirements** enforced during password creation

#### Multi-Factor Authentication (MFA)
- **Required for all systems** containing sensitive data
- **Enforced for all administrative access** to AWS infrastructure
- **Authenticator apps preferred** over SMS for security
- **Backup codes** generated and securely stored
- **Regular MFA device reviews** and updates

#### Authentication Security Features
- **Account Recovery Protection**: Password reset tokens are single-use and bound to specific accounts
- **One-Time Password (OTP)**: OTP mechanisms implemented for sensitive actions
- **Enumeration Resistance**: Login and password reset flows do not reveal account existence
- **Error Handling**: Generic error messages prevent information disclosure
- **Session Management**: Secure session handling with appropriate timeout policies
- **Protocol Security**: Server headers sanitized to prevent version fingerprinting

## 5. Authorization Framework

### 5.1 Role-Based Access Control

#### Standard Roles
| Role | Access Includes | Typical Users |
|------|----------------|---------------|
| **Team Member** | BMS user access for assigned crop databases, email and collaboration tools, read access to shared documentation, basic AWS service access (as needed) | All staff members |
| **Technical Staff** | Full BMS administrative access, AWS infrastructure management, development tool access, system monitoring and logging tools | Diego Cuenya, developers |
| **Management** | Business system access (finance, HR tools), reporting and analytics access, contract and vendor management tools, strategic planning resources | Jean-Marcel Ribaut, Mariano Crimi |

#### Access Provisioning Process
1. **Manager approval** for all new accounts
2. **Role-based provisioning** using predefined access templates
3. **Multi-factor authentication setup** required before access
4. **Security briefing** completed within first week

### 5.2 Privileged Access Management

#### Administrative Access Controls
- **Separate admin accounts** from standard user accounts
- **Enhanced MFA** for administrative functions
- **Session monitoring** and logging for admin activities
- **Time-limited access** for temporary administrative needs

#### Break-Glass Access
- **Emergency access procedures** for critical situations
- **Dual authorization** required for break-glass access
- **Comprehensive logging** of all emergency access
- **Post-incident review** of emergency access usage

## 6. Access Reviews and Monitoring

### 6.1 Regular Access Reviews

#### Review Schedule
- **Semi-annual reviews** for administrative access
- **Annual reviews** for all standard access
- **Quarterly reviews** of privileged accounts
- **Event-driven reviews** for role changes

#### Review Process
1. **Access inventory** generated automatically where possible
2. **Manager verification** of access appropriateness
3. **Exception documentation** for any unusual access patterns
4. **Remediation tracking** for access changes required

### 6.2 Privileged Access Monitoring

#### Security Systems Monitoring
IBP establishes comprehensive monitoring of privileged access to security systems including:
- **AWS Management Consoles**: All administrative access to AWS management consoles logged and monitored
- **Infrastructure Components**: Privileged access to EC2, RDS, S3, VPC, and other AWS services tracked
- **Security Tools**: Access to GuardDuty, Security Hub, Config, and other security management systems monitored

#### Administrative Access Logging and Monitoring
- **CloudTrail Logging**: All administrative access logged through AWS CloudTrail with comprehensive API call tracking
- **CloudWatch Monitoring**: Real-time monitoring of privileged access patterns via CloudWatch alarms and dashboards
- **Multi-Factor Authentication**: MFA required for all administrative and privileged access to security systems
- **Session Monitoring**: Comprehensive session tracking and monitoring for all privileged access activities
- **Audit Trails**: Complete audit trails maintained for all privileged access with compliance retention

#### General Access Monitoring Activities
- **Failed login attempts** monitored and investigated
- **Unusual access patterns** flagged for review
- **Privileged account usage** logged and reviewed
- **Off-hours access** monitored for legitimate business need

#### Alerting and Response
- **Real-time alerts** for suspicious access attempts
- **Automated blocking** of obviously malicious attempts
- **Investigation procedures** for access anomalies
- **Incident escalation** for confirmed security issues

### 6.3 Access Violation Remediation

#### Violation Investigation Process
- **Initial Assessment**: Immediate evaluation of suspected access violations within 4 hours
- **Evidence Collection**: Systematic collection of access logs, system records, and user activity data
- **Impact Analysis**: Assessment of potential data exposure or system compromise
- **Stakeholder Notification**: Notification of management and affected parties as appropriate

#### Corrective Action Framework
- **Immediate Containment**: Temporary suspension or restriction of violating access pending investigation
- **Root Cause Analysis**: Detailed analysis to identify underlying causes and contributing factors
- **Policy Compliance Verification**: Verification that remediation actions align with access control policies
- **Corrective Measures**: Implementation of specific actions to address identified violations

#### Prevention and Improvement
- **Process Improvements**: Updates to access control procedures based on violation analysis
- **Training Enhancement**: Additional training for users involved in access violations
- **Control Strengthening**: Enhancement of technical controls to prevent similar violations
- **Documentation Updates**: Updates to policies and procedures based on lessons learned

## 7. Remote Access Security

### 7.1 Remote Work Access Requirements

#### Secure Remote Access
- **VPN required** for accessing internal systems
- **Device security** standards for remote work devices
- **Home network security** guidelines and requirements
- **Physical security** requirements for remote workspaces

#### Cloud Service Access
- **Single sign-on (SSO)** where possible for cloud services
- **Browser security** requirements for cloud application access
- **Session management** with appropriate timeouts
- **Data handling** restrictions for cloud-based work

### 7.2 Mobile Device Management

#### Device Security Requirements
- **Device encryption** mandatory for all devices accessing IBP data
- **Remote wipe capability** enabled for company-provided devices
- **App restrictions** for devices accessing sensitive information
- **Regular security updates** required for all devices

#### BYOD (Bring Your Own Device) Policy
- **Basic security requirements** for personal devices used for work
- **Data segregation** between personal and business use
- **Incident reporting** requirements for lost or stolen devices
- **Acceptable use** guidelines for personal devices

## 8. Special Access Requirements

### 8.1 Vendor and Third-Party Access

#### Temporary Access Management
- **Time-limited access** with defined expiration dates
- **Specific purpose** documentation required
- **Escort requirements** for sensitive system access
- **Access logging** and monitoring for all third-party access

#### Vendor Access Controls
- **Contractual requirements** for vendor security standards
- **Access approval process** for vendor personnel
- **Monitoring requirements** during vendor access periods
- **Revocation procedures** when vendor engagement ends

### 8.2 Development and Testing Access

#### Development Environment Access
- **Separate credentials** for development vs. production systems
- **Limited production access** for development staff
- **Test data management** with privacy protection
- **Code repository access** controls and monitoring

#### Production System Access
- **Change management** integration for production access
- **Approval requirements** for production system changes
- **Monitoring and logging** of all production activities
- **Emergency access** procedures for critical issues

## 9. Compliance and Audit

### 9.1 Access Control Compliance

#### Regulatory Requirements
- **GDPR compliance** for personal data access controls
- **Audit trail maintenance** for access control decisions
- **Data subject rights** support through access controls
- **Privacy by design** implementation in access systems

#### Documentation Requirements
- **Access control policies** maintained and current
- **Access logs** retained according to compliance requirements
- **Review documentation** showing regular access assessments
- **Training records** for access control procedures

### 9.2 Audit Support

#### Audit Preparation
- **Access inventory** readily available for auditors
- **Process documentation** current and accessible
- **Evidence collection** procedures for access control effectiveness
- **Corrective action** tracking for audit findings

## 10. Training and Awareness

### 10.1 User Training Requirements

#### Security Awareness Training
- **Annual training** on access control policies and procedures
- **Role-specific training** for administrative and privileged users
- **Onboarding training** for new team members
- **Update training** when policies or systems change

#### Training Content
- **Password security** and MFA best practices
- **Phishing and social engineering** awareness
- **Remote work security** practices
- **Incident reporting** procedures and responsibilities

### 10.2 Competency Assessment
- **Training completion** tracking and follow-up
- **Periodic assessments** of security awareness
- **Simulated phishing tests** quarterly
- **Performance feedback** and additional training as needed

## 11. Technology Implementation

### 11.1 Identity Management Systems

#### Core Technologies
- **AWS IAM** for cloud infrastructure access control
- **Google Workspace** for business application identity management
- **Multi-factor authentication** platforms (Google Authenticator, AWS MFA)
- **Password management** tools encouraged for all users

#### Integration Requirements
- **Single sign-on** implementation where technically feasible
- **API access** controls for system-to-system authentication
- **Directory synchronization** for consistent identity management
- **Backup authentication** methods for system resilience

### 11.2 Access Control Implementation

#### Technical Controls
- **Role-based permissions** implemented consistently across systems
- **Automated provisioning** where possible to reduce manual errors
- **Access logging** for all systems with sensitive data
- **Session management** with appropriate timeout policies

#### Data Access Segmentation
- **Resource Tagging**: AWS resources tagged by data classification and access requirements for automated policy enforcement
- **Database-Level Controls**: Database user accounts and schemas separated by data sensitivity and user roles
- **Tenant Data Isolation**: Logical data separation using database schemas and application-level access controls
- **Encryption Key Separation**: Separate encryption keys for different data classifications using AWS KMS customer-managed keys

#### Identity Replication Controls
- **Business Necessity**: Identity replication limited to documented business requirements with manager approval
- **Justification Documentation**: Written business justification required for all identity replication requests
- **Regular Review**: Quarterly review of all replicated identities to verify continued business need
- **Access Monitoring**: All replicated identity activities logged and monitored through standard access controls
- **Cleanup Procedures**: Automated removal of unnecessary replicated identities during regular access reviews

## 12. Exception Management

### 12.1 Access Exception Process

#### Temporary Exceptions
- **Business justification** required for all exceptions
- **Time-limited approvals** with specific expiration dates
- **Compensating controls** implemented where possible
- **Regular review** of active exceptions

#### Emergency Access
- **Break-glass procedures** for genuine emergencies
- **Post-incident documentation** required
- **Access review** within 24 hours of emergency use
- **Process improvement** based on emergency access usage

## Policy Governance
- **Policy Owner**: Mariano Crimi
- **Executive Sponsor**: Jean-Marcel Ribaut
- **Review Frequency**: Annual
- **Last Updated**: December 2024
- **Next Review**: December 2025
- **Version**: 2.0

## Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 12/12/2024 | Mariano Crimi | Initial policy creation |
| 2.0 | 12/12/2024 | Mariano Crimi | Consolidated access control and identity management for remote team |