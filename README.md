# Cybersecurity Portfolio

A fast, dependency-free (no frameworks, no build step) personal portfolio site for
entry-level cybersecurity roles — SOC Analyst, IT Security, GRC, and internship/junior
positions. Pure HTML5, CSS3 and vanilla JavaScript.

## Files

```
cybersecurity-portfolio/
├── index.html      → all page content and structure
├── style.css       → all styling, layout, responsive rules, animations
├── script.js       → all behaviour: nav, animations, config, contact form
├── favicon.svg      → browser-tab icon
├── README.md        → this file
└── assets/
    ├── resume.pdf    → ADD THIS — your resume (linked from the Résumé section)
    └── profile.jpg   → OPTIONAL — a headshot (see comments in index.html)
```

## 1. Personalise the content (do this first)

**Open `script.js` and edit the `CONFIG` object at the very top of the file:**

```js
const CONFIG = {
  name: "Your Name",
  initials: "YN",
  roles: ["SOC Analyst", "IT Security Specialist", "GRC Analyst", "Cybersecurity Graduate"],
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://www.linkedin.com/in/yourusername",
  location: "Your City, Country",
  availability: "Open to SOC Analyst, IT Security & GRC opportunities",
  resumePath: "assets/resume.pdf",
  htbProfile: "https://app.hackthebox.com/profile/yourprofile",
  thmProfile: "https://tryhackme.com/p/yourusername",
  thmUsername: "yourusername"
};
```

These values are injected automatically into the hero, about, contact and footer
sections when the page loads — you only need to edit them once, in this one place.

**Then open `index.html`** and search for the word `EDIT` (Ctrl/Cmd+F). Each match
marks sample content you should replace with your own:

- Hero "Recent activity" list
- About-me bio paragraph and your degree/program
- Certifications (5 example cards)
- Projects (6 example cards, with GitHub links to update)
- Practical Labs stats and completed rooms/machines
- Résumé timeline (education / experience)
- Hero stats (`data-counter` values for labs, certifications, months of practice)

None of this content is required to stay as-is — it's realistic example content so
the site is fully working immediately, not a blank template.

## 2. Add your resume and (optional) photo

Drop your resume PDF into `assets/resume.pdf` — the two résumé buttons and the
hero "Download résumé" button all point there already. See
`assets/PUT_YOUR_FILES_HERE.txt` for the photo swap instructions.

## 3. Run it locally

No build tools, no npm install — it's static HTML/CSS/JS. Two options:

**Option A — just open the file**
Double-click `index.html`, or right-click → "Open with" → your browser.
(Everything works this way except that some browsers restrict `fetch`
requests from `file://` URLs — not an issue here since the site makes no
such requests.)

**Option B — a local server (recommended, closer to production)**
From inside the `cybersecurity-portfolio` folder, run one of:

```bash
# Python 3 (built into macOS/Linux, installable on Windows)
python3 -m http.server 8000

# Node.js
npx serve .

# VS Code
# Install the "Live Server" extension, then right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8000` (or whatever port/URL the tool prints).

## 4. Publish it

Any static host works, for example:

- **GitHub Pages** — push this folder to a repo, enable Pages in repo Settings.
- **Netlify / Vercel** — drag-and-drop the folder, or connect the repo.
- **Cloudflare Pages** — same idea, connect the repo or upload directly.

No server-side code or environment variables are required.

## Notes on the contact form

The contact form validates input in the browser, then opens the visitor's
email client with the message pre-filled (a `mailto:` link) — this means it
works fully with zero backend. If you'd rather receive submissions directly
without opening an email client, connect a service like Formspree or EmailJS
and replace the body of `initContactForm()`'s submit handler in `script.js`
with a `fetch()` call to that service.

## Accessibility & performance notes

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `footer`), a
  skip-to-content link, and visible keyboard focus states throughout.
- Respects `prefers-reduced-motion` — animations are disabled/simplified for
  visitors who request it.
- Two Google Fonts (IBM Plex Sans/Mono) are loaded with `preconnect` and
  `font-display: swap`; everything else is dependency-free for fast loads.
- Icons are inline SVG (no icon-font download).
