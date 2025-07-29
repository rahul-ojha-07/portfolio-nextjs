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

