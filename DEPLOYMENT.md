# Deploying CelestialChronicle to Vercel

## Prerequisites
- A [Vercel account](https://vercel.com/signup) (free tier works great!)
- Your GitHub repository connected to Vercel

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select your `CelestialChronicle` repository from GitHub
   - Click "Import"

3. **Configure Build Settings**
   - Vercel should auto-detect Next.js
   - The `vercel.json` file will handle the nested project structure
   - Framework Preset: **Next.js**
   - Root Directory: Leave as is (the vercel.json handles this)
   - Build Command: `cd celestial-chronicle && npm run build` (from vercel.json)
   - Output Directory: `celestial-chronicle/.next` (from vercel.json)

4. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - You'll get a live URL like `https://celestial-chronicle-xxx.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Repository Root**
   ```bash
   cd C:\Users\ervik\source\repos\asmundervik\CelestialChronicle
   vercel
   ```

4. **Follow the Prompts**
   - Link to existing project or create new one
   - Confirm settings
   - Deploy!

## Environment Variables
Currently, your app doesn't require any environment variables. All resources (Earth textures, etc.) are loaded from external CDNs.

## Automatic Deployments
Once connected to GitHub:
- **Production**: Every push to `main` branch automatically deploys
- **Preview**: Every pull request gets its own preview URL
- **Instant Rollbacks**: Can rollback to any previous deployment instantly

## Custom Domain (Optional)
1. Go to your project in Vercel dashboard
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Performance Optimizations
Your app is already optimized for Vercel:
- ✅ Next.js 15 with App Router
- ✅ Static asset optimization
- ✅ Image optimization (if you add Next.js Image components later)
- ✅ Edge network CDN
- ✅ Automatic HTTPS

## Expected Build Time
- First deployment: ~3-5 minutes
- Subsequent deployments: ~2-3 minutes

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18+ by default)
- Check build logs in Vercel dashboard

### 3D Globe Not Loading
- Ensure external texture URLs are accessible
- Check browser console for CORS or loading errors
- All textures load from `raw.githubusercontent.com` which should work fine

### Performance Issues
- First load may be slower (cold start)
- Subsequent loads are cached and very fast
- Consider adding loading states for 3D content

## Post-Deployment
Your app will be live at: `https://celestial-chronicle-[your-id].vercel.app`

Share it with the world! 🌍✨
