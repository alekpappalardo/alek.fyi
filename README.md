# Alek, with a K

Personal portfolio website with kid-drawing aesthetic.

## Structure

```
alek.fyi/
├── index.html              # Homepage with 5 section words
├── music/
│   └── index.html         # Music section (placeholder)
├── code/
│   ├── index.html         # Code projects listing
│   └── midi-generator/
│       ├── index.html     # Kid-style wrapper
│       ├── app.html       # MIDI generator app
│       ├── midi.js
│       ├── audio.js
│       └── content.js
├── film/
│   └── index.html         # Film section (placeholder)
├── photo/
│   └── index.html         # Photo section (placeholder)
├── writing/
│   └── index.html         # Writing section (placeholder)
└── ARCHIVE_OLD_SITE/      # Archived voice-notes-app
```

## Design

**Aesthetic:** Kid drawing / crayon scribbles
- Primary colors with thick borders
- Irregular hand-drawn shapes (border-radius variations)
- Paper texture with ruled lines
- Comic Sans font
- No animations (simple click navigation)

**Color Palette:**
- Music: Blue (#2196F3)
- Code: Green (#4CAF50)
- Film: Orange (#FF9800)
- Photo: Purple (#9C27B0)
- Writing: Red (#F44336)
- Title: Red (#FF1744)

## Local Testing

Open `index.html` in your browser:
```bash
open index.html
```

Or use Python server:
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy from this directory:
```bash
cd /Users/aleksanderpappalardo/Documents/dk/alek.fyi
vercel
```

3. Follow prompts:
   - Login to your Vercel account
   - Set up project
   - Deploy

4. Domain will be automatically assigned or you can use custom domain `alek.fyi`

## Features

### Homepage
- "Alek, with a K" title (clickable to return home)
- 5 section words with irregular borders
- Emoji decorations per section
- Hover effects (scale + shadow)

### Code Section
- Project listing with green theme
- MIDI Generator housed in irregular container
- Iframe integration keeps original app intact

### MIDI Generator
- Full music theory-based MIDI file generator
- Piano roll & circle of fifths visualizations
- Housed in kid-style wrapper with green border
- Back button to Code section

### Other Sections
- Coming soon placeholders
- Color-coded per section
- Same kid aesthetic

## Future Additions

Add projects to each section by:
1. Create project folder in section directory
2. Add project card to section's index.html
3. Link to project page

## Notes

- All styling inline (no external CSS files)
- No JavaScript frameworks (vanilla)
- Fully responsive (mobile-friendly)
- Paper texture background on all pages
- "Alek, with a K" title on every page

---

Built with ❤️ and Comic Sans
