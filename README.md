# Foorbits 3D

A playful, responsive static website for **Foorbits 3D**. It introduces the Foorbits model lines, highlights selected MakerWorld models, and explains the commercial-license and member benefits available through Patreon.

## Preview locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Publish with GitHub Pages

A Pages deployment workflow is included at `.github/workflows/pages.yml`.

After the site branch is merged into `main`, open the repository's **Settings → Pages** and set **Source** to **GitHub Actions**. Future pushes to `main` will deploy automatically.

## Site structure

- `index.html` — page content and external profile links
- `styles.css` — responsive visual design
- `script.js` — mobile navigation, reveal effects, image fallbacks, and the interactive printer status
- `.nojekyll` — serves the static files directly through GitHub Pages

Model imagery and designs are © Foorbits. The website source is maintained for the official Foorbits site.
