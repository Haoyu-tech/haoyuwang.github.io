# Reproduction guide

## Preview

Run from the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/` and `http://127.0.0.1:8000/cv.html`. This is a static site with no build step.

## Validation and hosting

Check homepage/CV navigation at desktop and mobile widths and inspect failed network requests for external resources. Local HTML availability does not establish that every remote font or link is reachable.

Deploy the root HTML files. Confirm the actual GitHub Pages source and URL; the repository name is not the account-level `Haoyu-tech.github.io` name. No deployment settings were changed during cleanup.

## Run record

For every result you intend to compare or share, retain the repository commit, exact command/configuration, input-data identity, environment versions and output location. Save a dependency snapshot after a successful reference run; newly added requirements lists are intentionally unpinned until that validation exists.

## Validation status

Cleanup review: 14 October 2026. File paths and documented entry points were checked against the checkout. Full empirical results were not regenerated. Project-specific external prerequisites and known blockers are listed above.
