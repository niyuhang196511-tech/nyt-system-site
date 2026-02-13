# -----------------------------
# 1. Install dependencies
# -----------------------------
# 使用官方 Node.js 22 版本的 Alpine 镜像作为基础镜像 并设置构建阶段
FROM node:22-alpine as deps

# 设置工作目录
WORKDIR /app

# 全局安装 pnpm 包管理器
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml 文件到工作目录
COPY package.json pnpm-lock.yaml* ./

# 安装项目依赖
RUN pnpm install

# -----------------------------
# 2. Build the application
# -----------------------------
FROM node:22-alpine as builder

WORKDIR /app

# 全局安装 pnpm 包管理器
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN pnpm build


# -----------------------------
# 3. Runner the application
# -----------------------------
FROM node:22-alpine as runner

WORKDIR /app

# 全局安装 pnpm 包管理器
RUN npm install -g pnpm

ENV NODE_ENV production

# Next.js 运行所需的用户
RUN addgroup -g 1001 nodejs \
    && adduser -u 1001 -G nodejs -s /bin/sh -D nextjs

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules


USER nextjs

EXPOSE 3000

CMD ["npm", "start"]

