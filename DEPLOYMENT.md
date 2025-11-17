# Deploying to Vercel

This project is configured for easy deployment to Vercel using a serverless architecture.

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

**Important Note**: In-memory storage resets with each serverless function invocation. For production use, it's recommended to set up a PostgreSQL database.

### 4. Deploy

Click "Deploy" and Vercel will:
- Build your frontend using Vite
- Deploy your static files from `dist/public`
- Automatically detect and deploy API routes from `/api` directory as serverless functions
- Provide you with a live URL

## Project Structure

- `/client` - React frontend built with Vite
- `/server` - Express backend and API routes (shared with Vercel serverless function)
- `/api` - Vercel serverless function entry point
- `/shared` - Shared TypeScript types and schemas
- `vercel.json` - Vercel deployment configuration

## How It Works

- **Frontend**: Built as static files using Vite and served from `dist/public`
- **API Routes**: Vercel automatically detects files in `/api` directory and deploys them as serverless functions
  - The `/api/index.ts` file exports an Express app handler that Vercel wraps as a serverless function
  - All routes defined in `/server/routes.ts` are available at `/api/*`
- **Storage**: Uses in-memory storage by default (data resets on each invocation), can be configured to use PostgreSQL with `DATABASE_URL` environment variable

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

## Important Notes About Serverless Architecture

### Data Persistence
- **In-Memory Storage**: By default, the app uses in-memory storage which resets on every serverless function cold start
- **For Production**: Configure a PostgreSQL database via `DATABASE_URL` environment variable to persist data across requests
- **Cold Starts**: Serverless functions may experience cold starts (1-2 second delay) after periods of inactivity

### Limitations
- **Stateless**: Each API request runs in an isolated serverless function instance
- **Execution Time**: Vercel serverless functions have a maximum execution time (10 seconds on free plan, 60 seconds on paid plans)
- **Memory**: Limited to available serverless function memory (configurable in Vercel settings)

## Troubleshooting

### Build Errors
- Check Vercel build logs for detailed error messages
- Ensure all dependencies are in `package.json`
- The build command only builds the frontend (`vite build`), not the Express server

### API Not Working
- Verify `/api` routes are accessible at `https://your-url.vercel.app/api/niches`
- Check serverless function logs in Vercel dashboard under "Functions" tab
- Ensure environment variables are set correctly if using a database
- Remember: In-memory storage resets between requests without a DATABASE_URL

### Frontend Not Loading
- Verify build command completes successfully
- Check that `dist/public` directory is created during build
- Ensure `outputDirectory` in `vercel.json` is correct

### CORS Issues
- If accessing the API from a different domain, ensure CORS is properly configured
- Add CORS middleware to `/server/routes.ts` if needed
