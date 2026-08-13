# Portfolio

This repository contains a static portfolio site (HTML/CSS/JS). Steps to publish:

1. Create a GitHub repository (use `gh` or GitHub web UI).
2. Add the remote and push the `main` branch:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Or using GitHub CLI:

```bash
gh repo create <repo-name> --public --source=. --remote=origin --push
```

The included GitHub Actions workflow will deploy the site to GitHub Pages on pushes to `main`.
