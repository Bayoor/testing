# Vercel Deployment Guide

## Prerequisites
1. GitHub account
2. Vercel account (free at [vercel.com](https://vercel.com))
3. MongoDB Atlas database

## Step-by-Step Deployment

### 1. Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit for deployment"

# Create repository on GitHub and push
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"

### 3. Configure Environment Variables
In your Vercel dashboard, go to:
- Project Settings → Environment Variables
- Add these variables:

```
MONGO_URI = mongodb+srv://samueloguobi:LR8zUaDG4a7qfG1T@cluster0.ibpm2yk.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV = production
PORT = 3090
```

### 4. Redeploy
After adding environment variables:
- Go to Deployments tab
- Click "Redeploy" on the latest deployment

## How It Works

### Frontend
- Built as static files in `frontend/dist/`
- Served directly by Vercel's CDN
- All routes (except `/api/*`) go to frontend

### Backend
- Runs as serverless functions
- All `/api/*` routes handled by `backend/server.js`
- Auto-scales based on demand

### Database
- MongoDB Atlas (cloud database)
- Connection string stored in environment variables
- Automatically connects when backend functions run

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (>=18)

### API Routes Don't Work
- Ensure all API routes start with `/api/`
- Check environment variables are set
- Verify MongoDB connection string

### Frontend Not Loading
- Check that `frontend/dist/` contains built files
- Verify build command completed successfully

## Local Testing Commands
```bash
# Test frontend build
cd frontend && npm run build

# Test backend
cd backend && npm run dev

# Test production backend
cd backend && npm run start
```

## Project Structure (Final)
```
/
├── backend/          # Express.js serverless functions
├── frontend/         # React app (builds to static files)
├── package.json      # Root build configuration
├── vercel.json       # Vercel deployment config
├── .vercelignore     # Files to exclude from deployment
└── DEPLOYMENT.md     # This guide
```

## Live URLs After Deployment
- **Frontend**: `https://your-app-name.vercel.app`
- **API**: `https://your-app-name.vercel.app/api/products`

## Common Issues
1. **MongoDB Connection**: Ensure your IP is whitelisted in MongoDB Atlas
2. **CORS**: Already configured in backend for production
3. **Environment Variables**: Must be set in Vercel dashboard, not in .env files