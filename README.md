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

Canal and water photography is hot-linked from [Pexels](https://www.pexels.com)
(free license, no attribution required). Each photo sits on top of a matching
CSS gradient, so sections degrade gracefully if an image is ever unavailable.
To swap in your own photos, replace the `url(...)` entries in `styles.css`
(`.hero-photo`, `.divider-photo-1`, `.divider-photo-2`).
