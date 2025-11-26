# Deployment Guide

## GitHub Pages Deployment Setup

This repository is configured with GitHub Actions to automatically build and deploy the React application to GitHub Pages.

### Initial Setup (One-time)

1. **Enable GitHub Pages in Repository Settings:**
   - Go to your repository on GitHub: `https://github.com/emmajulius/eKAZI/settings/pages`
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions** (NOT "Deploy from a branch")
   - **Important**: Make sure you select "GitHub Actions" and NOT a branch like "master" or "/docs"
   - Save the changes
   
   **If you see README instead of the app:**
   - This means GitHub Pages is serving from a branch instead of GitHub Actions
   - Go to Settings → Pages and change the Source to "GitHub Actions"
   - Wait a few minutes for the deployment to complete

2. **Verify Repository Name:**
   - The `homepage` field in `package.json` is set to: `https://emmajulius.github.io/eKAZI`
   - If your repository name is different, update the `homepage` field in `package.json` accordingly
   - Format: `https://[username].github.io/[repository-name]`

### How It Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

1. **Triggers** on every push to the `master` branch
2. **Builds** the React application using `npm run build`
3. **Deploys** the built files to GitHub Pages

### Workflow Details

- **Trigger**: Pushes to `master` branch and pull requests
- **Environment**: Ubuntu Latest
- **Node Version**: 18
- **Build Command**: `npm run build`
- **Deploy Target**: GitHub Pages

### Manual Deployment

If you need to deploy manually:

```bash
npm run build
# Then commit and push the build folder (if not using GitHub Actions)
```

### Troubleshooting

#### Build Fails
- Check the Actions tab in GitHub for error logs
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility

#### Pages Not Updating
- Check if GitHub Pages is enabled in repository settings
- Verify the workflow completed successfully in the Actions tab
- Clear browser cache and wait a few minutes for CDN propagation

#### 404 Errors on Routes
- Ensure `homepage` field in `package.json` matches your GitHub Pages URL
- For React Router, ensure you're using `HashRouter` or configure a 404 redirect

### Accessing Your Deployed Site

Once deployed, your site will be available at:
- `https://emmajulius.github.io/eKAZI`

The deployment typically takes 1-2 minutes after pushing to the master branch.

