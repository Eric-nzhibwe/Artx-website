# Step-by-Step Deployment Guide for Windows

## Prerequisites

### 1. Install Git (if not already installed)
1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. Use default settings
4. Verify installation:
   ```cmd
   git --version
   ```

### 2. Create GitHub Account
1. Go to https://github.com
2. Sign up for free account
3. Verify your email

---

## STEP 1: Prepare Your Project

### Open Command Prompt in Your Project Folder
1. Open File Explorer
2. Navigate to your project folder (where `index.html` is)
3. Click in the address bar and type `cmd`, press Enter
4. Command Prompt will open in that folder

### Check Your Files
```cmd
dir
```
You should see:
- `index.html`
- `django_backend` folder
- `scripts` folder
- `styles` folder
- `render.yaml`
- `.gitignore`

---

## STEP 2: Initialize Git Repository

### Run these commands one by one:

```cmd
git init
```
**What this does**: Creates a new Git repository in your folder

**Expected output**: `Initialized empty Git repository in...`

---

## STEP 3: Configure Git (First Time Only)

```cmd
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Replace with your actual name and email**

---

## STEP 4: Add Files to Git

```cmd
git add .
```
**What this does**: Stages all files for commit

**Expected output**: (nothing, or list of files)

### Check what will be committed:
```cmd
git status
```
**You should see**: List of files in green (ready to commit)

---

## STEP 5: Create First Commit

```cmd
git commit -m "Initial commit - Deploy to Render"
```

**Expected output**: 
```
[main (root-commit) abc1234] Initial commit - Deploy to Render
 XX files changed, XXXX insertions(+)
```

---

## STEP 6: Create GitHub Repository

### Option A: Using GitHub Website (Easier)

1. Go to https://github.com
2. Click the **"+"** icon (top right)
3. Click **"New repository"**
4. Fill in:
   - **Repository name**: `artx-platform` (or any name you want)
   - **Description**: "ARTX Gaming Platform"
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Initialize with README"
5. Click **"Create repository"**

### You'll see a page with commands - COPY the repository URL
It looks like: `https://github.com/yourusername/artx-platform.git`

---

## STEP 7: Connect Local Repository to GitHub

```cmd
git remote add origin https://github.com/yourusername/artx-platform.git
```

**Replace** `yourusername/artx-platform` with your actual repository URL

### Verify connection:
```cmd
git remote -v
```

**Expected output**:
```
origin  https://github.com/yourusername/artx-platform.git (fetch)
origin  https://github.com/yourusername/artx-platform.git (push)
```

---

## STEP 8: Rename Branch to Main (if needed)

```cmd
git branch -M main
```

**What this does**: Renames your branch to "main" (GitHub's default)

---

## STEP 9: Push to GitHub

```cmd
git push -u origin main
```

**What happens**:
1. Git will ask for your GitHub credentials
2. **Username**: Your GitHub username
3. **Password**: Use a **Personal Access Token** (NOT your password)

### If you don't have a Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: "ARTX Deployment"
4. Select scopes: Check **"repo"** (full control)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when pushing

**Expected output**:
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
To https://github.com/yourusername/artx-platform.git
 * [new branch]      main -> main
```

### Verify on GitHub:
1. Go to your repository URL
2. You should see all your files!

---

## STEP 10: Deploy to Render

### 1. Create Render Account
1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with **GitHub** (easiest)
4. Authorize Render to access your GitHub

### 2. Create New Web Service
1. Click **"New +"** (top right)
2. Select **"Blueprint"**
3. Click **"Connect a repository"**
4. Find your `artx-platform` repository
5. Click **"Connect"**

### 3. Render Detects Configuration
- Render will automatically detect your `render.yaml`
- You'll see:
  - **Web Service**: artx-platform
  - **Database**: PostgreSQL

### 4. Review and Apply
1. Review the configuration
2. Click **"Apply"**
3. Render will start deploying!

### 5. Add Environment Variables
While it's deploying, add environment variables:

1. Click on your web service
2. Go to **"Environment"** tab
3. Add these variables:

```
SECRET_KEY=your-django-secret-key-here-make-it-long-and-random
DEBUG=False
ALLOWED_HOSTS=.onrender.com
PAWAPAY_API_KEY=your-pawapay-key
PAWAPAY_API_TOKEN=your-pawapay-token
```

**To generate SECRET_KEY**:
```python
# Run in Python
import secrets
print(secrets.token_urlsafe(50))
```

Or use: https://djecrety.ir/

4. Click **"Save Changes"**

### 6. Wait for Deployment
- Watch the **"Logs"** tab
- Deployment takes 5-10 minutes
- You'll see:
  ```
  ==> Building...
  ==> Running build.sh...
  ==> Deploying...
  ==> Your service is live!
  ```

### 7. Access Your Site
- Your site will be at: `https://your-app-name.onrender.com`
- Click the URL in Render dashboard
- **First load may take 30 seconds** (cold start)

---

## STEP 11: Test Your Deployment

1. Open your Render URL
2. Test:
   - ✅ Homepage loads
   - ✅ Can create account
   - ✅ Can login
   - ✅ Dashboard works
   - ✅ API endpoints respond

---

## 🎉 YOU'RE LIVE!

Your ARTX platform is now deployed and accessible worldwide!

---

## Common Issues & Solutions

### Issue 1: "Permission denied" when pushing to GitHub
**Solution**: Use Personal Access Token instead of password

### Issue 2: "Build failed" on Render
**Solution**: 
1. Check logs in Render dashboard
2. Verify `requirements.txt` has all dependencies
3. Check `build.sh` is executable

### Issue 3: "Application Error" after deployment
**Solution**:
1. Check environment variables are set
2. Verify `ALLOWED_HOSTS` includes `.onrender.com`
3. Check database migrations ran successfully

### Issue 4: Static files not loading
**Solution**:
1. Check `whitenoise` is in `requirements.txt`
2. Verify `STATIC_ROOT` is set in settings
3. Run `python manage.py collectstatic` in build.sh

---

## Making Updates After Deployment

### When you make changes to your code:

```cmd
# 1. Add changes
git add .

# 2. Commit changes
git commit -m "Description of changes"

# 3. Push to GitHub
git push

# 4. Render automatically redeploys!
```

**That's it!** Render watches your GitHub repo and auto-deploys on push.

---

## Useful Commands

### Check Git status
```cmd
git status
```

### View commit history
```cmd
git log --oneline
```

### Create a new branch
```cmd
git checkout -b feature-name
```

### Switch branches
```cmd
git checkout main
```

### Pull latest changes
```cmd
git pull
```

### View remote URL
```cmd
git remote -v
```

---

## Next Steps

1. **Set up custom domain** (optional)
   - Go to Render dashboard → Settings → Custom Domain
   - Add your domain and configure DNS

2. **Set up monitoring**
   - Use UptimeRobot.com to prevent cold starts
   - Set up alerts for downtime

3. **Backup database**
   - Download backups regularly from Render dashboard
   - Database expires after 90 days on free tier

4. **Monitor usage**
   - Check Render dashboard for hours used
   - Free tier: 750 hours/month

---

## Support

- **Render Docs**: https://render.com/docs
- **Git Docs**: https://git-scm.com/doc
- **GitHub Docs**: https://docs.github.com

---

## Summary of Commands

```cmd
# Initialize Git
git init

# Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Connect to GitHub
git remote add origin https://github.com/username/repo.git

# Rename branch
git branch -M main

# Push to GitHub
git push -u origin main

# Future updates
git add .
git commit -m "Update message"
git push
```

**That's everything you need!** 🚀
