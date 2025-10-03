# Archive: Original alek.fyi Site (Voice Notes App)
**Archived:** October 3, 2025
**Reason:** Rebuilding personal portfolio in kid-drawing aesthetic

---

## Site Overview

**Purpose:** WhatsApp-style voice notes player deployed to alek.fyi
**Tech Stack:** Vanilla HTML/CSS/JavaScript, Vercel deployment
**Theme:** Dark minimalist, WhatsApp-inspired UI

---

## Content Inventory

### Pages
- **index.html** - Single-page voice note player

### Features
1. **Voice Message Player**
   - WhatsApp-style green bubbles (#005c4b)
   - Play/pause controls
   - Animated waveform (30 bars)
   - Progress scrubbing with Hammer.js
   - Duration timer display

2. **Audio Effects**
   - Bass boost (Web Audio API)
   - Speed control (fast/slow)
   - Effect toggle buttons

3. **UI Elements**
   - Dark background (#0b141a) with subtle dot pattern
   - Message bubbles with WhatsApp tail
   - Responsive design (mobile-optimized)
   - Single-audio playback (stops others when playing)

### Audio Files Location
- `public/audio/` - Contains .mp3, .wav, .m4a files
- Filenames auto-parsed for titles (underscores/dashes → spaces)

---

## Design System

### Colors
- **Background:** #0b141a (dark blue-black)
- **Message bubble:** #005c4b (WhatsApp green)
- **Text primary:** #e9edef (off-white)
- **Text secondary:** #8696a0 (gray)
- **Text tertiary:** #d1d7db (light gray)

### Typography
- **Primary:** -apple-system, San Francisco
- **Mono:** SF Mono, Monaco (for duration timer)
- **Sizes:** 10-14px (small, mobile-first)

### Layout
- Max width: 600px
- Padding: 24px horizontal
- Mobile: Full-width with 4px padding
- Messages: Right-aligned (sent style)

### Components
1. **Voice bubble** - 7.5px border radius, box shadow
2. **Waveform** - 30 bars, 3px wide, varying heights
3. **Play button** - 32px circle, white overlay
4. **Effect buttons** - 22px height, uppercase, pill-shaped

---

## Technical Implementation

### Key JavaScript Classes
- **WhatsAppVoiceMessage** - Main voice player class
  - Audio management
  - Web Audio API for effects
  - Waveform progress tracking
  - Scrubbing with Hammer.js pan gestures

### Dependencies
- **Hammer.js** (2.0.8) - Touch/gesture handling for waveform scrubbing
- **Web Audio API** - Bass boost effect

### Vercel Configuration
- Simple static site deployment
- `vercel.json` for routing

---

## User Experience

### Interaction Flow
1. Page loads with voice message bubbles
2. User clicks play button → audio plays, waveform animates
3. User can scrub by dragging waveform
4. User can toggle bass/fast/slow effects
5. Only one message plays at a time

### Mobile Optimizations
- Touch-friendly tap targets (32px minimum)
- Pan gesture scrubbing
- Responsive bubble sizing
- Prevented zoom/scaling

---

## Files to Preserve

**Core Files:**
- index.html
- styles.css
- script.js

**Config:**
- package.json
- vercel.json
- README.md

**Assets:**
- public/audio/* (voice files)

---

## Potential Future Use

This voice notes player could become a section under **Music** or **Projects** in the new site:
- "Voice Memos" project
- "Audio Experiments" section
- Embedded in kid-style container like MIDI generator

---

## Migration Notes

**What to keep:**
- Voice player functionality (could be reused)
- WhatsApp-style UI pattern (good reference for future chat-style projects)

**What to change:**
- Rebrand from standalone site → portfolio project
- Wrap in kid-drawing aesthetic container
- Add navigation back to main portfolio

**Deployment:**
- Current Vercel deployment will be replaced
- Archive remains in `/ARCHIVE_OLD_SITE/` folder
- Git history preserved in repository

---

## End of Archive Documentation
