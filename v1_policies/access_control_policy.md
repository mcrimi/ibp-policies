# Access Control and Identity Management Policy

## Introduction
To ensure the security of our information systems and data, the Integrated Breeding Platform (IBP) and its main product, the Breeding Management System (BMS), implement a comprehensive Access Control and Identity Management policy. This policy is designed to prevent unauthorized access, ensuring that only authorized personnel can access, modify, or manage information assets.

## Objectives
The primary objectives of the Access Control and Identity Management policy are to:

- Ensure that access to information and information systems is granted only to authorized users.  
- Protect sensitive data from unauthorized access and potential breaches.  
- Maintain accountability by tracking and monitoring access to information assets.  

## Scope
This policy applies to all employees, contractors, consultants, and third-party service providers who access, process, store, or manage any information related to the IBP and BMS.

## Policy Details

### Access Control Measures

#### Least Privilege Principle
Access to information and resources is granted based on the principle of least privilege, meaning users are provided with the minimum level of access necessary to perform their job functions.

- **BMS**: Users are assigned roles with only the permissions necessary to perform breeding management tasks.  
- **Email**: Access restricted to business communications; sensitive info requires additional authentication.  
- **JIRA**: Permissions limited to relevant project issues.  
- **Slack**: Channels created per team/project needs; sensitive channels are invite-only.  
- **Confluence**: Documentation access restricted by space/page permissions.  
- **Freshbooks**: Financial data access limited to accounting/management staff.  
- **AWS**: IAM roles and policies enforce least privilege across all AWS resources.  
- **GCP**: Access levels assigned by role with strict data/service controls.  

#### Need to Know Principle
Access to sensitive data is restricted to individuals who require it for their duties.

- **BMS**: Sensitive breeding data accessible only to authorized staff.  
- **Email**: Sensitive communications encrypted; access limited to intended recipients.  
- **JIRA**: Sensitive project details restricted to team members and stakeholders.  
- **Slack**: Confidential discussions held in private channels.  
- **Confluence**: Confidential documents restricted by role.  
- **Freshbooks**: Finance data accessible only to authorized personnel.  
- **AWS**: Sensitive data encrypted; access managed via IAM policies.  
- **GCP**: Sensitive project/data access restricted with predefined roles.  

#### Access Reviews
Regular reviews of access permissions are conducted to ensure access rights remain valid and appropriate.

- **BMS**: Quarterly reviews of user roles and permissions.  
- **Email**: Periodic audits of distribution lists and controls.  
- **JIRA**: Regular project permission reviews.  
- **Slack**: Bi-annual audits of memberships and controls.  
- **Confluence**: Reviews of space/page permissions.  
- **Freshbooks**: Periodic reviews of financial data access.  
- **AWS**: Regular IAM audits.  
- **GCP**: Regular permission reviews aligned with roles.  

#### Segregation of Duties
Critical tasks are divided among different individuals to prevent fraud and errors.

- **BMS**: Separation between data entry, analysis, and decision-making.  
- **Email**: Separation of admin vs. user roles.  
- **JIRA**: Separation of issue creation, approval, and resolution.  
- **Slack**: Separate roles for channel creation, admin, and participation.  
- **Confluence**: Separation of content creation, review, and approval.    
- **AWS**: Separation of admin, operational, and audit roles.  
- **GCP**: Separate roles for data, system, and security operations.  

### Identity Management

- **User Authentication**: Strong passwords and multi-factor authentication (MFA) required.  
  - *Password Policy*: Complex passwords with length, case, numbers, symbols; regular changes; no reuse.  
  - *MFA*: Required for sensitive systems and data.  

- **Role-Based Access Control (RBAC)**: Permissions assigned by role.  
  - *Role Definitions*: Clearly defined roles with specific rights/responsibilities.  
  - *Role Audits*: Periodic audits to ensure alignment with job functions.  

- **Account Management**: Controlled processes for creation, modification, and deactivation.  
  - *Provisioning/De-provisioning*: Automated workflows for timely access management.  
  - *Temporary Access*: Managed with strict expiration and reviews.  

### Monitoring and Reporting

#### Privileged Access Monitoring
IBP establishes comprehensive monitoring of privileged access to security systems including AWS management consoles, infrastructure components, and security tools:

- **AWS Management Console Access**: All administrative access to AWS management consoles logged and monitored
- **Infrastructure Components**: Privileged access to EC2, RDS, S3, and other AWS services comprehensively tracked
- **Security Tools**: Access to security management systems (GuardDuty, Security Hub, Config) monitored and logged
- **Administrative Functions**: All privileged operations logged with detailed audit trails

#### Comprehensive Access Logging and Monitoring
- **CloudTrail Logging**: All administrative access logged through AWS CloudTrail with comprehensive API call tracking
- **CloudWatch Monitoring**: Real-time monitoring of privileged access patterns via CloudWatch alarms and dashboards
- **Multi-Factor Authentication**: MFA required for all administrative and privileged access to security systems
- **Session Monitoring**: Comprehensive session tracking and monitoring for all privileged access activities
- **Audit Trails**: Complete audit trails maintained for all privileged access with retention for compliance purposes

#### Access Log Management
- **Access Logs**: Maintained and reviewed regularly for all systems and privileged access activities
  - *Retention*: Logs retained for forensic and compliance purposes (minimum 7 years for security logs)
  - *Automated Monitoring*: CloudWatch and Security Hub tools detect unusual access patterns and security violations

#### Incident Response
- **Incident Response**: Unauthorized access incidents are investigated and resolved with comprehensive documentation
  - *Documentation*: All incidents fully documented with detailed investigation records
  - *Post-Incident Analysis*: Root causes identified and corrective measures applied with process improvements  

### Implementation and Compliance

### Password Policy
Basic password requirements enforced through system configuration:
- **Minimum 12 characters** with mixed case, numbers, and symbols
- **90-day expiration** for admin accounts, 180 days for regular users
- **MFA required** for admin access and remote connections to BMS
- **Account lockout** after 5 failed attempts (30-minute lockout)

### Access Management
- **Manager approval** for all new access requests
- **Quarterly access reviews** (can be combined with team meetings)
- **Immediate revocation** upon role changes or termination
- **Shared admin responsibilities** with proper documentation

## Responsibilities

- **Information Asset Owners**: Grant access and ensure compliance.  
- **Security Management Team**: Implement controls, review access, monitor compliance.  
- **All Users**: Comply with policy, report incidents, complete security training.  

## Training and Awareness
Regular training programs ensure users understand access control and secure authentication practices.

- **Annual Campaigns**: Reinforce security responsibilities and best practices.  
- **Newsletters**: Provide updates on threats, policy changes, and tips *(ownership TBD)*.  
- **Workshops & Webinars**: Hands-on sessions with security experts.  

Goal: Build a vigilant workforce capable of protecting IBP’s information assets.

## Continuous Improvement

- **Regular Audits**: Internal and external assessments for compliance and improvement.  
- **Feedback Mechanisms**: Channels for user/stakeholder input on improvements.  
- **Policy Updates**: Annual or ad-hoc updates for tech, regulations, or organizational priorities.  

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