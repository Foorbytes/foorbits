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

- `index.html` is the whole site: one self-contained page (its styles and script are inside it), plus the pictures in `img/`.
- Featured models are the `MODELS` array at the top of the script in `index.html`, one line per model (name, hook, collection, picture, link).
- `CNAME` and `.nojekyll` serve the page on foorbits.com through GitHub Pages.

Model imagery and designs are © Foorbits. The website source is maintained for the official Foorbits site.
