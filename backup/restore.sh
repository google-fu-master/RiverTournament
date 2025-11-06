#!/bin/bash

# River Tournament Website Quick Restore Script
# Created: November 6, 2025
# Usage: ./restore.sh

echo "🚨 River Tournament Website Emergency Restore"
echo "This will restore the website to the last known working state"
echo ""

# Ask for confirmation
read -p "Are you sure you want to restore? This will overwrite current files. (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Restore cancelled"
    exit 1
fi

echo "📁 Backing up current state..."
BACKUP_DIR="emergency-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r assets/scss/_variables.scss assets/scss/_components.scss assets/scss/_rules.scss faq.html index.html rules.md "$BACKUP_DIR/" 2>/dev/null

echo "🔄 Restoring files from backup..."

# Restore critical files
cp backup/_variables.scss assets/scss/
cp backup/_components.scss assets/scss/
cp backup/_rules.scss assets/scss/
cp backup/faq.html .
cp backup/index.html .
cp backup/rules.md .
cp backup/styles.css assets/
cp backup/styles.css.map assets/

echo "🏗️  Rebuilding Jekyll site..."
bundle exec jekyll build

if [ $? -eq 0 ]; then
    echo "✅ Website restored successfully!"
    echo "📋 Current backup saved in: $BACKUP_DIR"
    echo "🌐 Test your website locally with: bundle exec jekyll serve"
else
    echo "❌ Jekyll build failed. Check the logs above."
    exit 1
fi