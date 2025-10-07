# Deployment Guide for MyCanvasNotes

This guide explains how to deploy MyCanvasNotes to GitHub Pages with a custom domain.

## The MIME Type Issue

The error you encountered:
```
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"
```

This happens because GitHub Pages serves JavaScript files with the wrong MIME type for ES modules when using a custom domain.

## Solution Implemented

### 1. Updated Vite Configuration
- Added proper build configuration in `vite.config.ts`
- Configured output settings to prevent chunking issues

### 2. GitHub Actions Workflow
- Created `.github/workflows/deploy.yml` for automated deployment
- Uses `peaceiris/actions-gh-pages` action for reliable deployment
- Automatically handles the CNAME file for custom domain

### 3. SPA Routing Support
- Added `404.html` for proper Single Page App routing
- Added redirect script in `index.html` for client-side routing
- Added `.nojekyll` file to prevent Jekyll processing

## Deployment Steps

### Option 1: Automated Deployment (Recommended)
1. Push your code to the `main` branch
2. The GitHub Actions workflow will automatically build and deploy
3. Your site will be available at `www.mycanvasnotes.com`

### Option 2: Manual Deployment
1. Run `npm run build` to create the `dist` folder
2. Push the `dist` folder contents to the `gh-pages` branch
3. Make sure the `CNAME` file is in the root of the `gh-pages` branch

## Files Added/Modified

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `public/.nojekyll` - Prevents Jekyll processing
- `public/404.html` - SPA routing fallback
- `index.html` - Added SPA redirect script
- `vite.config.ts` - Updated build configuration

## Troubleshooting

If you still encounter MIME type issues:

1. **Clear browser cache** - The browser might be caching the old files
2. **Check GitHub Pages settings** - Ensure Pages is enabled and pointing to `gh-pages` branch
3. **Verify CNAME file** - Make sure `www.mycanvasnotes.com` is in the CNAME file
4. **Wait for propagation** - DNS changes can take up to 24 hours

## Testing Locally

To test the production build locally:
```bash
npm run build
npm run preview
```

This will serve the built files locally, simulating the production environment.
