# River Tournament Website Backup & Restoration Guide

## 📁 Backup Information

**Backup Created:** November 6, 2025  
**Git Commit:** 766d7c6 (Restore website from backup commit 29496ea and fix missing CSS color variables)  
**Website Status:** ✅ Working - All styling issues resolved  
**Jekyll Version:** 4.4.1  

## 🎯 What This Backup Contains

This backup contains a fully working version of the River Tournament website with:
- ✅ Proper off-white text coloring (no more dark text issues)
- ✅ All CSS color variables properly defined
- ✅ Clean, formatted HTML structure
- ✅ Working Jekyll build system
- ✅ All tournament pages functional

## 🚨 Emergency Restoration Instructions

### Quick Restore (Git Method)
If the website breaks and you need to quickly restore to this working state:

```bash
# Navigate to the project directory
cd /path/to/RiverTournament

# Create a backup branch of current state (optional but recommended)
git checkout -b emergency-backup-$(date +%Y%m%d-%H%M%S)
git add -A
git commit -m "Emergency backup before restoration"

# Return to main branch and restore to working commit
git checkout main
git reset --hard 766d7c6

# Rebuild the site
bundle exec jekyll build

# If you want to push the restoration (BE CAREFUL - this overwrites history)
# git push --force-with-lease origin main
```

### File-by-File Restoration
If you need to restore specific files only, use the backup files in this directory:

```bash
# Copy specific files from backup
cp backup/[filename] ./[filename]

# Rebuild Jekyll site
bundle exec jekyll build
```

## 🔧 Critical Files for Styling

These files are essential for proper website appearance:

### `/assets/scss/_variables.scss`
**CRITICAL:** Contains color variable definitions. Must include:
```scss
--off-white: #f5f5f5;
--cool-link: #d4af37;
--cool-link-hover: #a47f00;
```

### `/assets/scss/_components.scss`
Contains button styles, layout components, and general styling rules.

### `/assets/scss/_rules.scss`
Contains tournament rules page specific styling.

### `/faq.html`
FAQ page with proper formatting and structure.

## 🏗️ Rebuild Process

After any file restoration:

```bash
# Install dependencies (if needed)
bundle install

# Build the site
bundle exec jekyll build

# Serve locally for testing (optional)
bundle exec jekyll serve
```

## ⚠️ Common Issues & Solutions

### Issue: Dark text instead of off-white
**Cause:** Missing CSS color variables  
**Solution:** Restore `_variables.scss` and ensure these variables exist:
- `--off-white: #f5f5f5;`
- `--cool-link: #d4af37;`
- `--cool-link-hover: #a47f00;`

### Issue: Jekyll build fails
**Cause:** Missing dependencies or corrupted files  
**Solution:** 
```bash
bundle install
bundle exec jekyll clean
bundle exec jekyll build
```

### Issue: Styling completely broken
**Cause:** Corrupted SCSS files  
**Solution:** Restore all files from this backup directory

## 📋 File Manifest

This backup includes these critical files:
- `_variables.scss` - Color definitions and CSS variables
- `_components.scss` - Component styling
- `_rules.scss` - Rules page styling  
- `faq.html` - FAQ page structure
- `index.html` - Home page structure
- `rules.md` - Rules content
- `styles.css` - Compiled CSS (generated)
- `styles.css.map` - CSS source map (generated)

## 🔍 Verification Steps

After restoration, verify the website works by:

1. **Build Check:** `bundle exec jekyll build` completes without errors
2. **Visual Check:** Text appears off-white, not dark
3. **Navigation Check:** All pages load properly
4. **Responsive Check:** Site works on mobile and desktop

## 📞 Emergency Contacts

If you need help with restoration:
- Check git log for working commits: `git log --oneline`
- Compare with this working commit: `git diff 766d7c6`
- This backup was created after resolving the major styling crisis of November 6, 2025

## 📅 Backup History

- **November 6, 2025:** Major restoration from commit 29496ea, fixed missing color variables
- **November 5, 2025 8:54pm:** Last known good state before styling issues

---

*This backup system was created after successfully resolving critical website styling issues. Keep this README updated when making significant changes.*