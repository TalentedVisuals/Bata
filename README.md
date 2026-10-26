# Bàtà – Premium Nigerian Handmade & Imported Footwear

A modern luxury footwear retail e-commerce web application featuring authentic Nigerian artisan craft and premium curated international imports.

Built with React 19, Vite, TypeScript, and Tailwind CSS.

---

## 🚀 Deploying to Vercel

This repository is pre-configured and 100% ready for one-click deployment on [Vercel](https://vercel.com).

### Option 1: Deploy with Git (Recommended)

1. **Push your repository** to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Import your repository.
4. Vercel automatically detects the project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**. Your site will be live with free global CDN and SSL in less than a minute!

---

### Option 2: Deploy with Vercel CLI

If you prefer deploying straight from your terminal:

1. Install the Vercel CLI globally (if you haven't already):
   ```bash
   npm i -g vercel
   ```

2. From the project root, run:
   ```bash
   vercel
   ```
   Follow the prompts to link your project and deploy a preview.

3. To deploy directly to production:
   ```bash
   vercel --prod
   ```

---

## 🛠️ Vercel Configuration Highlights

- **`vercel.json`**:
  - Handles client-side Single Page Application (SPA) routing with rewrites to `/index.html` (preventing 404s on page refresh).
  - Configures optimized immutable caching headers for static assets (`/assets/*` and `/shoes/*`).
  - Pre-sets framework preset to `vite` and output directory to `dist`.

- **`.vercelignore`**:
  - Ignores internal tools, local logs, and development artifacts to guarantee fast and lean deployments.

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

5. **Typecheck & Lint**:
   ```bash
   npm run lint
   ```
