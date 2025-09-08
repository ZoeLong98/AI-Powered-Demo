# 使用官方 Node 18 镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 复制 Prisma schema 文件
COPY prisma ./prisma

# 安装依赖时跳过 postinstall 脚本
RUN npm install --ignore-scripts --legacy-peer-deps

# 手动生成 Prisma Client
RUN npx prisma generate --schema ./prisma/schema.prisma

# 复制其余源代码
COPY . ./

# 构建 TypeScript 项目
RUN npm run build

# 执行生产环境 migration（如果需要）
# RUN npx prisma migrate deploy --schema ./prisma/schema.prisma

# 暴露端口
EXPOSE 3000

# 容器启动命令
CMD ["npm", "start"]
