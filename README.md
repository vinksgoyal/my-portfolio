# Vinks Goyal — personal site

A cinematic, illustrated personal site built with React + Vite + Tailwind CSS,
using your five scene illustrations as full-bleed scroll backgrounds
(hero → what I do → articles → projects → news) and your portrait on the About page.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL. For a production build:

```bash
npm run build
npm run preview
```

## Structure

- `src/App.jsx` — every page and the routing between them (plain `history`-based
  routing, no router dependency needed)
- `src/index.css` — design tokens, scene/background styles, buttons
- `tailwind.config.js` — the color palette (ink / char / paper / amber / ember / slate / plum)
  and font families (Noto Sans Display / Noto Sans / Noto Sans Mono), derived from your artwork
- `public/scene1.jpg` … `scene5.jpg` — the five scroll scenes
- `public/vinks.jpg` — your portrait, used on the About page only

## Routes

`/`, `/about`, `/contact`, `/newsletter`, `/resources`, `/articles`, `/articles/:slug`,
`/projects`, `/projects/:slug`, `/news`, `/news/:slug`, `/privacy`, `/terms`, and a 404 fallback.

## Notes for next steps

- Articles, projects and updates live as plain arrays at the top of `App.jsx` — swap them
  for real content or wire up a CMS/markdown source later.
- Social links, the contact email and the YouTube link are placeholders — update them
  in `App.jsx` (search for `socials`, `divyanshgoyal1@outlook.com`, and `youtube.com`).
- The contact form is still front-end only; connect it to your provider of choice
  (e.g. Formspree or a server endpoint) when ready.

## Supabase admin

1. Create a Supabase project and open the SQL Editor.
2. Run `supabase/schema.sql`.
3. In Supabase Authentication, create the admin user with an email and password.
4. Copy `.env.example` to `.env.local` and fill in the project URL and anon key.
5. Install dependencies and start the app:

```bash
npm install
npm run dev
```

Open `/admin` to sign in and edit the About section or articles. The public site reads published articles and About content from Supabase, while the built-in content remains as a fallback until the database has content. Never put the Supabase service-role key in `.env.local` or browser code.
