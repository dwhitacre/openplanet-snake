FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS release
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY . .

EXPOSE 8080
USER bun

ENTRYPOINT ["bun", "run", "index.ts"]