# LightLogger

LightLogger is a lightweight log collection and monitoring platform built for startups, small teams, and internal systems that want visibility into logs without complex or expensive tools.

It focuses on simplicity, clarity, and low overhead.

## Why LightLogger

Most logging platforms are heavy and costly.
LightLogger keeps things simple and easy to run.

- Easy log ingestion
- Centralized log storage
- Fast search and filtering
- Clean web dashboard

## Current Features

### Log Ingestion

- Accept logs over HTTP
- JSON structured logs
- Tag logs by service, level, and environment

### Log Storage

- PostgreSQL based storage
- Indexed for fast queries
- Reliable and easy to manage

### Log Viewing

- Real time style log viewing via polling
- Filter by:

  - Service
  - Log level
  - Time range

- Search logs by text

### Dashboard

- Web based UI
- Minimal and clean interface
- Designed for quick understanding

## What LightLogger Does NOT Do (Yet)

- No alerts or notifications
- No anomaly detection
- No automatic security response
- No distributed tracing

This is intentional to keep the system lightweight.

## Tech Stack

### Backend

- Go
- Gin framework

### Database

- PostgreSQL

### Frontend

- React

### Deployment

- Docker
- Docker Compose

## Architecture Overview

1. Applications send logs to LightLogger API
2. Backend validates and stores logs
3. Logs are indexed and stored in PostgreSQL
4. Dashboard queries logs for display

## Example Use Cases

- Centralize logs from multiple services
- Debug production issues
- Monitor errors manually
- Observe system behavior over time

## Who Is It For

- Startups
- Small businesses
- Solo developers
- Internal tools
- Learning observability fundamentals

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Run Locally

```bash
git clone https://github.com/your-org/lightlogger
cd lightlogger
docker-compose up -d
```

## Roadmap

- Basic alerting rules
- Webhook based notifications
- Role based access control
- Log retention policies
- Saved searches

## Philosophy

LightLogger is built to be:

- Simple
- Honest
- Affordable
- Easy to self host

No unnecessary features.
No false promises.
