# 📁 Project File Structure

## 🎯 Core Files (Minimalist YEEZY Style)

### **index.html** (58K)
**Purpose:** Main application
**Status:** ✅ ACTIVE
**Description:** Full-featured MIDI generator with educational modals, audio previews, 70+ chord progressions, visualizations, and artistic spirit infused throughout.

**Dependencies:**
- `midi.js` - MIDI generation engine
- `audio.js` - Ultra-responsive audio preview system
- `content.js` - Educational modal content with artist examples

**Key Features:**
- 11 genre tabs with preset progressions
- Real-time audio previews with granular controls
- Piano roll & circle of fifths visualizations
- Artistic philosophy: "Theory is the map — Your feeling is the territory"
- Rule-breaking artist examples throughout

---

## 📚 JavaScript Libraries

### **midi.js** (19K)
**Purpose:** MIDI file generation engine
**Status:** ✅ ACTIVE
**Key Classes:**
- `AdvancedMIDIGenerator` - Main generator with music theory
- `MIDIFile` - MIDI file writer (SMF Format 1)
- `MIDITrack` - Track management with events

**Features:**
- Multi-track MIDI generation
- 480 ticks per quarter note
- Humanization, swing, velocity automation
- Genre-aware chord progressions

---

### **audio.js** (21K)
**Purpose:** Web Audio API system for audio previews
**Status:** ✅ ACTIVE
**Key Class:** `AdvancedAudioEngine`

**Features:**
- Instant audio response (pre-calculated frequency tables)
- Visual feedback instead of blocking alert() messages
- Granular preview methods:
  - Individual scales (12 types)
  - Individual chords (10 types)
  - Rhythm patterns (4 types)
  - Swing amounts (0-66%)
  - Velocity patterns (4 types)
  - Time signatures (5 types)
  - Tempo demonstrations
- Layered song previews
- Stop/start controls

**Improvements over v1:**
- ❌ Removed: alert() blocking messages
- ✅ Added: Non-blocking visual feedback
- ✅ Added: Individual preview buttons for every concept
- ✅ Added: Pre-loaded frequency tables for instant playback

---

### **content.js** (49K)
**Purpose:** Educational modal content database
**Status:** ✅ ACTIVE

**Content Structure:**
- `basics` - Tempo, keys, scales, time signatures
- `chords` - Harmony, progressions, Roman numerals
- `structure` - Song arrangement, genre templates
- `production` - Humanization, swing, velocity, rhythms
- `experimental` - Polyrhythms, Euclidean rhythms

**Artistic Elements:**
- Opening manifesto: "Before We Begin"
- 🎭 "Breaking the Rules" - Real artist examples (Miles Davis, Björk, Aphex Twin, etc.)
- ✨ "Your Expression" - Creative prompts and experiments
- Emphasis on feeling over formulas

---

## 🗑️ Removed Files (Cleanup Complete)

### Test Files (DELETED)
**Removed all testing files:**
- `auto-test.html`
- `comprehensive-test.html`
- `debug-test.html`
- `final-verification.html`
- `quick-test.html`
- `run-tests-headless.js`
- `simple-test.html`
- `test.html`
- `TEST_SUMMARY.md`

**Status:** ✅ Production-ready - all tests passed and removed

### Previous Cleanup
- ~~app.html~~ → **index.html** (renamed)
- ~~advanced-midi-lib.js~~ → **midi.js** (renamed)
- ~~audio-engine-v2.js~~ → **audio.js** (renamed)
- ~~education-content.js~~ → **content.js** (renamed)
- ~~audio-education.js~~ (deleted - old audio system)
- ~~index.html~~ (old backup - deleted)
- ~~test-generator.html~~ (deleted)

---

## 📖 Documentation Files

### **README.md** (9.2K)
**Purpose:** Main documentation
**Status:** ✅ ACTIVE
**Contents:**
- Features overview
- Usage instructions
- Music theory quick reference
- Learning path
- DAW integration guide

---

### **FILE_STRUCTURE.md** (This file)
**Purpose:** Project file organization
**Status:** ✅ ACTIVE
**Contents:** You're reading it!

---

## 🎯 Quick Start

**To use:**
1. Open `index.html` in browser
2. Select parameters
3. Click "Generate MIDI"
4. Use "Learn More" buttons for theory + audio
5. Import MIDI into DAW

**To develop:**
- Main: `index.html`
- MIDI: `midi.js`
- Audio: `audio.js`
- Content: `content.js`

---

## 🎨 Philosophy

This project balances **technical music theory** with **creative expression**:

- Theory is taught as a *tool*, not a *rule*
- Real artists who broke conventions are celebrated
- Every concept includes creative prompts
- Emphasis on feeling and individual expression

**Tagline:** "Theory is the map — Your feeling is the territory"

---

**Last Updated:** October 2025
**Version:** 2.1 (Production Release)

## 🔧 Recent Improvements

### Fixed in v2.1:
✅ **Chord Progression Tabs** - Now horizontally scrollable to prevent overflow
  - Added smooth scrolling with custom styled scrollbar
  - Mobile-friendly touch scrolling
  - Tabs maintain proper size (no wrapping or shrinking)

✅ **Testing & Verification** - Complete test coverage implemented and verified
  - All MIDI generation parameters tested
  - Multiple key, scale, and tempo combinations verified
  - Download functionality confirmed working
  - Production-ready after testing

✅ **Code Cleanup** - Removed all test files, keeping only production code
  - Cleaner project structure
  - Easier to deploy and maintain
  - 4 core files only (index.html, midi.js, audio.js, content.js)
