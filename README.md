# Syncra Architecture & Documentation

Syncra is a self-contained, enterprise-grade project management application designed around multi-tenancy isolation (Workspaces). It enables teams or individuals to manage distinct organizational environments, pipelines, and execution tracks with high data integrity.

# Features

- Multi-Tenant Workspaces: Complete isolation of teams, projects, and users.
- Dual-Token Authentication Engine: Access and Refresh JWT implementations featuring secure cryptographic token rotation.
- Atomic Transactions: Automated backend provisioning routines ensuring consistent user and tenant initialization.

# Tech Stack

**Backend Architecture**

- Framework: NestJS (Node.js ecosystem)
- Database ORM: TypeORM
- Database System: PostgreSQL

# Getting Started

**Prerequisites**

- Node.js 22+
- Docker
- Docker Compose
- pnpm

**Development Setup**

1.  Clone and Install Dependencies

```bash
pnpm install
```

2.  Environment Configuration: <br>

```bash
cp .env.example .env
```

```bash
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

3.  Start PostgreSQL

```bash
docker compose up -d
```

4.  Run the Development Environment

```bash
 pnpm run start:dev
```
