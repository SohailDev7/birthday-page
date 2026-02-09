# Audio Files Setup for Vite

## 📁 Where to Put Audio Files

### Option 1: Public Folder (Recommended for this project)
Put your audio files in: `public/audio/`

```
birthday-page/
├── public/
│   ├── audio/              👈 CREATE THIS FOLDER
│   │   ├── sweden.mp3
│   │   ├── wet-hands.mp3
│   │   ├── haggstrom.mp3
│   │   ├── mice-on-venus.mp3
│   │   └── living-mice.mp3
│   ├── _redirects
│   └── vite.svg
```

**Benefits:**
- ✅ Files are served as-is (no processing)
- ✅ No import needed
- ✅ Reference with `/audio/filename.mp3`
- ✅ Perfect for large audio files
- ✅ Works in both dev and production

---

## 🎵 Steps to Add Your Music

1. **Create the audio folder:**
   ```bash
   mkdir public/audio
   ```

2. **Add your .mp3 files** to `public/audio/`:
   - sweden.mp3
   - wet-hands.mp3
   - haggstrom.mp3
   - mice-on-venus.mp3
   - living-mice.mp3

3. **Files will automatically work!** The code already references:
   ```javascript
   url: "/audio/sweden.mp3"
   ```

---

## 🔧 Vite Configuration

The `vite.config.js` has been updated with:

### Audio File Support
```javascript
assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.ogg', '**/*.m4a']
```
This allows Vite to recognize audio files.

### Build Optimization
```javascript
build: {
  assetsInlineLimit: 0, // Don't convert audio to base64
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        // Audio files go to assets/audio/ folder
        if (assetInfo.name.match(/\.(mp3|wav|ogg)$/i)) {
          return 'assets/audio/[name]-[hash][extname]';
        }
        return 'assets/[name]-[hash][extname]';
      }
    }
  }
}
```

---

## 🎮 Alternative: Import Method (Optional)

If you want to use imports instead:

1. **Put files in:** `src/assets/audio/`

2. **Import in Home.jsx:**
```javascript
import swedenAudio from '../assets/audio/sweden.mp3';
import wetHandsAudio from '../assets/audio/wet-hands.mp3';

const musicTracks = [
  { name: "Sweden", url: swedenAudio },
  { name: "Wet Hands", url: wetHandsAudio },
];
```

---

## 📝 Supported Audio Formats

✅ `.mp3` (recommended - best browser support)
✅ `.wav` (higher quality, larger files)
✅ `.ogg` (good compression)
✅ `.m4a` (Apple format)
✅ `.aac` (good quality)
✅ `.flac` (lossless, very large)

**Recommended:** Use `.mp3` at 192kbps or 320kbps for best quality/size balance.

---

## 🚀 Production Build

When you run `npm run build`:
- Audio files from `public/` → copied to `dist/audio/`
- Audio files from `src/assets/` → bundled to `dist/assets/audio/`
- Vite adds hash to filenames for cache busting
- All references are automatically updated

---

## 🎵 Finding Minecraft Music

For C418 Minecraft soundtrack:
1. Purchase from: https://c418.bandcamp.com/album/minecraft-volume-alpha
2. Or use royalty-free music from: https://pixabay.com/music/
3. Convert to .mp3 if needed using online converters

---

## ✨ Current Setup

Your project is configured to use:
📂 `public/audio/sweden.mp3`
📂 `public/audio/wet-hands.mp3`
📂 `public/audio/haggstrom.mp3`
📂 `public/audio/mice-on-venus.mp3`
📂 `public/audio/living-mice.mp3`

**Just add your .mp3 files to `public/audio/` and it will work!** 🎮✨
