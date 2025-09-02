# Integrated Breeding Platform (IBP) and the Breeding Management System (BMS)

## 1. Overview

The **Integrated Breeding Platform (IBP)** is an initiative aimed at supporting plant breeding programs, particularly in developing countries, by providing digital tools, data management solutions, and services to accelerate crop improvement.  

Its flagship product is the **Breeding Management System (BMS)**, a comprehensive software solution designed to manage the entire breeding cycle — from germplasm management to field trials, data collection, analysis, and decision-making.  

IBP's mission is to democratize access to breeding technologies and digital infrastructure, enabling breeders to produce improved varieties more efficiently and sustainably.

---

## 2. The Breeding Management System (BMS)

### Purpose
The **BMS** is a **web-based client/server application** that provides a standardized, centralized system for breeders. It is designed to:
- Manage **germplasm** and pedigree data.  
- Plan and design **field trials** and nurseries.  
- Collect and analyze phenotypic and genotypic data.  
- Support **statistical analysis** and decision-making.  
- Ensure **data standardization, security, and sharing** across institutions.  

### Core Features
- **Germplasm Management**: Pedigree, genealogy, and genetic resources.  
- **Field Trial Design**: Experimental layouts, randomizations, and replication strategies.  
- **Field Data Capture**: Compatibility with mobile tools like **FieldBook**, KSU Fieldbook, or tablets.  
- **Analysis Tools**: Integration with statistical packages (R, others).  
- **Ontology & Standards**: Support for **Crop Ontology** and standard variable definitions.  
- **Integration**: BrAPI-compliant APIs to connect with external systems like **Gigwa** (genotypic DB) and KSU FieldBook (data capture).  

---

## 3. Architecture and Deployment

### Technical Architecture
- **Web-based Client/Server** architecture.  
- Hosted primarily on **Amazon Web Services (AWS)** with the following setup:  
  - **VPC segregation** between public and private subnets.  
  - **Security Groups** configured with the principle of least privilege.  
  - Option to configure a **VPN layer** for extra security.  
- **EC2 instances** run the application server.  
- **RDS (Relational Database Service)** hosts the breeding data.  
- **S3 buckets** may be used for storing trial datasets, reports, and backups.  

### Security
- Strong reliance on **AWS-native security services**.  
- **Identity and Access Management (IAM)** policies control access to infrastructure.  
- Application-level access control:  
  - Role-based access per user.  
  - Password policies.  
  - (Planned/optional) Single Sign-On integration with Active Directory.  
- Annual **penetration testing and third-party audits**.  

#### User Permission Structure
The BMS uses a multi-level hierarchy for managing user permissions. This structure ensures a **segregation of duties**, a core part of the security questionnaire, by limiting user access based on their roles and responsibilities. It also adheres to the **principle of least privilege**. The BMS can enforce data access segmentation in a multi-tenant architecture.

* **Instance Level:** This is the highest level of access and is where the BMS instance and its general configuration are managed. A **Super Admin** has control at this level.
* **Crop Level:** This level manages permissions for specific crops, including germplasm, breeding methods, ontologies, and locations. **Crop Permissions** are assigned to users to control their access to data related to a particular crop.
* **Program Level:** The lowest level of the hierarchy is for managing specific programs within a crop. This includes studies, lists, and favorites. Users are granted **Program Permissions** to control their access to individual studies and data within a specific program.



#### IBP is also moving towards compliance with industry standards like:  
- **CSA STAR / CAIQ** (self-assessment available).  
- Potential future certification goals: **ISO 27001**, **SOC 2**.  

---

## 6. Known Limitations & Ongoing Improvements

- **Identity Management**: Currently handled internally by the application. Full SSO integration is planned for future releases.  


## 7. Use Cases

### Primary Users
- **Plant Breeders** working in national programs, research institutes, and CGIAR centers.  
- **Data Managers** responsible for breeding trial data pipelines.  
- **Agricultural Research Institutions** managing multi-site, multi-year trials.  

### Example Workflows
1. **Create a new breeding program**: Register germplasm, define traits and variables.  
2. **Design field trials**: Set up randomization, replications, and plot layouts.  
3. **Collect field data**: Use FieldBook or mobile tools, sync with BMS.  
4. **Analyze data**: Perform statistical analysis, compare varieties.  
5. **Decide & advance lines**: Select superior genotypes for the next breeding cycle.  


---

## 10. References & Documentation

- IBP Documentation Portal (Atlassian):  
  - [Access Control & Security Standards](https://ibplatform.atlassian.net/wiki/x/AgCEsw)  
  - [Operational Practices](https://ibplatform.atlassian.net/wiki/x/JIATuw)  
  - [Development/Operation Security Standards](https://ibplatform.atlassian.net/wiki/x/RQAxsg)  
- External integrations: BrAPI, Gigwa, KSU FieldBook.  

---

## 11. Bayer Project Implementation

### Project Selection and Initial Steps
IBP was officially selected as a partner for Bayer's joint venture in China in November 2024. The initial deployment cost was set at up to **US$150,000** for the first year, which includes licensing for 50 active and 50 secondary users. On-site training can reduce the cost by approximately **US$4,000**. 

A key decision was made to test a Breeding Management System (BMS) instance hosted on an AWS server in Singapore to check the viability of a Software as a Service (SaaS) model. However, due to China's internet regulations, the site was inaccessible, leading to the decision that the system would need to be hosted on AWS China regions for reliable service.


### Data Migration and Project Timeline
The project's testing phase, originally planned for late June to early July, was pushed back to mid-July. The team decided to automate the data migration process using R or Python scripts with API calls to reduce the estimated time.

### Security and Legal Compliance
Bayer requested the completion of a security questionnaire as part of the IT Risk Assessment process. Mariano Crimi (me) is assigned as the technical contact to complete this questionnaire and was given a deadline of September 8th.

