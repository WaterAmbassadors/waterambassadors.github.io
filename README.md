# Water Ambassadors — Website

A multi-page HTML/CSS/JS website for the Water Ambassadors initiative.
Built with plain HTML, Tailwind CSS (CDN), and Vanilla JS. Ready for GitHub Pages.

---

## 📁 Folder Structure

```
water-ambassadors/
├── index.html              ← Home page
├── about.html              ← About page
├── team.html               ← Team page
├── contact.html            ← Contact page
├── favicon.ico             ← Add your own favicon here
├── css/
│   └── style.css           ← All custom styles
├── js/
│   └── main.js             ← All JavaScript
├── images/
│   ├── logo.png            ← ✅ Already included (your uploaded logo)
│   ├── brigitte.jpg        ← 📸 ADD: Photo of Ms. Brigitte Madeleine van Baren
│   ├── song-art.jpg        ← 🎨 ADD: Album art for the song player (optional)
│   ├── school-logo.png     ← 🏫 ADD: Your school's logo (for About page)
│   ├── lppf-logo.png       ← 🌊 ADD: Living Peace Projects Foundation logo
│   ├── partners/           ← 🤝 ADD partner/contributor logos here
│   │   ├── partner1.png
│   │   ├── partner2.png
│   │   └── ... (up to partner6.png or more)
│   ├── gallery/            ← 📷 ADD cleanliness drive photos here
│   │   ├── drive1.jpg
│   │   ├── drive2.jpg
│   │   └── ... (up to drive6.jpg or more — add as many as you like)
│   ├── posters/            ← 🎨 ADD awareness poster images here
│   │   ├── poster1.jpg
│   │   ├── poster2.jpg
│   │   └── ... (up to poster5.jpg or more)
│   └── team/               ← 👤 ADD team member photos here
│       ├── coordinator1.jpg
│       ├── coordinator2.jpg
│       ├── member1.jpg
│       └── ... (one per team member)
├── media/
│   └── anthem.mp3          ← 🎵 ADD your Water Ambassadors song here
└── presentations/
    ├── presentation1.pdf   ← 📊 ADD: Export your PPT as PDF and place here
    └── presentation2.pdf   ← 📊 ADD: Second presentation as PDF
```

---

## 🖼️ Image Guidelines

| Slot | Recommended Size | Notes |
|------|-----------------|-------|
| Partner logos | Any | Will be scaled to 160×90px, greyscale effect on hover |
| Gallery photos | ≥ 800×600px | 4:3 aspect ratio preferred; auto-cropped |
| Poster images | ≥ 600×900px | Portrait/tall preferred; auto-scaled |
| Team photos | ≥ 400×400px | Cropped to circle; top-aligned |
| Brigitte photo | ≥ 400×400px | Cropped to circle |
| School / LPPF logos | Any PNG | Transparent background preferred |

All images are displayed with `object-fit: cover` or `contain`, so any size will work — no visible distortion.

---

## 📊 Presentations

**Option A — PDF (easiest):**
1. Open your .pptx in PowerPoint or Google Slides
2. Export / Save As → PDF
3. Drop the PDF into `presentations/presentation1.pdf` (or `presentation2.pdf`)

**Option B — Google Slides embed (better interactive experience):**
1. Upload your .pptx to Google Drive → Open with Google Slides
2. File → Share → Publish to web → Embed tab → Copy the iframe `src` URL
3. In `about.html`, find the `<iframe>` tags and replace `src="presentations/presentation1.pdf"` with your Google Slides URL

---

## 🎵 Song Player

1. Export or save your song as an MP3 file
2. Name it `anthem.mp3` and place it in the `media/` folder
3. Optionally, add an album art image as `images/song-art.jpg`

---

## 📬 Contact Form (StaticForms)

1. Go to [staticforms.xyz](https://www.staticforms.xyz) and create an account
2. Create a new form → copy your **Access Key**
3. Open `contact.html` and find this line:
   ```html
   <input type="hidden" name="accessKey" value="YOUR_ACCESS_KEY_HERE" />
   ```
4. Replace `YOUR_ACCESS_KEY_HERE` with your actual key
5. Also update the `redirectTo` value to your actual GitHub Pages URL:
   ```html
   <input type="hidden" name="redirectTo" value="https://YOURUSERNAME.github.io/REPONAME/contact.html?sent=1" />
   ```

---

## 🌐 GitHub Pages Deployment

1. Create a new GitHub repository (e.g., `water-ambassadors`)
2. Upload all files maintaining the folder structure
3. Go to repository Settings → Pages
4. Set Source to `main` branch, `/ (root)` folder
5. Save → Your site will be live at `https://YOURUSERNAME.github.io/water-ambassadors/`

---

## ✏️ Customising Team Members

In `team.html`:
- Replace each `[Student Name]` and `[Name]` placeholder with real names
- Add photos to `images/team/` and update the `src` attributes accordingly
- To add more members, duplicate any `.team-card` block
- Remove the blue "Editor's Note" box before publishing

---

## 🎨 Customising Partner Logos

In `index.html`, inside `#partners`:
- Replace `src="images/partners/partner1.png"` etc. with your actual partner logo files
- You can add more `.partner-card` blocks — the carousel auto-scrolls
- The JS automatically clones them for a seamless infinite loop

---

## 🎨 Colour Scheme

All colours are CSS variables in `css/style.css` under `:root`. Change these to adjust the entire theme:
- `--ocean-deep` — darkest background
- `--ocean-bright` — main accent blue
- `--ocean-glow` — highlight / glow colour
- `--text-accent` — accent text colour

---

Built with ❤️ by Rishit Choudhary (https://rishitc17.github.io)
