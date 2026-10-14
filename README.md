# Haoyu Wang — Personal Website

[Reproduction guide](docs/REPRODUCIBILITY.md) · [Code and artifact map](docs/REPOSITORY_MAP.md)

Static personal website and CV pages.

## Files

- [index.html](index.html): homepage.
- [cv.html](cv.html): CV page.
- [Reproduction and preview guide](docs/REPRODUCIBILITY.md).

## Local preview

No Node.js build or Python package dependencies are required. Python is used only as a local web server:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/` and `http://127.0.0.1:8000/cv.html`. Verify navigation, mobile layout, images and external links before deployment. Remote fonts or other linked resources may require internet access.

## Hosting

Deploy the root HTML files as static assets. The repository name differs from `Haoyu-tech.github.io`, so do not assume it is the account-level GitHub Pages site. Confirm the configured Pages source and actual deployment URL in repository settings.
