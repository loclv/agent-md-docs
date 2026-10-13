# Deployment

Step-by-step guide to deploying the `agent-md` documentation site to Cloudflare Pages using Wrangler CLI.

## 1. Live Deployment Details

- Pages Project Name: `agent-md`
- Live URL: <https://agent-md-551.pages.dev>
- Production Branch: `main`

## 2. How the Subdomain & Page URL are Set

Cloudflare Pages automatically creates a public subdomain in the format:

```text
https://<PROJECT_NAME>.pages.dev
```

### Subdomain Uniqueness & Suffixes

Cloudflare Pages subdomains (`*.pages.dev`) are globally unique across all Cloudflare accounts:

1. Direct Match: If `<PROJECT_NAME>.pages.dev` is available globally, Cloudflare assigns it directly (e.g., `https://agent-md-docs.pages.dev`).
2. Global Collision: If `<PROJECT_NAME>.pages.dev` is already registered by another Cloudflare user anywhere in the world, Cloudflare appends a unique numeric suffix (e.g., `agent-md-551.pages.dev`).
3. Changing the Subdomain:
   - If you prefer a different subdomain without a suffix (for example `agent-md-docs.pages.dev`), you can create a new project with that name:
     ```bash
     CLOUDFLARE_ACCOUNT_ID=your_account_id_here wrangler pages deploy dist --project-name agent-md-docs
     ```

### Setting Custom Domains (e.g., `agent-md.example.com`)

You can map any custom domain to your Pages site:

1. Open the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to Workers & Pages -> select the `agent-md` project.
3. Select the Custom domains tab.
4. Click Set up a custom domain and enter your domain (e.g. `agent-md.example.com` or `docs.agent-md.com`).
5. Cloudflare will automatically provision an SSL certificate and configure DNS routing.

### Configuring Site URL in Astro

In `astro.config.mjs`, update the `site` property to match your primary domain:

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://agent-md-551.pages.dev', // or custom domain 'https://agent-md.example.com'
  // ...
});
```

## 3. Step-by-Step Deployment Commands

### Step 1: Environment Variables Setup

Copy `.env.example` to `.env` and fill in your Cloudflare Account ID:

```bash
cp .env.example .env
```

Inside `.env`:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
```

`.env` is ignored by Git, ensuring secrets and account IDs are never committed to public repositories.

### Step 2: Build the Static Site

Generate the static assets into the `./dist` directory:

```bash
bun run build
```

### Step 3: Deploy to Cloudflare Pages

Because `bun` automatically loads environment variables from `.env`, you can deploy directly:

```bash
bun run deploy
```

Or invoke Wrangler directly:

```bash
wrangler pages deploy dist --project-name agent-md
```

(Note: During the very first creation of a project, `--force` can be added if Wrangler attempts to delegate to Workers).

## 4. Quick Deploy via Package Script

A deployment script is configured in `package.json`:

```bash
bun run deploy
```

This runs `bun run build` followed by the `wrangler pages deploy` command automatically.
