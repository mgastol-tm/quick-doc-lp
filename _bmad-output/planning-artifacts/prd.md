---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary']
inputDocuments: ['src/app/page.tsx', 'src/app/layout.tsx', 'src/app/globals.css', 'package.json']
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 4
classification:
  projectType: web_app
  domain: healthcare
  complexity: high
  projectContext: brownfield
---

# Product Requirements Document - QuickDoc

**Author:** Maciek
**Date:** 2026-03-03

## Executive Summary

QuickDoc is an online telemedicine platform targeting the Polish market, delivering fast medical consultations across four high-demand specialties: internist (general practitioner), pediatrician, psychiatrist, and sick leave certificates (e-ZLA/L4). The platform solves a core pain point in Polish healthcare — long wait times through NFZ and the inconvenience of in-person visits for common medical needs. Patients can consult a licensed doctor within approximately 15 minutes, 24/7, entirely online via video consultation. The existing marketing landing page is live; the PRD covers building the full consultation platform including patient flow, doctor dashboard, video infrastructure, payment processing, and e-ZLA issuance.

### What Makes This Special

QuickDoc is not a single-purpose sick leave tool — it's a focused multi-specialty telemedicine platform covering the consultations Polish patients need most and wait longest for. The combination of immediate availability (24/7), breadth across four key specialties (internist, pediatrician, psychiatrist, L4), and a streamlined 15-minute consultation flow creates a compelling alternative to both NFZ queues and fragmented private clinic experiences. The psychiatry offering is particularly differentiated given extreme NFZ wait times for mental health services in Poland.

## Project Classification

- **Project Type:** Web application (Next.js full-stack)
- **Domain:** Healthcare / Telemedicine
- **Complexity:** High — regulated medical consultations, patient data protection (RODO/GDPR), e-ZLA certificate issuance to ZUS, payment processing, real-time video infrastructure
- **Project Context:** Brownfield — marketing landing page exists (Next.js 16, React 19, Tailwind CSS v4), building the core consultation platform
