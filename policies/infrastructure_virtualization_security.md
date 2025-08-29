# Infrastructure and Virtualization Security Policy

## 1. Purpose
This policy establishes security requirements and controls for cloud infrastructure and virtualization platforms supporting IBP and BMS operations.

## 2. Scope
This policy covers:
- AWS cloud infrastructure and services
- Virtual machines and containers
- Network security and segmentation
- System hardening and configuration
- Monitoring and logging systems

## 3. Cloud Infrastructure Security

### 3.1 AWS Account Security
Fundamental security controls for AWS accounts:

#### Account Structure
```yaml
AWS Account Organization:
  Master Account (Security):
    - Consolidated billing
    - Cross-account IAM roles
    - Central logging and monitoring
    - Security service management
  
  Production Account:
    - Production BMS workloads
    - Customer data processing
    - High security controls
    - Limited cross-account access
  
  Staging Account:
    - Pre-production testing
    - Integration testing
    - Performance testing
    - Production-like security
  
  Development Account:
    - Development and testing
    - Sandbox environments
    - Relaxed security for development
    - No production data
```

#### Root Account Security
- **Root account access** restricted and monitored
- **Multi-factor authentication** mandatory for root account
- **Root access keys** disabled and removed
- **CloudTrail logging** enabled for all root account activity
- **Regular access reviews** of root account permissions

### 3.2 Identity and Access Management
Comprehensive IAM strategy for cloud resources:

#### IAM Best Practices
```json
{
  "IAMPolicy": {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::ACCOUNT:role/BMSApplicationRole"
        },
        "Action": [
          "s3:GetObject",
          "s3:PutObject"
        ],
        "Resource": "arn:aws:s3:::bms-data/*",
        "Condition": {
          "StringEquals": {
            "s3:x-amz-server-side-encryption": "AES256"
          }
        }
      }
    ]
  }
}
```

#### Role-Based Access Control
| Role Type | Access Level | MFA Required | Session Duration |
|-----------|--------------|--------------|------------------|
| **Admin** | Full administrative access | Yes | 1 hour |
| **Developer** | Development resources only | Yes | 8 hours |
| **ReadOnly** | Read-only across all resources | No | 12 hours |
| **Application** | Service-specific permissions | N/A | Permanent |

### 3.3 Network Security Architecture
Multi-layered network security approach:

#### VPC Design and Segmentation
```yaml
Network Architecture:
  Production VPC (10.0.0.0/16):
    Public Subnets (10.0.1.0/24, 10.0.2.0/24):
      - Application Load Balancers
      - NAT Gateways
      - Bastion hosts (if required)
    
    Private App Subnets (10.0.10.0/24, 10.0.11.0/24):
      - EC2 application instances
      - Container services (ECS/EKS)
      - Application servers
    
    Private DB Subnets (10.0.20.0/24, 10.0.21.0/24):
      - RDS database instances
      - ElastiCache clusters
      - Database replicas
    
    Management Subnet (10.0.30.0/24):
      - Monitoring and logging systems
      - Management tools
      - Backup services
```

#### Security Groups and NACLs
```bash
# Security group for web tier
aws ec2 create-security-group \
  --group-name bms-web-tier \
  --description "BMS Web Tier Security Group"

aws ec2 authorize-security-group-ingress \
  --group-id sg-12345678 \
  --protocol tcp \
  --port 443 \
  --source-group sg-87654321  # ALB security group

# Network ACL for database tier
aws ec2 create-network-acl-entry \
  --network-acl-id acl-12345678 \
  --rule-number 100 \
  --protocol tcp \
  --port-range From=5432,To=5432 \
  --cidr-block 10.0.10.0/24 \
  --rule-action allow
```

#### Firewall Configuration
- **Default deny** policy for all traffic
- **Explicit allow** rules for required communications
- **Regular review** of firewall rules and justifications
- **Automated rule** validation and compliance checking
- **Logging** of all allowed and denied traffic

## 4. System Hardening and Configuration

### 4.1 Operating System Hardening
Comprehensive hardening based on industry standards and BMS requirements:

#### CIS Benchmark Implementation for BMS Stack
```bash
#!/bin/bash
# CIS Ubuntu 20.04 LTS Benchmark implementation for BMS/Tomcat environment

# 1.1.1.1 Ensure mounting of cramfs filesystems is disabled
echo "install cramfs /bin/true" >> /etc/modprobe.d/CIS.conf

# 1.1.1.2 Ensure mounting of freevxfs filesystems is disabled
echo "install freevxfs /bin/true" >> /etc/modprobe.d/CIS.conf

# 1.1.1.3 Ensure mounting of jffs2 filesystems is disabled
echo "install jffs2 /bin/true" >> /etc/modprobe.d/CIS.conf

# 1.1.1.4 Ensure mounting of hfs filesystems is disabled
echo "install hfs /bin/true" >> /etc/modprobe.d/CIS.conf

# 1.1.1.5 Ensure mounting of hfsplus filesystems is disabled
echo "install hfsplus /bin/true" >> /etc/modprobe.d/CIS.conf

# 2.2.1.1 Ensure time synchronization is in use
systemctl enable systemd-timesyncd
systemctl start systemd-timesyncd

# 3.1.1 Ensure IP forwarding is disabled
echo "net.ipv4.ip_forward = 0" >> /etc/sysctl.conf
echo "net.ipv6.conf.all.forwarding = 0" >> /etc/sysctl.conf
sysctl -w net.ipv4.ip_forward=0
sysctl -w net.ipv6.conf.all.forwarding=0

# 4.1.1.1 Ensure auditd is installed
apt-get update
apt-get install -y auditd audispd-plugins

# BMS-specific hardening
# Secure Tomcat installation
useradd -r -s /bin/false tomcat
chown -R tomcat:tomcat /opt/tomcat
chmod 750 /opt/tomcat/conf
chmod 640 /opt/tomcat/conf/*

# MySQL security hardening for BMS multi-database setup
mysql_secure_installation
# Configure SSL for MySQL connections
mysql -e "CREATE USER 'bms_app'@'localhost' REQUIRE SSL;"
mysql -e "GRANT SELECT, INSERT, UPDATE, DELETE ON bms_*.* TO 'bms_app'@'localhost';"
```

#### Security Configuration Standards
```yaml
System Hardening Checklist:
  User Management:
    - Default accounts disabled or removed
    - Strong password policies enforced
    - Account lockout policies configured
    - Regular user access reviews
  
  Service Management:
    - Unnecessary services disabled
    - Service accounts with minimal privileges
    - Regular service inventory and review
    - Secure service configurations
  
  File System Security:
    - Appropriate file permissions set
    - Sensitive directories protected
    - File integrity monitoring enabled
    - Regular permission audits
  
  Network Configuration:
    - Unnecessary network services disabled
    - Secure network protocols only
    - Network interface hardening
    - Regular network configuration review
```

### 4.2 Container Security
Security controls for containerized applications:

#### Docker Security Configuration
```dockerfile
# Secure Dockerfile example
FROM ubuntu:20.04

# Create non-root user
RUN groupadd -r bmsapp && useradd -r -g bmsapp bmsapp

# Install security updates
RUN apt-get update && apt-get upgrade -y && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy application files with appropriate permissions
COPY --chown=bmsapp:bmsapp app/ /app/

# Set working directory
WORKDIR /app

# Switch to non-root user
USER bmsapp

# Expose only necessary ports
EXPOSE 8080

# Use specific command (not shell form)
CMD ["./bms-application"]
```

#### Kubernetes Security (if applicable)
```yaml
# Pod Security Policy example
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: bms-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  fsGroup:
    rule: 'RunAsAny'
```

## 5. Monitoring and Logging

### 5.1 Infrastructure Monitoring
Comprehensive monitoring of infrastructure components:

#### CloudWatch Configuration
```yaml
CloudWatch Monitoring:
  EC2 Instances:
    Metrics:
      - CPUUtilization (threshold: >80%)
      - MemoryUtilization (threshold: >85%)
      - DiskSpaceUtilization (threshold: >90%)
      - NetworkIn/Out (baseline monitoring)
    
  RDS Databases:
    Metrics:
      - CPUUtilization (threshold: >75%)
      - DatabaseConnections (threshold: >80% of max)
      - FreeableMemory (threshold: <20% free)
      - ReadLatency/WriteLatency (threshold: >100ms)
    
  Load Balancers:
    Metrics:
      - TargetResponseTime (threshold: >2 seconds)
      - HTTPCode_Target_4XX_Count
      - HTTPCode_Target_5XX_Count
      - HealthyHostCount
```

#### Custom Monitoring Scripts
```python
#!/usr/bin/env python3
import boto3
import json
from datetime import datetime, timedelta

def check_security_group_compliance():
    """Check security groups for compliance violations"""
    ec2 = boto3.client('ec2')
    
    # Get all security groups
    response = ec2.describe_security_groups()
    
    violations = []
    for sg in response['SecurityGroups']:
        # Check for overly permissive rules
        for rule in sg.get('IpPermissions', []):
            for ip_range in rule.get('IpRanges', []):
                if ip_range.get('CidrIp') == '0.0.0.0/0':
                    violations.append({
                        'SecurityGroupId': sg['GroupId'],
                        'Rule': rule,
                        'Violation': 'Allows traffic from anywhere'
                    })
    
    if violations:
        send_alert('Security Group Violations Detected', violations)
    
    return violations

def send_alert(subject, message):
    """Send alert to SNS topic"""
    sns = boto3.client('sns')
    sns.publish(
        TopicArn='arn:aws:sns:region:account:security-alerts',
        Subject=subject,
        Message=json.dumps(message, indent=2)
    )

if __name__ == "__main__":
    check_security_group_compliance()
```

### 5.2 Security Event Logging
Comprehensive logging for security analysis:

#### Log Collection Strategy
```yaml
Logging Configuration:
  AWS CloudTrail:
    - All API calls across all regions
    - Data events for S3 buckets
    - Lambda function invocations
    - Management events for all services
  
  VPC Flow Logs:
    - All network traffic (accepted and rejected)
    - Stored in CloudWatch Logs
    - Retention period: 90 days
    - Automated analysis for anomalies
  
  Application Logs:
    - Authentication events
    - Authorization failures
    - Data access patterns
    - Error conditions and exceptions
  
  System Logs:
    - Operating system events
    - Service start/stop events
    - User login/logout activities
    - File system changes
```

#### Log Analysis and Alerting
```bash
# CloudWatch Logs Insights query for security events
aws logs start-query \
  --log-group-name "/aws/lambda/security-monitor" \
  --start-time $(date -d "1 hour ago" +%s) \
  --end-time $(date +%s) \
  --query-string '
    fields @timestamp, @message
    | filter @message like /SECURITY_VIOLATION/
    | sort @timestamp desc
    | limit 100
  '
```

## 6. Vulnerability Management

### 6.1 Vulnerability Scanning
Regular assessment of infrastructure vulnerabilities:

#### Scanning Schedule and Tools
| Asset Type | Tool | Frequency | Remediation SLA |
|------------|------|-----------|-----------------|
| **EC2 Instances** | AWS Inspector | Weekly | Critical: 24h, High: 72h |
| **Container Images** | ECR Image Scanning | On push | Critical: 24h, High: 48h |
| **Web Applications** | OWASP ZAP | Daily | Critical: 4h, High: 24h |
| **Network Infrastructure** | Nessus | Monthly | Critical: 48h, High: 1 week |

#### Automated Vulnerability Response
```python
#!/usr/bin/env python3
import boto3
import json

def handle_inspector_finding(event, context):
    """Automated response to AWS Inspector findings"""
    
    # Parse the Inspector finding
    finding = json.loads(event['Records'][0]['Sns']['Message'])
    
    severity = finding['severity']
    instance_id = finding['assetAttributes']['agentId']
    
    if severity == 'High' or severity == 'Critical':
        # Isolate the instance
        isolate_instance(instance_id)
        
        # Create incident ticket
        create_incident_ticket(finding)
        
        # Notify security team
        notify_security_team(finding)
    
    return {'statusCode': 200}

def isolate_instance(instance_id):
    """Move instance to isolation security group"""
    ec2 = boto3.client('ec2')
    
    # Create or get isolation security group
    isolation_sg = get_or_create_isolation_sg()
    
    # Modify instance security groups
    ec2.modify_instance_attribute(
        InstanceId=instance_id,
        Groups=[isolation_sg]
    )

def create_incident_ticket(finding):
    """Create JIRA ticket for security incident"""
    # Implementation for JIRA API integration
    pass

def notify_security_team(finding):
    """Send notification to security team"""
    sns = boto3.client('sns')
    sns.publish(
        TopicArn='arn:aws:sns:region:account:security-incidents',
        Subject=f"Critical Security Finding: {finding['title']}",
        Message=json.dumps(finding, indent=2)
    )
```

### 6.2 Patch Management
Systematic approach to security patching:

#### Patch Management Process
```yaml
Patch Management Workflow:
  Assessment Phase:
    - Vulnerability identification
    - Impact assessment
    - Patch availability verification
    - Risk analysis
  
  Testing Phase:
    - Patch testing in development
    - Compatibility verification
    - Rollback procedure testing
    - Performance impact assessment
  
  Deployment Phase:
    - Staged deployment approach
    - Production deployment
    - Post-deployment verification
    - Monitoring and issue resolution
  
  Documentation Phase:
    - Patch deployment documentation
    - Issue tracking and resolution
    - Lessons learned capture
    - Process improvement
```

#### Automated Patching with AWS Systems Manager
```bash
# Create maintenance window for patching
aws ssm create-maintenance-window \
  --name "BMS-Production-Patching" \
  --description "Monthly patching window for BMS production systems" \
  --duration 4 \
  --cutoff 1 \
  --schedule "cron(0 2 ? * SUN#2 *)"  # Second Sunday of each month at 2 AM

# Register patch baseline
aws ssm create-patch-baseline \
  --name "BMS-Ubuntu-Baseline" \
  --operating-system "UBUNTU" \
  --approval-rules '{
    "PatchRules": [{
      "PatchFilterGroup": {
        "PatchFilters": [{
          "Key": "CLASSIFICATION",
          "Values": ["Security", "Critical"]
        }]
      },
      "ApproveAfterDays": 7,
      "EnableNonSecurity": false
    }]
  }'
```

## 7. Backup and Recovery

### 7.1 Infrastructure Backup Strategy
Comprehensive backup approach for infrastructure components:

#### Backup Requirements by Component
```yaml
Backup Strategy:
  EC2 Instances:
    Method: EBS snapshots + AMI creation
    Frequency: Daily incremental, Weekly full
    Retention: 30 days daily, 12 weeks weekly
    Recovery: Launch from AMI + restore data from snapshot
  
  RDS Databases:
    Method: Automated backups + manual snapshots
    Frequency: Continuous (point-in-time) + daily snapshots
    Retention: 7 days automated, 30 days manual
    Recovery: Point-in-time restore or snapshot restore
  
  S3 Data:
    Method: Cross-region replication + versioning
    Frequency: Real-time replication
    Retention: 90 days versioning, permanent replication
    Recovery: Version restoration or cross-region failover
  
  Configuration:
    Method: Infrastructure as Code + AWS Config
    Frequency: On change + daily backup
    Retention: Version control (permanent)
    Recovery: Re-deployment from code + config restore
```

### 7.2 Disaster Recovery Testing
Regular testing of recovery procedures:

#### DR Testing Schedule
| Test Type | Frequency | Scope | Success Criteria |
|-----------|-----------|-------|------------------|
| **Component Recovery** | Monthly | Individual services | <1 hour RTO |
| **Application Recovery** | Quarterly | Full application stack | <4 hour RTO |
| **Regional Failover** | Semi-annually | Cross-region failover | <8 hour RTO |
| **Full DR Exercise** | Annually | Complete infrastructure | <24 hour RTO |

## 8. Compliance and Audit

### 8.1 Infrastructure Compliance Monitoring
Continuous compliance assessment:

#### AWS Config Rules for Compliance
```json
{
  "ConfigRules": [
    {
      "ConfigRuleName": "ec2-security-group-attached-to-eni",
      "Description": "Checks that security groups are attached to EC2 instances",
      "Source": {
        "Owner": "AWS",
        "SourceIdentifier": "EC2_SECURITY_GROUP_ATTACHED_TO_ENI"
      }
    },
    {
      "ConfigRuleName": "rds-encryption-enabled",
      "Description": "Checks whether storage encryption is enabled for RDS instances",
      "Source": {
        "Owner": "AWS",
        "SourceIdentifier": "RDS_STORAGE_ENCRYPTED"
      }
    },
    {
      "ConfigRuleName": "s3-bucket-server-side-encryption-enabled",
      "Description": "Checks that S3 buckets have server-side encryption enabled",
      "Source": {
        "Owner": "AWS",
        "SourceIdentifier": "S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED"
      }
    }
  ]
}
```

### 8.2 Audit Trail Management
Comprehensive audit trail for infrastructure activities:

#### Audit Log Requirements
- **CloudTrail logs** for all API activities
- **VPC Flow Logs** for network traffic
- **CloudWatch Logs** for application and system events
- **AWS Config** for configuration changes
- **GuardDuty findings** for security threats

## 9. Performance and Capacity Management

### 9.1 Performance Monitoring
Proactive performance management:

#### Performance Metrics and Thresholds
```yaml
Performance Monitoring:
  Application Tier:
    - Response time: <2 seconds (95th percentile)
    - Throughput: >1000 requests/minute
    - Error rate: <1% of total requests
    - CPU utilization: <70% average
  
  Database Tier:
    - Query response time: <100ms average
    - Connection pool utilization: <80%
    - Disk I/O: <80% utilization
    - Memory utilization: <85%
  
  Network Tier:
    - Bandwidth utilization: <70%
    - Packet loss: <0.1%
    - Latency: <50ms within region
    - DNS resolution time: <100ms
```

### 9.2 Capacity Planning
Proactive capacity management:

#### Scaling Strategies
- **Auto Scaling Groups** for EC2 instances based on demand
- **RDS scaling** for database performance optimization
- **CloudFront** for content delivery optimization
- **Elastic Load Balancing** for traffic distribution

## 10. Implementation Roadmap

### Phase 1: Foundation (0-3 months)
- [ ] Implement basic security controls and hardening
- [ ] Deploy monitoring and logging infrastructure
- [ ] Establish vulnerability scanning procedures
- [ ] Create backup and recovery processes

### Phase 2: Advanced Security (3-6 months)
- [ ] Implement advanced threat detection
- [ ] Deploy automated incident response
- [ ] Establish compliance monitoring
- [ ] Optimize performance and capacity management

### Phase 3: Continuous Improvement (6-12 months)
- [ ] Implement advanced analytics and AI/ML
- [ ] Establish predictive capacity planning
- [ ] Achieve security certifications
- [ ] Optimize costs and resource utilization

## Policy Governance
- **Policy Owner**: Infrastructure Lead
- **Security Owner**: Security Lead  
- **Review Frequency**: Annual
- **Last Updated**: [Date]
- **Next Review**: [Date + 1 year]
- **Version**: 1.0

## References
- AWS Well-Architected Security Pillar
- CIS Controls v8
- NIST Cybersecurity Framework
- ISO/IEC 27001:2022 Annex A.12

## Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Author] | Initial policy creation |
