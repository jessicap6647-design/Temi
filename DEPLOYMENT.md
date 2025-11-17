# Deploying to Vercel

This project is configured for easy deployment to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (sign up at https://vercel.com)
3. Your project pushed to a GitHub repository

## Deployment Steps

### 1. Push to GitHub

First, initialize a git repository (if not already done) and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will automatically detect the configuration from `vercel.json`

### 3. Configure Environment Variables (Optional)

If you want to use a PostgreSQL database instead of in-memory storage:

1. In your Vercel project settings, go to "Environment Variables"
2. Add `DATABASE_URL` with your PostgreSQL connection string
3. Redeploy your project

### 4. Deploy

Click "Deploy" and Vercel will:
- Build your frontend (`npm run build`)
- Deploy your static files from `dist/public`
- Deploy your API routes as serverless functions
- Provide you with a live URL

## Project Structure

- `/client` - React frontend built with Vite
- `/server` - Express backend and API routes
- `/api` - Vercel serverless function entry point
- `/shared` - Shared TypeScript types and schemas
- `vercel.json` - Vercel deployment configuration

## How It Works

- **Frontend**: Built as static files and served from `dist/public`
- **API Routes**: Converted to Vercel serverless functions via `/api/index.ts`
- **Storage**: Uses in-memory storage by default, can be configured to use PostgreSQL with `DATABASE_URL`

## Local Development

To run locally:

```bash
npm install
npm run dev
```

Visit `http://localhost:5000`

## Production URL

After deployment, Vercel will provide you with:
- A production URL: `https://your-project-name.vercel.app`
- Preview URLs for each git branch
- Automatic deployments on every push to main

## Custom Domain

To add a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting

### Build Errors
- Check Vercel build logs for detailed error messages
- Ensure all dependencies are in `package.json`
- Verify TypeScript compiles locally: `npm run check`

### API Not Working
- Verify `/api` routes are accessible at `https://your-url.vercel.app/api/niches`
- Check serverless function logs in Vercel dashboard
- Ensure environment variables are set if using database

### Frontend Not Loading
- Verify build command completes successfully
- Check that `dist/public` directory is created during build
- Ensure `outputDirectory` in `vercel.json` is correct
