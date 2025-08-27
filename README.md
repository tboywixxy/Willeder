# Willeder — Build‑From‑Scratch Assignment

**Live (Vercel):**  (e.g., https://willeder-eta.vercel.app)_  
**Repo:** 

---

## 1) Local Setup (JSON Server + Next.js)

### Prereqs
- Node.js ≥ 20
- npm (or pnpm/yarn)
- Port **3000** free (Next.js) and **3001** free (JSON Server)

### 1) Install deps
```bash
npm i
```

### 2) Start JSON Server (dev data)
```bash
# from project root (where db.json lives)
npx json-server --watch db.json --port 3001
```
> Dev API base will be **http://localhost:3001**. Endpoint used by the app: `/blogs`.

### 3) Create `.env.local`
Copy/paste the snippet below and adjust if needed:

```bash
# JSON Server (dev only)
JSON_SERVER_URL=http://localhost:3001

# Mailer (uses Ethereal — safe to share for review; not real inbox)
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=oswald15@ethereal.email
SMTP_PASS=E1NGebQedt2fpcUaRQ
MAIL_FROM="Willeder <no-reply@willeder.test>"
MAIL_TO=review@willeder.test
```

### 4) Run Next.js
```bash
npm run dev
```
Open **http://localhost:3000**. In **development**, the app fetches blogs from JSON Server. In **production/preview**, it reads from the internal route handlers backed by `app/lib/server/blogData` to return the **same shape** as dev.

---

## 2) Production (Vercel)

- Set project to **Node.js runtime** for API routes that need it (mailer).  
- Add the environment variables above in Vercel Project Settings → **Environment Variables** (at least `SMTP_*`, `MAIL_FROM`, `MAIL_TO`).  
- No JSON Server in prod. Route handlers serve data from `blogData` with identical shape to `/blogs` in dev.  
- Contact form posts to `/api/contact` and sends email via Nodemailer on Vercel.

---

## 3) Tech Choices (≈250 words)

I used **Next.js (App Router)** with **TypeScript** for reliable server‑client boundaries and first‑class routing. The App Router lets me colocate UI and data (route handlers) and set per‑route caching/revalidation with minimal glue. **Tailwind** speeds pixel‑accurate implementation by turning Figma measurements into deterministic utility classes; it keeps styles close to the markup so the component tree remains easy to audit.

For data, the brief required **JSON Server** in development and **custom route handlers** in production that return the **same shape**. I implemented `/api/blogs?page&limit&tag&q` and `/api/blogs/[slug]` to mirror the JSON Server contract. In dev, the app reads from `JSON_SERVER_URL` and paginates/searches accordingly; in prod, handlers filter/sort the static dataset so both environments behave identically without code changes in the UI layer.

The **contact form** runs on a Node runtime with **Nodemailer**. In dev, reviewers can use **Ethereal** SMTP to validate message payloads without sending real mail; in prod, swapping SMTP creds is a single env change. Accessibility and performance inform the build: semantic landmarks, visible focus, contrast checks, explicit image sizes (`next/image`), and route‑level caching where applicable. I favored **boring, predictable** patterns (narrow components, obvious props) to reduce cognitive load and keep the codebase maintainable.

---

## 4) Performance Notes (brief)

I targeted mobile Lighthouse ≥90 and addressed common issues (explicit image sizes, minimal JS on landing, font‑display swap). Remaining gaps were driven by:  
- **3rd‑party assets** (remote images and the animation) increasing **LCP** and **TTI** variability on slower networks.  
- The hero visual being the **largest element**, so it dominates LCP even when optimized.  
- A small amount of framework/runtime JS needed for interactive pieces (navigation, form).  
- iOS GPU/compositing quirks around video/animation layers; mitigated by switching to a lightweight animation approach.

---

## 5) Evidence & Docs (paths)

Place your review artifacts here (already referenced by the code/README):

```
docs/
  overlay/
    home-px-overlays.png
    contact-px-overlays.png
    blogs-px-overlays.png
    blog-detail-px-overlays.png

  lighthouse/
    home.png
    blogs.png
    blog.png 
    contact.png   

/docs/safari/macos/home-mac.png
/docs/safari/macos/blogs-mac.png
/docs/safari/macos/blog-detail-mac.png
/docs/safari/macos/contact-mac.png

/docs/ios/home-ios.png
/docs/ios/blogs-ios.png
/docs/ios/blog-detail-ios.png
/docs/ios/contact-ios.png
```


## 6) API Contract (UI‑stable)

- `GET /api/blogs?page&limit&tag&q` → `{ items, page, limit, total }`  
- `GET /api/blogs/[slug]` → full blog object  
- Dev maps to JSON Server `/blogs` with equivalent filters; prod reads from `blogData` and enforces the same sorting/pagination/filters.

---


## 7) Scripts (reference)

```bash
# Dev (Next + JSON Server running in another terminal)
npm run dev

# Build & start
npm run build && npm run start
```

---

_Thanks for reviewing!_
