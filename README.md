# ESTONE Frontend

This is the website for ESTONE Ltd, a design and construction company based in Kigali, Rwanda.

It's built with React, TypeScript and Tailwind CSS, and bundled with Webpack. The backend it
talks to lives in its own repository.

## What the site does

Visitors land on a single page that walks them through the company: an opening hero, who we
are, the services on offer, a portfolio of finished work, the people behind it, and a way to
get in touch. Sections fade in as you scroll, the header settles into a solid bar once you
leave the top, and the nav quietly highlights whichever section you're reading.

The portfolio can be filtered by residential or commercial work and is paginated when it grows.
Clicking any project opens its own page, with a few related projects suggested underneath.

Getting in touch is easy from anywhere on the page. The contact form sends messages straight
through to the admin panel, and the phone number, email address and office location are all
tappable. The hero also shows how many projects have been completed, counted live.

## What the admin panel does

The team signs in at `/admin`, either with an email and password or through Google. The
dashboard opens with a quick count of everything on the site, a nudge if messages are waiting,
and the five newest ones ready to read.

From there, each part of the site has its own screen:

- **Messages** — read what came in through the contact form, mark things read or unread, and
  delete what's finished. Anything still unread shows as a badge in the sidebar.
- **Projects** — add, edit or remove projects, upload a photo for each one, sort them into
  residential or commercial, and pick which ones to feature.
- **Team** — manage who appears on the site, upload their photos, and choose the order they
  show in. Marking someone as CEO keeps them out of the team grid, since the CEO already has
  their own featured block higher up the page.
- **Services** — write up each service along with the list of things it covers.
- **Admins** — decide who else is allowed to sign in.

Every list can be searched and sorted. Sessions are checked when the panel loads, and nothing
but the login page is reachable without signing in.

## Running it locally

```bash
npm install
npm run dev
```

That serves the site at `http://localhost:3000` and expects the backend at
`http://localhost:5000/api`. Use `npm run build` for a production bundle in `dist/`, or
`npm run typecheck` to check the types without building anything.

## Pointing it at a different backend

The API address is baked in when you build, so pass it along at build time:

```bash
API_BASE_URL=https://api.estone.rw/api npm run build
```

Left alone, a production build looks for the API at `/api` on the same domain, which works when
both sit behind the same proxy. The Google sign-in client ID can be swapped the same way with
`GOOGLE_CLIENT_ID`. Since both are compiled into the bundle, changing either one means
rebuilding.
