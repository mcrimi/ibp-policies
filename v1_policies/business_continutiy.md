# Business Continuity and Disaster Recovery Policy

## 1. Purpose
This policy ensures IBP and BMS can maintain operations and recover from disruptions, protecting critical services and data.

## 2. Scope
Applies to all BMS infrastructure, applications, and data hosted in AWS, covering both operational resilience and disaster recovery.

## 3. Business Impact Analysis

### 3.1 Service Criticality
| Service             | Priority  | RTO       | RPO       | Justification               |
|---------------------|-----------|-----------|-----------|-----------------------------|
| BMS Production API  | Critical  | 4 hours   | 1 hour    | Core service for users      |
| Database (RDS)      | Critical  | 4 hours   | 1 hour    | Contains all breeding data  |
| User Authentication | Critical  | 4 hours   | 1 hour    | Required for access         |
| File Storage (S3)   | High      | 8 hours   | 4 hours   | Research documents          |
| Analytics           | Medium    | 24 hours  | 12 hours  | Non-critical reporting      |

### 3.2 Risk Scenarios
- AWS region failure  
- Data corruption or deletion  
- Cyber attack (ransomware)  
- Extended AWS service outage  
- Key personnel unavailability  

### 3.3 Impact Assessment Matrix
| Duration  | Impact Level | Business Impact              | Action Required            |
|-----------|--------------|------------------------------|----------------------------|
| < 1 hour  | Low          | Minimal user disruption      | Monitor situation          |
| 1-4 hours | Medium       | Some users affected          | Prepare for failover       |
| 4-8 hours | High         | Significant disruption       | Initiate failover          |
| > 8 hours | Critical     | Business operations at risk  | Full disaster recovery     |

## 4. Backup Strategy

### 4.1 AWS Backup Configuration
```hcl
# AWS Backup Plan (Terraform)
resource "aws_backup_plan" "bms_backup" {
  name = "bms-backup-plan"
  
  rule {
    rule_name         = "daily_backup"
    target_vault_name = aws_backup_vault.main.name
    schedule          = "cron(0 5 ? * * *)"  # 5 AM UTC daily
    
    lifecycle {
      delete_after      = 90   # Keep for 90 days
      cold_storage_after = 30  # Move to cold storage after 30 days
    }
    
    recovery_point_tags = {
      Environment = "Production"
      Frequency   = "Daily"
    }
  }
  
  rule {
    rule_name         = "weekly_backup"
    target_vault_name = aws_backup_vault.main.name
    schedule          = "cron(0 6 ? * 1 *)"  # Monday 6 AM UTC
    
    lifecycle {
      delete_after = 365  # Keep for 1 year
    }
  }
}
```

### 4.2 Backup Schedule
| Resource          | Frequency  | Retention | Method                   | Location     |
|-------------------|------------|-----------|--------------------------|--------------|
| RDS Database      | Daily      | 90 days   | AWS Backup               | eu-west-1    |
| RDS Database      | Continuous | 7 days    | Point-in-time recovery   | eu-west-1    |
| S3 Data           | Real-time  | Versioning| S3 Versioning            | eu-west-1    |
| S3 Data           | Daily      | 90 days   | Cross-region replication | eu-central-1 |
| Configuration     | On change  | 30 versions| AWS Config              | eu-west-1    |
| Infrastructure    | On commit  | Indefinite| Git repository           | GitHub       |

### 4.3 Backup Testing
- Monthly: Restore random backup to test environment  
- Quarterly: Full DR drill  
- Document test results in Confluence  
- Success criteria: Restore completed within RTO  

## 5. Disaster Recovery Plan

### 5.1 Recovery Strategy
Primary Strategy: Backup and Restore  
- Cost-effective for small team  
- RTO: 4 hours, RPO: 1 hour  
- Manual failover process  

### 5.2 DR Architecture
Primary Region (eu-west-1) → DR Region (eu-central-1)  
- RDS Multi-AZ → RDS Read Replica (promotable)  
- S3 with versioning → S3 with cross-region replication  
- EC2/ECS instances → AMIs ready for deployment  
- Application Load Balancer → ALB (dormant)  
- Route 53 DNS → Failover routing policy  

### 5.3 Failover Procedures

**Phase 1: Assessment (0-30 minutes)**  
1. Confirm primary region failure  
   - Check AWS Service Health Dashboard  
   - Verify multiple service failures  
   - Test connectivity from different locations  
2. Assess data loss potential  
   - Check last successful backup  
   - Verify replication status  
3. Notify stakeholders via Slack (#incident-response)  
4. Decision to initiate failover (IT Lead or delegate)  

**Phase 2: Failover Execution (30 minutes - 2 hours)**  
```bash
# 1. Promote RDS read replica
aws rds promote-read-replica   --db-instance-identifier bms-dr-replica   --backup-retention-period 7

# 2. Update Route 53 to point to DR region
aws route53 change-resource-record-sets   --hosted-zone-id ZXXXXXXXXXXXXX   --change-batch file://failover-dns.json

# 3. Launch EC2/ECS instances from AMIs
aws ec2 run-instances   --image-id ami-dr-latest   --instance-type t3.large   --count 2   --subnet-id subnet-dr

# 4. Update application configuration
aws ssm put-parameter   --name "/bms/database/endpoint"   --value "bms-dr.eu-central-1.rds.amazonaws.com"   --overwrite
```

**Phase 3: Validation (2-4 hours)**  
- Test critical functions (login, data retrieval, file upload/download)  
- Monitor error rates in CloudWatch  
- Communicate with users  
- Document issues in incident log  

### 5.4 Failback Procedures
1. Ensure primary region is stable (minimum 24 hours)  
2. Sync data from DR to primary  
3. Schedule maintenance window  
4. Reverse failover process  
5. Validate primary operations  
6. Update documentation  

## 6. Communication Plan

### 6.1 Stakeholder Notification Matrix
| Severity  | Notification Time | Method         | Recipients                  |
|-----------|------------------|----------------|-----------------------------|
| Critical  | Immediate        | Phone + Slack  | Leadership, DevOps, Board   |
| High      | 15 minutes       | Slack + Email  | All staff, Key customers    |
| Medium    | 1 hour           | Email          | Affected users              |
| Low       | Next business day| Email          | All users                   |

### 6.2 Communication Templates
**Initial Notification**  
```
Subject: [SEVERITY] BMS Service Disruption Detected

We are currently experiencing a service disruption affecting [SERVICES].
- Detected at: [TIME]
- Impact: [DESCRIPTION]
- Current Status: Investigation in progress
- Next Update: Within [TIMEFRAME]

Please check [STATUS_PAGE_URL] for updates.
```

**Resolution Notification**  
```
Subject: [RESOLVED] BMS Service Restored

The service disruption has been resolved.
- Resolution Time: [TIME]
- Services Restored: [LIST]
- Root Cause: [BRIEF DESCRIPTION]
- Full report will be available within 48 hours

Thank you for your patience.
```

### 6.3 External Communication Channels
- Status Page: status.bmspro.io  
- Twitter: @BMSProStatus  
- Email: support@bmspro.io  

## 7. Roles and Responsibilities

### 7.1 Incident Response Team
| Role               | Primary       | Backup       | Responsibilities               |
|--------------------|--------------|--------------|--------------------------------|
| Incident Commander | Mariano Crimi | Diego Cuenya | Overall coordination, decisions|
| Technical Lead     | Diego Cuenya | Mariano Crimi | Technical recovery execution   |
| Communications     | Jean-Marcel Ribaut | Mariano Crimi | Stakeholder updates            |
| Operations         | Diego Cuenya | Mariano Crimi | System restoration             |
| Documentation      | Mariano Crimi | Diego Cuenya | Incident documentation         |

### 7.2 Contact Information
Maintain current contact list in:  
- Confluence (primary)  
- Printed copy (offline backup)  
- Personal devices (team members)  
- AWS Secrets Manager (emergency access)  

### 7.3 Escalation Path
1. Diego Cuenya (Technical Lead)
2. Mariano Crimi (IT Lead)
3. Jean-Marcel Ribaut (CEO) for critical incidents  

## 8. Testing and Maintenance

### 8.1 Testing Schedule
| Test Type           | Frequency   | Participants | Duration | Success Criteria             |
|---------------------|-------------|--------------|----------|-----------------------------|
| Backup verification | Monthly     | DevOps       | 1 hour   | Successful restore           |
| Tabletop exercise   | Quarterly   | IRT          | 2 hours  | All steps completed          |
| Partial failover    | Semi-annual | Technical team| 4 hours | Services accessible          |
| Full DR test        | Annual      | All IT staff | 8 hours  | Full operations in DR        |

### 8.2 Test Scenarios
1. Database corruption  
2. Region-wide AWS outage  
3. Ransomware attack  
4. Accidental data deletion  
5. Network connectivity loss  

### 8.3 Plan Maintenance
- Review after each incident  
- Annual comprehensive review  
- Update for infrastructure changes  
- Version control in Git  
- Change log maintained  

## 9. Key AWS Services Configuration

### 9.1 Essential Services Setup
```bash
# Enable AWS Backup
aws backup put-backup-vault-access-policy   --backup-vault-name bms-backup-vault   --policy file://backup-policy.json

# Configure RDS automated backups
aws rds modify-db-instance   --db-instance-identifier bms-prod   --backup-retention-period 7   --preferred-backup-window "03:00-04:00"

# Enable S3 cross-region replication
aws s3api put-bucket-replication   --bucket bms-data   --replication-configuration file://replication.json

# Set up CloudWatch alarms
aws cloudwatch put-metric-alarm   --alarm-name "RDS-HighCPU"   --alarm-description "Alert when RDS CPU exceeds 80%"   --metric-name CPUUtilization   --namespace AWS/RDS   --statistic Average   --period 300   --threshold 80   --comparison-operator GreaterThanThreshold
```

### 9.2 AWS Service Dependencies
| Service   | Purpose             | Criticality | Alternative          |
|-----------|--------------------|-------------|----------------------|
| EC2/ECS   | Application hosting| Critical    | Lambda (limited)     |
| RDS       | Database           | Critical    | DynamoDB backup      |
| S3        | File storage       | Critical    | EFS                  |
| CloudFront| CDN                | High        | Direct S3 access     |
| Route 53  | DNS                | Critical    | External DNS         |
| VPC       | Network isolation  | Critical    | None                 |

## 10. Recovery Targets and Metrics
- **RTO (Recovery Time Objective)**: 4 hours  
- **RPO (Recovery Point Objective)**: 1 hour  
- **MTTR (Mean Time To Recovery)**: Track and improve quarterly  
- **Recovery Success Rate**: >95%  
- **Backup Success Rate**: 100%  
- **Test Success Rate**: >90%  

### 10.2 Monitoring Dashboard
CloudWatch dashboard to track:  
- Backup job status  
- Replication lag metrics  
- Service health indicators  

## 11. Training and Awareness

### 11.1 Training Requirements
| Role          | Training Type       | Frequency  |
|---------------|--------------------|------------|
| All IT Staff  | BC/DR overview     | Annual     |
| Dev Team   | Technical recovery | Bi-annual  |


### 11.2 Documentation
Maintain in Confluence with accessible formats:

#### Runbooks for Each Scenario
- **Step-by-step procedures** for common failure scenarios (database down, server failure, network issues)
- **Command examples** with actual server names and IP addresses
- **Decision trees** for determining when to escalate vs. self-resolve
- **Screenshots** of key admin interfaces and error messages
- **Estimated time** for each recovery step

#### Technical Recovery Guides
- **System restart procedures** with proper shutdown/startup sequences
- **Database recovery steps** including backup restoration commands
- **Network troubleshooting** with common fixes and contact info for ISP
- **Application deployment** rollback procedures
- **Configuration file locations** and backup copies

#### Contact Lists
- **Primary and backup contacts** for each team member with multiple phone numbers
- **Vendor support contacts** (AWS support, ISP, hosting providers) with account numbers
- **Emergency services** and facility management contacts
- **Customer communication** templates and distribution lists
- **Management escalation** chain with decision authorities

#### Lessons Learned
- **Post-incident summaries** with what worked and what didn't
- **Process improvements** identified after each incident
- **Tool recommendations** based on actual experience
- **Training needs** identified from real incidents
- **Cost impact** of outages and recovery efforts

#### Test Results
- **DR test reports** with actual recovery times achieved
- **Backup verification** logs showing successful restores
- **Failure scenarios** that were tested and outcomes
- **Improvement actions** needed based on test results
- **Next test dates** and scenarios to focus on


## 13. Compliance and Audit


### 13.2 Audit Trail
- All DR activities logged in CloudTrail  
- Test results documented  
- Incident reports archived  
- Annual compliance review  

## 14. Implementation Checklist
- [ ] Configure AWS Backup for all critical resources  
- [ ] Set up RDS read replica in DR region  
- [ ] Enable S3 cross-region replication  
- [ ] Create AMIs for quick instance deployment  
- [ ] Configure Route 53 health checks and failover  
- [ ] Document all procedures in runbooks  
- [ ] Set up monitoring and alerting  
- [ ] Train team on DR procedures  
- [ ] Schedule first DR test  
- [ ] Create status page  
- [ ] Establish communication channels  
- [ ] Test backup restoration  
- [ ] Review and approve budget  

## 15. Policy Exceptions
### 15.1 Exception Handling
- Document any deviations from policy  
- Obtain approval from Policy Owner 
- Implement compensating controls  
- Review exceptions quarterly  


## References
- AWS Well-Architected Framework - Reliability Pillar  
- ISO 22301:2019 Business Continuity  
- NIST SP 800-34 Contingency Planning Guide  
- CSAIQ Lite BCR Controls  

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