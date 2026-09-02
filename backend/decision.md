# Architectural Decisions

This document records the major architectural decisions made during the development of the backend.

## 1. Database Choice: SQLite with Prisma
- **Decision:** Use SQLite with Prisma ORM.
- **Reason:** The user requested a Prisma SQL database, and is new to SQL. SQLite is file-based and requires zero configuration or standalone database server installation. It is perfect for a content provider backend with low concurrency (mostly reads, with edits only by admin). Prisma provides a fantastic, type-safe API that makes interacting with the SQL database extremely easy.

## 2. API Design: RESTful API over Express
- **Decision:** Use Express.js to build a RESTful API.
- **Reason:** The user gave the choice between GraphQL and RESTful. For a beginner to SQL and backend development, RESTful APIs offer a more straightforward, conventional learning curve. Express is the industry standard for Node.js REST APIs and provides simple middleware integration (like `multer` for uploads).

## 3. Image Storage: Local File System with Sharp Compression
- **Decision:** Store images locally in a `public/uploads` folder and compress them using the `sharp` library before saving.
- **Reason:** Storing images locally avoids the complexity of setting up external cloud storage (like AWS S3) for a beginner. Using `sharp` allows us to resize images and convert them to optimized formats (like WebP), which significantly improves frontend loading times and saves disk space.

## 4. Authentication: JWT (JSON Web Tokens)
- **Decision:** Secure admin endpoints using JWT.
- **Reason:** The backend content should be editable only by an admin. JWT is a stateless, secure, and widely adopted way to handle authentication in REST APIs without needing to manage sessions in the database.

## 5. Monorepo Structure
- **Decision:** Split the repository into `/frontend` and `/backend` folders.
- **Reason:** Keeps the frontend UI logic strictly separated from the backend API logic. This prevents dependency conflicts and makes the repository easier to navigate and maintain.
