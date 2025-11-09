const fs = require('fs');
const path = require('path');

const writingDir = __dirname;
const manifestPath = path.join(__dirname, 'writings-manifest.json');

// Get all .txt files from write directory (excluding manifest and script files)
const files = fs.readdirSync(writingDir)
    .filter(file => file.endsWith('.txt') && !file.startsWith('.'))
    .map(file => {
        const filePath = path.join(writingDir, file);
        const stats = fs.statSync(filePath);

        // Extract title from filename (remove .txt and replace - or _ with spaces)
        const title = file
            .replace('.txt', '')
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return {
            filename: file,
            title: title,
            date: stats.mtime.toISOString(),
            modified: stats.mtime.getTime()
        };
    })
    // Sort by modified date, most recent first
    .sort((a, b) => b.modified - a.modified);

// Create manifest
const manifest = {
    writings: files.map(({ filename, title, date }) => ({
        filename,
        title,
        date
    })),
    lastUpdated: new Date().toISOString()
};

// Write manifest file
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`✅ Manifest created with ${files.length} writing(s)`);
files.forEach(file => {
    console.log(`   - ${file.title}`);
});
