# PowerShell helper to commit and push current project to GitHub
# Usage: Open PowerShell in the project folder and run: .\scripts\push-to-github.ps1

param(
    [string]$RemoteUrl = "https://github.com/<USERNAME>/<REPO>.git",
    [string]$Branch = "main",
    [string]$CommitMessage = "Update: add in-page anchors and smooth scrolling"
)

# Check if git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or not in PATH. Install Git and try again."
    exit 1
}

# Initialize repo if needed
if (-not (Test-Path .git)) {
    git init
}

# Add changes
git add -A

# Commit (skip if no changes)
$diff = git status --porcelain
if ($diff) {
    git commit -m "$CommitMessage"
} else {
    Write-Host "No changes to commit."
}

# Set branch
git branch -M $Branch

# Add or update remote
$existing = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote 'origin' already exists: $existing"
    Write-Host "To change it, run: git remote set-url origin <new-url>"
} else {
    if ($RemoteUrl -match "<USERNAME>|<REPO>") {
        Write-Host "Please edit the script or pass a real GitHub repo URL as -RemoteUrl"
    } else {
        git remote add origin $RemoteUrl
    }
}

# Push
Write-Host "Pushing to origin/$Branch (you may be prompted for credentials)..."
git push -u origin $Branch

Write-Host "Done. If push failed, check remote URL and your credentials."