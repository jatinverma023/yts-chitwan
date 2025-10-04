# Deployment to Vercel - Step by Step

## 1. Set up Cloud Database (Neon PostgreSQL)

- [ ] Go to https://neon.tech and create a free account
- [ ] Create a new project
- [ ] Get the connection string (DATABASE_URL)

## 2. Install Vercel CLI

- [x] Run: npm install -g vercel
- [ ] Login: vercel login

## 3. Deploy Backend First

- [ ] Navigate to backend folder: cd backend
- [ ] Deploy: vercel --prod
- [ ] Note the backend URL (e.g., https://your-backend.vercel.app)
- [ ] Set environment variables in Vercel dashboard:
  - DATABASE_URL: your Neon connection string
  - NODE_ENV: production

## 4. Update Frontend API URL

- [ ] Set VITE_API_URL to backend URL (without /api)
- [ ] In Vercel dashboard for frontend, set VITE_API_URL=https://your-backend.vercel.app

## 5. Deploy Frontend

- [ ] Navigate to root folder: cd ..
- [ ] Deploy: vercel --prod
- [ ] Set environment variable in Vercel dashboard:
  - VITE_API_URL: https://your-backend.vercel.app

## 6. Test Deployment

- [ ] Check frontend loads
- [ ] Test API calls (events, contacts)
- [ ] Verify database operations work

## Code Changes Made

- [x] Backend CORS updated to allow Vercel frontend
- [x] Database config ready for Neon
- [x] API service uses VITE_API_URL
