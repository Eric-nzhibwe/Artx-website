# EMERGENCY FIX - Git in Wrong Directory!

## THE PROBLEM
Git was initialized in `C:\Users\ericn` instead of your project folder!
This is why it's trying to add your entire user directory.

## SOLUTION: Start Fresh

### Step 1: Delete the Wrong .git Folder

Open PowerShell AS ADMINISTRATOR and run:

```powershell
# Navigate to your USER directory
cd C:\Users\ericn

# Remove the .git folder (this is safe - it's in the wrong place anyway)
Remove-Item -Recurse -Force .git

# Verify it's gone
Test-Path .git
# Should return: False
```

### Step 2: Initialize Git in the CORRECT Directory

```powershell
# Navigate to your PROJECT folder
cd C:\Users\ericn\Desktop\deploy-69adb2fbaf6ad1f81393873c

# Initialize Git HERE
git init

# Verify you're in the right place
git status
# Should show only your project files, not system files!
```

### Step 3: Add Only Project Files

```powershell
# Still in: C:\Users\ericn\Desktop\deploy-69adb2fbaf6ad1f81393873c

# Add only the project files
git add .

# Check what's being added
git status
# Should show ONLY your project files (index.html, django_backend, etc.)
```

### Step 4: Commit and Push

```powershell
# Commit
git commit -m "Remove messenger feature and fix API key leak"

# Add remote (if not already added)
git remote add origin https://github.com/Eric-nzhibwe/ARTX-GAMING-PLATFORM.git

# Push
git push -u origin main --force
```

## IMPORTANT: After Pushing

1. **Revoke the OpenAI API Key** immediately!
   - Go to: https://platform.openai.com/api-keys
   - Delete key: `sk-proj-kBqEhpKSIUDO...`
   - Generate new key
   - Add to `django_backend/.env` (backend only!)

2. **Verify .gitignore** is working:
   ```powershell
   cat .gitignore
   ```
   Should include:
   ```
   .env
   *.pyc
   __pycache__/
   db.sqlite3
   ```

## Quick Commands (Copy-Paste)

```powershell
# 1. Remove wrong .git
cd C:\Users\ericn
Remove-Item -Recurse -Force .git

# 2. Initialize in correct location
cd C:\Users\ericn\Desktop\deploy-69adb2fbaf6ad1f81393873c
git init

# 3. Add and commit
git add .
git commit -m "Remove messenger and fix API key"

# 4. Push
git remote add origin https://github.com/Eric-nzhibwe/ARTX-GAMING-PLATFORM.git
git push -u origin main --force
```

## If You Get "Remote Already Exists" Error

```powershell
# Remove old remote
git remote remove origin

# Add it again
git remote add origin https://github.com/Eric-nzhibwe/ARTX-GAMING-PLATFORM.git

# Push
git push -u origin main --force
```

## Verification

After pushing, check:
1. Go to your GitHub repo
2. You should see ONLY project files
3. NO system files (AppData, Documents, etc.)
4. The API key should be removed from `scripts/chatbot.js`

---

**CRITICAL**: Don't forget to revoke that API key!
