# Information and Security Policy

## 1. Introduction

The Integrated Breeding Platform and its main software product, the Breeding Management System (BMS), aims to promote and support the use of advanced plant breeding technologies and knowledge with the aim to increase agricultural productivity. In the digital age, where data is a critical asset, ensuring the integrity, availability, and confidentiality of this information is paramount. The Information System Security Policy (ISSP) outlined herein is designed to establish a comprehensive framework to protect the information assets associated with these platforms against unauthorized access, disclosure, alteration, and destruction.

Aligned with the ISO/IEC 27001 standard, this ISSP commits the Integrated Breeding Platform and BMS to secure their digital and informational assets. This encompasses adherence to legal, regulatory, and contractual obligations, and promoting a culture of information security within the organization.

The ISSP's main goal is to protect the organization's information assets from all threats, ensuring business continuity, minimizing risk, and optimizing returns on investments. This policy applies to all personnel interacting with the Integrated Breeding Platform and BMS data and systems.

By implementing this ISSP, we aim to create a secure information environment that facilitates our mission to develop improved crop varieties, thereby ensuring our platforms remain trusted and technologically advanced.

## 2. Organizational Context and Scope

### 2.1 Definition of Scope

The Information System Security Policy (ISSP) covers all information assets, technology infrastructures, and operational processes associated with the Integrated Breeding Platform and its main product, the Breeding Management System (BMS). This encompasses, but is not limited to, all hardware, software, data (in various forms such as electronic, print, and others), communications systems, and the physical environment that support the platform and product operations. The policy applies to all employees, contractors, consultants, and third-party service providers who access, process, store, or manage any information related to the platform and the BMS.

### 2.2 Information Assets Management

**Asset Identification and Classification:** All information assets will be systematically identified and classified according to their sensitivity, criticality, and value to the organization. This process helps in determining the appropriate level of security controls and prioritization of asset protection efforts.

**Ownership and Accountability:** Each information asset will be assigned an owner, responsible for its classification, security, and compliance with this policy. Owners are accountable for implementing appropriate security measures, ensuring that their assets are adequately protected and regularly reviewed.

**Access Management:** Access to information assets will be governed by the principles of 'least privilege' and 'need to know'. The process for granting, reviewing, and revoking access will be strictly controlled and monitored to prevent unauthorized access.

## 3. Information Security Domains

The ISSP addresses security across multiple domains to ensure comprehensive protection of information assets. These domains are aligned with ISO/IEC 27001 and include but are not limited to:

- **Asset Management** (as specified in [Team Hardware Asset Inventory](Team%20Hardware%20Asset%20inventory))
- **Access Control**
- **Cryptography**
- **Information Security Incident Management** (as specified in [Incident Response Policy](Incident%20Response%20Policy))
- **Information Security Aspects of Business Continuity Management**

Within each domain, specific security measures, controls, and procedures are defined and implemented to address identified risks and compliance requirements.

### 3.1 Continuous Improvement

Recognizing the dynamic nature of information security threats and technology, this ISSP will be subject to regular review and continuous improvement. This approach ensures that the policy remains effective and relevant in protecting the organization's information assets against evolving threats and aligns with best practices and standards.

By defining the scope and establishing a clear framework for managing and protecting information assets, the ISSP lays the foundation for a secure and resilient information security management system within the Integrated Breeding Platform and BMS operations.

## 4. Risk Treatment Plan

The Risk Treatment Plan serves as a critical element in managing the cybersecurity and operational integrity of the Integrated Breeding Platform and its Breeding Management System (BMS). Following a thorough risk identification process, this plan outlines the chosen strategies to address and mitigate these risks effectively. Our approach encompasses a variety of treatment options, including avoidance, mitigation, transfer, and acceptance, tailored to the severity and nature of each identified risk.

This document details the specific risks encountered and the corresponding treatment actions proposed to manage these risks to an acceptable level. By adopting these strategies, we aim to safeguard our systems and data against potential threats, ensuring the continuity of our services and the trust of our stakeholders. This plan is an integral part of our commitment to continuous improvement and adaptability in our security practices.

| Risk ID | Risk Description | Treatment Option | Treatment Actions |
|---------|------------------|------------------|-------------------|
| R1 | Unauthorized access to sensitive data | Mitigation | A1 - Data Encryption and Protection<br>A2 - Access Control and Identity Management |
| R2 | Data loss due to system failure | Mitigation | A3 - Training and Awareness |
| R3 | Cyber attack resulting in data breach | Mitigation | A3 - Training and Awareness |
| R4 | Non-compliance with data protection regulations | Mitigation | A3 - Training and Awareness |
| R6 | Intellectual property theft by insiders | Mitigation | A2 - Access Control and Identity Management<br>A3 - Training and Awareness |

## 5. Treatment Actions

### A1 - Data Encryption and Protection

To ensure the confidentiality, integrity, and availability of data throughout its lifecycle, implementing stringent data encryption and protection measures is crucial. This section outlines the approach to securing sensitive and critical data managed by the BMS:

The following points are enforced by the implementation of this policy:

- **IBP uses AWS Key Management Service (KMS)** to manage encryption keys for data at rest within AWS services like Amazon S3 buckets where BMS data is stored. Ensure that all S3 buckets use encryption with keys managed through KMS.
- **IBP implements AWS Certificate Manager (ACM)** for managing SSL/TLS certificates, ensuring data in transit to and from BMS is encrypted.
- **IBP ensures that Drive and Docs utilize built-in encryption** for data at rest, leveraging Google's infrastructure for securing documents and files.
- **IBP enforces Transport Layer Security (TLS)** for all data in transit to and from Google Workspace applications, protecting email communications and document transfers.

### A2 - Access Control and Identity Management

To prevent unauthorized access to information systems and data, it is essential to implement effective access control and identity management systems. This section details the policies and measures to ensure that access to systems and data is appropriately managed and monitored.

The following points are enforced by the implementation of this policy:

- **IBP implements Identity and Access Management (IAM) policies** to define permissions for accessing AWS resources. We use IAM roles and policies to grant least privilege access to BMS resources.
- **IBP configures access control policies in Google Admin Console**, specifying who can access, create, and share resources within Google Workspace. We utilize context-aware access controls to adjust permissions based on user location, device security status, and other factors.

### A3 - Training and Awareness

Recognizing that the human element plays a critical role in maintaining information security, this section emphasizes the importance of ongoing training and awareness programs for all employees, contractors, and third-party service providers.

The following points are enforced by the implementation of this policy:

- **IBP delivers regular training programs** covering key aspects of information security, data protection, and specific threats such as phishing, malware, and social engineering attacks.
- **IBP runs yearly security awareness campaigns** to keep security at the forefront of employees' minds, including reminders of policies, best practices, and how to report security incidents.
- **IBP assesses the effectiveness of training and awareness programs** through tests, surveys, and feedback mechanisms to continually improve content and delivery methods.
- **IBP delivers reminders to all staff** of their obligations under employment contracts, specifically Code of Conduct and Confidentiality Agreements.

### A4 - Backup and Recovery Processes

To ensure the resilience of the Breeding Management System (BMS) and organizational data against data loss, system failures, or disasters, this section outlines the implementation of robust backup, recovery, and redundancy measures utilizing AWS and Google Workspace services.

The following points are enforced by the implementation of this policy:

- **IBP uses Amazon S3's versioning feature** to keep multiple versions of an object in the same bucket, allowing for recovery in case of accidental deletion or overwrite.
- **IBP implements AWS Backup** to automate and centrally manage backups across AWS services, ensuring the BMS databases and file systems are regularly backed up according to a defined schedule.
- **IBP uses Amazon RDS** to enable automatic backups and point-in-time recovery features of the BMS, ensuring database resilience.
- **IBP enables Google Drive's version history** for all documents and files, allowing for the recovery of previous versions in case of accidental changes or deletions.
- **IBP uses Google Vault** for eDiscovery and data retention, ensuring that critical organizational data, including emails and documents, can be retained and retrieved for legal and compliance purposes.
- **IBP performs regular testing of backup and recovery procedures** to ensure data can be effectively restored within acceptable recovery time objectives (RTOs) and recovery point objectives (RPOs). This includes performing restore tests from AWS Backup and testing the recovery of Google Workspace data from backup solutions.
- **IBP deploys the BMS across multiple AZ's within an AWS Region** to ensure high availability and fault tolerance. Utilize services like Amazon EC2 Auto Scaling and Amazon RDS Multi-AZ deployments to automatically replace failed instances and databases.
- **IBP leverages the inherent redundancy of Google Workspace's cloud infrastructure**, which is designed to provide high availability for services such as Gmail, Google Drive, and Google Meet.
- **IBP implements AWS Route 53** for DNS management, which can be utilized to reroute traffic in case of a site failure, ensuring access to BMS and related services without interruption.
- **IBP implements ELB**, which distributes incoming application or network traffic across multiple targets, such as Amazon EC2 instances, containers, and IP addresses, in multiple Availability Zones. This ensures that the BMS remains accessible even if one or more instances fail.
- **IBP utilizes AWS CloudEndure Disaster Recovery** to provide continuous replication of IT systems, enabling quick failover and recovery in AWS in the event of a disaster. This service ensures minimal downtime and data loss, maintaining operational continuity.

## 6. GDPR Compliance

The Integrated Breeding Platform (IBP) and its Breeding Management System (BMS) are committed to complying with the General Data Protection Regulation (GDPR), ensuring the privacy and security of personal data.

Our Information System Security Policy (ISSP) incorporates GDPR principles as follows:

### 6.1 Lawful Data Processing

IBP only processes personal data based on:

- **Consent:** Explicit permission from individuals.
- **Contractual Necessity:** For contract performance.
- **Legal Obligation:** Compliance with laws.
- **Legitimate Interests:** Balancing organizational and individual interests.

### 6.2 Data Subject Rights

We uphold data subject rights, including:

- **Access:** Requesting personal data.
- **Rectification:** Correcting data.
- **Erasure:** Deleting data ("right to be forgotten").
- **Restriction:** Limiting data processing.
- **Portability:** Receiving data in a common format.
- **Objection:** Opposing data processing.

### 6.3 Data Protection by Design and Default

The BMS is designed to:

- **Minimize Data Collection:** Collect only necessary data to achieve specific purposes, reducing the risk of excessive data collection and ensuring compliance with the principle of data minimization.
- **Ensure Security:** Implement robust security measures, including data encryption, access controls, and regular security audits to protect against unauthorized access and data breaches, as stated in the Access Control Policy.

### 6.4 Data Breach Notification

See [Incident Response Policy](Incident%20Response%20Policy).