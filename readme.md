# Denis Sapach — Motion & UI Designer Portfolio

A premium single-page portfolio website for Denis Sapach, built with pure HTML5, CSS3, and Vanilla JavaScript. Features GSAP scroll animations, Lottie animation integration, CSS Grid/Flexbox layout, and full mobile responsiveness.

---

## 📁 Project Structure

```
portfolio/
├── index.html          ← Main HTML structure (all sections)
├── style.css           ← All styles (design tokens, layout, animations)
├── script.js           ← All JavaScript (GSAP, typewriter, filter, Lottie)
├── animations/         ← (Create this folder) Place .json Lottie files here
│   ├── loading.json
│   ├── success.json
│   └── icon-set.json
└── README.md           ← This file
```

---

## 🚀 GitHub Pages Deployment

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and click **New repository**
2. Name it `portfolio` (or `your-username.github.io` for root domain)
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Push Your Files

```bash
# Initialize git in your project folder
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Add your GitHub remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select `Deploy from a branch`
3. Choose branch: `main` / folder: `/ (root)`
4. Click **Save**

Your site will be live at:  
`https://YOUR_USERNAME.github.io/portfolio/`  
(or `https://YOUR_USERNAME.github.io/` if repo is named `YOUR_USERNAME.github.io`)

---

## ✏️ How to Replace Placeholders with Real Content

### 1. Profile Photo

Open `index.html` and find the `.photo-placeholder` div inside `#about`:

```html
<!-- BEFORE -->
<div class="photo-placeholder">
  <svg ...>...</svg>
  <span class="photo-label">Photo Placeholder</span>
</div>
```

Replace with:

```html
<!-- AFTER -->
<div class="photo-placeholder">
  <img src="photo.jpg" alt="Denis Sapach" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
</div>
```

Then add your photo file (`photo.jpg`) to the project root.

---

### 2. Showreel Video

In `script.js`, find this line near the top of `initShowreel()`:

```js
const VIDEO_ID = 'YOUR_VIDEO_ID';
```

Replace `YOUR_VIDEO_ID` with your actual YouTube video ID.  
Example: for `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`.

```js
const VIDEO_ID = 'dQw4w9WgXcQ';
```

---

### 3. Lottie Animations

**Step 1:** Create an `animations/` folder in your project root.

**Step 2:** Export your Lottie animations as `.json` files from:
- **After Effects** → Bodymovin plugin
- **LottieFiles.com** → download free animations

**Step 3:** In `script.js`, find the commented Lottie block inside `initLottieAnimations()`:

```js
// Uncomment and edit these:
const animConfigs = [
  { id: 'lottie1', path: 'animations/loading.json' },
  { id: 'lottie2', path: 'animations/success.json' },
  { id: 'lottie3', path: 'animations/icon-set.json' },
];

animConfigs.forEach(({ id, path }) => {
  const container = document.getElementById(id);
  if (!container) return;
  lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path
  });
});
```

Remove the `//` comments and delete or skip the `loadDemoAnimation()` call below it.

**Step 4:** Remove the demo animation section from `initLottieAnimations()`:

Delete or comment out the `DEMO_ANIMATIONS` block and its `forEach` loop.

---

### 4. Portfolio Projects

Each project card in `index.html` looks like this:

```html
<div class="project-card" data-category="ui-animation">
  <div class="card-media" style="--card-hue:220deg">
    <div class="card-placeholder">
      <!-- Replace with: <img src="projects/project1.jpg" ...> -->
    </div>
    ...
  </div>
  <div class="card-body">
    <span class="card-tag">UI Animation</span>
    <h3 class="card-title">App Onboarding Flow</h3>
  </div>
</div>
```

Replace the `card-placeholder` div content with a real image:

```html
<img src="projects/my-project.jpg" alt="Project Name"
     style="width:100%;height:100%;object-fit:cover;" />
```

Available `data-category` values for filter buttons:
- `ui-animation`
- `brand`
- `motion`
- `ui-design`
- `3d`

---

### 5. Contact Links

In `index.html`, update the `href` values in `#contact`:

```html
<!-- Email -->
<a href="mailto:your@email.com" ...>your@email.com</a>

<!-- LinkedIn -->
<a href="https://linkedin.com/in/YOUR_PROFILE" ...>linkedin.com/in/YOUR_PROFILE</a>

<!-- Dribbble -->
<a href="https://dribbble.com/YOUR_PROFILE" ...>dribbble.com/YOUR_PROFILE</a>
```

---

### 6. CV Download

In `#about`, find the "Download CV" button and add a real link:

```html
<!-- BEFORE -->
<a href="#contact" class="btn btn-primary">

<!-- AFTER -->
<a href="cv/denis-sapach-cv.pdf" download class="btn btn-primary">
```

Add your PDF file at `cv/denis-sapach-cv.pdf`.

---

### 7. Meta / SEO

Update the `<head>` in `index.html`:

```html
<title>Your Name — Motion & UI Designer</title>
<meta name="description" content="Your custom description here." />

<!-- Add Open Graph for social sharing -->
<meta property="og:title" content="Denis Sapach — Motion & UI Designer" />
<meta property="og:description" content="Portfolio of motion and UI work." />
<meta property="og:image" content="https://your-domain.com/og-image.jpg" />
<meta property="og:url" content="https://your-domain.com" />
```

---

## 🎨 Customizing Colors

All colors are CSS custom properties in `style.css`:

```css
:root {
  --navy:   #0F1F3D;   /* Hero & dark section background */
  --accent: #4D9FFF;   /* Accent blue — change to your brand color */
  --bg:     #FFFFFF;   /* Main background */
  --bg2:    #F4F6FA;   /* Secondary background */
  --text:   #1A1A2E;   /* Body text */
}
```

Change `--accent` to instantly retheme the entire site.

---

## 📦 Libraries Used (CDN — no install needed)

| Library | Version | Purpose |
|---------|---------|---------|
| GSAP | 3.12.5 | Scroll animations, timeline animations |
| ScrollTrigger | 3.12.5 | GSAP scroll-based triggers |
| Lottie-web | 5.12.2 | JSON animation playback |
| Google Fonts | — | Inter + Space Grotesk typefaces |

All libraries load from CDN — no npm, no bundler required.

---

## 🔧 Local Development

Just open `index.html` in a browser. No build step needed.

For Lottie animations, you'll need a local server (browsers block local file fetches):

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# VS Code → Live Server extension (recommended)
```

Then visit `http://localhost:8000`

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Safari | ✅ Full |
| Chrome Android | ✅ Full |

---

## 📄 License

© 2024 Denis Sapach. All rights reserved.  
This template was built specifically for Denis Sapach's portfolio.

---

*Built with motion & intent. ✦*
