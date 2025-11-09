# Write Section

This directory contains the writing system for your website.

## How to Add New Writings

1. Drop `.txt` files into the `write/` folder
2. Run the build script: `node write/build-writings.js`
3. The writings will appear on your website, sorted by most recent first

## File Naming

- Filenames should use hyphens or underscores instead of spaces
- Example: `my-first-post.txt` or `thoughts_on_coding.txt`
- The filename will be converted to a title automatically
- Example: `my-first-post.txt` → "My First Post"

## Format

- Only `.txt` files are supported
- Content is displayed as-is with preserved formatting
- Each piece is separated by a horizontal divider

## Building

After adding new files, run:
```bash
cd /Users/aleksanderpappalardo/Documents/ALEK.FYI
node write/build-writings.js
```

This will regenerate the `writings-manifest.json` file with the latest content.
