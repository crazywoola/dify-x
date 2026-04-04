---
name: new-slide-deck
description: Create a new reveal.js slide deck for dify-x and register it on the index pages. Use when asked to add a new presentation, create a new deck, or add slides for a new customer/event.
---

# New Slide Deck

Creates a new reveal.js presentation in `/Users/minibanana/Program/dify-x/` and wires it into the navigation index.

---

## Step 1 — Gather info

Ask (or infer from context) before writing any files:

| Field | Example |
|---|---|
| `DECK_DIR` | `acme` (lowercase, kebab-case) |
| `PILL_LABEL` | `Dify × Acme` |
| `THEME` | `nordic` · `milvus` · `popart` _(see §Themes)_ |
| ZH title + one-line description | for `index.html` card |
| EN title + one-line description | for `index_en.html` card |
| Slide content outline | titles, bullets, speaker notes per slide |

---

## Step 2 — Choose a theme

### Theme A · Nordic (default) — `agent-systems` / `hongkong-oss` / `pupu`
Clean, grid-based, Dify Blue on white. Best for technical deep-dives.

- **CSS**: reference `../agent-systems/styles.css`
- **Reveal version**: `4.5.0`
- **Fonts**: Inter + Noto Sans SC + JetBrains Mono (Google Fonts)
- **Icons**: RemixIcon `remixicon@3.5.0`
- **Extra**: Tailwind CDN for utility classes
- **`<html lang>`**: `zh-CN` / `en`
- **Default bg**: `data-background-color="#fafafa"` (light) or `"#0033ff"` (brand)
- **Cover layout**: `.slide-hero` with `.author-block` (name / role / email)

### Theme B · Milvus — `milvus`
Three switchable sub-themes (Swiss / Atelier / Ukiyo) via keyboard `1`/`2`/`3`.

- **CSS**: `styles/dify-theme.css` + `styles/base.css` + `styles/theme-swiss.css` (default)
- **Reveal version**: `5`
- **Fonts**: Söhne (fallback: Inter) + Noto Sans SC
- **`width × height`**: `1920 × 1080`
- **Classes available**: `.grid-2`, `.callout`, `.pill`, `.scribble`, `.emph`, `mark`, `.hl`, `.centered`, `section.card`, `section.accent`
- **Sub-themes**:
  - `theme-swiss.css` — minimal, white bg, subtle blue diffusion
  - `theme-atelier.css` — richer gradient, warmer, expressive
  - `theme-ukiyo.css` — washi paper texture, indigo brush underline on h2

### Theme C · Pop Art — `aispeech`
Bold, comic-strip aesthetics. Best for high-energy keynote-style talks.

- **CSS**: `../aispeech/styles/nordic.css` + `../aispeech/styles/popart.css`
- **Reveal version**: `4.5.0`
- **Palette**: `--pop-yellow #FFE900`, `--pop-red #FF3333`, `--pop-cyan #00FFFF`, `--pop-blue #3366FF`
- **Hard shadows**: `8px 8px 0 #000` — zero border-radius
- **Icons**: Font Awesome `@6.5.2`

---

## Step 3 — Create the deck files

### Nordic HTML skeleton

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>{ZH_TITLE} — Dify</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reset.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/white.css" id="theme">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/github.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../agent-systems/styles.css">
</head>
<body>
    <div class="lang-switch">
        <a class="active" href="index.html">中文</a>
        <span>/</span>
        <a href="index_en.html">EN</a>
    </div>
    <div class="nordic-logo">
        <img src="../assets/logo.svg" alt="Dify" class="nordic-logo-img">
        <span class="nordic-logo-text">{SHORT_LABEL}</span>
    </div>
    <div class="reveal">
        <div class="slides">

            <!-- ══ Slide 1 · Cover ══ -->
            <section data-background-color="#fafafa">
                <div class="slide-hero text-center" style="max-width:860px;">
                    <h1 style="font-size:2.8rem;line-height:1.1;">{ZH_TITLE}</h1>
                    <p class="slide-subtitle" style="margin:1.2rem auto 0;max-width:560px;">{ZH_SUBTITLE}</p>
                    <div style="width:48px;height:3px;background:var(--dify-blue);border-radius:2px;margin:2rem 0 1.5rem;"></div>
                    <div class="author-block" style="align-items:center;margin-top:0;">
                        <div class="author-name">crazywoola（Banana）</div>
                        <div class="author-meta">Developer Relations @ Dify</div>
                        <div class="author-email">banana@dify.ai</div>
                    </div>
                </div>
                <aside class="notes">Speaker notes here.</aside>
            </section>

            <!-- ══ Add more slides ══ -->

        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/notes/notes.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/highlight.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            transition: 'fade',
            backgroundTransition: 'fade',
            plugins: [RevealNotes, RevealHighlight],
        });
    </script>
</body>
</html>
```

### Milvus HTML skeleton (with theme switcher)

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>{ZH_TITLE} — Dify</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/white.css" id="reveal-theme">
    <link rel="stylesheet" href="../milvus/styles/dify-theme.css">
    <link rel="stylesheet" href="../milvus/styles/base.css">
    <link rel="stylesheet" id="theme-variant" href="../milvus/styles/theme-swiss.css">
</head>
<body>
    <div class="lang-switch">
        <a class="active" href="index.html">中文</a>
        <span>/</span>
        <a href="index_en.html">EN</a>
    </div>
    <div class="brand"><img src="../assets/logo.svg" alt="Dify"></div>
    <div id="bg-shapes">
        <div class="shape s1" style="width:900px;height:700px;top:-10%;left:-8%;"></div>
        <div class="shape s2" style="width:700px;height:600px;top:5%;right:-6%;"></div>
        <div class="shape s3" style="width:600px;height:500px;bottom:-12%;left:30%;"></div>
    </div>
    <div class="reveal">
        <div class="slides">

            <!-- ══ Slide 1 · Cover ══ -->
            <section>
                <h1 class="title-big">{ZH_TITLE}</h1>
                <p class="subtitle">{ZH_SUBTITLE}</p>
                <p class="meta">crazywoola（Banana） · Developer Relations @ Dify · banana@dify.ai</p>
                <aside class="notes">Speaker notes here.</aside>
            </section>

            <!-- ══ Add more slides ══ -->

        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/notes/notes.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            width: 1920,
            height: 1080,
            margin: 0.04,
            controls: true,
            progress: true,
            slideNumber: 'c/t',
            transition: 'fade',
            plugins: [RevealNotes],
        });
        // Theme switcher: press 1 = Swiss, 2 = Atelier, 3 = Ukiyo
        const themeLink = document.getElementById('theme-variant');
        const indicator = document.createElement('div');
        indicator.style.cssText = 'position:fixed;right:20px;top:20px;padding:6px 10px;border-radius:999px;background:rgba(0,0,0,.5);color:#fff;font:14px/1.2 system-ui;z-index:999;opacity:0;transition:opacity .2s;';
        document.body.appendChild(indicator);
        const showIndicator = (t) => { indicator.textContent = t; indicator.style.opacity='1'; clearTimeout(showIndicator._t); showIndicator._t=setTimeout(()=>indicator.style.opacity='0',1200); };
        const setTheme = (n) => { themeLink.href=`../milvus/styles/${n}.css`; showIndicator('Theme: '+n.replace('theme-','')); };
        window.addEventListener('keydown', (e) => {
            if (e.key==='1') setTheme('theme-swiss');
            if (e.key==='2') setTheme('theme-atelier');
            if (e.key==='3') setTheme('theme-ukiyo');
        });
    </script>
</body>
</html>
```

### Pop Art HTML skeleton

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>{ZH_TITLE} — Dify</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reset.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/white.css" id="theme">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/monokai.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../aispeech/styles/nordic.css">
    <link rel="stylesheet" href="../aispeech/styles/popart.css">
</head>
<body>
    <div class="lang-switch">
        <a class="active" href="index.html">中文</a>
        <span>/</span>
        <a href="index_en.html">EN</a>
    </div>
    <div class="reveal">
        <div class="slides">

            <!-- ══ Slide 1 · Cover ══ -->
            <section data-background-color="#FFE900">
                <div style="border:3px solid #000;padding:48px;box-shadow:12px 12px 0 #000;max-width:900px;">
                    <div style="font-size:1rem;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:16px;">{PILL_LABEL}</div>
                    <h1 style="font-size:3.2rem;font-weight:900;line-height:1.05;color:#000;">{ZH_TITLE}</h1>
                    <p style="font-size:1.3rem;margin-top:24px;color:#000;">{ZH_SUBTITLE}</p>
                    <div style="margin-top:32px;font-size:0.9rem;font-weight:700;">crazywoola（Banana） · Developer Relations @ Dify</div>
                </div>
                <aside class="notes">Speaker notes here.</aside>
            </section>

            <!-- ══ Add more slides ══ -->

        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/notes/notes.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/highlight.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            transition: 'none',
            backgroundTransition: 'none',
            plugins: [RevealNotes, RevealHighlight],
        });
    </script>
</body>
</html>
```

Mirror the same structure for `index_en.html` with `lang="en"` and English content.

---

## Step 4 — Common slide patterns

### Two-column grid (Nordic / Milvus)
```html
<section>
    <h2>Section Title</h2>
    <div class="grid-2" style="margin-top:1.5rem;">
        <div class="callout"><strong>Left point</strong><br>Detail text here.</div>
        <div class="callout"><strong>Right point</strong><br>Detail text here.</div>
    </div>
</section>
```

### Pill + numbered list (Nordic)
```html
<section data-background-color="#fafafa">
    <div class="slide-label">
        <span class="pill">Section Name</span>
    </div>
    <h2 class="slide-title">Slide Title</h2>
    <div class="step-list">
        <div class="step-item"><span class="step-num">01</span><div class="step-content"><strong>Point</strong><p>Description</p></div></div>
        <div class="step-item"><span class="step-num">02</span><div class="step-content"><strong>Point</strong><p>Description</p></div></div>
    </div>
</section>
```

### Dark brand slide (Nordic)
```html
<section data-background-color="#0033ff">
    <div class="slide-hero text-center">
        <h2 style="color:#fff;font-size:2.2rem;">Key Message</h2>
        <p style="color:rgba(255,255,255,0.85);">Supporting detail</p>
    </div>
</section>
```

### Closing slide (Milvus style)
```html
<section>
    <div class="centered">
        <img src="../assets/logo.svg" class="logo-large" alt="Dify">
        <h2>{ZH_CLOSING_HEADLINE}</h2>
        <p class="meta">banana@dify.ai</p>
    </div>
</section>
```

### Vertical stack (nested sections)
```html
<section>
    <section><!-- horizontal parent --></section>
    <section><!-- vertical child 1 --></section>
    <section><!-- vertical child 2 --></section>
</section>
```

---

## Step 5 — Register on index pages

Append inside `<div class="deck-grid">` in both `/Users/minibanana/Program/dify-x/index.html` and `index_en.html`:

```html
        <a class="card" href="{DECK_DIR}/index.html">
          <div class="pill-wrapper"><span class="pill">{PILL_LABEL}</span></div>
          <h3>{ZH_TITLE}</h3>
          <p>{ZH_DESCRIPTION}</p>
          <div class="card-footer">Start Presentation<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
        </a>
```

Use `{DECK_DIR}/index_en.html` + EN text for `index_en.html`.

---

## Step 6 — Verify

- New directory and both HTML files exist.
- Both index pages contain the new card.
- Remind user to open the deck in a browser to check rendering.

---

## Shared asset reference

| Path | Contents |
|---|---|
| `assets/logo.svg` | Dify logo (used in all decks) |
| `agent-systems/styles.css` | Full Nordic design system (1300+ lines, vars + components) |
| `milvus/styles/dify-theme.css` | Milvus brand token overrides |
| `milvus/styles/base.css` | Milvus base typography + layout utilities |
| `milvus/styles/theme-swiss.css` | Sub-theme: Swiss minimal |
| `milvus/styles/theme-atelier.css` | Sub-theme: Atelier gradient |
| `milvus/styles/theme-ukiyo.css` | Sub-theme: Ukiyo washi |
| `aispeech/styles/nordic.css` | Pop Art base reset |
| `aispeech/styles/popart.css` | Pop Art component styles |

All CSS files are referenced via relative `../` paths from the deck directory — no copying needed.
