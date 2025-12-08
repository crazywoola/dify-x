// Tailwind config and Reveal initializer shared by zh/en decks
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                dify: '#0033ff',
                'dify-light': 'rgba(0, 51, 255, 0.08)',
                'text-main': '#111827',
                'text-secondary': '#4b5563',
                'bg-card': '#f3f4f6',
            },
            fontFamily: {
                sans: ['"Söhne"', '"MiSans"', 'Inter', '"Noto Sans SC"', 'sans-serif'],
                mono: ['"Söhne Mono"', '"Noto Sans Mono SC"', '"Fira Code"', 'monospace'],
            },
        },
    },
};

// Reveal initialization helper
function initReveal() {
    if (!window.Reveal) return;
    Reveal.initialize({
        hash: true,
        controls: true,
        controlsLayout: 'edges',
        progress: true,
        center: true,
        width: 1200,
        height: 750,
        transition: 'slide',
        backgroundTransition: 'fade',
        plugins: window.RevealHighlight ? [RevealHighlight] : [],
    });
}

// Expose to pages
window.initReveal = initReveal;
