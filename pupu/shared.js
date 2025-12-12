// Tailwind config and Reveal initializer shared by zh/en decks
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                dify: '#0033ff',
                'dify-light': 'rgba(0, 51, 255, 0.06)',
                'text-main': '#111827',
                'text-secondary': '#525252',
                'bg-card': '#fafafa',
            },
            fontFamily: {
                sans: ['"Söhne"', 'Inter', '"Mi Sans"', '"MiSans"', '"Noto Sans SC"', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['"Söhne Mono"', '"JetBrains Mono"', '"Noto Sans Mono SC"', '"Fira Code"', 'monospace'],
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
