# Dify x Oceanbase Integration

## Description

This guide provides instructions on how to integrate Dify with Oceanbase, a distributed relational database management system. By following these steps, you can set up a seamless connection between Dify and Oceanbase for efficient data management and retrieval.

## Prerequisites
Before you begin, ensure you have the following installed:
- Python version ≥ 3.12
- Dify CLI
- Homebrew (for Mac users)

## Part 1: Dify Setup

### Cloud Version

Open cloud.dify.ai, create an account and login.

### Self-Hosted

Copy things from this repo and run:

```bash
git clone https://github.com/langgenius/dify.git
cd dify
cd docker
git checkout mysql-adapt
cp 这个仓库的.env.example .env
cp 这个仓库的docker-compose.yml docker-compose.yml
docker compose up --build -d
```

## Part 2: Oceanbase Setup

[Seekdb](https://github.com/oceanbase/seekdb) is the lightweight, embedded version of OceanBase Database - a powerful AI search database designed for the AI applications. It combines enterprise-grade database capabilities with cutting-edge **AI search ** features, such as Vector search, fulltext search, Json.

```bash
docker run -d \
  --name seekdb \
  -p 2881:2881 \
  -v ./data:/var/lib/oceanbase/store \
  oceanbase/seekdb:latest
```
