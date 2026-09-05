FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma.config.ts tsconfig*.json nest-cli.json ./
COPY prisma ./prisma
COPY src ./src

ENV DATABASE_URL=postgresql://useryou:postgres@db:5432/profile-test?schema=public
RUN npx prisma generate
RUN npm run build

FROM builder AS development

RUN apk add --no-cache openssl

CMD ["npm", "run", "start:docker:dev"]

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache openssl

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3000

CMD ["npm", "run", "start:docker"]
