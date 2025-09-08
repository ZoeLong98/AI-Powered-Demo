# 使用官方 Node 18 镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制 server 的 package.json 和 package-lock.json（利用 Docker 缓存加速依赖安装）
COPY packages/server/package*.json ./

# 安装依赖
RUN npm install --legacy-peer-deps

# 复制 server 文件到容器
COPY packages/server ./

# 生成 Prisma Client
RUN npx prisma generate --schema ./prisma/schema.prisma

# 构建 TypeScript 项目
RUN npm run build

# 执行生产环境 migration（安全，不会生成新的 migration）
RUN npx prisma migrate deploy --schema ./prisma/schema.prisma

# 暴露端口
EXPOSE 3000

# 容器启动命令
CMD ["npm", "start"]
