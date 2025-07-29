
# Portfolio-NextJS

A **fully-typed, mobile-first personal portfolio** built with Next.js 14, TypeScript and Tailwind CSS.  
It provides a clean starting point for showcasing projects, skills and contact information and can be deployed to any static or serverless host in minutes.

## ✨ Features

| Category            | Details |
|---------------------|---------|
| Framework & Build   | -  Next.js 14 (App Router)-  TypeScript strict mode-  ESLint & Prettier integrated |
| Styling             | -  Tailwind CSS 3 with JIT-  Dark-mode ready (class strategy) |
| Components          | -  Reusable `Navbar`, `Footer`, `ProjectCard`-  Responsive layout out-of-the-box |
| Content             | -  Projects fed from `data/projects.ts` (type-safe)-  SEO meta tags per page |
| Tooling             | -  Husky pre-commit hooks (lint & format)-  Absolute imports via `tsconfig.json` paths |
| Deployment          | -  Optimised for Vercel, Netlify & GitHub Pages-  Automatic image optimisation |

## 🏗️ Project Structure

```
.
├── components     # Reusable UI pieces
├── data           # Typed data sources (projects, skills…)
├── hooks          # Custom React hooks
├── pages          # Next.js pages (SSR & SSG)
├── public         # Static assets
├── styles         # Global Tailwind layer
├── types          # Shared TypeScript definitions
└── utils          # Utility helpers
```

## 🚀 Quick Start

1. **Clone the repo**

   ```
   git clone https://github.com/rahul-ojha-07/portfolio-nextjs.git
   cd portfolio-nextjs
   ```

2. **Install dependencies**
   ```
   pnpm i          # or yarn / npm install
   ```

3. **Run locally**

   ```
   pnpm dev        # http://localhost:3000
   ```

4. **Production build**

   ```
   pnpm build
   pnpm start
   ```

## 🔧 Configuration

| File                 | Purpose |
|----------------------|---------|
| `data/projects.ts`   | Add or edit portfolio entries. Follows the shape in `types/project.ts`. |
| `tailwind.config.js` | Customise your design system (colours, fonts, breakpoints). |
| `next.config.js`     | Enable experimental Next.js features or add redirects. |
| `.env.local`         | Place environment variables here (e.g. analytics keys). |

## 📦 Scripts

| Command            | Description |
|--------------------|-------------|
| `pnpm dev`         | Run in development with hot-reload |
| `pnpm build`       | Create an optimised production build |
| `pnpm start`       | Serve the production build |
| `pnpm lint`        | Run ESLint |
| `pnpm format`      | Run Prettier over all files |
| `pnpm type-check`  | Perform TypeScript strict checking |

## ☁️ Deployment

### Vercel, Netlify & Static Hosts

The repository is **zero-config on Vercel**:

```
vercel deploy
```

Netlify, Cloudflare Pages or any Docker/Kubernetes target work the same—just point the build command to `pnpm build` and the output folder to `.next`.

### 🐳 Docker Deployment

If you want to deploy using Docker, follow these steps:

#### 1. Create a `Dockerfile` in Your Project Root

```
# ---- Build stage ----
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies based on lockfile (for best reproducibility)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy all necessary files for build
COPY . .

# Build the Next.js app (production build)
RUN npm run build

# ---- Production stage ----
FROM node:18-alpine AS runner

WORKDIR /app

# Only copy necessary files for running the production app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/data ./data
# Add any other static/assets folders as needed (fonts, locales, etc.)

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
```

*If you use `npm` or `yarn` instead of `pnpm`, adjust commands accordingly.*

#### 2. Build and Run Your Docker Image

```
# Build the Docker image
docker build -t portfolio-nextjs .

# Run as a container
docker run -p 3000:3000 portfolio-nextjs
```

You can then access your portfolio at [http://localhost:3000](http://localhost:3000).

#### 3. (Optional) Multi-Platform / Production Considerations

- Use `.env.production` or Docker secrets to manage environment variables.
- When deploying on cloud providers (AWS ECS, DigitalOcean, Azure, etc.), push your image to a container registry and configure deployment accordingly.

#### 4. Example `.dockerignore`

Add this file to speed up Docker builds:

```
node_modules
.next
.git
.DS_Store
.env*
npm-debug.log
```

#### 5. Useful Docker Commands

| Command                                  | Action                         |
|------------------------------------------|--------------------------------|
| `docker build -t portfolio-nextjs .`     | Build Docker image             |
| `docker run -p 3000:3000 portfolio-nextjs`| Run container locally          |
| `docker images`                          | List images                   |
| `docker ps -a`                           | List running/stopped containers |
| `docker stop `             | Stop a running container      |

## 🤝 Contributing

1. Fork the project & create your branch.
2. Commit your changes following conventional commits.
3. Open a Pull Request.

All commits are linted & formatted automatically thanks to Husky hooks.

## 📄 License

MIT — free to use and modify, no warranty implied.

## 💬 Acknowledgements

- [Next.js](https://nextjs.org/) – React framework for production.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS.
- Icons by [React-Icons](https://react-icons.github.io/react-icons/).

Enjoy the template! Give the repo a ⭐ if it helped you build your portfolio faster.
