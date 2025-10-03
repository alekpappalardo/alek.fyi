// Advanced MIDI Generator Library
// Handles multi-track song generation with music theory

class AdvancedMIDIGenerator {
    constructor(params) {
        console.log('🎹 MIDI Generator initialized with params:', params);
        this.params = this.sanitizeParams(params);
        this.ticksPerBeat = 480;
        this.maxNotes = 10000; // Safety limit: max notes in entire file
        this.totalNotesGenerated = 0;

        try {
            this.sections = this.buildSongStructure();
            console.log('✅ Song structure built:', this.sections);
            this.scale = this.getScaleNotes();
            console.log('✅ Scale notes generated:', this.scale.length, 'notes');
            this.chords = this.buildChordProgression();
            console.log('✅ Chord progression built:', this.chords);
        } catch (error) {
            console.error('❌ Error in constructor:', error);
            throw error;
        }
    }

    sanitizeParams(params) {
        console.log('🔧 Sanitizing parameters...');
        const safe = { ...params };

        // Cap song structure to prevent massive files
        safe.numVerses = Math.min(Math.max(parseInt(safe.numVerses) || 2, 0), 8);
        safe.numChorus = Math.min(Math.max(parseInt(safe.numChorus) || 3, 0), 8);

        // Cap tempo to reasonable range
        safe.tempo = Math.min(Math.max(parseInt(safe.tempo) || 120, 40), 300);

        // Ensure humanization/swing/density are in valid range
        safe.humanization = Math.min(Math.max(parseInt(safe.humanization) || 50, 0), 100);
        safe.swing = Math.min(Math.max(parseInt(safe.swing) || 0, 0), 100);
        safe.density = Math.min(Math.max(parseInt(safe.density) || 50, 0), 100);

        // Calculate total expected bars and warn if too large
        let totalBars = 0;
        totalBars += safe.includeIntro ? 4 : 0;
        totalBars += safe.includeBuildup ? 4 : 0;
        totalBars += (safe.numVerses * 8);
        totalBars += safe.includeDrop ? 8 : 0;
        totalBars += (safe.numChorus * 8);
        totalBars += safe.includeBreakdown ? 8 : 0;
        totalBars += safe.includeBridge ? 8 : 0;
        totalBars += safe.includeOutro ? 4 : 0;

        if (totalBars > 128) {
            console.warn(`⚠️ Song would be ${totalBars} bars - capping to prevent freeze`);
            // Reduce verses and choruses proportionally
            const ratio = 128 / totalBars;
            safe.numVerses = Math.max(1, Math.floor(safe.numVerses * ratio));
            safe.numChorus = Math.max(1, Math.floor(safe.numChorus * ratio));
        }

        console.log('✅ Parameters sanitized:', {
            verses: safe.numVerses,
            chorus: safe.numChorus,
            tempo: safe.tempo,
            estimatedBars: totalBars
        });

        return safe;
    }

    generate() {
        console.log('🎵 Starting MIDI generation...');
        const startTime = Date.now();
        const file = new MIDIFile();

        try {
            // Generate each track with individual try-catch and timeout
            if (this.params.tracks.drums) {
                try {
                    const drumTrack = this.generateDrumTrack();
                    file.addTrack(drumTrack);
                    console.log(`✅ Drum track generated (${this.totalNotesGenerated} total notes)`);
                } catch (e) {
                    console.error('❌ Error generating drums:', e.message);
                    console.warn('⚠️ Continuing without drums');
                }
            }

            if (this.params.tracks.bass) {
                try {
                    const bassTrack = this.generateBassTrack();
                    file.addTrack(bassTrack);
                    console.log(`✅ Bass track generated (${this.totalNotesGenerated} total notes)`);
                } catch (e) {
                    console.error('❌ Error generating bass:', e.message);
                    console.warn('⚠️ Continuing without bass');
                }
            }

            if (this.params.tracks.chords) {
                try {
                    const chordTrack = this.generateChordTrack();
                    file.addTrack(chordTrack);
                    console.log(`✅ Chord track generated (${this.totalNotesGenerated} total notes)`);
                } catch (e) {
                    console.error('❌ Error generating chords:', e.message);
                    console.warn('⚠️ Continuing without chords');
                }
            }

            if (this.params.tracks.lead) {
                try {
                    const leadTrack = this.generateLeadTrack();
                    file.addTrack(leadTrack);
                    console.log(`✅ Lead track generated (${this.totalNotesGenerated} total notes)`);
                } catch (e) {
                    console.error('❌ Error generating lead:', e.message);
                    console.warn('⚠️ Continuing without lead');
                }
            }

            if (this.params.tracks.arp) {
                try {
                    const arpTrack = this.generateArpTrack();
                    file.addTrack(arpTrack);
                    console.log(`✅ Arp track generated (${this.totalNotesGenerated} total notes)`);
                } catch (e) {
                    console.error('❌ Error generating arp:', e.message);
                    console.warn('⚠️ Continuing without arp');
                }
            }

            const elapsedTime = Date.now() - startTime;
            console.log(`✅ All enabled tracks generated in ${elapsedTime}ms, converting to bytes...`);
            const bytes = file.toBytes();

            if (!bytes || bytes.length === 0) {
                throw new Error('MIDI file generation resulted in empty file');
            }

            console.log(`✅ MIDI file created: ${bytes.length} bytes, ${this.totalNotesGenerated} notes`);
            return bytes;

        } catch (error) {
            console.error('❌ Critical error in MIDI generation:', error);
            throw error;
        }
    }

    // Safe note adding wrapper with global limit
    safeAddNote(track, channel, note, startTime, duration, velocity) {
        if (this.totalNotesGenerated >= this.maxNotes) {
            if (this.totalNotesGenerated === this.maxNotes) {
                console.warn(`⚠️ Hit max notes limit (${this.maxNotes}), stopping generation`);
            }
            return false;
        }
        track.addNote(channel, note, startTime, duration, velocity);
        this.totalNotesGenerated++;
        return true;
    }

    buildSongStructure() {
        const sections = [];
        let currentBar = 0;

        if (this.params.includeIntro) {
            sections.push({ type: 'intro', startBar: currentBar, bars: 4, energy: 0.3 });
            currentBar += 4;
        }

        // Add buildup before first verse/chorus if requested
        if (this.params.includeBuildup) {
            sections.push({ type: 'buildup', startBar: currentBar, bars: 4, energy: 0.5 });
            currentBar += 4;
        }

        for (let i = 0; i < Math.max(this.params.numVerses, this.params.numChorus); i++) {
            if (i < this.params.numVerses && this.params.includeVerse) {
                sections.push({ type: 'verse', startBar: currentBar, bars: 8, energy: 0.6, number: i + 1 });
                currentBar += 8;
            }

            // Add drop after first verse if requested
            if (i === 0 && this.params.includeDrop) {
                sections.push({ type: 'drop', startBar: currentBar, bars: 8, energy: 1.0 });
                currentBar += 8;
            }

            if (i < this.params.numChorus && this.params.includeChorus) {
                sections.push({ type: 'chorus', startBar: currentBar, bars: 8, energy: 1.0, number: i + 1 });
                currentBar += 8;
            }

            // Add breakdown after first chorus if requested
            if (i === 0 && this.params.includeBreakdown) {
                sections.push({ type: 'breakdown', startBar: currentBar, bars: 8, energy: 0.4 });
                currentBar += 8;
            }

            // Add bridge after second chorus
            if (i === 1 && this.params.includeBridge) {
                sections.push({ type: 'bridge', startBar: currentBar, bars: 8, energy: 0.8 });
                currentBar += 8;
            }
        }

        if (this.params.includeOutro) {
            sections.push({ type: 'outro', startBar: currentBar, bars: 4, energy: 0.4 });
            currentBar += 4;
        }

        // Safety check: ensure at least one section exists
        if (sections.length === 0) {
            console.warn('⚠️ No sections defined, adding default section');
            sections.push({ type: 'default', startBar: 0, bars: 8, energy: 0.7 });
        }

        return sections;
    }

    getScaleNotes() {
        const scalePatterns = {
            major: [0, 2, 4, 5, 7, 9, 11],
            minor: [0, 2, 3, 5, 7, 8, 10],
            harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
            melodic_minor: [0, 2, 3, 5, 7, 9, 11],
            dorian: [0, 2, 3, 5, 7, 9, 10],
            phrygian: [0, 1, 3, 5, 7, 8, 10],
            lydian: [0, 2, 4, 6, 7, 9, 11],
            mixolydian: [0, 2, 4, 5, 7, 9, 10],
            pentatonic_major: [0, 2, 4, 7, 9],
            pentatonic_minor: [0, 3, 5, 7, 10],
            blues: [0, 3, 5, 6, 7, 10], // Blues scale (1 b3 4 b5 5 b7)
            whole_tone: [0, 2, 4, 6, 8, 10], // Whole tone scale
            harmonic: [0, 2, 3, 5, 7, 8, 11], // Alias for harmonic_minor
            melodic: [0, 2, 3, 5, 7, 9, 11] // Alias for melodic_minor
        };

        const noteMap = {
            'C': 60, 'C#': 61, 'D': 62, 'D#': 63, 'E': 64,
            'F': 65, 'F#': 66, 'G': 67, 'G#': 68, 'A': 69,
            'A#': 70, 'B': 71
        };

        const keyInput = this.params.key || 'C';
        const keyNote = keyInput.replace('m', '');
        let scaleType = this.params.scale || 'major';

        // Override scale type if key is minor and scale is major
        if (keyInput.includes('m') && scaleType === 'major') {
            scaleType = 'minor';
        }

        const rootNote = noteMap[keyNote];
        if (rootNote === undefined) {
            console.error('❌ Invalid key:', keyNote);
            throw new Error(`Invalid key: ${keyNote}. Must be one of: C, C#, D, D#, E, F, F#, G, G#, A, A#, B`);
        }

        const pattern = scalePatterns[scaleType];
        if (!pattern) {
            console.error('❌ Invalid scale type:', scaleType);
            throw new Error(`Invalid scale: ${scaleType}. Must be one of: ${Object.keys(scalePatterns).join(', ')}`);
        }

        const notes = [];
        for (let octave = -2; octave <= 2; octave++) {
            pattern.forEach(interval => {
                notes.push(rootNote + interval + (octave * 12));
            });
        }

        const result = notes.sort((a, b) => a - b);
        console.log(`✅ Generated ${result.length} scale notes for ${keyNote} ${scaleType}`);
        return result;
    }

    buildChordProgression() {
        const progression = this.params.chordProgression || ['I', 'V', 'vi', 'IV'];
        const scaleType = (this.params.scale || 'major').includes('minor') ? 'minor' : 'major';

        console.log('🎵 Building chord progression:', progression);

        // Map Roman numerals to scale degrees
        const degreeMap = {
            'I': 0, 'II': 1, 'III': 2, 'IV': 3, 'V': 4, 'VI': 5, 'VII': 6,
            'i': 0, 'ii': 1, 'iii': 2, 'iv': 3, 'v': 4, 'vi': 5, 'vii°': 6
        };

        if (!Array.isArray(progression) || progression.length === 0) {
            console.error('❌ Invalid chord progression:', progression);
            throw new Error('Chord progression must be a non-empty array');
        }

        const chords = progression.map(numeral => {
            const degree = degreeMap[numeral];

            if (degree === undefined) {
                console.error('❌ Unknown chord numeral:', numeral);
                throw new Error(`Unknown chord: ${numeral}. Must be Roman numerals like I, ii, IV, etc.`);
            }

            const isMinor = numeral === numeral.toLowerCase() || numeral.includes('°');
            const rootScaleIndex = degree;

            return {
                numeral: numeral,
                degree: degree,
                isMinor: isMinor,
                isDiminished: numeral.includes('°')
            };
        });

        console.log(`✅ Built ${chords.length} chords:`, chords.map(c => c.numeral).join('-'));
        return chords;
    }

    getChordNotes(chordIndex, octave = 0) {
        const chord = this.chords[chordIndex % this.chords.length];
        const scaleIndex = chord.degree;

        // Find root note from scale - use modulo to wrap around for shorter scales
        const scaleLength = this.scale.length;
        const noteIndex = Math.floor(scaleLength / 2) + scaleIndex; // Start from middle of scale
        const rootNote = this.scale[noteIndex % scaleLength] || this.scale[0] || 60; // Fallback to C

        // Add octave adjustment
        const octaveAdjust = octave * 12;

        const voicing = this.params.voicing || 'triad';
        let intervals = [];

        if (chord.isDiminished) {
            intervals = [0, 3, 6]; // Diminished triad
        } else if (chord.isMinor) {
            if (voicing === 'triad') intervals = [0, 3, 7];
            else if (voicing === 'seventh') intervals = [0, 3, 7, 10];
            else intervals = [0, 3, 7, 10, 14]; // Add 9th
        } else {
            if (voicing === 'triad') intervals = [0, 4, 7];
            else if (voicing === 'seventh') intervals = [0, 4, 7, 11];
            else intervals = [0, 4, 7, 11, 14]; // Add 9th
        }

        return intervals.map(i => rootNote + i + octaveAdjust).filter(n => n >= 0 && n <= 127);
    }

    generateDrumTrack() {
        const track = new MIDITrack();
        track.setTempo(this.params.tempo);

        const drumMap = {
            kick: 36, snare: 38, closedHat: 42, openHat: 46,
            crash: 49, ride: 51, tom1: 48, tom2: 45, tom3: 43,
            rimshot: 37, clap: 39
        };

        let totalBarsProcessed = 0;
        const maxBars = 256; // Safety limit

        this.sections.forEach((section, sectionIdx) => {
            const startTick = section.startBar * this.ticksPerBeat * 4;
            const bars = Math.min(section.bars, 64); // Cap individual section bars
            const energy = this.params.dynamicArrangement ? section.energy : 1.0;

            for (let bar = 0; bar < bars; bar++) {
                if (++totalBarsProcessed > maxBars) {
                    console.warn(`⚠️ Drum track exceeded ${maxBars} bars, stopping early`);
                    return track;
                }

                const barStart = startTick + (bar * this.ticksPerBeat * 4);
                const isLastBar = bar === bars - 1;
                const shouldFill = isLastBar && this.params.addFills && sectionIdx < this.sections.length - 1;

                if (shouldFill) {
                    this.addDrumFill(track, barStart, drumMap, energy);
                } else {
                    this.addDrumPattern(track, barStart, drumMap, section.type, energy);
                }
            }
        });

        return track;
    }

    addDrumPattern(track, barStart, drumMap, sectionType, energy) {
        const complexity = this.params.drumComplexity;
        const swing = this.params.swing / 100;
        const humanize = this.params.humanization / 100;

        // Kick pattern
        const kickVelocity = Math.round(90 * energy + this.randomize(10, humanize));
        if (!this.safeAddNote(track, 9, drumMap.kick, barStart + this.applySwing(0, swing, humanize), this.ticksPerBeat / 2, kickVelocity)) return;

        if (complexity !== 'simple' || sectionType === 'chorus') {
            if (!this.safeAddNote(track, 9, drumMap.kick, barStart + this.applySwing(this.ticksPerBeat * 2, swing, humanize), this.ticksPerBeat / 2, kickVelocity - 5)) return;
        }

        if (complexity === 'complex' && sectionType !== 'intro') {
            if (!this.safeAddNote(track, 9, drumMap.kick, barStart + this.applySwing(this.ticksPerBeat * 3.5, swing, humanize), this.ticksPerBeat / 4, kickVelocity - 10)) return;
        }

        // Snare pattern
        const snareVelocity = Math.round(95 * energy + this.randomize(10, humanize));
        if (!this.safeAddNote(track, 9, drumMap.snare, barStart + this.applySwing(this.ticksPerBeat, swing, humanize), this.ticksPerBeat / 2, snareVelocity)) return;
        if (!this.safeAddNote(track, 9, drumMap.snare, barStart + this.applySwing(this.ticksPerBeat * 3, swing, humanize), this.ticksPerBeat / 2, snareVelocity)) return;

        // Hi-hat pattern (capped to prevent explosion)
        const hatVelocity = Math.round(70 * energy + this.randomize(15, humanize));
        const hatDivision = Math.min(complexity === 'simple' ? 4 : 8, 16); // Cap at 16

        for (let i = 0; i < hatDivision; i++) {
            const position = barStart + (i * this.ticksPerBeat * 4 / hatDivision);
            const velocity = hatVelocity + (i % 2 === 0 ? 10 : -10) + this.randomize(5, humanize);
            if (!this.safeAddNote(track, 9, drumMap.closedHat, this.applySwing(position, swing, humanize), this.ticksPerBeat / 8, velocity)) return;
        }

        // Crash on downbeat of chorus/bridge
        if ((sectionType === 'chorus' || sectionType === 'bridge') && barStart === this.sections.find(s => s.type === sectionType).startBar * this.ticksPerBeat * 4) {
            this.safeAddNote(track, 9, drumMap.crash, barStart, this.ticksPerBeat * 2, 100);
        }
    }

    addDrumFill(track, barStart, drumMap, energy) {
        // Simple tom fill
        const velocity = Math.round(85 * energy);
        const sixteenth = this.ticksPerBeat / 4;

        this.safeAddNote(track, 9, drumMap.tom1, barStart + sixteenth * 12, sixteenth, velocity);
        this.safeAddNote(track, 9, drumMap.tom1, barStart + sixteenth * 13, sixteenth, velocity - 5);
        this.safeAddNote(track, 9, drumMap.tom2, barStart + sixteenth * 14, sixteenth, velocity - 5);
        this.safeAddNote(track, 9, drumMap.tom3, barStart + sixteenth * 15, sixteenth, velocity + 10);
    }

    generateBassTrack() {
        const track = new MIDITrack();
        track.setTempo(this.params.tempo);

        const bassNotes = this.scale.filter(n => n >= 28 && n <= 55);

        // Safety check: if no bass notes in range, expand range
        if (bassNotes.length === 0) {
            console.warn('⚠️ No bass notes in standard range, expanding range');
            const expanded = this.scale.filter(n => n >= 24 && n <= 60);
            bassNotes.push(...expanded);
            if (bassNotes.length === 0) {
                console.error('❌ No bass notes available at all, using fallback');
                bassNotes.push(36); // Fallback to low C
            }
        }

        let totalBarsProcessed = 0;
        const maxBars = 256;

        this.sections.forEach(section => {
            const startTick = section.startBar * this.ticksPerBeat * 4;
            const bars = Math.min(section.bars, 64);

            for (let bar = 0; bar < bars; bar++) {
                if (++totalBarsProcessed > maxBars) {
                    console.warn(`⚠️ Bass track exceeded ${maxBars} bars, stopping early`);
                    return track;
                }

                const barStart = startTick + (bar * this.ticksPerBeat * 4);
                const chordIndex = bar % this.chords.length;
                const chordNotes = this.getChordNotes(chordIndex, -2);
                const rootNote = chordNotes && chordNotes[0] ? chordNotes[0] : bassNotes[0];

                this.addBassPattern(track, barStart, rootNote, bassNotes, section.type);
            }
        });

        return track;
    }

    addBassPattern(track, barStart, rootNote, bassNotes, sectionType) {
        // Safety checks
        if (!rootNote || rootNote < 0 || rootNote > 127) {
            console.warn('⚠️ Invalid rootNote in addBassPattern:', rootNote);
            rootNote = bassNotes && bassNotes.length > 0 ? bassNotes[0] : 36;
        }

        if (!bassNotes || bassNotes.length === 0) {
            console.warn('⚠️ No bassNotes in addBassPattern, using rootNote only');
            bassNotes = [rootNote];
        }

        const pattern = this.params.bassPattern || 'root';
        const humanize = this.params.humanization / 100;
        const velocity = sectionType === 'chorus' ? 100 : sectionType === 'verse' ? 85 : 90;

        if (pattern === 'root') {
            // Whole notes
            this.safeAddNote(track, 0, rootNote, barStart + this.randomize(5, humanize), this.ticksPerBeat * 4, velocity);
        } else if (pattern === 'walking') {
            // Walking bass (jazz style)
            for (let beat = 0; beat < 4; beat++) {
                let noteIndex = bassNotes.indexOf(rootNote);
                if (noteIndex === -1) noteIndex = 0;
                noteIndex = (noteIndex + beat) % bassNotes.length;
                const note = bassNotes[noteIndex] || rootNote;
                if (!this.safeAddNote(track, 0, note, barStart + beat * this.ticksPerBeat + this.randomize(5, humanize), this.ticksPerBeat * 0.9, velocity)) return;
            }
        } else if (pattern === 'rhythmic') {
            // Funky eighth note pattern
            const rhythm = [0, 0.5, 1.5, 2, 2.5, 3.5];
            rhythm.forEach(beat => {
                this.safeAddNote(track, 0, rootNote, barStart + beat * this.ticksPerBeat + this.randomize(5, humanize), this.ticksPerBeat * 0.4, velocity);
            });
        } else {
            // Melodic
            const fifth = Math.min(rootNote + 7, 127);
            this.safeAddNote(track, 0, rootNote, barStart + this.randomize(5, humanize), this.ticksPerBeat, velocity);
            this.safeAddNote(track, 0, fifth, barStart + this.ticksPerBeat * 2 + this.randomize(5, humanize), this.ticksPerBeat, velocity - 5);
            this.safeAddNote(track, 0, rootNote, barStart + this.ticksPerBeat * 3 + this.randomize(5, humanize), this.ticksPerBeat, velocity);
        }
    }

    generateChordTrack() {
        const track = new MIDITrack();
        track.setTempo(this.params.tempo);

        let totalBarsProcessed = 0;
        const maxBars = 256;

        this.sections.forEach(section => {
            const startTick = section.startBar * this.ticksPerBeat * 4;
            const bars = Math.min(section.bars, 64);

            for (let bar = 0; bar < bars; bar++) {
                if (++totalBarsProcessed > maxBars) {
                    console.warn(`⚠️ Chord track exceeded ${maxBars} bars, stopping early`);
                    return track;
                }

                const barStart = startTick + (bar * this.ticksPerBeat * 4);
                const chordIndex = bar % this.chords.length;
                const chordNotes = this.getChordNotes(chordIndex, 0);

                // Safety check
                if (!chordNotes || chordNotes.length === 0) {
                    console.warn('⚠️ No chord notes generated, skipping bar');
                    continue;
                }

                const velocity = Math.round(section.energy * 80);
                const duration = this.ticksPerBeat * 4;

                chordNotes.forEach(note => {
                    if (note >= 0 && note <= 127) {
                        this.safeAddNote(track, 1, note, barStart, duration * 0.95, velocity);
                    }
                });
            }
        });

        return track;
    }

    generateLeadTrack() {
        const track = new MIDITrack();
        track.setTempo(this.params.tempo);

        const leadNotes = this.scale.filter(n => n >= 60 && n <= 84);

        // Safety check: if no lead notes in range, expand range
        if (leadNotes.length === 0) {
            console.warn('⚠️ No lead notes in standard range, expanding range');
            const expanded = this.scale.filter(n => n >= 48 && n <= 96);
            leadNotes.push(...expanded);
            if (leadNotes.length === 0) {
                console.error('❌ No lead notes available at all, using fallback');
                leadNotes.push(60, 64, 67, 72); // Fallback to C major chord notes
            }
        }

        const density = this.params.density / 100;
        let totalBarsProcessed = 0;
        const maxBars = 256;

        this.sections.forEach(section => {
            const startTick = section.startBar * this.ticksPerBeat * 4;
            const bars = Math.min(section.bars, 64);
            const shouldPlay = section.type === 'chorus' || section.type === 'bridge' || Math.random() > 0.3;

            if (!shouldPlay && section.type === 'intro') return;

            for (let bar = 0; bar < bars; bar++) {
                if (++totalBarsProcessed > maxBars) {
                    console.warn(`⚠️ Lead track exceeded ${maxBars} bars, stopping early`);
                    return track;
                }

                const barStart = startTick + (bar * this.ticksPerBeat * 4);
                this.addMelody(track, barStart, leadNotes, section.energy, density);
            }
        });

        return track;
    }

    addMelody(track, barStart, notes, energy, density) {
        const noteDurations = [this.ticksPerBeat, this.ticksPerBeat / 2, this.ticksPerBeat / 4];
        let currentPos = 0;
        const barLength = this.ticksPerBeat * 4;
        let safetyCounter = 0;
        const maxIterations = 100; // Reduced from 1000 to prevent slowdowns

        while (currentPos < barLength && safetyCounter < maxIterations) {
            safetyCounter++;
            const duration = noteDurations[Math.floor(Math.random() * noteDurations.length)];

            // Safety check - ensure duration is valid
            if (!duration || duration <= 0) {
                console.error('Invalid duration in addMelody:', duration);
                break;
            }

            if (notes.length === 0) {
                console.error('No notes available in addMelody');
                break;
            }

            if (Math.random() < density) {
                const note = notes[Math.floor(Math.random() * notes.length)];
                const velocity = Math.round(energy * 90 + this.randomize(10, this.params.humanization / 100));
                if (!this.safeAddNote(track, 2, note, barStart + currentPos, duration * 0.9, velocity)) return;
            }

            currentPos += duration;
        }

        if (safetyCounter >= maxIterations) {
            console.warn('⚠️ Max iterations reached in addMelody - bar may be incomplete');
        }
    }

    generateArpTrack() {
        const track = new MIDITrack();
        track.setTempo(this.params.tempo);

        let totalBarsProcessed = 0;
        const maxBars = 256;

        this.sections.forEach(section => {
            const startTick = section.startBar * this.ticksPerBeat * 4;
            const bars = Math.min(section.bars, 64);

            for (let bar = 0; bar < bars; bar++) {
                if (++totalBarsProcessed > maxBars) {
                    console.warn(`⚠️ Arp track exceeded ${maxBars} bars, stopping early`);
                    return track;
                }

                const barStart = startTick + (bar * this.ticksPerBeat * 4);
                const chordIndex = bar % this.chords.length;
                const chordNotes = this.getChordNotes(chordIndex, 1);

                // Safety check
                if (!chordNotes || chordNotes.length === 0) {
                    console.warn('⚠️ No chord notes for arp, skipping bar');
                    continue;
                }

                // Sixteenth note arpeggio (max 16 notes per bar)
                for (let i = 0; i < 16; i++) {
                    const note = chordNotes[i % chordNotes.length];
                    if (note >= 0 && note <= 127) {
                        const position = barStart + (i * this.ticksPerBeat / 4);
                        if (!this.safeAddNote(track, 3, note, position, this.ticksPerBeat / 4 * 0.9, 85)) return track;
                    }
                }
            }
        });

        return track;
    }

    applySwing(position, swingAmount, humanize) {
        const sixteenth = this.ticksPerBeat / 4;
        const positionInBar = position % (this.ticksPerBeat * 4);
        const isOffbeat = Math.floor(positionInBar / sixteenth) % 2 === 1;

        if (isOffbeat && swingAmount > 0) {
            position += sixteenth * swingAmount * 0.3;
        }

        return position + this.randomize(10, humanize);
    }

    randomize(amount, factor) {
        return Math.round((Math.random() - 0.5) * amount * factor);
    }
}

// MIDI File Writer Classes
class MIDIFile {
    constructor() {
        this.tracks = [];
        this.ticksPerBeat = 480;
    }

    addTrack(track) {
        this.tracks.push(track);
    }

    toBytes() {
        const header = this.createHeader();
        const trackBytes = this.tracks.map(t => t.toBytes()).flat();
        return [...header, ...trackBytes];
    }

    createHeader() {
        const header = [0x4D, 0x54, 0x68, 0x64]; // "MThd"
        const headerSize = [0x00, 0x00, 0x00, 0x06];
        const format = this.tracks.length > 1 ? [0x00, 0x01] : [0x00, 0x00]; // Format 1 for multi-track
        const numTracks = [
            (this.tracks.length >> 8) & 0xFF,
            this.tracks.length & 0xFF
        ];
        const division = [
            (this.ticksPerBeat >> 8) & 0xFF,
            this.ticksPerBeat & 0xFF
        ];
        return [...header, ...headerSize, ...format, ...numTracks, ...division];
    }
}

class MIDITrack {
    constructor() {
        this.events = [];
    }

    addNote(channel, note, startTime, duration, velocity) {
        this.events.push({
            type: 'noteOn',
            channel: channel,
            note: note,
            time: Math.round(startTime),
            velocity: velocity
        });
        this.events.push({
            type: 'noteOff',
            channel: channel,
            note: note,
            time: Math.round(startTime + duration),
            velocity: 0
        });
    }

    setTempo(bpm) {
        const microsecondsPerBeat = Math.round(60000000 / bpm);
        this.events.push({
            type: 'tempo',
            time: 0,
            value: microsecondsPerBeat
        });
    }

    toBytes() {
        this.events.sort((a, b) => a.time - b.time);

        const trackEvents = [];
        let lastTime = 0;

        this.events.forEach(event => {
            const deltaTime = event.time - lastTime;
            lastTime = event.time;

            if (event.type === 'tempo') {
                trackEvents.push(...this.writeVarLen(deltaTime));
                trackEvents.push(0xFF, 0x51, 0x03);
                trackEvents.push((event.value >> 16) & 0xFF);
                trackEvents.push((event.value >> 8) & 0xFF);
                trackEvents.push(event.value & 0xFF);
            } else if (event.type === 'noteOn') {
                trackEvents.push(...this.writeVarLen(deltaTime));
                trackEvents.push(0x90 | event.channel);
                trackEvents.push(event.note);
                trackEvents.push(event.velocity);
            } else if (event.type === 'noteOff') {
                trackEvents.push(...this.writeVarLen(deltaTime));
                trackEvents.push(0x80 | event.channel);
                trackEvents.push(event.note);
                trackEvents.push(event.velocity);
            }
        });

        trackEvents.push(0x00, 0xFF, 0x2F, 0x00);

        const header = [0x4D, 0x54, 0x72, 0x6B];
        const length = trackEvents.length;
        const lengthBytes = [
            (length >> 24) & 0xFF,
            (length >> 16) & 0xFF,
            (length >> 8) & 0xFF,
            length & 0xFF
        ];

        return [...header, ...lengthBytes, ...trackEvents];
    }

    writeVarLen(value) {
        const bytes = [];
        let buffer = value & 0x7F;
        let safetyCounter = 0;
        const maxIterations = 10; // MIDI var-length should never exceed 4 bytes

        while (value >>= 7) {
            buffer <<= 8;
            buffer |= ((value & 0x7F) | 0x80);
            if (++safetyCounter > maxIterations) {
                console.error('⚠️ writeVarLen infinite loop prevented, value too large');
                break;
            }
        }

        safetyCounter = 0;
        while (safetyCounter < maxIterations) {
            bytes.push(buffer & 0xFF);
            if (buffer & 0x80) {
                buffer >>= 8;
            } else {
                break;
            }
            safetyCounter++;
        }

        if (safetyCounter >= maxIterations) {
            console.error('⚠️ writeVarLen output loop prevented');
        }

        return bytes;
    }
}
