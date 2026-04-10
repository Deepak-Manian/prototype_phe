/* ============================================================
   PHE Industrial — Global JavaScript
   Handles: mobile nav, scroll animations, active nav state,
            busy hours widget (contact page),
            spec bar animations (catalog page),
            smooth scroll, form submit feedback
   ============================================================ */

/* ── MOBILE NAV ── */
function initMobileNav() {
    const openBtn = document.getElementById('mobile-nav-open');
    const closeBtn = document.getElementById('mobile-nav-close');
    const nav = document.getElementById('mobile-nav');
    if (!openBtn || !nav) return;

    openBtn.addEventListener('click', () => {
        nav.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close on overlay click
    nav.addEventListener('click', (e) => {
        if (e.target === nav) {
            nav.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            nav.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

/* ── SCROLL ANIMATIONS ── */
function initScrollAnimations() {
    const els = document.querySelectorAll('.anim-fade-up');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    els.forEach(el => observer.observe(el));
}

/* ── SPEC BAR ANIMATIONS (product catalog) ── */
function initSpecBars() {
    const bars = document.querySelectorAll('.spec-bar-fill[data-width]');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.width = el.getAttribute('data-width');
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

/* ── BUSY HOURS WIDGET (contact page) ── */
function initBusyWidget() {
    const container = document.getElementById('busy-bars-container');
    if (!container) return;

    // Hourly load values for each day (9am–8pm = 12 slots)
    const busyData = {
        MON: [20, 35, 50, 65, 75, 80, 72, 60, 45, 35, 20, 10],
        TUE: [25, 40, 55, 70, 85, 90, 85, 70, 55, 40, 25, 10],
        WED: [30, 45, 60, 75, 90, 95, 88, 75, 60, 45, 28, 12],
        THU: [30, 50, 65, 78, 92, 100, 92, 78, 62, 48, 30, 12],
        FRI: [20, 35, 50, 65, 75, 78, 70, 58, 42, 30, 18, 8],
        SAT: [10, 20, 30, 40, 48, 50, 42, 32, 20, 10, 5, 0],
        SUN: [0,  5,  8,  10, 12, 10, 8,  5,  3,  0,  0, 0]
    };

    const now = new Date();
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const todayKey = dayNames[now.getDay()];
    const currentHour = now.getHours(); // 0-23
    const slotIndex = currentHour - 9;  // 9am = slot 0

    // Build bar chart for today
    const todayData = busyData[todayKey] || [];
    container.innerHTML = '';

    todayData.forEach((val, i) => {
        const bar = document.createElement('div');
        bar.className = 'busy-bar';
        bar.style.height = val + '%';
        if (i === slotIndex) bar.classList.add('active');
        bar.title = `${9 + i}:00 — ${val}% load`;
        container.appendChild(bar);
    });

    // Current load description
    const statusEl = document.getElementById('busy-status-text');
    const timeEl = document.getElementById('busy-current-time');

    if (statusEl) {
        let currentLoad = slotIndex >= 0 && slotIndex < todayData.length
            ? todayData[slotIndex] : 0;

        let statusText;
        if (currentLoad >= 85) statusText = 'Usually as busy as it gets';
        else if (currentLoad >= 65) statusText = 'Usually a little busy';
        else if (currentLoad >= 35) statusText = 'Not too busy right now';
        else statusText = 'Typically quiet';

        statusEl.textContent = statusText;
    }

    if (timeEl) {
        const hrs = now.getHours();
        const mins = now.getMinutes().toString().padStart(2, '0');
        const ampm = hrs >= 12 ? 'pm' : 'am';
        const h12 = hrs % 12 || 12;
        timeEl.textContent = `${h12}:${mins} ${ampm}`;
    }

    // Day pills
    const dayPillsEl = document.getElementById('busy-day-pills');
    if (dayPillsEl) {
        dayPillsEl.innerHTML = '';
        dayNames.forEach(day => {
            const pill = document.createElement('button');
            pill.textContent = day.substring(0, 2);
            pill.className = [
                'text-xs font-bold font-label uppercase tracking-wider px-2 py-1 transition-colors',
                day === todayKey
                    ? 'text-on-secondary-container bg-secondary-container'
                    : 'text-on-surface-variant hover:text-primary'
            ].join(' ');
            pill.addEventListener('click', () => {
                // Re-render bars for selected day
                const sel = busyData[day] || [];
                container.innerHTML = '';
                sel.forEach((val, i) => {
                    const bar = document.createElement('div');
                    bar.className = 'busy-bar';
                    bar.style.height = val + '%';
                    if (day === todayKey && i === slotIndex) bar.classList.add('active');
                    bar.title = `${9 + i}:00 — ${val}% load`;
                    container.appendChild(bar);
                });
                // Update pills
                dayPillsEl.querySelectorAll('button').forEach(b => {
                    b.className = 'text-xs font-bold font-label uppercase tracking-wider px-2 py-1 transition-colors text-on-surface-variant hover:text-primary';
                });
                pill.className = 'text-xs font-bold font-label uppercase tracking-wider px-2 py-1 transition-colors text-on-secondary-container bg-secondary-container';
            });
            dayPillsEl.appendChild(pill);
        });
    }
}

/* ── CONTACT FORM FEEDBACK ── */
function initContactForm() {
    const forms = document.querySelectorAll('form[data-phe-form]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn ? btn.textContent : '';
            if (btn) {
                btn.textContent = '✓ Request Sent — We\'ll be in touch shortly';
                btn.disabled = true;
                btn.classList.add('opacity-80');
            }
            setTimeout(() => {
                if (btn) {
                    btn.textContent = original;
                    btn.disabled = false;
                    btn.classList.remove('opacity-80');
                }
                form.reset();
            }, 4000);
        });
    });
}

/* ── GRAYSCALE HOVER IMAGE (homepage facility) ── */
function initGrayscaleHover() {
    document.querySelectorAll('[data-grayscale-hover]').forEach(img => {
        img.style.transition = 'filter 1s ease';
        img.style.filter = 'grayscale(1)';
        img.addEventListener('mouseenter', () => img.style.filter = 'grayscale(0)');
        img.addEventListener('mouseleave', () => img.style.filter = 'grayscale(1)');
    });
}

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollAnimations();
    initSpecBars();
    initBusyWidget();
    initContactForm();
    initGrayscaleHover();
});
