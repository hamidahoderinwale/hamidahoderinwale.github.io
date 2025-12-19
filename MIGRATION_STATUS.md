# Jekyll Migration Status

## ✅ Completed Setup

- [x] `_config.yml` - Jekyll configuration
- [x] `Gemfile` - Ruby dependencies
- [x] `_layouts/default.html` - Base layout
- [x] `_layouts/post.html` - Post template
- [x] `_layouts/blog.html` - Blog listing template
- [x] `blog/blog.html` - Updated to use Jekyll layout

## ✅ Migrated Posts (12 posts)

1. `2025-05-31-ondoingresearch.md` - On Doing Research
2. `2025-04-30-representationasstack.md` - Representation as Stack
3. `2025-04-19-ondoinganything.md` - On Doing Anything
4. `2025-03-30-amonthinquestions.md` - A Month in Questions
5. `2025-03-25-dcst.md` - Trying to Understand (Double) Categorical Systems Theory
6. `2025-02-17-consilience.md` - Notes on Consilience
7. `2024-12-31-anotheryear.md` - Another Year
8. `2024-12-27-representationsareallyouneed.md` - Representations Are All You Need
9. `2024-10-31-anotherone1.md` - Another One [1]
10. `2024-10-13-neuralrepresentations.md` - Neural Representations, Manifolds, and Motivations
11. `2024-09-27-digitallibraries.md` - A Short Post on Digital Libraries and More
12. `2023-05-27-bidding.md` - Edgy Bidding (draft)
13. `2023-05-08-inertia.md` - Inertia

## 📝 Remaining Posts to Migrate

Based on `blog/blog.html`, these posts still need migration:

### 2024 Posts
- [ ] `walden.html` - Walden by Henry David Thoreau: Reflections and Digressions (Sept 12, 2024)
- [ ] `scarry.html` - Scarry's Beauty (Aug 25, 2024)
- [ ] `pachinko.html` - Pachinko by Min Jin Lee: Reflections (Aug 9, 2024)
- [ ] `getgoodandcopy.html` - Get Good and Copy (Aug 2, 2024)
- [ ] `craft.html` - Episteme and Techne (July 11, 2024)
- [ ] `existentialismisahumanism.html` - Understanding Existentialism (July 6, 2024)
- [ ] `internationalsurnameconventions.html` - International Surname Conventions (July 5, 2024)
- [ ] `moralityandmission.html` - Morality and Mission (June 27, 2024)
- [ ] `fieldnotes.html` - Notes on Notes on Science and Nature by Michael R. Canfield (June 19, 2024)
- [ ] `systems.html` - CompSys (May 26, 2024)
- [ ] `firstyear.html` - Reflections in a list. (May 16, 2024)
- [ ] `letsdoit.html` - Let's Do It. (April 17, 2024)
- [ ] `4years.html` - 4 Years (April 2, 2024)
- [ ] `new.html` - Another One (April 1, 2024)
- [ ] `howl.html` - Howl: A Prosaic Attempt (March 14, 2024)
- [ ] `tchiang.html` - Ted Chiang (January 4, 2024)

### 2023 Posts
- [ ] `2023.html` - 2023: Everything That Comes to Mind (Dec 26, 2023)
- [ ] `cominginsurrection.html` - A Book to Feel Again and a Side of Laufey: The Coming Insurrection (Nov 23, 2023)
- [ ] `starting.html` - Life As of Now (October 2023) (Oct 14, 2023)
- [ ] `summer.html` - Reflections from the last week of summer (Aug 20, 2023)
- [ ] `iwantafrenchsalon.html` - I Want A French Salon (Aug 15, 2023)
- [ ] `aesthetics.html` - A Sense of Aesthetics (Aug 8, 2023)
- [ ] `latin.html` - Latin America Flew Just Under my Radar (Aug 3, 2023)
- [ ] `myhomoeconomics.html` - Econ Notepad (Aug 2, 2023)
- [ ] `rabbit-duck.html` - Rabbit-Duck (July 27, 2023)
- [ ] `highschool.html` - So it's over? (me in a nutshell) (June 6, 2023)
- [ ] `stubborn.html` - Stubborn Attachments (May 22, 2023)
- [ ] `stupidwriting.html` - Stupid Writing (May 16, 2023)
- [ ] `poetrydefence.html` - In Defence of Poetry (May 13, 2023)
- [ ] `100-questions.html` - 100 Questions (April 2023)

### 2022 Posts
- [ ] `philosophybanter.html` - Philosophy Banter (Nov 2, 2022)

### Special Pages
- [ ] `whoosh.html` - The deeper ends (special link, may not need migration)

## 🚀 Next Steps

1. **Test the setup locally:**
   ```bash
   bundle install
   bundle exec jekyll serve
   ```

2. **Continue migrating posts** - You can migrate them gradually or all at once

3. **Deploy to GitHub Pages:**
   ```bash
   git add .
   git commit -m "Migrate to Jekyll"
   git push
   ```

4. **Verify** - Check that:
   - Posts appear in blog listing
   - RSS feed works at `/feed.xml`
   - Post pages render correctly

## 📋 Migration Pattern

For each HTML file:
1. Extract title from `<h2>` or `<title>`
2. Extract date from `<i>` tag (format: "Month Day, Year")
3. Convert date to YYYY-MM-DD format
4. Extract content (remove HTML boilerplate)
5. Create `_posts/YYYY-MM-DD-slug.md` with frontmatter
6. Convert HTML to Markdown where possible

## Notes

- External posts (Bear Blog, HackMD, Substack) are manually maintained in `_layouts/blog.html`
- Old HTML files can remain in `blog/` directory during transition
- RSS feed is automatically generated at `/feed.xml` (replaces manual `rss.xml`)



