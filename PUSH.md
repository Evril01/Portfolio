How to push local changes to GitHub

1) Option A — Quick commands (replace with your repo URL):

```bash
# from project root
git status
git add -A
git commit -m "Update: add in-page anchors and smooth scrolling"
# create main branch (optional)
git branch -M main
# add remote (replace URL)
git remote add origin https://github.com/<USERNAME>/<REPO>.git
# push
git push -u origin main
```

2) Option B — Use the included PowerShell helper (Windows):

```powershell
# from project root
.\scripts\push-to-github.ps1 -RemoteUrl "https://github.com/your-username/your-repo.git"
```

Notes:
- If your repo already has a remote named `origin`, use `git remote set-url origin <url>` instead of `git remote add`.
- For HTTPS pushes you'll be prompted for GitHub credentials; consider using a personal access token or SSH keys for smoother auth.
- To create a GitHub repo from the web: go to https://github.com/new, create the repo, then use the URL shown on that page.
