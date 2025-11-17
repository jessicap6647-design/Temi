# GitHub Setup Guide

This guide will help you push your code to GitHub and prepare it for Vercel deployment.

## Step 1: Initialize Git Repository

If you haven't already initialized a git repository, run:

```bash
git init
```

## Step 2: Create a GitHub Repository

1. Go to https://github.com/new
2. Enter a repository name (e.g., "portfolio-website")
3. Choose "Public" or "Private" visibility
4. Do NOT initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 3: Configure Git

Set your git user name and email (if not already set):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 4: Add and Commit Your Code

```bash
# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: Portfolio website ready for deployment"
```

## Step 5: Connect to GitHub

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename the branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 6: Verify

1. Go to your GitHub repository in your browser
2. You should see all your project files
3. Verify that sensitive files (node_modules, .env, etc.) are NOT included

## What Gets Pushed to GitHub?

The `.gitignore` file is configured to exclude:
- `node_modules/` - Dependencies (will be installed during build)
- `dist/` - Build output (generated fresh on deployment)
- `.env` files - Environment variables (configured separately on Vercel)
- Editor-specific files (`.vscode/`, `.idea/`, etc.)
- Log files
- Temporary files

## Common Issues

### Authentication Error

If you get an authentication error when pushing:

**Option 1: Use Personal Access Token (Recommended)**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use the token as your password when pushing

**Option 2: Use SSH**
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your.email@example.com"`
2. Add to GitHub: Settings → SSH and GPG keys → New SSH key
3. Change remote URL: `git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git`

### Files Already Tracked

If you've accidentally committed files that should be ignored:

```bash
# Remove from git but keep locally
git rm --cached FILE_NAME

# Commit the change
git commit -m "Remove ignored files"
git push
```

## Next Steps

Once your code is on GitHub, proceed to `DEPLOYMENT.md` for Vercel deployment instructions.
