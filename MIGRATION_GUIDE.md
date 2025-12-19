# Jekyll Migration Guide

This guide will help you migrate your blog from individual HTML files to Jekyll, which will make content management much easier.

## What Jekyll Provides

- **Automatic post listing**: No need to manually update `blog.html` with new posts
- **RSS feed generation**: Automatic RSS feed at `/feed.xml` (replaces manual `rss.xml`)
- **Markdown support**: Write posts in Markdown instead of HTML
- **Template system**: Reusable layouts for consistent design
- **GitHub Pages native support**: Works seamlessly with GitHub Pages

## Setup Steps

### 1. Install Jekyll (if not already installed)

```bash
gem install bundler
bundle install
```

### 2. Test Locally

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` to see your site.

### 3. Migrate Posts

#### Option A: Convert HTML to Markdown (Recommended)

1. Create a new file in `_posts/` with the format: `YYYY-MM-DD-slug.md`
2. Add frontmatter at the top:
   ```yaml
   ---
   title: "Your Post Title"
   date: YYYY-MM-DD
   layout: post
   ---
   ```
3. Copy the content from your HTML file (without the HTML structure)
4. Convert HTML tags to Markdown where possible

#### Option B: Keep HTML Posts

You can keep HTML files in `_posts/` directory with `.html` extension. Just add frontmatter:

```html
---
title: "Your Post Title"
date: 2023-05-27
layout: post
---
<!DOCTYPE html>
<html>
<!-- your existing HTML -->
```

### 4. Blog Listing Page

The `blog/blog.html` file has been updated to use Jekyll's `blog.html` layout, which automatically lists all posts from `_posts/`. You can still manually add external links for posts hosted elsewhere (Bear Blog, HackMD, etc.).

### 5. Deploy to GitHub Pages

1. Commit all changes:
   ```bash
   git add .
   git commit -m "Migrate to Jekyll"
   git push
   ```

2. GitHub Pages will automatically build your site. It may take a few minutes.

3. Your site will be available at `https://hamidahoderinwale.github.io`

## File Structure

```
.
├── _config.yml          # Jekyll configuration
├── _layouts/            # HTML templates
│   ├── default.html     # Base layout
│   ├── post.html        # Blog post layout
│   └── blog.html        # Blog listing layout
├── _posts/              # Blog posts (YYYY-MM-DD-title.md)
├── blog/                # Existing blog files (can keep for now)
├── index.html           # Homepage
└── Gemfile              # Ruby dependencies
```

## Post Naming Convention

Posts must be named: `YYYY-MM-DD-slug.md` or `YYYY-MM-DD-slug.html`

Examples:
- `2025-05-31-ondoingresearch.md`
- `2023-05-27-bidding.md`

## Frontmatter Options

```yaml
---
title: "Post Title"           # Required
date: 2025-05-31              # Required (YYYY-MM-DD)
layout: post                  # Optional (defaults to post)
draft: true                   # Optional (marks as draft)
subtitle: "Optional subtitle" # Optional
---
```

## Migrating Existing Posts

### Quick Migration Steps

1. For each HTML file in `blog/`:
   - Extract the title (from `<h2>` or `<title>`)
   - Extract the date (from `<i>` tags or filename)
   - Extract the content (body text)
   - Create `_posts/YYYY-MM-DD-slug.md` with frontmatter and content

2. Test locally: `bundle exec jekyll serve`

3. Verify all posts appear in the blog listing

### Sample Migration

**Before (HTML):**
```html
<h2>On Doing Research</h2>
<p><i>Saturday, May 31, 2025</i></p>
<p>Content here...</p>
```

**After (Markdown):**
```markdown
---
title: "On Doing Research"
date: 2025-05-31
layout: post
---

Content here...
```

## RSS Feed

Jekyll automatically generates an RSS feed at `/feed.xml` (replaces your manual `rss.xml`). The `jekyll-feed` plugin handles this.

You can redirect the old RSS feed by creating a redirect in `rss.xml` or updating external references.

## Customization

### Styling

Your existing CSS files (`site.css`, `blog.css`) will continue to work. They're referenced in the layouts using:

```liquid
<link rel="stylesheet" href="{{ '/blog.css' | relative_url }}">
```

### Navigation

Update navigation links in `_layouts/default.html` to match your site structure.

### Permalinks

Posts will be available at `/blog/postname/` by default. You can customize this in `_config.yml`:

```yaml
collections:
  posts:
    permalink: /blog/:name/  # Current setting
    # Or use: /:year/:month/:day/:title/
```

## Benefits After Migration

1. **New posts**: Just create a markdown file in `_posts/` - it automatically appears in listings
2. **Consistent design**: All posts use the same layout template
3. **Easy editing**: Markdown is easier to write than HTML
4. **Automatic RSS**: No manual RSS updates needed
5. **Better organization**: Posts organized by date automatically

## Troubleshooting

### Jekyll not building
- Check `_config.yml` for syntax errors
- Ensure `Gemfile` is present and `bundle install` was run

### Posts not appearing
- Check file naming: must be `YYYY-MM-DD-title.md`
- Check frontmatter: must have `title` and `date`
- Check `_config.yml`: ensure `collections.posts` is configured

### Styling issues
- Ensure CSS paths use `{{ '/path.css' | relative_url }}`
- Check that CSS files are in the root or correct directory

### GitHub Pages not updating
- Check GitHub Actions/Pages settings
- Ensure `Gemfile` is committed
- Wait a few minutes for build to complete

## Next Steps

1. **Migrate remaining posts** - You can do this gradually
2. **Test locally** - Make sure everything works before pushing
3. **Update external links** - If you change URLs, update any external references
4. **Remove old HTML files** - Once migrated, you can delete old HTML files from `blog/` directory (optional)

## Example: Creating a New Post

1. Create `_posts/2025-06-15-my-new-post.md`
2. Add frontmatter:
   ```yaml
   ---
   title: "My New Post"
   date: 2025-06-15
   ---
   ```
3. Write content in Markdown
4. Save and push to GitHub
5. Post automatically appears in blog listing and RSS feed!

## Need Help?

- Jekyll docs: https://jekyllrb.com/docs/
- GitHub Pages docs: https://docs.github.com/en/pages
- Jekyll community: https://talk.jekyllrb.com/



