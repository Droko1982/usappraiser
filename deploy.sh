#!/usr/bin/env bash
#
# Build US Appraiser and publish it to GitHub Pages (gh-pages branch).
# Usage:  npm run deploy      (or)   bash deploy.sh
#
set -e
cd "$(dirname "$0")"

REPO="https://github.com/Droko1982/usappraiser.git"
OUT="dist/quote_appraisal/browser"

echo "▶ Building (base-href /usappraiser/) …"
# MSYS_NO_PATHCONV=1 stops Git Bash from mangling the leading-slash base-href on Windows.
MSYS_NO_PATHCONV=1 npx ng build --base-href /usappraiser/

echo "▶ Preparing GitHub Pages output …"
cd "$OUT"
cp index.html 404.html      # SPA fallback so deep links (e.g. /appraisal/miami) work
touch .nojekyll             # let Pages serve files/folders that start with _

echo "▶ Publishing to gh-pages …"
rm -rf .git
git init -b gh-pages -q
git add -A
git -c core.autocrlf=false -c commit.gpgsign=false commit -q -m "Deploy US Appraiser to GitHub Pages"
git remote add origin "$REPO"
git push -f -q origin gh-pages

echo "✓ Deployed → https://droko1982.github.io/usappraiser/"
