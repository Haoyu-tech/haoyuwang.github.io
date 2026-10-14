<div align="center">

# Haoyu Wang

A personal website for research, experience and academic work.

![Format: Static HTML](https://img.shields.io/badge/Format-Static%20HTML-E34F26?style=flat-square) ![Build: No compilation](https://img.shields.io/badge/Build-No%20compilation-0F766E?style=flat-square) ![Pages: Home + CV](https://img.shields.io/badge/Pages-Home%20%2B%20CV-64748B?style=flat-square)

[Quick start](#quick-start) · [Project map](#project-map) · [Reproduction guide](docs/REPRODUCIBILITY.md)

</div>

---

## Overview

A lightweight static website with a homepage and a dedicated CV page. The HTML files can be previewed locally without a JavaScript build tool.

## Quick start

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open the homepage at `http://127.0.0.1:8000/` and the CV at `http://127.0.0.1:8000/cv.html`.

## Project map

| File | Purpose |
|---|---|
| [index.html](index.html) | Homepage, research and experience |
| [cv.html](cv.html) | CV page |

## Preview checklist

- Check homepage and CV navigation.
- Review desktop and mobile layouts.
- Confirm external links, fonts and images load as intended.

Remote resources may require internet access.

## Hosting

Publish the root HTML files as static assets. Confirm the configured Pages source and deployment URL: this repository is not named `Haoyu-tech.github.io`, so its name alone does not imply an account-level GitHub Pages address.

## Documentation

- [Reproduction guide](docs/REPRODUCIBILITY.md): inputs, execution order and validation limits.
- [Code and artifact map](docs/REPOSITORY_MAP.md): source and configuration paths.

<sub>Research artifacts reflect the recorded experiment settings. Full results were not regenerated during documentation cleanup.</sub>
