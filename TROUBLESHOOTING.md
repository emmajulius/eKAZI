# Troubleshooting GitHub Pages Deployment

## Issue: Seeing README instead of Application

If you're seeing the README.md file instead of your React application, follow these steps:

### Step 1: Verify GitHub Pages Settings

1. Go to: `https://github.com/emmajulius/eKAZI/settings/pages`
2. Under **"Source"**, make sure it says **"GitHub Actions"** (NOT "Deploy from a branch")
3. If it shows "Deploy from a branch", change it to "GitHub Actions"
4. Click **Save**

### Step 2: Check GitHub Actions Workflow

1. Go to: `https://github.com/emmajulius/eKAZI/actions`
2. Look for the latest workflow run named "Build and Deploy to GitHub Pages"
3. Click on it to see if it completed successfully
4. If it failed, check the error messages

### Step 3: Create GitHub Pages Environment (if needed)

If the workflow fails with "Environment not found":

1. Go to: `https://github.com/emmajulius/eKAZI/settings/environments`
2. Click **"New environment"**
3. Name it: `github-pages`
4. Click **"Configure environment"**
5. No additional settings needed - just save it

### Step 4: Manually Trigger Workflow

1. Go to: `https://github.com/emmajulius/eKAZI/actions`
2. Click on "Build and Deploy to GitHub Pages" workflow
3. Click **"Run workflow"** button (top right)
4. Select branch: `master`
5. Click **"Run workflow"**

### Step 5: Wait for Deployment

- GitHub Pages deployments can take 1-5 minutes
- After the workflow completes, wait 2-3 minutes for the site to update
- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
- Try accessing: `https://emmajulius.github.io/eKAZI`

### Step 6: Verify Repository Name

Make sure your repository name matches:
- Repository: `eKAZI` (case-sensitive)
- URL should be: `https://emmajulius.github.io/eKAZI`

If your repository has a different name, update `package.json`:
```json
"homepage": "https://emmajulius.github.io/[your-repo-name]"
```

### Step 7: Check Build Output

The workflow should create these files in the build folder:
- `index.html` (main entry point)
- `static/js/main.*.js` (React app)
- `static/css/main.*.css` (styles)

### Common Issues

#### Issue: "Environment not found"
**Solution**: Create the `github-pages` environment (Step 3 above)

#### Issue: "Workflow not running"
**Solution**: 
- Make sure you've pushed to the `master` branch
- Check if workflows are enabled in repository settings
- Go to Settings → Actions → General → Workflow permissions → Enable

#### Issue: "Still seeing README after 10 minutes"
**Solution**:
1. Double-check that Source is set to "GitHub Actions" (not a branch)
2. Wait a few more minutes (GitHub Pages can be slow)
3. Try accessing the site in an incognito/private window
4. Check if there's a custom domain configured that might be interfering

#### Issue: "404 Error"
**Solution**: 
- This is normal for React Router - the `404.html` file should handle it
- Make sure `404.html` is in the `public` folder
- Try accessing: `https://emmajulius.github.io/eKAZI/#/`

### Still Not Working?

1. Check the Actions tab for any error messages
2. Verify the workflow completed successfully (green checkmark)
3. Check the "Deploy to GitHub Pages" step logs
4. Make sure the build folder contains `index.html`

### Quick Test

To verify the build works locally:
```bash
npm run build
npx serve -s build
```
Then visit `http://localhost:3000` - you should see your app, not the README.

