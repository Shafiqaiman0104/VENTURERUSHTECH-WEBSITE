// 1. Official Client Logos (c1.webp – c8.webp) Seamless Infinite Marquee
    const clientLogos = [
      "image/c1.webp",
      "image/c2.webp",
      "image/c3.webp",
      "image/c4.webp",
      "image/c5.webp",
      "image/c6.webp",
      "image/c7.webp",
      "image/c8.webp"
    ];

    function createMarqueeItems() {
      // 16 items per track (c1 to c8 twice) to cleanly fill wide screens with zero seam
      return [...clientLogos, ...clientLogos].map((src, i) => `
        <div class="client-logo-box">
          <img src="${src}" alt="VentureRush Tech Client ${(i % 8) + 1}" loading="eager" decoding="async" />
        </div>
      `).join('');
    }

    const marqueeTrack1 = document.getElementById('clientMarquee1');
    const marqueeTrack2 = document.getElementById('clientMarquee2');
    if (marqueeTrack1 && marqueeTrack2) {
      const itemsHtml = createMarqueeItems();
      marqueeTrack1.innerHTML = itemsHtml;
      marqueeTrack2.innerHTML = itemsHtml;
    }

    // Dynamic Year & Mobile Drawer
    document.getElementById('year').textContent = new Date().getFullYear();
    const menuBtn = document.getElementById('menuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    menuBtn.addEventListener('click', () => mobileDrawer.classList.toggle('open'));
    mobileDrawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileDrawer.classList.remove('open')));

    // 2. Animated Counter Helper (Smooth single-pass count up)
    function animateCounter(el) {
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();

      if (el._raf) cancelAnimationFrame(el._raf);

      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = (target * eased).toFixed(decimals);
        el.textContent = `${prefix}${val}${suffix}`;
        if (p < 1) el._raf = requestAnimationFrame(step);
      }
      el._raf = requestAnimationFrame(step);
    }

    // 3. SMOOTH STABLE SCROLL OBSERVER (Reveals smoothly without disappearing/flickering)
    const animTargets = document.querySelectorAll('.anim-reveal');
    const stableObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          if (!entry.target._hasCounted && entry.target.querySelectorAll('.counter').length > 0) {
            entry.target._hasCounted = true;
            entry.target.querySelectorAll('.counter').forEach(animateCounter);
          }
          // Once revealed, keep in view to prevent vanishing sections and scroll flickering
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    animTargets.forEach(el => stableObserver.observe(el));

    // 5. Interactive 3D Mouse Tilt on Pop-Out Portfolio Cards
    document.querySelectorAll('.tilt-card').forEach(card => {
      const img = card.querySelector('.proj-3d-img');
      if (!img) return;
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = `translateY(-14px) scale(1.06) rotateX(${(-y * 14).toFixed(2)}deg) rotateY(${(x * 16).toFixed(2)}deg) translateZ(48px)`;
      });
      card.addEventListener('mouseleave', () => {
        img.style.transform = '';
      });
    });

    // 6. Interactive Sales Lift Calculator
    const inTraffic = document.getElementById('inTraffic');
    const inDeal = document.getElementById('inDeal');
    const inClose = document.getElementById('inClose');

    function updateROI() {
      const traffic = Number(inTraffic.value);
      const deal = Number(inDeal.value);
      const close = Number(inClose.value) / 100;

      document.getElementById('valTraffic').textContent = traffic.toLocaleString();
      document.getElementById('valDeal').textContent = 'RM ' + deal.toLocaleString();
      document.getElementById('valClose').textContent = Math.round(close * 100) + '%';

      const monthly = Math.round(traffic * 0.025 * close * deal);
      document.getElementById('outMonthly').textContent = '+RM ' + monthly.toLocaleString();
      document.getElementById('outYearly').textContent = 'RM ' + (monthly * 12).toLocaleString() + ' / year';
    }
    [inTraffic, inDeal, inClose].forEach(el => el.addEventListener('input', updateROI));
    updateROI();

    // 7. Direct WhatsApp & Email Lead Routing
    function buildLeadMessage() {
      const name = document.getElementById('fName').value.trim();
      const phone = document.getElementById('fPhone').value.trim();
      const service = document.getElementById('fService').value.trim();
      const details = document.getElementById('fDetails').value.trim();

      if (!name || !phone || !service) {
        alert('Please fill in your Name, WhatsApp/Phone, and Solution first.');
        return null;
      }
      return `Hi VentureRush Tech!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AInterested In: ${encodeURIComponent(service)}%0ADetails: ${encodeURIComponent(details || 'Requesting Free Conversion & AI Audit')}`;
    }

    document.getElementById('btnSendWA').addEventListener('click', () => {
      const msg = buildLeadMessage();
      if (msg) window.open(`https://wa.me/601160801477?text=${msg}`, '_blank');
    });

    document.getElementById('btnSendMail').addEventListener('click', () => {
      const msg = buildLeadMessage();
      if (msg) {
        const subject = encodeURIComponent('New Project & Conversion Audit Inquiry — VentureRush Tech');
        window.location.href = `mailto:venturerush.dev@gmail.com?subject=${subject}&body=${msg}`;
      }
    });

    // 8. Pricing Quote WhatsApp Modal Controller
    (function initQuoteModal() {
      const modalOverlay = document.getElementById('quoteModal');
      const closeBtn = document.getElementById('closeQuoteModal');
      const form = document.getElementById('quoteModalForm');
      const packageSelect = document.getElementById('quotePackageSelect');
      const otherCheckbox = document.getElementById('checkOther');
      const otherTextInput = document.getElementById('quoteOtherText');
      const budgetPills = document.querySelectorAll('.quote-budget-pill');
      const checkLabels = document.querySelectorAll('.quote-check-label');

      if (!modalOverlay || !form) return;

      // Handle opening modal from any 'View Price' button
      document.querySelectorAll('.open-quote-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetPkg = btn.getAttribute('data-package');
          if (targetPkg && packageSelect) {
            for (let i = 0; i < packageSelect.options.length; i++) {
              if (packageSelect.options[i].value === targetPkg || packageSelect.options[i].text.includes(targetPkg)) {
                packageSelect.selectedIndex = i;
                break;
              }
            }
          }
          modalOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });

      // Close modal functions
      function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }

      if (closeBtn) closeBtn.addEventListener('click', closeModal);

      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
          closeModal();
        }
      });

      // Style active state for checkboxes
      checkLabels.forEach(label => {
        const cb = label.querySelector('input[type="checkbox"]');
        if (!cb) return;
        cb.addEventListener('change', () => {
          if (cb.checked) {
            label.classList.add('checked');
          } else {
            label.classList.remove('checked');
          }
        });
      });

      // Toggle Other text input visibility
      if (otherCheckbox && otherTextInput) {
        otherCheckbox.addEventListener('change', () => {
          if (otherCheckbox.checked) {
            otherTextInput.hidden = false;
            otherTextInput.focus();
          } else {
            otherTextInput.hidden = true;
          }
        });
      }

      // Budget pills radio selection styling
      budgetPills.forEach(pill => {
        pill.addEventListener('click', () => {
          budgetPills.forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
          const radio = pill.querySelector('input[type="radio"]');
          if (radio) radio.checked = true;
        });
      });

      // Submit Form & Open WhatsApp
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedPkg = packageSelect ? packageSelect.value : 'Not sure';

        // Collect checked expectations
        const checkedExpectations = [];
        document.querySelectorAll('input[name="expectedFeatures"]:checked').forEach(cb => {
          if (cb.value === 'Other') {
            const customVal = otherTextInput ? otherTextInput.value.trim() : '';
            checkedExpectations.push(customVal ? `Other (${customVal})` : 'Other');
          } else {
            checkedExpectations.push(cb.value);
          }
        });

        const expectedText = checkedExpectations.length > 0 ? checkedExpectations.join(', ') : 'Not specified';
        const industry = (document.getElementById('quoteIndustry')?.value || '').trim() || 'Not specified';
        const revenue = (document.getElementById('quoteRevenue')?.value || '').trim() || 'Not specified';
        const budgetRadio = document.querySelector('input[name="quoteBudget"]:checked');
        const budget = budgetRadio ? budgetRadio.value : 'Not specified';

        // Construct ready-to-send WhatsApp message
        const waMessage = 
`Hello VentureRush Tech! 👋

I would like to request a custom quotation based on the details below:

📦 *Preferred Package:* ${selectedPkg}
🎯 *Key Website Goals:* ${expectedText}
🏢 *Industry:* ${industry}
📈 *Est. Monthly Revenue:* ${revenue}
💰 *Investment Budget:* ${budget}

Please share the recommended solution and pricing for our business. Thank you!`;

        const waUrl = `https://wa.me/601160801477?text=${encodeURIComponent(waMessage)}`;
        window.open(waUrl, '_blank');
        closeModal();
      });
    })();

    // 9. Mobile-Only Interactive Portfolio Showcase (Featured Top Card + Auto-Looping 2-Card Mini Grid)
    (function initMobilePortfolioShowcase() {
      const featuredEl = document.getElementById('mobileFeaturedCard');
      const trackEl = document.getElementById('mobileMiniTrack');
      const viewportEl = document.getElementById('mobileMiniViewport');
      if (!featuredEl || !trackEl || !viewportEl) return;

      const projects = [
        {
          id: 'mk-rimba',
          img: 'image/portfolio1.webp',
          fallback: 'https://venturerushtech.com/image/portfolio1.webp',
          cat: 'Eco-Tourism · 24/7 AI Chatbot & Booking System',
          title: 'MK Rimba Camp Park Platform',
          desc: 'All-in-one camping portal equipped with an automated 24/7 AI chatbot, live TikTok feeds, campsite reservation engine, and partner commission tracking.',
          features: '24/7 AI Chatbot · Campsite System · Agent Commission Tracker',
          statusText: 'Live',
          inProgress: false,
          btnLabel: 'View Details',
          href: 'portfolio-mk-rimba.html',
          external: false
        },
        {
          id: 'q13dynamic',
          img: 'image/portfolio2.webp',
          fallback: 'https://venturerushtech.com/image/portfolio2.webp',
          cat: 'E-Commerce · Order Tracking & Agent Portal',
          title: 'Q13DYNAMIC Business Platform',
          desc: 'High-velocity e-commerce catalog handling festive traffic spikes with zero downtime—featuring live video demos, multi-filter search, instant tracking, and an agent portal.',
          features: 'Dynamic Catalog · Real-Time Tracking · Agent Portal',
          statusText: 'Live',
          inProgress: false,
          btnLabel: 'View Details',
          href: 'portfolio-q13dynamic.html',
          external: false
        },
        {
          id: 'southwave',
          img: 'image/portfolio3.webp',
          fallback: 'https://venturerushtech.com/image/portfolio3.webp',
          cat: 'Puteri Harbour · Marine Booking',
          title: 'South Wave Watersport',
          desc: 'Watersport booking hub & fleet management engine for kayak rentals, electric boats, and yacht charters with automated rental timers.',
          features: 'Order Hub · Rental Timer',
          statusText: 'Live',
          inProgress: false,
          btnLabel: 'View Details',
          href: 'portfolio-southwave.html',
          external: false
        },
        {
          id: 'bayu-seafood',
          img: 'image/portfolio4.webp',
          fallback: 'https://venturerushtech.com/image/portfolio4.webp',
          cat: 'Hospitality · Interactive 360° VR',
          title: 'Bayu Seafood Dining',
          desc: 'Lakeside halal live seafood portal featuring interactive 360° virtual tours, scroll-driven storytelling, VIP rooms, and private ballroom CMS.',
          features: '360° VR Tour · VIP Bookings',
          statusText: 'Live',
          inProgress: false,
          btnLabel: 'View Details',
          href: 'portfolio-bayu-seafood.html',
          external: false
        },
        {
          id: 'wnb-aquasports',
          img: 'image/portfolio5.webp',
          fallback: 'https://venturerushtech.com/image/portfolio5.webp',
          cat: 'Lake Recreation · Multi-Branch',
          title: 'White & Black Aquasports',
          desc: 'Multi-branch lake recreation & Crystal Dome reservation platform spanning Tasik Titiwangsa and Ripplebay Taman Botani Perdana.',
          features: 'Crystal Dome · Fleet Hub',
          statusText: 'Still in progress',
          inProgress: true,
          btnLabel: 'Visit Website',
          href: 'https://wnbaquasports.venturerushtech.com/',
          external: true
        }
      ];

      let activeId = 'mk-rimba';

      function syncMiniCardWidth() {
        const vw = viewportEl.clientWidth;
        if (vw > 0) {
          const cardW = (vw - 12) / 2;
          viewportEl.style.setProperty('--mini-card-w', cardW + 'px');
        }
      }

      function renderFeatured(proj) {
        const statusCls = proj.inProgress ? 'proj-status-pill status-progress' : 'proj-status-pill';
        const btnCls = proj.external ? 'btn btn-blue proj-btn proj-btn-visit' : 'btn btn-navy proj-btn';
        const extAttrs = proj.external ? ' target="_blank" rel="noopener noreferrer"' : '';
        const iconSvg = proj.external
          ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>'
          : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

        featuredEl.innerHTML = `
          <div class="proj-stage-3d">
            <img class="proj-3d-img" src="${proj.img}" onerror="this.onerror=null;this.src='${proj.fallback}';" alt="${proj.title}" />
          </div>
          <div class="proj-body">
            <div class="proj-cat">${proj.cat}</div>
            <h3>${proj.title}</h3>
            <p>${proj.desc}</p>
            <div class="proj-features">
              <span>${proj.features}</span>
              <span class="${statusCls}">${proj.statusText}</span>
            </div>
            <div class="proj-action-row">
              <a href="${proj.href}"${extAttrs} class="${btnCls}">
                ${proj.btnLabel}
                ${iconSvg}
              </a>
            </div>
          </div>
        `;
      }

      function buildMiniCardHtml(proj) {
        return `
          <div class="mini-proj-card">
            <div class="mini-proj-stage">
              <img src="${proj.img}" onerror="this.onerror=null;this.src='${proj.fallback}';" alt="${proj.title}" loading="lazy" decoding="async" />
            </div>
            <div class="proj-cat">${proj.cat}</div>
            <h3>${proj.title}</h3>
            <button type="button" class="mini-select-btn" data-proj-id="${proj.id}">Select</button>
          </div>
        `;
      }

      function renderMiniCarousel() {
        const others = projects.filter(p => p.id !== activeId);
        // Duplicate the 4 remaining items for a seamless continuous left-moving marquee
        const cardsHtml = others.map(buildMiniCardHtml).join('');
        trackEl.innerHTML = cardsHtml + cardsHtml;
        syncMiniCardWidth();
      }

      function selectProject(id) {
        const next = projects.find(p => p.id === id);
        if (!next || next.id === activeId) return;
        activeId = id;

        featuredEl.classList.add('swapping');
        setTimeout(() => {
          renderFeatured(next);
          renderMiniCarousel();
          featuredEl.classList.remove('swapping');
          const rect = featuredEl.getBoundingClientRect();
          if (rect.top < 84) {
            window.scrollTo({ top: window.scrollY + rect.top - 96, behavior: 'smooth' });
          }
        }, 170);
      }

      // Event delegation so clicks work seamlessly across both looped sets
      trackEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.mini-select-btn');
        if (!btn) return;
        const id = btn.getAttribute('data-proj-id');
        if (id) selectProject(id);
      });

      // Pause marquee cleanly on touch so tapping Select never misses
      let resumeTimer = null;
      viewportEl.addEventListener('touchstart', () => {
        clearTimeout(resumeTimer);
        viewportEl.classList.add('paused');
      }, { passive: true });
      viewportEl.addEventListener('touchend', () => {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => viewportEl.classList.remove('paused'), 350);
      }, { passive: true });

      window.addEventListener('resize', syncMiniCardWidth);

      // Initial render: MK Rimba featured on top, other 4 looping below
      renderFeatured(projects[0]);
      renderMiniCarousel();
    })();

    // 10. Free Online SEO / AEO / GEO Checker Promo Form Controller
    (function initSgaPromoForm() {
      const form = document.getElementById('sgaPromoForm');
      if (!form) return;
      const input = document.getElementById('sgaPromoUrl');
      const note = document.getElementById('sgaPromoNote');
      const defaultNote = note.textContent;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = input.value.trim();
        if (!url || !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(url)) {
          note.textContent = 'Please enter a valid website URL (e.g. yourbusiness.com).';
          note.classList.add('is-error');
          input.focus();
          return;
        }
        note.textContent = defaultNote;
        note.classList.remove('is-error');
        window.open('https://sgachecker.venturerushtech.com/?scanUrl=' + encodeURIComponent(url), '_blank', 'noopener');
      });
      input.addEventListener('input', () => {
        if (note.classList.contains('is-error')) {
          note.textContent = defaultNote;
          note.classList.remove('is-error');
        }
      });
    })();

    // 11. Founder Visual Animation Trigger
    // Managed via stableObserver with .anim-reveal and hardware-accelerated CSS transitions
