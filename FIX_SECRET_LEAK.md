# Fix Secret Leak in Git

## The Problem
GitHub detected an OpenAI API key in your code and blocked the push.

## Solution: Remove Secret from Git History

### Option 1: Remove from Latest Commit (Easiest)

```bash
# 1. Remove the secret from the file (already done!)
# scripts/chatbot.js has been fixed

# 2. Add the fixed file
git add scripts/chatbot.js

# 3. Amend the last commit (replace it)
git commit --amend --no-edit

# 4. Force push to GitHub
git push -f origin main
```

### Option 2: Remove from All History (More Thorough)

If the secret is in multiple commits:

```bash
# Install BFG Repo-Cleaner (easier than git filter-branch)
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Or use git filter-branch:
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch scripts/chatbot.js" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push -f origin main
```

### Option 3: Start Fresh (Nuclear Option)

If you want to completely remove history:

```bash
# 1. Delete .git folder
rm -rf .git

# 2. Re-initialize
git init
git add .
git commit -m "Initial commit - secrets removed"

# 3. Force push to GitHub
git remote add origin https://github.com/Eric-nzhibwe/ARTX-GAMING-PLATFORM.git
git branch -M main
git push -f origin main
```

## RECOMMENDED: Option 1

Since we just fixed the file, use Option 1:

```bash
git add scripts/chatbot.js
git commit --amend --no-edit
git push -f origin main
```

## After Fixing

### 1. Revoke the Exposed API Key
**IMPORTANT**: The API key is now public! You MUST revoke it:

1. Go to https://platform.openai.com/api-keys
2. Find the key starting with `sk-proj-kBqEhpKSIUDO...`
3. Click "Revoke" or "Delete"
4. Generate a new key
5. Add it to your Django backend `.env` file (NOT in frontend!)

### 2. Store API Key Securely

In `django_backend/.env`:
```
OPENAI_API_KEY=your-new-api-key-here
```

In `django_backend/artx_platform/settings.py`:
```python
OPENAI_API_KEY = config('OPENAI_API_KEY', default='')
```

In `django_backend/chatbot/ai_service.py`:
```python
from django.conf import settings
import openai

openai.api_key = settings.OPENAI_API_KEY
```

### 3. Update .gitignore

Make sure `.env` is in `.gitignore`:
```
.env
*.env
.env.local
```

### 4. Never Commit Secrets Again

- ✅ Store secrets in `.env` files
- ✅ Use environment variables
- ✅ Keep secrets in backend only
- ❌ Never hardcode API keys in frontend
- ❌ Never commit `.env` files

## Quick Fix Commands

```bash
# Fix the commit
git add scripts/chatbot.js
git commit --amend --no-edit

# Push (force)
git push -f origin main

# If that fails, allow the secret temporarily:
# Click the link GitHub provided:
# https://github.com/Eric-nzhibwe/ARTX-GAMING-PLATFORM/security/secret-scanning/unblock-secret/3DBWla9wIh8u2CjbQdkGjet3zkw

# Then revoke the API key immediately after!
```

## Prevention

Install pre-commit hooks to catch secrets:

```bash
# Install git-secrets
pip install detect-secrets

# Initialize
detect-secrets scan > .secrets.baseline

# Add to .git/hooks/pre-commit
detect-secrets-hook --baseline .secrets.baseline
```

---

**Remember**: The exposed API key is compromised. Revoke it immediately!
