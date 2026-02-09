# 📌 Lots for Sale – Serverless Real Estate Platform (AWS)

A fully serverless real estate lead-generation platform built on AWS to showcase residential lots and automatically capture, store, and notify sales inquiries.

This project demonstrates real-world cloud architecture, security controls, and automation using modern AWS services.

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

Frontend (S3 + CloudFront)
↓
API Gateway (HTTP API)
↓
AWS Lambda (Validation & Logic)
↓
DynamoDB (Lead Storage)
↓
Amazon SES (Email Notifications)

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
- S3 Static Hosting
- CloudFront CDN
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

## 📂 Project Structure

/
├── index.html
├── assets/
│ ├── css/
│ ├── img/
│ ├── js/
│ └── data/
└── backend/
├── template.yaml
└── src/

---

##  Deployment

### Backend

```bash
cd backend
sam build
sam deploy --guided

### Frontend

aws s3 sync . s3://YOUR_BUCKET_NAME

---

## Author

Andres Vera
Cloud & Security Engineer
AWS Certified Solutions Architect & Developer

