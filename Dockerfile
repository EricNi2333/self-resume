# ─────────────────────────────────────────────
# Stage 1 · Builder
# ─────────────────────────────────────────────
FROM node:20-alpine3.20 AS builder

# Install pnpm
RUN npm install -g pnpm@10.14.0

WORKDIR /app

# Copy manifests first for layer cache
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# Install all deps (including devDeps needed for build)
RUN pnpm config set registry https://registry.npmmirror.com && \
    pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build Next.js (standalone output)
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ─────────────────────────────────────────────
# Stage 2 · Runner  (minimal production image)
# ─────────────────────────────────────────────
FROM node:20-alpine3.20 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only what Next.js standalone needs
COPY --from=builder /app/public            ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone  ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static      ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
