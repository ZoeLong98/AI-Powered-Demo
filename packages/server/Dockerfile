FROM node:18

# 1. 设置工作目录
WORKDIR /app

# 2. 先复制 package.json 和 package-lock.json（加速缓存）
COPY package*.json ./

# 3. 安装依赖
RUN npm install --legacy-peer-deps

# 4. 复制项目所有文件
COPY . .

# 5. 生成 Prisma client
RUN npx prisma generate --schema ./prisma/schema.prisma
