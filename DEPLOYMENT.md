# Deployment Guide

This is a full-stack application with separated deployment using Bun + Express + React + Prisma + MySQL.

## Project Structure

- `packages/server`: Node.js/Express backend service
- `packages/client`: React frontend application

## Deployment Solutions

### 🚀 Option 1: Separated Deployment (Recommended)

#### Backend Deployment to Railway

1. **Prepare Database**
   - Create a MySQL database on Railway
   - Get the database connection string

2. **Deploy Backend**

   ```bash
   # 1. Login to Railway
   npm install -g @railway/cli
   railway login

   # 2. Initialize project in packages/server directory
   cd packages/server
   railway init

   # 3. Set environment variables
   railway variables set DATABASE_URL="your-mysql-connection-string"
   railway variables set OPENAI_API_KEY="your-openai-key"
   railway variables set NODE_ENV="production"

   # 4. Deploy
   railway up
   ```

3. **Run Database Migration**
   ```bash
   railway run bunx prisma migrate deploy
   railway run bunx prisma db seed # If you have seed data
   ```

#### Frontend Deployment to Vercel

1. **Set Environment Variables**
   - Add in Vercel project settings:
   - `VITE_API_URL`: Backend domain provided by Railway (e.g.: `https://your-app.railway.app`)

2. **Deploy Frontend**

   ```bash
   # Method 1: Via Vercel CLI
   npm install -g vercel
   vercel --cwd packages/client

   # Method 2: Via Git connection to Vercel
   # Connect GitHub repository in Vercel console, select packages/client as root directory
   ```

### 🚀 Option 2: Dockerized Deployment

Create Docker configurations:

```dockerfile
# Dockerfile.server
FROM oven/bun:1.1.21 as base
WORKDIR /app

COPY packages/server/package.json .
COPY packages/server/bun.lockb .
RUN bun install

COPY packages/server/ .
RUN bunx prisma generate

EXPOSE 3000
CMD ["bun", "start"]
```

```dockerfile
# Dockerfile.client
FROM node:20-alpine as build
WORKDIR /app

COPY packages/client/package.json .
RUN npm install

COPY packages/client/ .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 🚀 Option 3: One-Click Deployment to Render

1. **Backend Deployment**
   - Connect GitHub repository
   - Select `packages/server` as root directory
   - Set build command: `bun install && bunx prisma generate && bunx prisma migrate deploy`
   - Set start command: `bun start`

2. **Frontend Deployment**
   - Connect the same GitHub repository
   - Select `packages/client` as root directory
   - Set build command: `npm install && npm run build`

## Environment Variables Configuration

### Backend Environment Variables

```env
DATABASE_URL="mysql://username:password@host:port/database"
OPENAI_API_KEY="your-openai-api-key"
PORT=3000
NODE_ENV=production
```

### Frontend Environment Variables

```env
VITE_API_URL="https://your-backend-domain.com"
```

## Local Production Build Testing

```bash
# Build frontend
cd packages/client
npm run build
npm run preview

# Build backend
cd packages/server
bun run build
bun start
```

## Database Related

### Initialize Database

```bash
bunx prisma migrate deploy
bunx prisma db seed
```

### Recommended Database Providers

- **Development/Testing**: PlanetScale, Railway, Supabase
- **Production**: AWS RDS, Google Cloud SQL, Railway

## Monitoring and Logging

- Use Railway/Render built-in logging systems
- Consider integrating Sentry for error tracking
- Use Uptime Robot for service monitoring

## Important Notes

1. Ensure all sensitive information is configured via environment variables
2. Frontend API calls are configured to support production environment
3. Database migration needs to be executed manually after deployment
4. Ensure CORS settings are correct to support cross-origin requests

## Cost Estimation

- **Railway**: Backend + Database approximately $5-20/month
- **Vercel**: Frontend free (personal projects)
- **Total**: Approximately $5-20/month
