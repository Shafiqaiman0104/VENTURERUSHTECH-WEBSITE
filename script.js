/**
 * VentureRush Tech - Interactive Logic, Fast Typewriter & Section Particles
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme (Default: Light Mode)
    initThemeManager();

    // 2. Initialize Particles.js Background & Section Ambient
    initParticles(activeTheme);

    // 3. Fast Typewriter Effect for Hero Code Terminal
    initTypewriterCode();

    // 4. Mobile Navigation & Home Tab Smooth Scrolling
    initNavigation();

    // 5. Interactive 3D Tilt for Hero Card
    initTiltEffect();

    // 6. Contact Form WhatsApp & Email Dispatcher
    initContactForm();

    // 7. Scroll Controls & Scroll Spy
    initScrollControls();

    // 8. Dynamic Year in Footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

/* ==========================================================================
   Theme Management (Light Mode Default & Toggle)
   ========================================================================== */
let activeTheme = 'light';

function initThemeManager() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const navLogo = document.getElementById('nav-logo-img');
    const footerLogo = document.getElementById('footer-logo-img');
    const labelSpan = toggleBtn ? toggleBtn.querySelector('.theme-btn-label') : null;

    // Check stored theme or default to 'light'
    const storedTheme = localStorage.getItem('vr-tech-theme');
    activeTheme = storedTheme ? storedTheme : 'light';

    applyTheme(activeTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            activeTheme = activeTheme === 'light' ? 'dark' : 'light';
            applyTheme(activeTheme);
            localStorage.setItem('vr-tech-theme', activeTheme);
            // Re-tint particles
            initParticles(activeTheme);
        });
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        if (theme === 'dark') {
            if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
            if (labelSpan) labelSpan.textContent = 'Light';
            if (navLogo) navLogo.src = 'image/vrLogoWhite.png';
            if (footerLogo) footerLogo.src = 'image/vrLogoWhite.png';
        } else {
            if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
            if (labelSpan) labelSpan.textContent = 'Dark';
            if (navLogo) navLogo.src = 'image/vrLogoBlue.png';
            if (footerLogo) footerLogo.src = 'image/vrLogoBlue.png';
        }
    }
}

/* ==========================================================================
   Fast Code Typewriter Effect (Simulates Live Coding on Reload)
   ========================================================================== */
function initTypewriterCode() {
    const codeContainer = document.getElementById('typewriter-code');
    const statusIndicator = document.getElementById('terminal-status');
    if (!codeContainer) return;

    const targetCode = `const ventureRush = {
  mission: "Accelerating Tech Frontiers",
  core: [
    "Custom Website & System Dev",
    "Custom AI Chatbots",
    "PC & Mobile Optimization",
    "High-Load API & Databases"
  ],
  support: "Dedicated 24/7",
  deploySolution: () =>
    "Delivered with Excellence"
};`;

    if (statusIndicator) {
        statusIndicator.innerHTML = '<i class="fa-solid fa-laptop-code fa-fade"></i> Live Coding...';
    }

    let currentIndex = 0;
    const totalLength = targetCode.length;

    // Syntax Highlighter Helper for partial and full code streams
    function highlightCode(code) {
        let html = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Highlight strings (full or streaming unclosed)
        html = html.replace(/("[^"\n]*"?)/g, '<span class="code-str">$1</span>');

        // Highlight keywords
        html = html.replace(/\b(const|let|var|function|return)\b/g, '<span class="code-keyword">$1</span>');

        // Highlight object keys
        html = html.replace(/\b(mission|core|support|deploySolution)\b/g, '<span class="code-prop">$1</span>');

        // Highlight arrow function symbol
        html = html.replace(/=&gt;/g, '<span class="code-func">=&gt;</span>');

        return html;
    }

    // Fast typing interval (typing 1-3 characters every 14ms)
    function typeStep() {
        if (currentIndex < totalLength) {
            // Speed variance to feel natural yet fast
            const step = Math.min(Math.floor(Math.random() * 2) + 1, totalLength - currentIndex);
            currentIndex += step;

            const currentSlice = targetCode.slice(0, currentIndex);
            codeContainer.innerHTML = highlightCode(currentSlice) + '<span class="type-cursor"></span>';

            setTimeout(typeStep, 14);
        } else {
            // Completed typing
            codeContainer.innerHTML = highlightCode(targetCode) + '<span class="type-cursor"></span>';
            if (statusIndicator) {
                statusIndicator.innerHTML = '<i class="fa-solid fa-bolt"></i> Active';
            }
        }
    }

    // Begin fast typing after brief micro-delay
    setTimeout(typeStep, 250);
}

/* ==========================================================================
   Particles.js Integration (CDN-backed with seamless Light/Dark adaptations)
   ========================================================================== */
function initParticles(theme) {
    const isDark = theme === 'dark';
    const pColor = isDark ? '#00f2fe' : '#0284c7';
    const lColor = isDark ? '#38bdf8' : '#0369a1';

    function getParticleConfig(count, distance, speed) {
        return {
            particles: {
                number: {
                    value: count,
                    density: {
                        enable: true,
                        value_area: 700
                    }
                },
                color: {
                    value: pColor
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: isDark ? 0.8 : 0.68,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1.2,
                        opacity_min: 0.35,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 2,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: distance,
                    color: lColor,
                    opacity: isDark ? 0.52 : 0.38,
                    width: 1.4
                },
                move: {
                    enable: true,
                    speed: speed,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'window',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: false
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 145,
                        line_linked: {
                            opacity: 0.6
                        }
                    }
                }
            },
            retina_detect: true
        };
    }

    // If particlesJS CDN is loaded
    if (typeof particlesJS !== 'undefined') {
        const particleTargets = [
            { id: 'particles-js', count: 65, distance: 150, speed: 1.6 },
            { id: 'hero-particles', count: 85, distance: 155, speed: 1.8 },
            { id: 'services-particles', count: 75, distance: 150, speed: 1.5 },
            { id: 'contact-particles', count: 70, distance: 150, speed: 1.5 }
        ];

        particleTargets.forEach(target => {
            if (document.getElementById(target.id)) {
                particlesJS(target.id, getParticleConfig(target.count, target.distance, target.speed));
            }
        });
    } else {
        // Fallback canvas if offline or CDN blocked
        initFallbackParticles(theme);
    }
}

// Fallback Canvas Particle Engine
let fallbackAnimId = null;
function initFallbackParticles(theme) {
    const container = document.getElementById('particles-js');
    if (!container) return;

    if (fallbackAnimId) {
        cancelAnimationFrame(fallbackAnimId);
    }

    let canvas = container.querySelector('canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        container.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const isDark = theme === 'dark';
    const colorPrefix = isDark ? 'rgba(0, 242, 254, ' : 'rgba(2, 132, 199, ';

    const particles = [];
    const count = 75;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 2.5 + 1.5,
            alpha: Math.random() * 0.4 + 0.45
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < count; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = colorPrefix + p.alpha + ')';
            ctx.fill();

            for (let j = i + 1; j < count; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    const lineAlpha = (1 - dist / 130) * (isDark ? 0.22 : 0.16);
                    ctx.strokeStyle = colorPrefix + lineAlpha + ')';
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        fallbackAnimId = requestAnimationFrame(render);
    }
    render();
}

/* ==========================================================================
   Navigation, Home Tab & Scrollspy
   ========================================================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const brandLink = document.getElementById('brand-logo-link');

    // Prevent clicks on navbar from triggering canvas click events
    if (navbar) {
        navbar.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Home link smooth top scrolling
    const homeLink = document.getElementById('nav-link-home');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.pushState(null, null, '#hero');
        });
    }

    if (brandLink) {
        brandLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile Menu Toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-bars-staggered';
                }
            });
        });
    }

    // Scroll Navbar & Active Section Tracking
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 140;

        // If near top, highlight Home
        if (window.scrollY < 200) {
            navLinks.forEach((l) => l.classList.remove('active'));
            if (homeLink) homeLink.classList.add('active');
            return;
        }

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach((l) => l.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

/* ==========================================================================
   3D Tilt Effect on Hero Card
   ========================================================================== */
function initTiltEffect() {
    const card = document.getElementById('hero-tilt-card');
    if (!card) return;

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }
}

/* ==========================================================================
   Contact Form WhatsApp & Email Dispatcher
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const emailBtn = document.getElementById('form-email-btn');

    if (!form) return;

    // Send via WhatsApp
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();
        const service = document.getElementById('contact-service').value;
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !phone || !message) {
            alert('Please fill out all required fields before proceeding.');
            return;
        }

        const formattedText = 
`*NEW INQUIRY - VENTURERUSH TECH*
----------------------------------------
*Name:* ${name}
*Phone / WhatsApp:* ${phone}
*Selected Service:* ${service}
*Project Details:*
${message}
----------------------------------------
Sent from VentureRush Tech Official Portal`;

        const waUrl = `https://wa.me/601160801477?text=${encodeURIComponent(formattedText)}`;
        window.open(waUrl, '_blank');
    });

    // Send via email fallback
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const name = document.getElementById('contact-name').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const service = document.getElementById('contact-service').value;
            const message = document.getElementById('contact-message').value.trim();

            const subject = encodeURIComponent(`Project Inquiry: ${service} - from ${name || 'Client'}`);
            const body = encodeURIComponent(
`Hello VentureRush Tech Team,

I would like to inquire about your services:

- Name: ${name || 'N/A'}
- Phone / WhatsApp: ${phone || 'N/A'}
- Service Required: ${service}

Project Details:
${message || 'Please contact me to discuss project details.'}

Best regards,
${name || 'Prospective Client'}`
            );

            window.location.href = `mailto:venturerush.dev@gmail.com?subject=${subject}&body=${body}`;
        });
    }
}

/* ==========================================================================
   Scroll Controls
   ========================================================================== */
function initScrollControls() {
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
