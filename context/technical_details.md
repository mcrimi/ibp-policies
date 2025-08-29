# AWS Cloud Architecture Report: Bayer BMS Deployment

## Executive Checklist

• **Multi-layered Security Architecture**: Implement defense-in-depth with VPC isolation, security groups, NACLs, and WAF protection
• **High Availability & Disaster Recovery**: Deploy across multiple AZs with automated failover and backup strategies  
• **Scalable Infrastructure Design**: Auto-scaling groups, load balancing, and managed database services for growth
• **Compliance & Governance Framework**: CAIQ v3.1 aligned controls with comprehensive logging and monitoring
• **Cost-Optimized Resource Management**: Right-sized instances with reserved capacity and automated cost controls
• **Integration & API Management**: Secure API gateway with authentication and rate limiting for external systems
• **Operational Excellence**: CloudFormation IaC, automated deployments, and centralized monitoring

---

## Architecture Overview

The proposed BMS architecture leverages AWS's well-architected framework principles to deliver a secure, scalable, and cost-effective solution for Bayer's breeding management requirements. The design implements a multi-tier architecture with clear separation of concerns across presentation, application, and data layers.

## Network Architecture & Connectivity

### VPC Design
- **Primary VPC**: `/16` CIDR block providing 65,536 IP addresses for future growth
- **Multi-AZ Deployment**: Distributed across 3 Availability Zones for 99.99% availability SLA
- **Subnet Strategy**:
  - Public Subnets (`/24` each): Web-facing load balancers and NAT gateways
  - Private Application Subnets (`/23` each): BMS application servers and APIs
  - Private Database Subnets (`/24` each): RDS instances with no internet access

### Internet Connectivity
- **Internet Gateway**: Secure outbound internet access for public subnets
- **NAT Gateways**: High-availability outbound connectivity for private subnets (one per AZ)
- **AWS PrivateLink**: Direct connectivity to AWS services without internet traversal

### Internal Networking
- **Application Load Balancer**: Layer 7 load balancing with SSL termination and health checks
- **Route Tables**: Carefully configured routing with least-privilege access principles
- **VPC Flow Logs**: Complete network traffic logging for security and compliance

## Security Architecture

### Identity & Access Management
- **AWS IAM**: Role-based access control with principle of least privilege
- **Multi-Factor Authentication**: Enforced for all administrative access
- **Service-Linked Roles**: Automated credential rotation and minimal permissions
- **Cross-Account Access**: Secure role assumption for CI/CD pipelines

### Data Protection
- **Encryption at Rest**: AES-256 encryption for all EBS volumes and RDS instances
- **Encryption in Transit**: TLS 1.3 for all data communications
- **AWS KMS**: Customer-managed keys for enhanced encryption control
- **Certificate Management**: AWS Certificate Manager for SSL/TLS certificates

### Network Security
- **Security Groups**: Application-level firewalls with explicit allow rules
- **Network ACLs**: Subnet-level security controls as additional defense layer  
- **AWS WAF**: Web application firewall protecting against OWASP Top 10 threats
- **AWS Shield Standard**: DDoS protection for all resources

### Compliance Controls (CAIQ v3.1 Aligned)
- **AWS Config**: Continuous compliance monitoring and configuration drift detection
- **AWS CloudTrail**: Comprehensive API logging and audit trail
- **AWS GuardDuty**: Threat detection and security monitoring
- **Data Residency**: EU-based AWS regions for GDPR compliance

## Compute & Application Services

### Application Tier
- **Amazon EC2**: Right-sized instances (m5.large initially) with auto-scaling capability
- **Auto Scaling Groups**: Dynamic scaling based on CPU, memory, and custom metrics
- **Application Load Balancer**: Health-check based routing with session persistence
- **Amazon ECS**: Containerized microservices for BMS components (optional future migration)

### Database Services
- **Amazon RDS PostgreSQL**: Multi-AZ deployment with automated backups
- **Database Configuration**:
  - Instance: `db.r5.xlarge` (4 vCPU, 32 GB RAM)
  - Storage: 500 GB GP2 with auto-scaling enabled
  - Backup: 7-day retention with point-in-time recovery
- **Read Replicas**: Cross-region read replicas for reporting and analytics

## High Availability & Disaster Recovery

### Availability Design
- **Multi-AZ Deployment**: Active-active configuration across 3 availability zones
- **Database Failover**: Automatic RDS failover with <60 second RTO
- **Application Redundancy**: Minimum 2 instances per AZ with load balancing

### Backup Strategy
- **Database Backups**: Automated daily backups with 7-day retention
- **Application Data**: EBS snapshots with lifecycle management
- **Cross-Region Replication**: Critical data replicated to secondary region
- **Recovery Testing**: Monthly DR drills with documented procedures

### Business Continuity
- **RTO Target**: <4 hours for full system recovery
- **RPO Target**: <15 minutes for database transactions
- **Monitoring**: 24/7 automated monitoring with alert escalation

## Scalability Architecture

### Horizontal Scaling
- **Auto Scaling Groups**: Scale out from 2-20 instances based on demand
- **Database Scaling**: Read replicas for query optimization
- **CDN Integration**: CloudFront for static content delivery and global performance

### Vertical Scaling
- **Instance Flexibility**: Easy migration to larger instance types
- **Storage Scaling**: Automatic EBS volume expansion
- **Database Scaling**: RDS allows instance class modifications with minimal downtime

### Performance Optimization
- **Caching Strategy**: ElastiCache Redis for session management and data caching
- **Database Tuning**: PostgreSQL performance insights and query optimization
- **Monitoring**: CloudWatch custom metrics for application performance tracking

## Integration & API Management

### API Gateway
- **Amazon API Gateway**: Centralized API management with throttling and authentication
- **Rate Limiting**: Configurable per-client request limits
- **API Versioning**: Backward compatibility for existing integrations

### External Integrations
- **VPN Connectivity**: Site-to-site VPN for secure on-premises communication
- **AWS Direct Connect**: Dedicated network connection for high-bandwidth requirements
- **Third-party APIs**: Secure outbound connectivity through NAT gateways

## Monitoring & Operations

### Observability
- **Amazon CloudWatch**: Comprehensive metrics, logs, and alerting
- **AWS X-Ray**: Distributed tracing for performance optimization
- **Custom Dashboards**: Real-time operational visibility

### Log Management
- **Centralized Logging**: All application and system logs aggregated in CloudWatch Logs
- **Log Retention**: 90-day retention with archival to S3 for compliance
- **Security Logging**: AWS CloudTrail integration for audit requirements

### Alerting & Notification
- **SNS Integration**: Multi-channel alerting (email, SMS, Slack)
- **Automated Response**: Lambda functions for self-healing capabilities
- **Escalation Procedures**: Tiered alert routing based on severity


# BMS Security  Report
**Date:** 2025-08-29

## Executive Summary
The retest demonstrates meaningful hardening across identity workflows, error handling, and protocol exposure. Multiple high-impact items are marked **RETEST CORRECTION: COMPLETE**, reducing opportunities for account takeover and information disclosure. Operationally, the team shows a solid fix-verify loop and alignment to OWASP practices.

## Validated Strengths (from Retest)

### 1) Stronger Account Recovery
The application  validates password changes with single-use reset tokens bound to the correct account.  
  _Evidence:_ “Password reset is linked to a token so that passwords cannot be arbitrary reset anymore.”

### 2) Resilient One-Time Password (OTP) Flow
A one-time password mechanism has been implemented to protect sensitive actions.  
  _Evidence:_ “OTP generation has been implemented.”

### 3) Robust Password Policy
Password creation enforces stronger requirements (length and character diversity), raising resistance to guessing and reuse attacks.

### 4) Enumeration Resistance
The login/reset flows have been adjusted to avoid exposing whether a user/email exists, cutting off a common reconnaissance path.

### 5) Safer Error Handling
Application errors are handled defensively, so internal information is **not returned to the end user**. This protects against targeted probing.


### Reduced Protocol Fingerprinting (Header Hygiene)
 The **Server** header **does not contain anymore the server version**, reducing useful reconnaissance data while maintaining compatibility.  


## Operational Maturity

- **Defense-in-depth focus.** Improvements span identification & authentication, misconfiguration, and input handling—consistent with OWASP categories.

## Conclusion
The BMS shows strong forward momentum on security. Authentication and recovery paths are now robust, error messages are sanitized, and protocol exposure is reduced. These improvements meaningfully increase the effort required to compromise accounts or glean useful system details, reflecting a security-by-default stance.