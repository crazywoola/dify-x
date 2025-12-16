/* ========================================
   Dify × AISPEECH · Deck Scripts
   ======================================== */

// Tailwind config
tailwind.config = {
  theme: {
    extend: {
      colors: {
        dify: {
          blue: '#0033ff',
          'blue-light': 'rgba(0, 51, 255, 0.08)',
          'blue-medium': 'rgba(0, 51, 255, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
};

// Initialize Reveal.js when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Reveal
  Reveal.initialize({
    // Display
    width: 1920,
    height: 1080,
    margin: 0.015,
    minScale: 0.2,
    maxScale: 2.0,

    // Navigation
    controls: true,
    controlsTutorial: false,
    progress: true,
    slideNumber: 'c/t',
    hash: true,
    history: true,
    keyboard: true,
    overview: true,
    center: false,
    touch: true,

    // Transitions
    transition: 'fade',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',

    // Navigation mode (keep vertical stacks visible)
    navigationMode: 'default',

    // Plugins
    plugins: [RevealHighlight, RevealMath],
  });

  // Add keyboard shortcut hints
  Reveal.on('slidechanged', function (event) {
    const isVertical = event.indexv > 0;
    const hint = document.querySelector('.slide-meta');
    if (hint) {
      hint.style.opacity = isVertical ? '0' : '1';
    }
  });

  // Highlight current section in progress
  Reveal.on('ready', function () {
    console.log('Deck ready: Dify × AISPEECH');
  });
});

// Helper: Create flow diagram from data
function createFlow(containerId, steps) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  container.className = 'flow';

  steps.forEach((step, index) => {
    // Step box
    const stepDiv = document.createElement('div');
    stepDiv.className = 'flow-step';
    stepDiv.innerHTML = `
      <h4><i class="${step.icon}"></i> ${step.title}</h4>
      <p>${step.desc}</p>
    `;
    container.appendChild(stepDiv);

    // Arrow (except last)
    if (index < steps.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'flow-arrow';
      arrow.innerHTML = '<i class="fas fa-arrow-right"></i>';
      container.appendChild(arrow);
    }
  });
}

// Helper: Animate on scroll
function animateOnVisible(selector) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}
