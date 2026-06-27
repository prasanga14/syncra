# Architectural Decision Record

## Context & Problem Statement

When building a multi-tenant full-stack platform like Syncra, local development environments must match production behaviors as closely as possible. Manual installations of system-level databases (like native PostgreSQL installers) introduce configuration drift across different developer machines (e.g., Ubuntu configurations vs. macOS/Windows native background services). We need a repeatable, isolated, and zero-install database strategy for local development.


## Decisions & Detailed Rationales

### 1. Why Docker?

Installing databases natively leaves configuration footprints, modifies system startup files, and makes switching versions highly complex.

- **The Resolution:** We encapsulate the entire database dependency within an isolated container layer.
- **Why it matters:** Spinning up, tearing down, or upgrading the database engine takes a single CLI command without touching native host dependencies. It ensures absolute predictability across developer systems.

### 2. Why PostgreSQL in Docker?

Syncra relies heavily on structured relation integrity, strong constraints, and ACID transactions to ensure secure workspace provisioning. Running PostgreSQL via Docker gives us this performance instantly.

- **The Resolution:** We deploy the official `postgres:17.6` base image via our local container layout.
- **Why it matters:** It provides an ultra-lightweight, production-grade SQL engine that isolates database memory footprints directly inside the runtime container boundary.

### 3. Why Named Volumes?

Containers are completely transient by design; dropping or recreating a container destroys all data inside its writeable layer.

- **The Resolution:** We utilize a managed, explicit named volume (e.g., `syncra_pg_data`) mapped to the interior database state route (`/var/lib/postgresql/data`).
- **Why it matters:** Named volumes decouple data lifecycles from container lifecycles. You can stop, rebuild, or destroy your Docker containers, and your mock users, workspace rows, and boards will remain securely intact upon reboot.

### 4. Why Host Port 5433?

The default port for PostgreSQL is universally assigned to `5432`.

- **The Resolution:** We map the interior container port `5432` to the host machine's port `5433` (`5433:5432`).
- **Why it matters:** Developers frequently run native instances of PostgreSQL locally for school projects or auxiliary services. Binding the Docker container to host port `5433` guarantees zero binding collisions with local configurations while keeping the internal container architecture standardized.

### 5. Why Generic `DB_*` Variables?

Hardcoding infrastructure details directly inside connection engines limits system portability.

- **The Resolution:** We parameterize connection setups using clean environment variables (e.g., `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_PORT`, `DB_NAME`).
- **Why it matters:** Using standardized variables makes the data pipeline agnostic. The code safely processes backend credentials locally, while allowing orchestration tools, CI/CD runners, and cloud deployment providers (like Render) to cleanly inject live production credentials seamlessly.

---

## Consequences

### Positive Impacts

- **Instant Onboarding:** New setups require just a single command (`docker compose up -d`) to establish a perfectly configured database layout.
- **State Separation:** Host systems are kept completely clean of conflicting runtime services.
- **Flexible Configurations:** Safe port mappings eliminate configuration collision risks on developer workstations.

### Negative / Operational Impacts

- **System Overhead:** Requires a minor runtime memory footprint allocation to run the Docker daemon.
- **Tooling Changes:** Interacting with the database via external GUIs or local terminals requires specifying host port `5433` explicitly instead of the default port configuration.
