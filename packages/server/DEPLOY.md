# 服务器部署指南

## 问题修复总结

我们已经解决了以下部署问题：

1. **TypeScript 配置问题**: 修复了 `tsconfig.json` 中的 `noEmit: true` 设置，现在可以正确编译生成 JavaScript 文件
2. **模块导入问题**: 将所有 `.ts` 扩展名的导入改为 `.js`，以适应编译后的环境
3. **Docker 构建顺序问题**: 在安装依赖前复制 Prisma schema 文件，避免 `prisma generate` 找不到 schema 的错误

## 部署选项

### 选项 1: Docker 部署 (推荐)

确保系统已安装 Docker，然后运行：

```bash
# 在项目根目录下构建镜像
docker build -f packages/server/Dockerfile -t my-app-server .

# 运行容器
docker run -p 3000:3000 -e DATABASE_URL="your_database_url" my-app-server
```

### 选项 2: 直接部署到服务器

```bash
# 1. 在服务器上克隆代码
git clone <your-repo-url>
cd my-app/packages/server

# 2. 安装依赖
npm install --legacy-peer-deps

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，设置 DATABASE_URL 等环境变量

# 4. 生成 Prisma Client
npx prisma generate --schema ./prisma/schema.prisma

# 5. 运行数据库迁移
npx prisma migrate deploy --schema ./prisma/schema.prisma

# 6. 构建项目
npm run build

# 7. 启动服务器
npm start
```

### 选项 3: 使用 PM2 进行生产部署

```bash
# 安装 PM2
npm install -g pm2

# 使用 PM2 启动应用
pm2 start dist/index.js --name "my-app-server"

# 设置开机自启
pm2 startup
pm2 save
```

## 环境变量配置

创建 `.env` 文件并设置以下变量：

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
OPENAI_API_KEY="your_openai_api_key"
CLIENT_URL="https://your-frontend-domain.com"
PORT=3000
```

## 验证部署

部署完成后，访问以下端点验证服务器是否正常运行：

- `http://your-server:3000/` - 应该返回 "Hello, World!"
- `http://your-server:3000/api/hello` - 应该返回 JSON 响应

## 故障排除

1. **Prisma 相关错误**: 确保 `DATABASE_URL` 配置正确，数据库可访问
2. **模块找不到错误**: 确保所有依赖都已正确安装
3. **端口被占用**: 检查端口 3000 是否被其他程序使用

## 生产环境建议

1. 使用反向代理（如 Nginx）
2. 配置 HTTPS
3. 设置日志记录
4. 配置监控和健康检查
5. 使用环境管理工具（如 Docker Compose）
