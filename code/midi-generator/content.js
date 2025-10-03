// Educational Content Database
// Comprehensive music theory lessons with audio examples

const educationContent = {
    basics: {
        title: 'Music Basics',
        sections: [
            {
                heading: 'Before We Begin',
                content: `
                    <p>This generator teaches music theory fundamentals. Learn the structures, understand why they work, then experiment with breaking them. The Beatles couldn't read music. Miles Davis recorded "Kind of Blue" with minimal rehearsal. Aphex Twin programs rhythms that theoretically shouldn't work.</p>
                `,
                audioDemo: 'manifesto'
            },
            {
                heading: 'Tempo (BPM)',
                content: `
                    <p><strong>Tempo</strong> is the speed of your music, measured in <strong>Beats Per Minute (BPM)</strong>. But tempo isn't just a number—it's the <em>heartbeat</em> of your track, the pulse that makes bodies move or minds drift.</p>

                    <h4>Common Tempo Ranges:</h4>
                    <ul>
                        <li><strong>40-60 BPM:</strong> Very slow (Ballads, ambient)</li>
                        <li><strong>60-80 BPM:</strong> Slow (Hip-hop, trip-hop)</li>
                        <li><strong>80-100 BPM:</strong> Medium-slow (Downtempo, some R&B)</li>
                        <li><strong>100-120 BPM:</strong> Medium (Pop, reggae)</li>
                        <li><strong>120-140 BPM:</strong> Medium-fast (House, disco)</li>
                        <li><strong>140-160 BPM:</strong> Fast (Techno, drum & bass half-time)</li>
                        <li><strong>160-180 BPM:</strong> Very fast (Drum & bass, jungle)</li>
                    </ul>

                    <div class="example-box">
                        <strong>Example:</strong> Burial's signature sound uses 130-138 BPM, an unconventional middle ground between house and dubstep. Aphex Twin's "Windowlicker" constantly shifts tempo.
                    </div>

                    <h4>🎵 Hear Different Tempos:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateTempo(60)">▶ 60 BPM (Slow)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateTempo(90)">▶ 90 BPM (Hip-Hop)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateTempo(120)">▶ 120 BPM (House)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateTempo(140)">▶ 140 BPM (Techno)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateTempo(170)">▶ 170 BPM (DnB)</button>
                    </div>
                `,
                audioDemo: 'tempo'
            },
            {
                heading: 'Musical Keys',
                content: `
                    <p>A <strong>musical key</strong> is the tonal center of your song - the "home base" note that everything revolves around. But here's the secret: <em>keys are just suggestions, not prisons.</em></p>

                    <h4>Major vs Minor (The Traditional Story):</h4>
                    <ul>
                        <li><strong>Major Keys:</strong> Bright, happy, uplifting (think pop anthems, summer songs)</li>
                        <li><strong>Minor Keys:</strong> Dark, sad, emotional (think ballads, dramatic music)</li>
                    </ul>

                    <h4>Why Keys Matter:</h4>
                    <p>Your key determines:</p>
                    <ul>
                        <li>Which notes sound "right" together</li>
                        <li>The emotional character of your song</li>
                        <li>Which chords you can use</li>
                        <li>How easy/hard it is to sing (for vocalists)</li>
                    </ul>

                    <div class="example-box">
                        <strong>Example:</strong> The Beatles' "While My Guitar Gently Weeps" (A minor) sounds transcendent, not sad. Stevie Wonder's "Sir Duke" changes key 3 times mid-song.
                    </div>

                    <button class="audio-preview" onclick="audioEngine.demonstrateMajorVsMinor('C')">
                        Hear Major vs Minor
                    </button>
                `,
                audioDemo: 'majorMinor'
            },
            {
                heading: 'Scales & Modes',
                content: `
                    <p>A <strong>scale</strong> is a collection of notes that work well together. Think of it as your "palette" of notes to choose from.</p>

                    <h4>Common Scales:</h4>

                    <h5>1. Major Scale</h5>
                    <p>Pattern: W-W-H-W-W-W-H (W=whole step, H=half step)</p>
                    <p>Sound: Happy, bright, uplifting</p>
                    <p>Used in: Pop, country, classical</p>

                    <h5>2. Natural Minor Scale</h5>
                    <p>Pattern: W-H-W-W-H-W-W</p>
                    <p>Sound: Sad, dark, emotional</p>
                    <p>Used in: Rock, metal, dramatic music</p>

                    <h5>3. Harmonic Minor</h5>
                    <p>Like natural minor but with raised 7th</p>
                    <p>Sound: Exotic, Middle Eastern, dramatic</p>
                    <p>Used in: Neoclassical metal, flamenco, EDM</p>

                    <h5>4. Pentatonic (5 notes)</h5>
                    <p>Sound: Simple, catchy, can't go wrong</p>
                    <p>Used in: Rock solos, blues, pop hooks</p>

                    <h4>Modes (The Cool Scales):</h4>

                    <h5>Dorian Mode</h5>
                    <p>Sound: Jazzy, groovy, slightly minor but with hope</p>
                    <p>Used in: Jazz, funk, Daft Punk's "Get Lucky"</p>

                    <h5>Phrygian Mode</h5>
                    <p>Sound: Spanish, flamenco, dark and exotic</p>
                    <p>Used in: Flamenco, metal, Middle Eastern music</p>

                    <h5>Lydian Mode</h5>
                    <p>Sound: Dreamy, ethereal, "floating"</p>
                    <p>Used in: Film scores, progressive rock, The Simpsons theme</p>

                    <h5>Mixolydian Mode</h5>
                    <p>Sound: Bluesy, rock, slightly unresolved</p>
                    <p>Used in: Blues, rock, "Sweet Child O' Mine"</p>

                    <div class="example-box">
                        <strong>Example:</strong> Miles Davis's "So What" uses D Dorian for 16 bars. Tool writes entire songs in Phrygian. Björk uses harmonic minor in her pop songs.
                    </div>

                    <h4>🎵 Hear Each Scale Individually:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'major')">▶ Major</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'minor')">▶ Natural Minor</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'harmonic_minor')">▶ Harmonic Minor</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'melodic_minor')">▶ Melodic Minor</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'dorian')">▶ Dorian</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'phrygian')">▶ Phrygian</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'lydian')">▶ Lydian</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'mixolydian')">▶ Mixolydian</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'pentatonic_major')">▶ Pentatonic Major</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'pentatonic_minor')">▶ Pentatonic Minor</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'blues')">▶ Blues</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'whole_tone')">▶ Whole Tone</button>
                    </div>
                `,
                audioDemo: 'scales'
            },
            {
                heading: 'Time Signatures',
                content: `
                    <p><strong>Time signature</strong> tells you how beats are grouped in each bar/measure.</p>

                    <h4>Common Time Signatures:</h4>

                    <h5>4/4 (Four-Four)</h5>
                    <p><strong>The most common!</strong> 4 beats per bar, counted "1-2-3-4"</p>
                    <p>Used in: Almost everything - pop, rock, hip-hop, house</p>

                    <h5>3/4 (Three-Four)</h5>
                    <p>3 beats per bar, counted "1-2-3, 1-2-3"</p>
                    <p>Sound: Waltz-like, flowing</p>
                    <p>Used in: Waltzes, some ballads, "Nothing Else Matters" by Metallica</p>

                    <h5>6/8 (Six-Eight)</h5>
                    <p>6 beats per bar, but grouped as 2 groups of 3</p>
                    <p>Sound: Lilting, swaying, triplet feel</p>
                    <p>Used in: Ballads, Irish music, "We Are The Champions"</p>

                    <h5>5/4 (Five-Four)</h5>
                    <p>5 beats per bar - unusual and interesting!</p>
                    <p>Sound: Unsettling, progressive</p>
                    <p>Used in: "Take Five" by Dave Brubeck, "Mission Impossible" theme</p>

                    <h5>7/8 (Seven-Eight)</h5>
                    <p>7 beats per bar - very progressive</p>
                    <p>Sound: Complex, off-kilter</p>
                    <p>Used in: Progressive metal, Tool, "Money" by Pink Floyd (mostly 7/4)</p>

                    <div class="example-box">
                        <strong>Example:</strong> Radiohead's "Pyramid Song" is in 4/4 but feels like 3/4 and 6/8. Outkast's "Hey Ya" shifts between 4/4 and 2/4.
                    </div>

                    <h4>🎵 Hear Each Time Signature:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateTimeSignature('4/4', 2)">▶ 4/4 (Common)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateTimeSignature('3/4', 2)">▶ 3/4 (Waltz)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateTimeSignature('6/8', 2)">▶ 6/8 (Shuffle)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateTimeSignature('5/4', 2)">▶ 5/4 (Progressive)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateTimeSignature('7/8', 2)">▶ 7/8 (Complex)</button>
                    </div>
                `,
                audioDemo: 'timeSignatures'
            }
        ]
    },

    chords: {
        title: 'Chord Progressions & Harmony — The Emotional Architecture',
        sections: [
            {
                heading: 'What Are Chords?',
                content: `
                    <p>A <strong>chord</strong> is multiple notes played together. Chords create the harmony and emotional foundation of your song.</p>

                    <h4>Basic Chord Types:</h4>

                    <h5>Triads (3 notes):</h5>
                    <ul>
                        <li><strong>Major:</strong> Root + 4 semitones + 7 semitones (happy sound)</li>
                        <li><strong>Minor:</strong> Root + 3 semitones + 7 semitones (sad sound)</li>
                        <li><strong>Diminished:</strong> Root + 3 semitones + 6 semitones (tense, scary)</li>
                    </ul>

                    <h5>7th Chords (4 notes):</h5>
                    <ul>
                        <li><strong>Major 7th:</strong> Jazz, dreamy, sophisticated</li>
                        <li><strong>Dominant 7th:</strong> Blues, tension wanting to resolve</li>
                        <li><strong>Minor 7th:</strong> Smooth, jazzy, emotional</li>
                    </ul>

                    <h5>Extended Chords (5+ notes):</h5>
                    <ul>
                        <li><strong>9th, 11th, 13th:</strong> Very jazzy and lush</li>
                        <li>Add color and complexity</li>
                    </ul>

                    <h4>🎵 Hear Each Chord Type Individually:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('major', 'C')">▶ Major</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('minor', 'C')">▶ Minor</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('diminished', 'C')">▶ Diminished</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('augmented', 'C')">▶ Augmented</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('major7', 'C')">▶ Major 7th</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('minor7', 'C')">▶ Minor 7th</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('dominant7', 'C')">▶ Dominant 7th</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('major9', 'C')">▶ Major 9th</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('sus2', 'C')">▶ Sus2</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('sus4', 'C')">▶ Sus4</button>
                    </div>
                `,
                audioDemo: 'chords'
            },
            {
                heading: 'Roman Numeral Analysis',
                content: `
                    <p><strong>Roman numerals</strong> let us talk about chords independent of key. Super useful!</p>

                    <h4>The System:</h4>
                    <ul>
                        <li><strong>I, II, III, IV, V, VI, VII</strong> = Major chords (uppercase)</li>
                        <li><strong>i, ii, iii, iv, v, vi, vii°</strong> = Minor/diminished chords (lowercase)</li>
                    </ul>

                    <h4>In C Major:</h4>
                    <ul>
                        <li>I = C major</li>
                        <li>ii = D minor</li>
                        <li>iii = E minor</li>
                        <li>IV = F major</li>
                        <li>V = G major</li>
                        <li>vi = A minor</li>
                        <li>vii° = B diminished</li>
                    </ul>

                    <div class="example-box">
                        💡 <strong>Why This Matters:</strong> When someone says "I-V-vi-IV progression," you can play it in ANY key!
                        It's like having a universal recipe.
                    </div>

                    <h4>Chord Functions:</h4>
                    <ul>
                        <li><strong>I (Tonic):</strong> Home base, stable, resolved</li>
                        <li><strong>IV (Subdominant):</strong> Moving away from home</li>
                        <li><strong>V (Dominant):</strong> Maximum tension, wants to go to I</li>
                        <li><strong>vi (Submediant):</strong> Sad relative of I</li>
                    </ul>
                `,
                audioDemo: 'romanNumerals'
            },
            {
                heading: 'Popular Progressions Explained',
                content: `
                    <h4>I-V-vi-IV (The "Axis of Awesome")</h4>
                    <p>Also called the "pop progression" - used in THOUSANDS of hit songs.</p>
                    <p><strong>Why it works:</strong> Perfect balance of resolution and tension. The I gives you home, V creates tension, vi adds emotion, IV brings you back.</p>
                    <p><strong>Songs:</strong> "Let It Be," "Don't Stop Believin'," "Someone Like You," "Poker Face"</p>

                    <h4>ii-V-I (The Jazz Progression)</h4>
                    <p>The foundation of jazz harmony.</p>
                    <p><strong>Why it works:</strong> The ii sets up the V, the V strongly resolves to I. Smooth and sophisticated.</p>
                    <p><strong>Use:</strong> Jazz standards, R&B, neo-soul</p>

                    <h4>i-VI-III-VII (The EDM Minor Epic)</h4>
                    <p>Dark, dramatic, builds massive energy.</p>
                    <p><strong>Why it works:</strong> All power chords in natural minor. Creates epic tension.</p>
                    <p><strong>Use:</strong> Big room house, progressive house, festival anthems</p>

                    <h4>I-IV-V (The Three-Chord Wonder)</h4>
                    <p>The simplest progression that works.</p>
                    <p><strong>Why it works:</strong> Only uses the three most stable chords. Can't go wrong!</p>
                    <p><strong>Songs:</strong> "Wild Thing," "Louie Louie," tons of punk rock</p>

                    <div class="example-box">
                        <strong>Example:</strong> Nirvana's "Smells Like Teen Spirit" uses borrowed chords (I-♭VI-III-♭VII). Coltrane's "Giant Steps" modulates through 3 keys rapidly. Frank Ocean layers unresolved 9ths throughout his songs.
                    </div>

                    <h4>🎵 Hear Progressions:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateProgression(['I','V','vi','IV'], 'C', 120)">▶ I-V-vi-IV</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateProgression(['ii','V','I'], 'C', 100)">▶ ii-V-I (Jazz)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateProgression(['i','VI','III','VII'], 'Am', 128)">▶ i-VI-III-VII (EDM)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateProgression(['I','IV','V'], 'C', 130)">▶ I-IV-V (Basic)</button>
                    </div>
                `,
                audioDemo: 'progressions'
            },
            {
                heading: 'Chord Voicing',
                content: `
                    <p><strong>Voicing</strong> is how you arrange the notes in a chord. Same notes, different arrangement = different sound!</p>

                    <h4>Root Position vs Inversions:</h4>
                    <p><strong>Root Position:</strong> Lowest note is the root (C-E-G for C major)</p>
                    <p><strong>First Inversion:</strong> Third in bass (E-G-C)</p>
                    <p><strong>Second Inversion:</strong> Fifth in bass (G-C-E)</p>

                    <h4>Closed vs Open Voicings:</h4>
                    <p><strong>Closed:</strong> Notes close together (sounds full, rich)</p>
                    <p><strong>Open:</strong> Notes spread out across octaves (sounds spacious, airy)</p>

                    <h4>Genre-Specific Voicings:</h4>

                    <h5>Jazz:</h5>
                    <p>Drop the root, add 7ths, 9ths, 13ths. Let the bass play roots.</p>

                    <h5>EDM:</h5>
                    <p>Use inversions for smoother bass movement. Big open voicings in pads.</p>

                    <h5>Rock:</h5>
                    <p>Power chords (just root and fifth, no third). Simple and powerful.</p>

                    <h5>R&B/Neo-Soul:</h5>
                    <p>Lots of 7ths, 9ths, add9 chords. Very colorful.</p>

                    <div class="example-box">
                        💡 <strong>Pro Tip:</strong> In EDM, use high closed voicings for chords, let your bass handle the root.
                        This prevents muddy low-end.
                    </div>

                    <h4>🎵 Hear Different Voicings:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('major', 'C')">▶ Triad (Basic)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('major7', 'C')">▶ 7th Chord</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateChordType('major9', 'C')">▶ Extended (9th)</button>
                    </div>
                `,
                audioDemo: 'voicing'
            }
        ]
    },

    instruments: {
        title: 'Instrumentation & Arrangement',
        sections: [
            {
                heading: 'Track Roles',
                content: `
                    <h4>Drums</h4>
                    <p>The rhythmic foundation. Keeps time and creates groove.</p>
                    <ul>
                        <li>Kick: Low-end pulse, defines the beat</li>
                        <li>Snare: Backbeat, usually on beats 2 and 4</li>
                        <li>Hi-hats: Subdivisions, creates rhythm texture</li>
                        <li>Percussion: Additional rhythmic color</li>
                    </ul>

                    <h4>Bass</h4>
                    <p>Harmonic foundation in the low-end. Bridges rhythm and melody.</p>
                    <ul>
                        <li>Root notes: Simple, stable foundation</li>
                        <li>Walking bass: Moving, jazz-style lines</li>
                        <li>Rhythmic: Syncopated, funky patterns</li>
                        <li>Melodic: More movement, complements lead</li>
                    </ul>

                    <h4>Chords</h4>
                    <p>Harmonic content. Creates the emotional landscape.</p>
                    <ul>
                        <li>Pads: Sustained, atmospheric chords</li>
                        <li>Stabs: Short, rhythmic chord hits</li>
                        <li>Piano/Keys: Rich, full harmonic content</li>
                    </ul>

                    <h4>Lead/Melody</h4>
                    <p>The main hook. What people remember and hum.</p>
                    <ul>
                        <li>Vocal melodies</li>
                        <li>Synth leads</li>
                        <li>Guitar solos</li>
                        <li>Top-line hooks</li>
                    </ul>

                    <h4>Arpeggios</h4>
                    <p>Broken chords played as individual notes. Adds movement and texture.</p>

                    <h4>Plucks</h4>
                    <p>Short, percussive melodic elements. Common in EDM and electronic music.</p>

                    <div class="example-box">
                        <strong>Arrangement Tip:</strong> Don't play everything all the time. Leave space. The verse might be drums + bass, the chorus adds chords and lead. Dynamics come from what you <em>remove</em>, not just what you add.
                    </div>
                `
            }
        ]
    },

    fx: {
        title: 'FX & Transitions',
        sections: [
            {
                heading: 'Transition Effects',
                content: `
                    <h4>Risers</h4>
                    <p>Upward sweeping sounds that build tension before a drop or new section.</p>
                    <ul>
                        <li>White noise sweeps</li>
                        <li>Pitch-rising synths</li>
                        <li>Increasing filter cutoff</li>
                        <li>Usually 2-8 bars long</li>
                    </ul>

                    <h4>Impacts</h4>
                    <p>Big, punchy hits that mark important moments.</p>
                    <ul>
                        <li>Used on downbeats of new sections</li>
                        <li>Crash cymbals</li>
                        <li>Bass drops</li>
                        <li>Sub hits</li>
                    </ul>

                    <h4>Drum Fills</h4>
                    <p>Short rhythmic variations that signal transitions.</p>
                    <ul>
                        <li>Tom rolls</li>
                        <li>Snare rolls</li>
                        <li>Usually last 1-2 bars</li>
                        <li>Lead into new sections</li>
                    </ul>

                    <h4>Downlifters</h4>
                    <p>Descending sounds after a drop or to create tension release.</p>
                    <ul>
                        <li>Pitch falling</li>
                        <li>Filter closing</li>
                        <li>Opposite of risers</li>
                    </ul>

                    <div class="example-box">
                        <strong>Example:</strong> EDM tracks use risers in the last 8 bars before the drop, then an impact on beat 1 of the drop. Hip-hop uses drum fills between verse and chorus.
                    </div>

                    <h4>🎵 Hear Each FX:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateRiser()">▶ Riser</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateImpact()">▶ Impact Hit</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateDownlifter()">▶ Downlifter</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateRhythm('basic', 120)">▶ Drum Fill</button>
                    </div>
                `
            }
        ]
    },

    dynamics: {
        title: 'Dynamics & Arrangement',
        sections: [
            {
                heading: 'Dynamic Arrangement',
                content: `
                    <h4>What is Dynamic Arrangement?</h4>
                    <p>Changing energy, intensity, and density throughout your song to maintain interest.</p>

                    <h4>Techniques:</h4>

                    <h5>1. Layering</h5>
                    <p>Add or remove instruments between sections:</p>
                    <ul>
                        <li>Intro: Minimal (maybe just drums or a pad)</li>
                        <li>Verse: Add bass and some melodic elements</li>
                        <li>Chorus: Full arrangement, all elements</li>
                        <li>Bridge: Remove some elements for contrast</li>
                    </ul>

                    <h5>2. Variations on Repeat</h5>
                    <p>Don't play the exact same thing twice:</p>
                    <ul>
                        <li>Verse 1 vs Verse 2: Add hi-hats or percussion</li>
                        <li>Chorus 1 vs Chorus 2: Change drum pattern</li>
                        <li>Final chorus: Add harmony or double the lead</li>
                    </ul>

                    <h5>3. Velocity Automation</h5>
                    <p>Change note velocities over time:</p>
                    <ul>
                        <li>Crescendo builds to chorus</li>
                        <li>Decrescendo for breakdown</li>
                        <li>Accents on important beats</li>
                    </ul>

                    <h5>4. Filter Sweeps</h5>
                    <p>Open or close filters to change brightness:</p>
                    <ul>
                        <li>Low-pass filter opens for chorus</li>
                        <li>High-pass removes bass for breakdown</li>
                        <li>Automate cutoff for movement</li>
                    </ul>

                    <div class="example-box">
                        <strong>Example:</strong> Daft Punk's "Around the World" uses the same 4-bar loop for 7 minutes, but constantly adds/removes layers to create a journey. That's dynamic arrangement mastery.
                    </div>

                    <h4>🎵 Hear Dynamic Techniques:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateFilterSweep()">▶ Filter Sweep</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateVelocity('crescendo')">▶ Velocity Build</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateLayering({drums: true, bass: true, chords: true})">▶ Layering</button>
                    </div>
                `
            }
        ]
    },

    structure: {
        title: 'Song Structure & Arrangement — The Journey',
        sections: [
            {
                heading: 'Basic Song Sections',
                content: `
                    <h4>Intro (2-4 bars typically)</h4>
                    <p><strong>Purpose:</strong> Set the mood, establish tempo and key</p>
                    <p><strong>Elements:</strong> Usually sparse - maybe just drums, or a pad, or a hook</p>
                    <p><strong>Energy:</strong> Low to medium, building anticipation</p>

                    <h4>Verse (8 bars typically)</h4>
                    <p><strong>Purpose:</strong> Tell the story, build context</p>
                    <p><strong>Elements:</strong> Medium energy, not too busy. Focus on vocals/melody</p>
                    <p><strong>Tip:</strong> Keep it simpler than the chorus so chorus hits harder</p>

                    <h4>Chorus (8 bars typically)</h4>
                    <p><strong>Purpose:</strong> The main hook, the part people remember</p>
                    <p><strong>Elements:</strong> FULL arrangement, highest energy, catchiest melody</p>
                    <p><strong>Tip:</strong> This is your money shot. Make it count!</p>

                    <h4>Bridge (8 bars typically)</h4>
                    <p><strong>Purpose:</strong> Contrast, keep things interesting, add new element</p>
                    <p><strong>Elements:</strong> Different chord progression, new melody, breakdown</p>
                    <p><strong>Tip:</strong> Often used to build into final chorus</p>

                    <h4>Outro (2-4 bars typically)</h4>
                    <p><strong>Purpose:</strong> Wrap it up, give closure</p>
                    <p><strong>Elements:</strong> Gradually remove elements (opposite of intro)</p>
                    <p><strong>Tip:</strong> Can fade out or end with a final hit</p>
                `,
                audioDemo: 'sections'
            },
            {
                heading: 'Common Song Structures',
                content: `
                    <h4>Pop Structure:</h4>
                    <p><strong>Intro - Verse - Chorus - Verse - Chorus - Bridge - Chorus - Outro</strong></p>
                    <p>Total: ~3-4 minutes</p>
                    <p>The most radio-friendly format. Predictable but effective.</p>

                    <h4>EDM Structure:</h4>
                    <p><strong>Intro - Buildup - Drop - Verse - Buildup - Drop - Breakdown - Buildup - Drop - Outro</strong></p>
                    <p>Total: 4-6 minutes</p>
                    <p>Focuses on energy cycles and big moments (drops).</p>

                    <h4>Hip-Hop Structure:</h4>
                    <p><strong>Intro - Verse - Hook - Verse - Hook - Verse - Hook - Outro</strong></p>
                    <p>Usually 3 verses with repeating hooks</p>

                    <h4>Rock Structure:</h4>
                    <p><strong>Intro - Verse - Chorus - Verse - Chorus - Solo - Chorus - Outro</strong></p>
                    <p>Classic format with instrumental solo replacing bridge</p>

                    <div class="example-box">
                        💡 <strong>Modern Trend:</strong> Songs are getting shorter! Many hits now are 2:30-3:00 to optimize for streaming.
                        Intro, verse, chorus, verse, chorus, done!
                    </div>
                `,
                audioDemo: 'structures'
            },
            {
                heading: 'EDM-Specific Sections',
                content: `
                    <h4>Build-up (4-8 bars)</h4>
                    <p><strong>Purpose:</strong> Create tension before the drop</p>
                    <p><strong>Techniques:</strong></p>
                    <ul>
                        <li>Rising pitch (risers/sweeps)</li>
                        <li>Increasing filter cutoff</li>
                        <li>Adding drum fills</li>
                        <li>Increasing reverb/delay</li>
                        <li>Snare rolls getting faster</li>
                    </ul>
                    <p>Last 1-2 bars: often cut drums entirely for impact</p>

                    <h4>Drop (8-16 bars)</h4>
                    <p><strong>Purpose:</strong> The payoff, highest energy, "the moment"</p>
                    <p><strong>Elements:</strong> Full drums, bass, synths - everything hits</p>
                    <p><strong>Tip:</strong> First 1-2 bars should be the fattest/fullest</p>

                    <h4>Breakdown (8 bars)</h4>
                    <p><strong>Purpose:</strong> Give listener a break, add variety</p>
                    <p><strong>Elements:</strong> Remove drums/bass, focus on melody/vocals</p>
                    <p><strong>Tip:</strong> Perfect for adding emotional moment or vocal hook</p>

                    <h4>Fill (1-2 bars)</h4>
                    <p><strong>Purpose:</strong> Signal transition between sections</p>
                    <p><strong>Types:</strong></p>
                    <ul>
                        <li>Drum fills</li>
                        <li>Riser sweeps</li>
                        <li>Downlifters</li>
                        <li>Reverse cymbals</li>
                        <li>Impact hits</li>
                    </ul>

                    <div class="example-box">
                        🎵 <strong>The 8-Bar Rule:</strong> In EDM, most sections are multiples of 8 bars. It creates a hypnotic, predictable structure that works on dance floors.
                    </div>

                    <button class="audio-preview" onclick="audioEngine.demonstrateLayering({drums: true, bass: true, chords: true, lead: true})">
                        Hear EDM Structure Build
                    </button>
                `,
                audioDemo: 'edmStructure'
            }
        ]
    },

    production: {
        title: 'Production Techniques — Making MIDI Feel Alive',
        sections: [
            {
                heading: 'Humanization',
                content: `
                    <p><strong>Humanization</strong> makes programmed MIDI sound less robotic and more natural.</p>

                    <h4>What Gets Humanized:</h4>

                    <h5>1. Timing (Most Important!)</h5>
                    <p>Real humans don't play perfectly on the grid. Add slight timing variations:</p>
                    <ul>
                        <li>±10ms for tight playing</li>
                        <li>±20ms for moderate humanization</li>
                        <li>±30-50ms for drunk drummer feel</li>
                    </ul>

                    <h5>2. Velocity</h5>
                    <p>No two hits are exactly the same strength:</p>
                    <ul>
                        <li>Vary hi-hat velocities ±10-20</li>
                        <li>Kick and snare ±5-15</li>
                        <li>Random MIDI notes ±10-25</li>
                    </ul>

                    <h5>3. Note Length</h5>
                    <p>Notes held slightly different lengths add realism</p>

                    <h4>When To Use:</h4>
                    <ul>
                        <li><strong>Acoustic instruments:</strong> Always! Piano, guitar, drums</li>
                        <li><strong>Electronic music:</strong> Maybe. Sometimes the robotic feel is the point</li>
                        <li><strong>Trap/Hip-Hop:</strong> Minimal on hi-hats, keep them tight</li>
                    </ul>

                    <div class="example-box">
                        💡 <strong>Pro Tip:</strong> Humanize BEFORE quantizing, not after. Or use "soft quantize" (move notes only 70-80% toward the grid).
                    </div>

                    <h4>🎵 Hear Humanization:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateScale('C', 'major', 'fast')">▶ Scale Example</button>
                    </div>
                `,
                audioDemo: 'humanization'
            },
            {
                heading: 'Swing & Groove',
                content: `
                    <p><strong>Swing</strong> delays every other note, creating a bouncy, groovy feel.</p>

                    <h4>Technical Explanation:</h4>
                    <p>In straight timing, 16th notes are evenly spaced: 1-2-3-4</p>
                    <p>With swing, off-beats are delayed: 1--2-3--4 (creates triplet feel)</p>

                    <h4>Swing Percentages:</h4>
                    <ul>
                        <li><strong>0%:</strong> Perfectly straight (house, techno)</li>
                        <li><strong>16-25%:</strong> Subtle groove (hip-hop, trap)</li>
                        <li><strong>33%:</strong> Classic swing, triplet feel (shuffle)</li>
                        <li><strong>50-66%:</strong> Heavy swing (jazz, blues)</li>
                    </ul>

                    <h4>Genre Guide:</h4>
                    <ul>
                        <li><strong>House/Techno:</strong> 0% (tight and mechanical)</li>
                        <li><strong>Hip-Hop:</strong> 10-20% (subtle bounce)</li>
                        <li><strong>Trap:</strong> 15-25% (modern bounce)</li>
                        <li><strong>Jazz:</strong> 60-70% (heavily swung)</li>
                        <li><strong>Boom Bap:</strong> 25-40% (classic hip-hop swing)</li>
                    </ul>

                    <div class="example-box">
                        <strong>Example:</strong> J Dilla's MPC timing was microseconds off-grid, creating his signature feel. D'Angelo's "Voodoo" album uses extreme swing. Flying Lotus and Madlib use similar techniques.
                    </div>

                    <h4>🎵 Hear Different Swing Amounts:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateSwing(0)">▶ 0% (Straight)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateSwing(25)">▶ 25% (Subtle)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateSwing(50)">▶ 50% (Shuffle)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateSwing(66)">▶ 66% (Heavy Jazz)</button>
                    </div>
                `,
                audioDemo: 'swing'
            },
            {
                heading: 'Drum Rhythm Patterns',
                content: `
                    <p><strong>Drum patterns</strong> define the rhythmic foundation and genre feel of your track.</p>

                    <h4>Common Drum Patterns by Genre:</h4>

                    <h5>Basic (Four-on-the-Floor):</h5>
                    <p>Kick on every beat, snare on 2 & 4, constant hi-hats</p>
                    <p>Used in: House, pop, disco</p>

                    <h5>Funk:</h5>
                    <p>Syncopated kick with ghost notes, tight hi-hat patterns</p>
                    <p>Used in: Funk, disco, nu-disco</p>

                    <h5>Trap:</h5>
                    <p>Rolling hi-hats (32nd/64th notes), sparse kick, snare on 3</p>
                    <p>Used in: Trap, hip-hop, modern pop</p>

                    <h5>Breakbeat:</h5>
                    <p>Syncopated, off-beat kicks and snares, irregular patterns</p>
                    <p>Used in: Drum & bass, jungle, breaks</p>

                    <div class="example-box">
                        <strong>Example:</strong> Clyde Stubblefield's "Funky Drummer" (sampled 1000+ times) has off-grid swing. Aphex Twin programs complex polyrhythms. Arca uses deconstructed reggaeton patterns.
                    </div>

                    <h4>🎵 Hear Each Rhythm Pattern:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateRhythm('basic', 120)">▶ Basic (House)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateRhythm('funk', 110)">▶ Funk</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateRhythm('trap', 140)">▶ Trap</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateRhythm('breakbeat', 170)">▶ Breakbeat</button>
                    </div>
                `,
                audioDemo: 'rhythm'
            },
            {
                heading: 'Velocity & Dynamics',
                content: `
                    <p><strong>Velocity</strong> controls how hard a note is played (volume + timbre).</p>

                    <h4>MIDI Velocity Range: 0-127</h4>
                    <ul>
                        <li><strong>1-30:</strong> Very soft, whisper</li>
                        <li><strong>40-60:</strong> Medium-soft, background</li>
                        <li><strong>70-90:</strong> Medium, normal playing</li>
                        <li><strong>100-127:</strong> Loud, aggressive, emphasized</li>
                    </ul>

                    <h4>Creating Dynamics:</h4>

                    <h5>Verse Pattern:</h5>
                    <p>Keep velocities lower (60-80) for intimate, controlled feel</p>

                    <h5>Chorus Pattern:</h5>
                    <p>Push velocities higher (90-110) for energy and impact</p>

                    <h5>Build-ups:</h5>
                    <p>Gradually increase velocity (crescendo) from 60 to 110</p>

                    <h5>Breakdowns:</h5>
                    <p>Drop velocities suddenly for impact contrast</p>

                    <h4>Instrument-Specific Tips:</h4>

                    <h5>Drums:</h5>
                    <ul>
                        <li>Kick: Consistent 100-110</li>
                        <li>Snare: Vary 85-105 (accents on 2 and 4)</li>
                        <li>Hi-hats: Alternating 60-80 for realism</li>
                    </ul>

                    <h5>Bass:</h5>
                    <ul>
                        <li>Consistent 90-100 for solid low-end</li>
                        <li>Occasional 110+ for emphasis</li>
                    </ul>

                    <h5>Leads:</h5>
                    <ul>
                        <li>Most varied! 70-120 range</li>
                        <li>Follow the phrase/emotion</li>
                    </ul>

                    <div class="example-box">
                        <strong>Example:</strong> Glenn Gould's Bach recordings are legendary for velocity control. Daft Punk's "Touch" uses velocity swells. Bill Evans was known for dynamic piano playing.
                    </div>

                    <h4>🎵 Hear Velocity Dynamics:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateVelocity('crescendo')">▶ Crescendo (Build)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateVelocity('decrescendo')">▶ Decrescendo (Fade)</button>
                        <button class="audio-preview" onclick="audioEngine.demonstrateVelocity('accent')">▶ Accents (Dynamic)</button>
                    </div>
                `,
                audioDemo: 'velocity'
            }
        ]
    },

    experimental: {
        title: 'Experimental Techniques — Where Rules Dissolve',
        sections: [
            {
                heading: 'Polyrhythms',
                content: `
                    <p><strong>Polyrhythms</strong> are two or more different rhythms played simultaneously.</p>

                    <h4>Common Examples:</h4>

                    <h5>3 Against 4:</h5>
                    <p>One part plays 3 beats while another plays 4 in the same time</p>
                    <p>Creates interesting tension and complexity</p>

                    <h5>5 Against 4:</h5>
                    <p>Even more complex and disorienting</p>

                    <h4>Where Used:</h4>
                    <ul>
                        <li>Progressive metal (Tool, Meshuggah)</li>
                        <li>Jazz (Dave Brubeck)</li>
                        <li>African music (traditional polyrhythmic patterns)</li>
                        <li>Modern electronic (Aphex Twin)</li>
                    </ul>

                    <h4>How To Create:</h4>
                    <ol>
                        <li>Set up a basic 4/4 beat</li>
                        <li>Add a synth playing triplets (3 notes per beat)</li>
                        <li>Add a bass playing groups of 5 16th notes</li>
                        <li>Magic happens!</li>
                    </ol>

                    <div class="example-box">
                        <strong>Example:</strong> Steve Reich's "Drumming" uses polyrhythmic phase shifting. King Crimson's "Discipline" layers 5/4, 7/8, and 4/4 simultaneously. Autechre programs complex overlapping rhythms. West African drumming traditions use this extensively.
                    </div>

                    <h4>🎵 Hear Polyrhythm:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstratePolyrhythm()">▶ 3 Against 4</button>
                    </div>
                `,
                audioDemo: 'polyrhythm'
            },
            {
                heading: 'Euclidean Rhythms',
                content: `
                    <p><strong>Euclidean rhythms</strong> distribute beats as evenly as possible across a time span.</p>

                    <h4>The Math:</h4>
                    <p>E(k,n) = k beats distributed across n steps</p>

                    <h4>Examples:</h4>
                    <ul>
                        <li><strong>E(3,8):</strong> X..X..X. - Common rock beat</li>
                        <li><strong>E(5,8):</strong> X.X.X.XX - Cuban tresillo</li>
                        <li><strong>E(7,12):</strong> X.XX.X.XX.X. - Complex pattern</li>
                    </ul>

                    <h4>Why They're Cool:</h4>
                    <ul>
                        <li>Sound natural but interesting</li>
                        <li>Found in traditional music worldwide</li>
                        <li>Great for generative music</li>
                        <li>Create unique drum patterns</li>
                    </ul>

                    <h4>How To Use:</h4>
                    <p>Apply Euclidean rhythms to different drum hits:</p>
                    <ul>
                        <li>Kick: E(5,16)</li>
                        <li>Snare: E(3,16)</li>
                        <li>Hi-hat: E(11,16)</li>
                    </ul>

                    <div class="example-box">
                        💡 <strong>Origin:</strong> Named after Euclid's algorithm. These patterns appear naturally in traditional rhythms from Cuba, Brazil, Turkey, and many African countries!
                    </div>

                    <h4>🎵 Hear Euclidean Rhythm:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateEuclideanRhythm()">▶ E(5,8) Pattern</button>
                    </div>
                `,
                audioDemo: 'euclidean'
            },
            {
                heading: 'Generative Music',
                content: `
                    <p><strong>Generative music</strong> uses systems/algorithms to create ever-changing music.</p>

                    <h4>Techniques:</h4>

                    <h5>1. Randomization:</h5>
                    <p>Randomly select notes from a scale</p>
                    <p>Add probability (70% chance of playing this note)</p>

                    <h5>2. Rules-Based:</h5>
                    <p>If note goes up, next note must go down</p>
                    <p>If velocity is high, next must be low</p>

                    <h5>3. Markov Chains:</h5>
                    <p>Choose next note based on probability from current note</p>
                    <p>Creates patterns that evolve organically</p>

                    <h5>4. Cellular Automata:</h5>
                    <p>Like Conway's Game of Life but for music</p>
                    <p>Notes affect neighboring notes</p>

                    <h4>Famous Examples:</h4>
                    <ul>
                        <li>Brian Eno - "Music for Airports"</li>
                        <li>Autechre's live sets</li>
                        <li>Game soundtracks (No Man's Sky)</li>
                    </ul>

                    <div class="example-box">
                        🎵 <strong>Try This:</strong> In your DAW, set up a MIDI arpeggiator with random mode. That's generative music!
                    </div>

                    <h4>🎵 Hear Generative Effect:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin: 16px 0;">
                        <button class="audio-preview" onclick="audioEngine.demonstrateGlitch()">▶ Glitch/Generative</button>
                    </div>
                `,
                audioDemo: 'generative'
            }
        ]
    }
};

// Modal System Functions
function openEducationalModal(topic) {
    const content = educationContent[topic];
    if (!content) return;

    const modalHTML = `
        <div class="modal active" id="eduModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">&times;</button>
                <h2 class="modal-title">${content.title}</h2>
                ${content.sections.map(section => `
                    <div class="modal-section">
                        <h3>${section.heading}</h3>
                        ${section.content}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.getElementById('modalContainer').innerHTML = modalHTML;
}

function closeModal() {
    document.getElementById('modalContainer').innerHTML = '';
    audioEngine.stopAll();
}

// All audio demo functions are now handled by the AdvancedAudioEngine class
// (see audio-engine-v2.js) - no more alert() messages, all visual feedback!
