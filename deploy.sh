

#!/usr/bin/env bash
# deploy.sh: commit, push to main, then build and deploy
set -euo pipefail

[[ "$(git branch --show-current)" == "main" ]] || { echo "Switch to main first."; exit 1; }

# Stage everything
git add -A

# Nothing staged? Skip the commit but still allow push/deploy
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  read -r -p "Commit message: " msg
  while [[ -z "${msg// }" ]]; do
    read -r -p "Message can't be empty. Commit message: " msg
  done

  read -r -p "Second message (optional, press Enter to skip): " msg2

  if [[ -n "${msg2// }" ]]; then
    git commit -m "$msg" -m "$msg2"
  else
    git commit -m "$msg"
  fi
fi

echo "Pushing to main..."
git push origin main

echo "Running predeploy..."
npm run predeploy

echo "Running deploy..."
npm run deploy

echo "Done."