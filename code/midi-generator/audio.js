// Ultra-Responsive Audio Education Engine V2
// Instant, granular control over every musical concept

class AdvancedAudioEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.isInitialized = false;
        this.currentlyPlaying = new Set();

        // Pre-calculated frequencies for instant access
        this.noteFrequencies = this.generateFrequencyTable();

        // State management
        this.currentTempo = 120;
        this.currentKey = 'C';
        this.currentScale = 'major';

        // Visual feedback elements
        this.feedbackEl = null;
    }

    // Initialize on first user interaction (required by browsers)
    async init() {
        if (this.isInitialized) return;

        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.25;
        this.masterGain.connect(this.ctx.destination);

        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

        this.isInitialized = true;
        this.createFeedbackElement();
    }

    createFeedbackElement() {
        if (document.getElementById('audioFeedback')) return;

        const feedback = document.createElement('div');
        feedback.id = 'audioFeedback';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1A1A1A;
            color: #E8E3DA;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 1px;
            z-index: 10000;
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.2s, transform 0.2s;
            pointer-events: none;
            max-width: 300px;
        `;
        document.body.appendChild(feedback);
        this.feedbackEl = feedback;
    }

    showFeedback(message, duration = 2000) {
        if (!this.feedbackEl) this.createFeedbackElement();

        this.feedbackEl.textContent = message;
        this.feedbackEl.style.opacity = '1';
        this.feedbackEl.style.transform = 'translateY(0)';

        clearTimeout(this.feedbackTimeout);
        this.feedbackTimeout = setTimeout(() => {
            this.feedbackEl.style.opacity = '0';
            this.feedbackEl.style.transform = 'translateY(-10px)';
        }, duration);
    }

    // Pre-generate all note frequencies for instant access
    generateFrequencyTable() {
        const table = {};
        for (let midi = 0; midi <= 127; midi++) {
            table[midi] = 440 * Math.pow(2, (midi - 69) / 12);
        }
        return table;
    }

    // Instant note playback
    playNote(freq, duration = 0.5, type = 'sine', velocity = 0.5) {
        if (!this.isInitialized) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.frequency.value = freq;
        osc.type = type;

        filter.type = 'lowpass';
        filter.frequency.value = freq * 3;

        // ADSR envelope
        const attack = 0.01;
        const decay = 0.1;
        const sustain = velocity * 0.7;
        const release = 0.3;

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(velocity, now + attack);
        gain.gain.exponentialRampToValueAtTime(sustain, now + attack + decay);
        gain.gain.setValueAtTime(sustain, now + duration - release);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + duration);

        this.currentlyPlaying.add(osc);
        setTimeout(() => this.currentlyPlaying.delete(osc), duration * 1000);

        return osc;
    }

    // Instant chord playback
    playChord(rootMidi, intervals, duration = 1, type = 'sawtooth', velocity = 0.4) {
        if (!this.isInitialized) return;

        intervals.forEach(interval => {
            const freq = this.noteFrequencies[rootMidi + interval];
            this.playNote(freq, duration, type, velocity);
        });
    }

    // Instant drum sounds
    playKick(velocity = 0.8) {
        if (!this.isInitialized) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);

        gain.gain.setValueAtTime(velocity, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.3);

        this.currentlyPlaying.add(osc);
    }

    playSnare(velocity = 0.6) {
        if (!this.isInitialized) return;

        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.15;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / bufferSize * 10);
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(velocity, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(now);
        this.currentlyPlaying.add(noise);
    }

    playHiHat(velocity = 0.3, open = false) {
        if (!this.isInitialized) return;

        const now = this.ctx.currentTime;
        const duration = open ? 0.3 : 0.05;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / bufferSize * 10);
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 8000;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(velocity, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(now);
        this.currentlyPlaying.add(noise);
    }

    // Stop all playing sounds instantly
    stopAll() {
        this.currentlyPlaying.forEach(node => {
            try {
                if (node.stop) node.stop();
            } catch(e) {}
        });
        this.currentlyPlaying.clear();
    }

    // CONCEPT DEMONSTRATORS

    // Demonstrate tempo with metronome
    demonstrateTempo(bpm) {
        this.init().then(() => {
            this.stopAll();

            const beatDuration = 60 / bpm;
            const numBeats = 8;

            this.showFeedback(`♪ ${bpm} BPM`, numBeats * beatDuration * 1000);

            for (let i = 0; i < numBeats; i++) {
                setTimeout(() => {
                    if (i % 4 === 0) {
                        this.playNote(this.noteFrequencies[72], 0.1, 'sine', 0.7);
                    } else {
                        this.playNote(this.noteFrequencies[60], 0.1, 'sine', 0.4);
                    }
                }, i * beatDuration * 1000);
            }
        });
    }

    // Demonstrate major vs minor
    demonstrateMajorVsMinor(rootNote) {
        this.demonstrateScale(rootNote, 'major');

        setTimeout(() => {
            this.demonstrateScale(rootNote, 'minor');
        }, 2500);
    }

    // Demonstrate polyrhythm
    demonstratePolyrhythm() {
        this.init().then(() => {
            this.stopAll();

            const beatDuration = 0.4;
            const bars = 2;

            this.showFeedback('♪ 3 against 4 polyrhythm', bars * 4 * beatDuration * 1000);

            // 4 pattern
            for (let i = 0; i < bars * 4; i++) {
                setTimeout(() => {
                    this.playNote(this.noteFrequencies[60], beatDuration * 0.3, 'sine', 0.5);
                }, i * beatDuration * 1000);
            }

            // 3 pattern
            for (let i = 0; i < bars * 3; i++) {
                setTimeout(() => {
                    this.playNote(this.noteFrequencies[67], beatDuration * 0.3, 'triangle', 0.5);
                }, i * (beatDuration * 4 / 3) * 1000);
            }
        });
    }

    // FX DEMONSTRATIONS

    // Demonstrate riser effect
    demonstrateRiser() {
        this.init().then(() => {
            this.stopAll();

            const duration = 2.0;
            this.showFeedback('↗️ RISER (building tension)', duration * 1000);

            const now = this.ctx.currentTime;

            // White noise riser
            const bufferSize = this.ctx.sampleRate * duration;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * (i / bufferSize);
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, now);
            filter.frequency.exponentialRampToValueAtTime(8000, now + duration);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0.5, now + duration);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            noise.start(now);
            noise.stop(now + duration);
        });
    }

    // Demonstrate impact/hit
    demonstrateImpact() {
        this.init().then(() => {
            this.stopAll();

            this.showFeedback('💥 IMPACT', 1000);

            const now = this.ctx.currentTime;

            // Low impact
            const osc1 = this.ctx.createOscillator();
            osc1.frequency.setValueAtTime(80, now);
            osc1.frequency.exponentialRampToValueAtTime(40, now + 0.3);

            const gain1 = this.ctx.createGain();
            gain1.gain.setValueAtTime(0.8, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

            // High impact (noise)
            const bufferSize = this.ctx.sampleRate * 0.1;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const gain2 = this.ctx.createGain();
            gain2.gain.setValueAtTime(0.3, now);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

            osc1.connect(gain1);
            gain1.connect(this.masterGain);
            noise.connect(gain2);
            gain2.connect(this.masterGain);

            osc1.start(now);
            osc1.stop(now + 0.5);
            noise.start(now);
        });
    }

    // Demonstrate downlifter
    demonstrateDownlifter() {
        this.init().then(() => {
            this.stopAll();

            const duration = 1.5;
            this.showFeedback('↘️ DOWNLIFTER', duration * 1000);

            const now = this.ctx.currentTime;

            const osc = this.ctx.createOscillator();
            osc.frequency.setValueAtTime(2000, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + duration);
            osc.type = 'sawtooth';

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2000, now);
            filter.frequency.exponentialRampToValueAtTime(300, now + duration);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + duration);
        });
    }

    // Demonstrate filter sweep
    demonstrateFilterSweep() {
        this.init().then(() => {
            this.stopAll();

            const duration = 3.0;
            this.showFeedback('🌊 FILTER SWEEP', duration * 1000);

            const now = this.ctx.currentTime;

            // Play a chord
            const chord = [60, 64, 67]; // C major
            chord.forEach(note => {
                const osc = this.ctx.createOscillator();
                osc.frequency.value = this.noteFrequencies[note];
                osc.type = 'sawtooth';

                const filter = this.ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(200, now);
                filter.frequency.exponentialRampToValueAtTime(5000, now + duration);
                filter.Q.value = 5;

                const gain = this.ctx.createGain();
                gain.gain.value = 0.15;

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(this.masterGain);

                osc.start(now);
                osc.stop(now + duration);
            });
        });
    }

    // Demonstrate euclidean rhythm
    demonstrateEuclideanRhythm() {
        this.init().then(() => {
            this.stopAll();

            this.showFeedback('⚪ Euclidean Rhythm: E(5,8)', 2000);

            // E(5,8) = X.X.X.XX pattern
            const pattern = [1, 0, 1, 0, 1, 0, 1, 1];
            const beatDuration = 0.25;

            pattern.forEach((hit, i) => {
                if (hit) {
                    setTimeout(() => {
                        this.playHiHat(0.5);
                    }, i * beatDuration * 1000);
                }
            });
        });
    }

    // Demonstrate glitch effect
    demonstrateGlitch() {
        this.init().then(() => {
            this.stopAll();

            this.showFeedback('⚡ GLITCH EFFECT', 2000);

            const now = this.ctx.currentTime;

            // Rapid stuttering notes
            for (let i = 0; i < 16; i++) {
                const randomNote = 60 + Math.floor(Math.random() * 12);
                const delay = i * 0.08 + (Math.random() - 0.5) * 0.02;
                const duration = 0.05 + Math.random() * 0.03;

                setTimeout(() => {
                    this.playNote(this.noteFrequencies[randomNote], duration, 'square', 0.3);
                }, delay * 1000);
            }
        });
    }

    // Play single scale with visual feedback
    demonstrateScale(rootNote, scaleType, speed = 'normal') {
        this.init().then(() => {
            this.stopAll();

            const scales = {
                major: [0, 2, 4, 5, 7, 9, 11, 12],
                minor: [0, 2, 3, 5, 7, 8, 10, 12],
                harmonic_minor: [0, 2, 3, 5, 7, 8, 11, 12],
                melodic_minor: [0, 2, 3, 5, 7, 9, 11, 12],
                dorian: [0, 2, 3, 5, 7, 9, 10, 12],
                phrygian: [0, 1, 3, 5, 7, 8, 10, 12],
                lydian: [0, 2, 4, 6, 7, 9, 11, 12],
                mixolydian: [0, 2, 4, 5, 7, 9, 10, 12],
                pentatonic_major: [0, 2, 4, 7, 9, 12],
                pentatonic_minor: [0, 3, 5, 7, 10, 12],
                blues: [0, 3, 5, 6, 7, 10, 12],
                whole_tone: [0, 2, 4, 6, 8, 10, 12]
            };

            const noteMap = {
                'C': 60, 'C#': 61, 'D': 62, 'D#': 63, 'E': 64,
                'F': 65, 'F#': 66, 'G': 67, 'G#': 68, 'A': 69,
                'A#': 70, 'B': 71
            };

            const rootMidi = noteMap[rootNote] || 60;
            const intervals = scales[scaleType] || scales.major;

            const speeds = { slow: 0.5, normal: 0.25, fast: 0.15 };
            const noteLength = speeds[speed] || 0.25;

            const scaleName = scaleType.replace('_', ' ').toUpperCase();
            this.showFeedback(`♪ ${rootNote} ${scaleName}`, intervals.length * noteLength * 1000);

            intervals.forEach((interval, i) => {
                setTimeout(() => {
                    const freq = this.noteFrequencies[rootMidi + interval];
                    this.playNote(freq, noteLength * 0.9, 'sine', 0.5);
                }, i * noteLength * 1000);
            });
        });
    }

    // Compare two concepts side by side
    compareScales(rootNote, scale1, scale2) {
        this.demonstrateScale(rootNote, scale1);

        const scales = {
            major: [0, 2, 4, 5, 7, 9, 11, 12],
            minor: [0, 2, 3, 5, 7, 8, 10, 12]
        };
        const duration = (scales[scale1]?.length || 8) * 0.3 * 1000;

        setTimeout(() => {
            this.demonstrateScale(rootNote, scale2);
        }, duration);
    }

    // Play chord progression
    demonstrateProgression(chordNames, key, tempo = 120) {
        this.init().then(() => {
            this.stopAll();

            const noteMap = { 'C': 60, 'C#': 61, 'D': 62, 'D#': 63, 'E': 64, 'F': 65, 'F#': 66, 'G': 67, 'G#': 68, 'A': 69, 'A#': 70, 'B': 71 };
            const rootMidi = noteMap[key.replace('m', '')] || 60;
            const isMinor = key.includes('m');

            // Scale degrees
            const scale = isMinor ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11];

            const degreeMap = {
                'I': 0, 'II': 1, 'III': 2, 'IV': 3, 'V': 4, 'VI': 5, 'VII': 6,
                'i': 0, 'ii': 1, 'iii': 2, 'iv': 3, 'v': 4, 'vi': 5, 'vii°': 6
            };

            const beatDuration = 60 / tempo;

            this.showFeedback(`♫ ${chordNames.join(' - ')} in ${key}`, chordNames.length * beatDuration * 2 * 1000);

            chordNames.forEach((chord, i) => {
                setTimeout(() => {
                    const degree = degreeMap[chord] || 0;
                    const chordRoot = rootMidi + scale[degree];

                    const isChordMinor = chord === chord.toLowerCase();
                    const isDiminished = chord.includes('°');

                    let intervals;
                    if (isDiminished) {
                        intervals = [0, 3, 6];
                    } else if (isChordMinor) {
                        intervals = [0, 3, 7];
                    } else {
                        intervals = [0, 4, 7];
                    }

                    this.playChord(chordRoot, intervals, beatDuration * 1.8, 'sawtooth', 0.3);

                }, i * beatDuration * 2 * 1000);
            });
        });
    }

    // Demonstrate single chord type
    demonstrateChordType(type, rootNote = 'C') {
        this.init().then(() => {
            this.stopAll();

            const noteMap = { 'C': 60, 'C#': 61, 'D': 62, 'D#': 63, 'E': 64, 'F': 65, 'F#': 66, 'G': 67, 'G#': 68, 'A': 69, 'A#': 70, 'B': 71 };
            const rootMidi = noteMap[rootNote] || 60;

            const chordTypes = {
                'major': [0, 4, 7],
                'minor': [0, 3, 7],
                'diminished': [0, 3, 6],
                'augmented': [0, 4, 8],
                'major7': [0, 4, 7, 11],
                'minor7': [0, 3, 7, 10],
                'dominant7': [0, 4, 7, 10],
                'major9': [0, 4, 7, 11, 14],
                'suspended2': [0, 2, 7],
                'suspended4': [0, 5, 7]
            };

            const intervals = chordTypes[type] || chordTypes.major;

            this.showFeedback(`♪ ${rootNote} ${type.toUpperCase()}`);
            this.playChord(rootMidi, intervals, 2, 'sawtooth', 0.4);
        });
    }

    // Demonstrate rhythm pattern
    demonstrateRhythm(pattern = 'basic', tempo = 120) {
        this.init().then(() => {
            this.stopAll();

            const beatDuration = 60 / tempo;

            const patterns = {
                'basic': [
                    { drum: 'kick', times: [0, 2] },
                    { drum: 'snare', times: [1, 3] },
                    { drum: 'hihat', times: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] }
                ],
                'funk': [
                    { drum: 'kick', times: [0, 0.5, 2, 2.5] },
                    { drum: 'snare', times: [1, 3] },
                    { drum: 'hihat', times: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75] }
                ],
                'trap': [
                    { drum: 'kick', times: [0, 1, 2, 2.75] },
                    { drum: 'snare', times: [1, 3] },
                    { drum: 'hihat', times: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75] }
                ],
                'breakbeat': [
                    { drum: 'kick', times: [0, 1.5, 2.75] },
                    { drum: 'snare', times: [1, 2.5] },
                    { drum: 'hihat', times: [0.5, 1, 2, 3, 3.5] }
                ]
            };

            const selectedPattern = patterns[pattern] || patterns.basic;

            this.showFeedback(`♪ ${pattern.toUpperCase()} rhythm at ${tempo} BPM`, 4 * beatDuration * 1000);

            // Play 2 bars
            for (let bar = 0; bar < 2; bar++) {
                selectedPattern.forEach(({ drum, times }) => {
                    times.forEach(time => {
                        const delay = (bar * 4 + time) * beatDuration * 1000;
                        setTimeout(() => {
                            if (drum === 'kick') this.playKick();
                            else if (drum === 'snare') this.playSnare();
                            else if (drum === 'hihat') this.playHiHat();
                        }, delay);
                    });
                });
            }
        });
    }

    // Demonstrate swing
    demonstrateSwing(amount = 0) {
        this.init().then(() => {
            this.stopAll();

            const beatDuration = 0.3;
            const swingOffset = (amount / 100) * (beatDuration / 3);

            this.showFeedback(amount === 0 ? '♪ STRAIGHT timing' : `♪ ${amount}% SWING`, 8 * beatDuration * 1000);

            for (let i = 0; i < 8; i++) {
                const offset = (i % 2 === 1) ? swingOffset : 0;
                setTimeout(() => {
                    this.playHiHat(0.4);
                }, (i * beatDuration + offset) * 1000);
            }
        });
    }

    // Demonstrate velocity dynamics
    demonstrateVelocity(pattern = 'crescendo') {
        this.init().then(() => {
            this.stopAll();

            const beatDuration = 0.4;
            const noteCount = 8;

            this.showFeedback(`♪ ${pattern.toUpperCase()}`, noteCount * beatDuration * 1000);

            for (let i = 0; i < noteCount; i++) {
                let velocity;

                if (pattern === 'crescendo') {
                    velocity = 0.2 + (i / noteCount) * 0.6;
                } else if (pattern === 'decrescendo') {
                    velocity = 0.8 - (i / noteCount) * 0.6;
                } else if (pattern === 'accent') {
                    velocity = (i === 0 || i === 4) ? 0.8 : 0.3;
                }

                setTimeout(() => {
                    this.playNote(this.noteFrequencies[60], beatDuration * 0.9, 'sine', velocity);
                }, i * beatDuration * 1000);
            }
        });
    }

    // Demonstrate time signature
    demonstrateTimeSignature(signature = '4/4', bars = 2) {
        this.init().then(() => {
            this.stopAll();

            const beatDuration = 0.4;
            const timeMap = {
                '4/4': 4, '3/4': 3, '5/4': 5, '6/8': 6, '7/8': 7, '2/4': 2
            };
            const beatsPerBar = timeMap[signature] || 4;

            this.showFeedback(`♪ ${signature} time`, bars * beatsPerBar * beatDuration * 1000);

            for (let bar = 0; bar < bars; bar++) {
                for (let beat = 0; beat < beatsPerBar; beat++) {
                    setTimeout(() => {
                        if (beat === 0) {
                            this.playKick(0.7);
                        } else {
                            this.playHiHat(0.3);
                        }
                    }, (bar * beatsPerBar + beat) * beatDuration * 1000);
                }
            }
        });
    }

    // Play layered arrangement progressively
    demonstrateLayering(config) {
        this.init().then(() => {
            this.stopAll();

            const { tempo = 120, key = 'C', layers = ['drums', 'bass', 'chords', 'lead'] } = config;
            const beatDuration = 60 / tempo;
            const barDuration = beatDuration * 4;

            const noteMap = { 'C': 60, 'D': 62, 'E': 64, 'F': 65, 'G': 67, 'A': 69, 'B': 71 };
            const rootMidi = noteMap[key] || 60;

            // Layer 1: Drums (0-4 seconds)
            if (layers.includes('drums')) {
                this.showFeedback('🥁 DRUMS', barDuration * 1000);
                for (let beat = 0; beat < 4; beat++) {
                    setTimeout(() => {
                        this.playKick();
                        if (beat % 2 === 1) this.playSnare();
                    }, beat * beatDuration * 1000);

                    for (let eighth = 0; eighth < 2; eighth++) {
                        setTimeout(() => {
                            this.playHiHat(0.3);
                        }, (beat * beatDuration + eighth * beatDuration / 2) * 1000);
                    }
                }
            }

            // Layer 2: Bass (4-8 seconds)
            if (layers.includes('bass')) {
                setTimeout(() => {
                    this.showFeedback('🥁 + 🎸 BASS', barDuration * 1000);
                }, barDuration * 1000);

                for (let beat = 0; beat < 4; beat++) {
                    setTimeout(() => {
                        // Continue drums
                        this.playKick();
                        if (beat % 2 === 1) this.playSnare();
                        for (let e = 0; e < 2; e++) {
                            setTimeout(() => this.playHiHat(0.3), e * beatDuration / 2 * 1000);
                        }
                        // Add bass
                        this.playNote(this.noteFrequencies[rootMidi - 12], beatDuration * 0.9, 'sawtooth', 0.5);
                    }, (barDuration + beat * beatDuration) * 1000);
                }
            }

            // Layer 3: Chords (8-12 seconds)
            if (layers.includes('chords')) {
                setTimeout(() => {
                    this.showFeedback('🥁 + 🎸 + 🎹 CHORDS', barDuration * 1000);
                }, barDuration * 2 * 1000);

                setTimeout(() => {
                    // Continue drums and bass
                    for (let beat = 0; beat < 4; beat++) {
                        setTimeout(() => {
                            this.playKick();
                            if (beat % 2 === 1) this.playSnare();
                            for (let e = 0; e < 2; e++) {
                                setTimeout(() => this.playHiHat(0.3), e * beatDuration / 2 * 1000);
                            }
                            this.playNote(this.noteFrequencies[rootMidi - 12], beatDuration * 0.9, 'sawtooth', 0.5);
                        }, beat * beatDuration * 1000);
                    }
                    // Add chords
                    this.playChord(rootMidi, [0, 4, 7], barDuration * 0.95, 'sawtooth', 0.3);
                }, 0);
            }

            // Layer 4: Lead (12-16 seconds)
            if (layers.includes('lead')) {
                setTimeout(() => {
                    this.showFeedback('🥁 + 🎸 + 🎹 + 🎤 FULL MIX', barDuration * 1000);
                }, barDuration * 3 * 1000);

                setTimeout(() => {
                    // Continue all previous layers
                    for (let beat = 0; beat < 4; beat++) {
                        setTimeout(() => {
                            this.playKick();
                            if (beat % 2 === 1) this.playSnare();
                            for (let e = 0; e < 2; e++) {
                                setTimeout(() => this.playHiHat(0.3), e * beatDuration / 2 * 1000);
                            }
                            this.playNote(this.noteFrequencies[rootMidi - 12], beatDuration * 0.9, 'sawtooth', 0.5);
                        }, beat * beatDuration * 1000);
                    }
                    this.playChord(rootMidi, [0, 4, 7], barDuration * 0.95, 'sawtooth', 0.3);

                    // Add lead melody
                    const melody = [0, 2, 4, 5, 4, 2, 0, -1];
                    melody.forEach((interval, i) => {
                        setTimeout(() => {
                            this.playNote(this.noteFrequencies[rootMidi + interval], beatDuration * 0.4, 'sine', 0.6);
                        }, i * beatDuration / 2 * 1000);
                    });
                }, 0);
            }
        });
    }
}

// Create global instance
window.audioEngine = new AdvancedAudioEngine();

// Auto-initialize on any button click
document.addEventListener('click', () => {
    if (!window.audioEngine.isInitialized) {
        window.audioEngine.init();
    }
}, { once: true });
