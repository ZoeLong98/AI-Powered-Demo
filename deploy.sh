#!/bin/bash

echo "🚀 Starting deployment script..."

# Check if necessary tools are installed
command -v bun >/dev/null 2>&1 || { echo "❌ Bun needs to be installed"; exit 1; }

echo "📦 Installing dependencies..."
bun install

echo "🏗️ Building frontend..."
cd packages/client
npm run build
cd ../..

echo "🗄️ Preparing database..."
cd packages/server
echo "Please ensure the following environment variables are set:"
echo "- DATABASE_URL"
echo "- OPENAI_API_KEY"
echo ""

read -p "Continue with database migration? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    bunx prisma generate
    bunx prisma migrate deploy
    echo "✅ Database migration completed"
fi

cd ../..

echo "🎉 Build completed!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy packages/server to Railway/Render"
echo "2. Deploy packages/client/dist to Vercel/Netlify"
echo "3. Set frontend environment variable VITE_API_URL"
