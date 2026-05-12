# FINAL FIX - Step by Step Commands

## Run these commands ONE BY ONE in PowerShell

Open PowerShell in your project folder:
`C:\Users\ericn\Desktop\deploy-69adb2fbaf6ad1f81393873c`

---

## Step 1: Check Current Status

```powershell
git status
```

**Expected output**: Should show modified files (not system files!)

---

## Step 2: Check Current Branch

```powershell
git branch
```

**If you see nothing or no "main" branch**, continue to Step 3.
**If you see "main" or "master"**, skip to Step 4.

---

## Step 3: Add Files and Create First Commit

```powershell
# Add all project files
git add .

# Check what's being added (should be ONLY project files)
git status

# Create the first commit
git commit -m "Remove messenger feature and fix API key leak"

# Create main branch
git branch -M main
```

---

## Step 4: Verify Remote

```powershell
# Check if remote exists
git remote -v
```

**If you see the GitHub URL**, skip to Step 5.

**If you see nothing or wrong URL**, run:
```powershell
# Remove old remote (if exists)
git remote remove origin

# Add correct remote
git remote add origin https://github.com/Eric-nzhibwe/ARTX-GAMING-PLATFORM.git
```

---

## Step 5: Push to GitHub

```powershell
# Push with force (to overwrite the bad commit with API key)
git push -u origin main --force
```

**If this asks for credentials:**
- Username: Your GitHub username
- Password: Use a Personal Access Token (NOT your password!)
  - Get token from: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Select "repo" scope
  - Copy the token and use it as password

---

## Step 6: Verify on GitHub

1. Go to: https://github.com/Eric-nzhibwe/ARTX-GAMING-PLATFORM
2. Refresh the page
3. Check that:
   - ✅ Your project files are there
   - ✅ NO system files (AppData, Documents, etc.)
   - ✅ `scripts/chatbot.js` doesn't have the API key

---

## Step 7: REVOKE THE API KEY! ⚠️

**CRITICAL - DO THIS IMMEDIATELY!**

1. Go to: https://platform.openai.com/api-keys
2. Find the exposed key (check your OpenAI dashboard for recently used keys)
3. Click "Revoke" or "Delete"
4. Generate a NEW key
5. Add the new key to `django_backend/.env`:
   ```
   OPENAI_API_KEY=your-new-key-here
   ```

---

## Troubleshooting

### Error: "src refspec main does not match any"
**Solution**: You haven't created a commit yet. Run:
```powershell
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main --force
```

### Error: "remote origin already exists"
**Solution**: Remove and re-add:
```powershell
git remote remove origin
git remote add origin https://github.com/Eric-nzhibwe/ARTX-GAMING-PLATFORM.git
git push -u origin main --force
```

### Error: "Permission denied"
**Solution**: Use Personal Access Token instead of password
- Get from: https://github.com/settings/tokens

### Error: "Repository rule violations" (API key detected)
**Solution**: 
1. Click the link GitHub provides to allow the secret temporarily
2. Push again
3. IMMEDIATELY revoke the API key after pushing!

---

## Alternative: Use GitHub Desktop (Easier!)

If commands are too confusing:

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in
3. Click "Add" → "Add existing repository"
4. Select: `C:\Users\ericn\Desktop\deploy-69adb2fbaf6ad1f81393873c`
5. Click "Publish repository"
6. Done!

Then still REVOKE THE API KEY!

---

## Summary of What We're Doing

1. ✅ Removed messenger feature
2. ✅ Removed hardcoded API key from code
3. ✅ Fixed Git being in wrong directory
4. ⏳ Push clean code to GitHub
5. ⏳ Revoke the exposed API key

---

## After Everything Works

Your next steps:
1. ✅ Code is on GitHub
2. ✅ API key is revoked
3. 🚀 Deploy to Render.com
4. 🎉 Your app is live!

---

**Need help?** The issue is likely:
- No commit created yet → Run `git add .` then `git commit -m "message"`
- Wrong branch name → Run `git branch -M main`
- No remote set → Run `git remote add origin <url>`
