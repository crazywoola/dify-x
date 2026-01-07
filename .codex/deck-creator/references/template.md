# Dify Presentation Deck Template

This document describes the common structural patterns and conventions used across all presentation decks in this repository.

---

## 1. Framework & Technical Stack

All decks are built using:

| Technology | Purpose | CDN Source |
|------------|---------|------------|
| **Reveal.js 5.x** | Slide presentation framework | `cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/` |
| **Tailwind CSS** | Utility-first styling | `cdn.tailwindcss.com` |
| **FontAwesome 6.x** | Icons | `cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/` |
| **Highlight.js** | Code syntax highlighting | `cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/` |
| **Google Fonts** | Typography | `fonts.googleapis.com` |
| **MathJax** (optional) | Mathematical formulas | `cdn.jsdelivr.net/npm/mathjax@3/` |

---

## 2. Document Structure

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- Meta & Title -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dify × {Partner} · {Topic}</title>

  <!-- Reveal.js Core CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/reveal.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/theme/white.min.css" id="theme">

  <!-- Additional Libraries -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/{theme}.min.css">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">

  <!-- Custom CSS (inline or external) -->
  <link rel="stylesheet" href="styles/{custom-theme}.css">
</head>
<body>
  <!-- Fixed Elements (outside Reveal container) -->
  <div class="lang-switch">...</div>
  <div class="brand-watermark">...</div>
  <div id="bg-shapes">...</div>

  <!-- Reveal Container -->
  <div class="reveal">
    <div class="slides">
      <!-- Slide Sections -->
    </div>
  </div>

  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/reveal.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script>/* Reveal initialization */</script>
</body>
</html>
```

---

## 3. Fixed UI Elements

### 3.1 Language Switcher
Always positioned top-right, allows switching between Chinese and English versions.

```html
<div class="lang-switch">
  <a class="active" href="index.html">中文</a>
  <span>/</span>
  <a href="index_en.html">EN</a>
</div>
```

```css
.lang-switch {
  position: fixed;
  top: 18px;
  right: 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  font-size: 14px;
  z-index: 30;
}
```

### 3.2 Brand Logo Watermark
Fixed Dify logo positioned top-left.

```html
<div class="brand-watermark">
  <img src="../assets/logo.svg" alt="Dify">
  <span>× {PARTNER}</span>  <!-- Optional co-branding -->
</div>
```

### 3.3 Navigation Hint
Optional hint for slide navigation.

```html
<div class="slide-meta">↑/↓ 纵向浏览 · ←/→ 切换章节</div>
```

### 3.4 Background Shapes
Decorative diffused gradient shapes for visual depth.

```html
<div id="bg-shapes" aria-hidden="true">
  <div class="shape s1"></div>
  <div class="shape s2"></div>
  <div class="shape s3"></div>
</div>
```

---

## 4. CSS Theming

### 4.1 CSS Custom Properties (Root Variables)

```css
:root {
  /* Dify Brand Colors */
  --dify-blue: #0033FF;
  
  /* Partner Colors (customizable) */
  --partner-primary: #287DFA;
  --partner-secondary: #FFB600;
  
  /* Semantic Colors */
  --pop-cyan: #00BCD4;
  --pop-magenta: #E91E63;
  --pop-yellow: #FFC107;
  --pop-green: #4CAF50;
  --pop-red: #F44336;
  --pop-blue: #2196F3;
  --pop-purple: #9D4EDD;
  --pop-orange: #FF5A00;
}
```

### 4.2 Typography

```css
body {
  font-family: 'Inter', 'Noto Sans SC', sans-serif;
}

.reveal h1, .reveal h2, .reveal h3 {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 700;
  text-transform: none;
}

code, pre {
  font-family: 'JetBrains Mono', monospace;
}
```

### 4.3 Background Styles

```css
body {
  background-color: #ffffff;
  background-image:
    radial-gradient(circle at 0% 0%, rgba(0, 51, 255, 0.08) 0%, transparent 60%),
    radial-gradient(circle at 100% 100%, rgba(0, 51, 255, 0.08) 0%, transparent 60%);
  background-attachment: fixed;
}

/* Animated floating shapes */
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(40px, 60px); }
}

#bg-shapes .shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
}
```

---

## 5. Slide Structure

### 5.1 Vertical Stacking (Chapters)
Use nested `<section>` elements for vertical navigation within a chapter.

```html
<!-- Chapter (horizontal navigation) -->
<section>
  <!-- Slide 1 (vertical navigation within chapter) -->
  <section>
    <h2>Chapter Title</h2>
  </section>
  
  <!-- Slide 2 -->
  <section>
    <h2>Sub-topic</h2>
  </section>
</section>
```

### 5.2 Speaker Notes
Include speaker notes for each slide.

```html
<section>
  <h2>Slide Title</h2>
  <p>Content...</p>
  
  <aside class="notes">
    [Timing: 0:00 - 3:00]
    - Key talking points
    - Definitions of terms
    - Transition cues
  </aside>
</section>
```

---

## 6. Common Slide Types

### 6.1 Title Slide

```html
<section>
  <div class="hero hero--dark">
    <div class="badge badge--ghost">
      <i class="fas fa-bolt"></i> Dify × {Partner}
    </div>
    <h1>{Main Title}</h1>
    <p>{Subtitle / Value proposition}</p>
    <div class="stats-row">
      <div class="stat-item">
        <div class="number">5</div>
        <div class="label">核心工作流</div>
      </div>
      <!-- More stats -->
    </div>
    <p class="footer-note">Speaker: {Name} · {Role} @ Dify</p>
  </div>
</section>
```

### 6.2 Community / Credibility Slide

```html
<section>
  <h2>Community-Driven · 全球认可</h2>
  <p>开源生态驱动，已跻身 GitHub Star Top 100</p>
  <div class="community-grid">
    <div class="community-card">
      <div class="community-label"><i class="fas fa-cloud-arrow-down"></i> INSTALL</div>
      <div class="community-value">1M+</div>
      <div class="community-subtext">Powered by Dify</div>
    </div>
    <div class="community-card">
      <div class="community-label"><i class="fas fa-star"></i> POPULARITY</div>
      <div class="community-value">120K+</div>
      <div class="community-subtext">GitHub Stars</div>
    </div>
    <!-- More metrics: Global Reach, Enterprise, Contributors, Downloads -->
  </div>
</section>
```

### 6.3 Agenda / Outline Slide

```html
<section>
  <h2>THE AGENDA</h2>
  <div class="grid grid-cols-3 gap-6">
    <div class="pop-card">
      <h3 class="text-4xl text-blue-600">01</h3>
      <h4>{Topic Name}</h4>
      <p class="text-xs text-gray-500">{English Label}</p>
    </div>
    <!-- More agenda items -->
  </div>
</section>
```

### 6.4 Pain Point / Problem Slide

```html
<section>
  <h2><i class="fas fa-{icon}"></i> {Problem Title}</h2>
  <div class="grid-2">
    <div class="card-ghost">
      <h3>痛点</h3>
      <ul class="list-dot">
        <li>{Pain point 1}</li>
        <li>{Pain point 2}</li>
      </ul>
    </div>
    <div class="card-ghost">
      <h3>目标 KPI</h3>
      <div class="kpi-lines">
        <div class="kpi-line">
          <span class="kpi-key">{Metric}</span>
          <span class="kpi-val">{Target}</span>
          <span class="kpi-spark" style="--p:{percentage};"></span>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 6.5 Workflow / Flow Diagram Slide

```html
<section>
  <h2>{Workflow Title}</h2>
  <div class="flow">
    <div class="flow-step"><h4><i class="fas fa-bell"></i> 触发</h4><p>{Description}</p></div>
    <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
    <div class="flow-step"><h4><i class="fas fa-folder-open"></i> 上下文</h4><p>{Description}</p></div>
    <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
    <div class="flow-step"><h4><i class="fas fa-wand-magic-sparkles"></i> 生成</h4><p>{Description}</p></div>
    <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
    <div class="flow-step"><h4><i class="fas fa-paper-plane"></i> 输出</h4><p>{Description}</p></div>
  </div>
</section>
```

### 6.6 Code Snippet Slide

```html
<section>
  <h3>{Code Title}</h3>
  <pre><code class="python" data-trim>
def main(input_param: str) -> dict:
    # Your code here
    return {"result": "value"}
  </code></pre>
</section>
```

### 6.7 Split Layout / Comparison Slide

```html
<section>
  <div class="split-layout">
    <div class="text-left">
      <h2>{Left Title}</h2>
      <p>{Description}</p>
    </div>
    <div class="pop-card">
      <h3>{Right Title}</h3>
      <ul class="pop-list">
        <li>{Item 1}</li>
        <li>{Item 2}</li>
      </ul>
    </div>
  </div>
</section>
```

### 6.8 Timeline / Roadmap Slide

```html
<section>
  <h2>{Timeline Title}</h2>
  <div class="timeline">
    <div class="timeline-item">
      <h4>Week 1</h4>
      <p>{Description}</p>
      <div class="pill-row"><span class="pill">{Tag}</span></div>
    </div>
    <!-- More timeline items -->
  </div>
</section>
```

### 6.9 ROI / Value Proposition Slide

```html
<section>
  <h2>ROI</h2>
  <div class="tension-grid">
    <div class="tension-left">
      <div class="formula-panel">
        <div class="formula-kicker">ROI 公式</div>
        <div class="formula-big">
          \( ROI = \dfrac{\text{Benefit} - \text{Cost}}{\text{Cost}} \)
        </div>
      </div>
    </div>
    <div class="tension-right">
      <div class="stats-row">
        <div class="stat-item">
          <div class="number">1000+</div>
          <div class="label">年节省工时</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 6.10 Q&A / Closing Slide

```html
<section data-background-color="#0033ff">
  <div class="flex flex-col items-center justify-center h-full text-white">
    <h1 class="text-6xl font-bold mb-6">Q & A</h1>
    <p class="text-xl opacity-90 mb-8">Don't Panic.</p>
    
    <!-- Contact -->
    <div class="flex gap-8 mb-8">
      <div class="text-center">
        <i class="fas fa-envelope text-4xl mb-2"></i>
        <p>banana@dify.ai</p>
      </div>
    </div>
    
    <!-- QR Codes -->
    <div class="flex gap-10">
      <div class="flex flex-col items-center">
        <img src="../assets/xiaohongshu.png" alt="Xiaohongshu" class="h-28 w-28 rounded bg-white p-2">
        <span class="text-sm mt-2">小红书</span>
      </div>
      <div class="flex flex-col items-center">
        <img src="../assets/bilibili.png" alt="Bilibili" class="h-28 w-28 rounded bg-white p-2">
        <span class="text-sm mt-2">Bilibili</span>
      </div>
    </div>
  </div>
</section>
```

---

## 7. Layout Components

### 7.1 Grid Layouts

```css
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
```

### 7.2 Cards

```css
/* Ghost Card (subtle) */
.card-ghost {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 20px;
}

/* Pop Art Card (bold) */
.pop-card {
  background: white;
  border: 3px solid var(--pop-black);
  border-radius: 0px;
  box-shadow: 8px 8px 0px 0px var(--pop-black);
  padding: 24px;
}

/* Node Box (workflow visualization) */
.node-box {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(229, 231, 235, 0.8);
  border-radius: 12px;
  padding: 15px;
  border-left: 4px solid var(--dify-blue);
}
```

### 7.3 Pills / Tags

```html
<div class="pill-row">
  <span class="pill">Tag 1</span>
  <span class="pill pill--blue">Tag 2</span>
</div>
```

### 7.4 KPI Lines

```html
<div class="kpi-lines">
  <div class="kpi-line">
    <span class="kpi-key">{Metric Name}</span>
    <span class="kpi-val">{Value}</span>
    <span class="kpi-spark" style="--p:{0-100};"></span>
  </div>
</div>
```

---

## 8. Reveal.js Configuration

```javascript
Reveal.initialize({
  controls: true,
  progress: true,
  center: true,
  hash: true,
  history: true,
  
  // Slide size
  width: 1920,
  height: 1080,
  margin: 0.04,
  
  // Navigation
  navigationMode: 'default',
  slideNumber: 'c/t',
  
  // Transitions
  transition: 'fade', // or 'slide', 'convex'
  backgroundTransition: 'fade',
  
  // Plugins
  plugins: [RevealNotes, RevealHighlight, RevealMath]
});
```

---

## 9. File Organization

```
{project-name}/
├── index.html          # Chinese version
├── index_en.html       # English version
├── README.md           # Project documentation
├── styles/
│   ├── base.css        # Common styles
│   ├── theme-*.css     # Theme variants
│   └── {custom}.css    # Project-specific styles
├── scripts/
│   └── deck.js         # Custom Reveal.js config
├── assets/             # Project-specific assets
│   └── *.png, *.svg
└── demo/               # Optional demo files (YAML workflows, etc.)
```

Shared assets at repo root:
```
/assets/
├── logo.svg            # Dify logo
├── bilibili.png        # Bilibili QR code
└── xiaohongshu.png     # Xiaohongshu QR code
```

---

## 10. Content Conventions

### 10.1 Bilingual Support
- Always provide both `index.html` (Chinese) and `index_en.html` (English)
- Use `lang="zh-CN"` or `lang="en"` attribute on `<html>` tag

### 10.2 Speaker Information
- Standard format: `Speaker: {Name} · {Role} @ Dify`
- Default contact: `banana@dify.ai`

### 10.3 Community Metrics (update as needed)
| Metric | Value |
|--------|-------|
| Installations | 1M+ |
| GitHub Stars | 120K+ |
| Countries/Regions | 150+ |
| Industries | 60+ |
| Contributors | 1000+ |
| Downloads | 550M+ |

### 10.4 Common Icons (FontAwesome)
| Icon | Usage |
|------|-------|
| `fa-bolt` | Speed, power, triggers |
| `fa-brain` | LLM, AI |
| `fa-code` | Code nodes |
| `fa-chart-line` | Analytics, ROI |
| `fa-users` | Community, teams |
| `fa-shield-halved` | Security, compliance |
| `fa-wand-magic-sparkles` | Generation, AI magic |
| `fa-paper-plane` | Output, delivery |
| `fa-bell` | Triggers, notifications |

---

## 11. Theme Variants

Decks may support multiple themes switchable via keyboard:

| Key | Theme | Style |
|-----|-------|-------|
| `1` | Swiss | Clean, minimal, Dify Blue accent |
| `2` | Atelier | Diffused gradients, artistic |
| `3` | Night/Ukiyo | Dark mode or Japanese aesthetic |

---

## 12. Best Practices

1. **Keep slides focused** - One main idea per slide
2. **Use speaker notes** - Include timing, definitions, transitions
3. **Maintain consistency** - Use established component classes
4. **Test navigation** - Ensure vertical/horizontal navigation works
5. **Optimize images** - Use SVG for logos, compressed PNG/WebP for photos
6. **Mobile consideration** - Reveal.js handles responsiveness, but test
7. **Accessibility** - Include alt text, ensure contrast ratios
8. **Performance** - Limit animated background shapes (~9 max)

