# 📌 Lots for Sale – Serverless Real Estate Platform (AWS)

A fully serverless real estate lead-generation platform built on AWS to showcase residential lots and automatically capture, store, and notify sales inquiries.

This project demonstrates real-world cloud architecture, security controls, and automation using modern AWS services.

---

## 🌐 Live Website

👉 https://dlqlykqv4u2de.cloudfront.net/

---

## 📸 Application Preview

![Homepage Screenshot](assets/readme/homepage.jpg)

---

## Project Overview

The platform allows potential buyers to:

- Browse available land lots with photos and pricing  
- View detailed information for each lot  
- Submit interest forms securely  
- Automatically notify the owner via email  
- Store leads in a cloud database for future follow-up  

The system is designed to be low-cost, scalable, and highly available without managing servers.

---

## Architecture

CloudFront (CDN + HTTPS + Edge Caching)  
↓  
Amazon S3 (Static Frontend Hosting – Private Bucket via OAC)  
↓  
API Gateway (HTTP API – Throttling & Rate Limiting)  
↓  
AWS Lambda (Input Validation & Business Logic)  
↓  
DynamoDB (On-Demand Lead Storage)  
↓  
Amazon SES (Automated Email Notification) 

---

Additional features:
- Throttling and rate limiting
- Input validation
- Anti-bot protection (honeypot)
- CloudWatch logging and monitoring

---

## Technology Stack

### Frontend
- HTML5 / CSS3 / JavaScript
- Responsive grid layout
- Modal-based contact form

### Backend
- AWS Lambda (Python)
- API Gateway (HTTP API)
- DynamoDB (On-Demand)
- Amazon SES

### Infrastructure
- AWS SAM (Infrastructure as Code)
- Amazon S3 (Private Bucket with OAC)
- Amazon CloudFront (CDN + HTTPS)
- CloudWatch Logs

---

## Core Features

✔ Serverless backend (no servers to manage)  
✔ Secure form processing  
✔ Automated email alerts  
✔ Persistent lead storage  
✔ Scalable architecture  
✔ Cost-efficient design  

---

## Security Considerations

- Input validation at Lambda level  
- API throttling via API Gateway  
- Anti-spam honeypot field  
- No hardcoded secrets  
- IAM least-privilege policies  
- HTTPS via CloudFront  

---

## Cost Optimization Strategy

- Serverless architecture (no EC2)
- DynamoDB On-Demand (pay per request)
- CloudFront caching reduces origin load
- No always-on infrastructure
- Low monthly operational cost (estimated under $5 for low traffic)

---

## Project Structure

```
/
├── index.html
├── assets/
│   ├── css/
│   ├── img/
│   ├── js/
│   └── data/
└── backend/
    ├── template.yaml
    └── src/
```
---

## Deployment 
 
Backend  
```
cd backend
sam build
sam deploy --guided  
```
Frontend  
```
# Sync static files to S3
aws s3 sync . s3://lots-for-sale-andres \
  --exclude "backend/*" \
  --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E3OIO4GSNFMOOY \
  --paths "/*"

```
---

## Author  

Andres Vera  
Cloud & Cybersecurity Engineer  
AWS Certified Solutions Architect | AWS Developer Associate | CompTIA Security+