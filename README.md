# Ross & Stephanie · Venice · MMXXVI

A minimal, Venice-themed wedding website for Ross Reiffman and Stephanie Moinian's
wedding weekend in Venice, Italy — 9–11 October 2026.

Plain static site: `index.html` + `styles.css` + `script.js`. No build step, no dependencies.

## Local preview

```bash
npx serve .
```

## Password gate

The site sits behind a client-side password gate (kept from v1):

```text
stephross2026
```

The check is case-insensitive and remembered for the browser session.

## RSVP form

The RSVP form posts to [FormSubmit](https://formsubmit.co) and delivers responses
to `rreiffman@gmail.com` — no account or backend needed.

**One-time setup:** the very first submission triggers an activation email from
FormSubmit to that inbox. Click the confirmation link once and all future RSVPs
arrive as nicely formatted emails. Submit a test RSVP yourself after deploying
to kick this off.

If a submission ever fails, the form shows a pre-filled `mailto:` fallback link,
so no RSVP is lost.

## Photography

The couple's own Venice photos live in `images/` (resized and compressed for
the web). They set the site's palette: terracotta, marigold and lagoon teal.

- `hero-grand-canal.jpg` — hero, full-bleed
- `canal-golden.jpg` — quote divider after the schedule
- `canal-bridge.jpg` — divider before the RSVP
- `gondola.jpg` — framed postcard on the password gate

Each full-bleed photo sits on top of a matching CSS gradient, so sections
degrade gracefully if an image ever fails to load. To swap photos, replace the
files or the `url(...)` entries in `styles.css`.
