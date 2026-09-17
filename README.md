# Red Teaming & Penetration Testing Portfolio

A fast, mostly dependency-free (no frameworks, no build step) personal portfolio
site. Currently positioned around **Red Teaming, Penetration Testing and
Offensive Security**, built on top of a SOC / Blue Team cybersecurity
foundation. Pure HTML5, CSS3 and vanilla JavaScript, plus a small optional
3D background powered by Three.js (loaded from a CDN, not bundled).

## Files

```
portfolio/
├── index.html      → all page content and structure
├── style.css       → all styling, layout, responsive rules, animations
├── script.js       → config, behaviour, and the 3D background
├── favicon.svg      → browser-tab icon
├── README.md        → this file
└── assets/
    ├── resume.pdf    → your résumé (linked from the Résumé section)
    └── profile.jpg   → your photo (used in the About section)
```

## 1. Personalise the content

Open `script.js` and edit the `CONFIG` object at the very top — this is the
only place personal details need to change, and they propagate automatically
to the hero, about, contact and footer sections:

```js
const CONFIG = {
  name: "ABAIDULLAH",
  initials: "ubi.sec",
  roles: ["Red Teaming", "Penetration Testing", "Offensive Security", "Ethical Hacking", "Cybersecurity"],
  email: "abaidullahali92@gmail.com",
  github: "https://github.com/ubi-sec",
  linkedin: "https://www.linkedin.com/in/abaid-ullah-1229492ba/",
  location: "Faisalabad Pakistan",
  availability: "Open to Red Team, Penetration Testing & Cybersecurity opportunities",
  resumePath: "assets/resume.pdf",
  htbProfile: "https://profile.hackthebox.com/profile/...",
  thmProfile: "https://tryhackme.com/p/ABAIDULLAH",
  thmUsername: "ABAIDULLAH"
};
```

## 2. What's real vs. what's still a placeholder

**Already real — reflects your actual stated certifications, training and
skills:**
- Certifications & Training section (5 completed certs + 3 in-progress items)
- Skills section (Offensive Security / Cybersecurity Foundation / Blue Team)
- Hero and Red Team section statistics (6 / 16 / 7 and 5 / 1 / 4)

**Still template content — search this file for the word `EDIT`:**
- About section — the degree/program line
- Résumé timeline — education and work-experience entries
- Projects section — 3 cards marked "Planned", ready for real write-ups
- Hero "Recent activity" panel — generic activity lines

Replace each as it becomes real. Nothing above claims professional
experience, clients, or completed projects that don't exist yet — keep it
that way as you fill things in.

## 3. Page structure

Sections, in order: Hero → About → Red Team (offensive security practice) →
Labs → Projects → Skills → Certifications & Training → Résumé → Contact.
Nav links: About, Red Team, Labs, Projects, Skills, Certifications, Résumé,
Contact.

## 4. The 3D background

A small Three.js scene (a slowly drifting node network) renders behind the
page. Notes on how it behaves:
- It's loaded from `cdnjs.cloudflare.com` only when a visitor doesn't have
  "reduce motion" set in their OS/browser — reduced-motion visitors never
  download it at all.
- If the CDN is blocked or the visitor is offline, it fails silently and the
  page's static background pattern is shown instead — nothing else breaks.
- Particle count and pixel ratio are scaled down automatically on narrow
  (mobile) screens for performance.
- It sits behind all content with `pointer-events: none`, so it never
  blocks clicks, taps, or text selection.

## 5. Add your résumé and photo

Put `resume.pdf` and `profile.jpg` in `assets/` — the résumé buttons and the
About-section photo already point there.

## 6. Run it locally

No build tools needed — it's static HTML/CSS/JS.

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .
```

Then visit `http://localhost:8000`.

## 7. Deploy

Push `index.html`, `style.css`, `script.js`, `favicon.svg` and `assets/` to
your GitHub repo (keep the same file names and folder structure). Any static
host works from there — GitHub Pages, Cloudflare Pages, Netlify, Vercel, etc.
No server-side code or environment variables are required.

## 8. Contact form

Validates in the browser, then opens the visitor's email client with the
message pre-filled (`mailto:`) — works with zero backend. To collect
submissions directly instead, connect a service like Formspree or EmailJS
and replace the body of `initContactForm()`'s submit handler in `script.js`.

## 9. Accessibility & performance

- Semantic HTML5 landmarks, a skip-to-content link, and visible keyboard
  focus states throughout.
- Respects `prefers-reduced-motion` everywhere — including skipping the 3D
  background entirely, not just slowing it down.
- Icons are inline SVG (no icon-font download); fonts load with
  `font-display: swap`.
