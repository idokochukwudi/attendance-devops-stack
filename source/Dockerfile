# -------- Builder Stage --------
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    # ✅ Install build dependencies
    RUN apk add --no-cache python3 make g++ postgresql-client openssl openssl-dev
    
    # ✅ Copy only what you need to install first
    COPY package*.json ./
    COPY prisma ./prisma/
    RUN npm install
    RUN npm install -D @types/bcryptjs @types/pg typescript @types/node tailwindcss-animate postcss autoprefixer
    
    # ✅ Copy configuration files
    COPY postcss.config.js ./
    COPY tailwind.config.ts ./
    COPY tsconfig.json ./
    
    # ✅ Copy the full app source (after installing dependencies)
    COPY . .
    
    RUN npx prisma generate
    RUN npm run build
    
    # -------- Runner Stage --------
    FROM node:18-alpine AS runner
    
    WORKDIR /app
    
    RUN apk add --no-cache postgresql-client openssl openssl-dev
    
    # ✅ Copy required build output and runtime files
    COPY --from=builder /app/next.config.js ./
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/prisma ./prisma
    COPY --from=builder /app/scripts ./scripts
    COPY --from=builder /app/tsconfig.json ./
    COPY --from=builder /app/postcss.config.js ./
    COPY --from=builder /app/tailwind.config.ts ./
    COPY --from=builder /app/app ./app
    COPY --from=builder /app/components ./components
    COPY --from=builder /app/lib ./lib
    COPY --from=builder /app/types ./types
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    
    COPY docker-entrypoint.sh /usr/local/bin/
    RUN chmod +x /usr/local/bin/docker-entrypoint.sh
    
    ENTRYPOINT ["docker-entrypoint.sh"]
    