# Task Manager

A simple task manager app (Node.js/Express backend + vanilla JS frontend), built as a demo project for a Jenkins CI/CD pipeline.

## Run locally

```bash
npm install
npm start
```

Visit `http://localhost:3000`.

## Run tests

```bash
npm test
```

## Build & run with Docker

```bash
docker build -t task-manager .
docker run -p 3000:3000 task-manager
```

## CI/CD Pipeline

This repo includes a `Jenkinsfile` that defines a declarative pipeline with these stages:

1. **Checkout** — pulls the latest code from GitHub
2. **Install Dependencies** — `npm install`
3. **Run Tests** — `npm test` (Jest + Supertest, 7 tests covering the API)
4. **Build Docker Image** — packages the app into a container
5. **Deploy (Demo)** — runs the container so the app is reachable

Each stage must succeed before the next runs — if tests fail, the build stops there and never reaches deploy. That's the core idea of CI/CD: catch problems early, automatically, before they reach anything real.
