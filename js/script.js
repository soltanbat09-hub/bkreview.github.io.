// path: /mnt/data/script.js
// ------------------------------------------------------------
// Единственный, целостный скрипт. Аккордеоны — независимые.
// Комментарии только там, где важно "почему".
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     TWO-CIRCLE THEME TOGGLE (black/white)
  ========================================== */
  const circleBtns = document.querySelectorAll('.circle-toggle .circle');

  function activateCircle(theme) {
    circleBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  circleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      activateCircle(theme);
    });
  });

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  activateCircle(savedTheme);

  /* ==========================================
     STAR RATING
  ========================================== */
  (function createStarRating() {
    const starRatings = document.querySelectorAll('.star-rating');
    starRatings.forEach((ratingElement) => {
      if (ratingElement.querySelector('.stars')) return; // не дублируем

      const rating = parseFloat(ratingElement.getAttribute('data-rating'));
      if (Number.isNaN(rating)) return;

      const starsContainer = document.createElement('div');
      starsContainer.className = 'stars';

      for (let i = 1; i <= 5; i += 1) {
        const starWrapper = document.createElement('div');
        starWrapper.className = 'star';

        const emptyStar = document.createElement('div');
        emptyStar.className = 'star-empty';
        emptyStar.innerHTML = '★';

        const filledStar = document.createElement('div');
        filledStar.className = 'star-filled';
        filledStar.innerHTML = '★';

        if (i <= Math.floor(rating)) {
          filledStar.style.width = '100%';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
          const percentage = (rating - Math.floor(rating)) * 100;
          filledStar.style.width = `${percentage}%`;
        } else {
          filledStar.style.width = '0%';
        }

        starWrapper.appendChild(emptyStar);
        starWrapper.appendChild(filledStar);
        starsContainer.appendChild(starWrapper);
      }

      ratingElement.appendChild(starsContainer);
    });
  })();

  /* ==========================================
     PLATFORM CARDS ANIMATION
  ========================================== */
  (function animatePlatformCards() {
    const platformCards = document.querySelectorAll('.platform-card');
    if (platformCards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 },
    );

    platformCards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });
  })();

  /* ==========================================
     COPYRIGHT YEAR AUTO UPDATE
  ========================================== */
  (function updateCopyrightYear() {
    const copyrightElements = document.querySelectorAll('.copyright');
    const currentYear = new Date().getFullYear();
    copyrightElements.forEach((el) => {
      // Почему: чтобы не зависеть от "2025" в макете
      el.textContent = el.textContent.replace(/\b(19|20)\d{2}\b/g, String(currentYear));
    });
  })();

  /* ==========================================
     SMOOTH SCROLL FOR ANCHORS
  ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth',
      });
    });
  });

  /* ==========================================
     PROMO CODE COPY (LEON / CSGOBROKER)
  ========================================== */
  (function initPromoCopy() {
    const promoCard = document.querySelector('.promo-card');
    if (!promoCard) return;

    const promoCodeEl = promoCard.querySelector('.promo-code');
    const promoCopyBtn = promoCard.querySelector('.promo-copy-btn');
    const promoTooltip = promoCard.querySelector('.promo-tooltip');
    if (!promoCodeEl || !promoCopyBtn) return;

    const code = (promoCodeEl.dataset.code || promoCodeEl.textContent || '').trim();
    if (!code) return;

    function fallbackSelect() {
      const range = document.createRange();
      range.selectNodeContents(promoCodeEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }

    function copyPromoCode() {
      // Почему: приводим к lower-case для единообразия, как было в макете
      const normalized = code.toLowerCase();
      if (navigator.clipboard?.writeText) {
        navigator.clipboard
          .writeText(normalized)
          .then(() => {
            promoCopyBtn.classList.add('copied');
            if (promoTooltip) promoTooltip.classList.add('visible');
            setTimeout(() => {
              promoCopyBtn.classList.remove('copied');
              if (promoTooltip) promoTooltip.classList.remove('visible');
            }, 1200);
          })
          .catch(fallbackSelect);
      } else {
        fallbackSelect();
      }
    }

    promoCopyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      copyPromoCode();
    });

    promoCodeEl.style.cursor = 'pointer';
    promoCodeEl.addEventListener('click', (e) => {
      e.preventDefault();
      copyPromoCode();
    });
  })();

  
  /* ==========================================
     OUTBOUND LINK TRACKING
  ========================================== */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[target="_blank"]');
    if (link) {
      // Почему: можно подключить аналитику тут
      console.log('Outbound link clicked:', link.href);
    }
  });

  /* ==========================================
     MOBILE MENU TOGGLE
  ========================================== */
  // Почему: делаем функцию глобальной, если вызывается из HTML
  window.toggleMobileMenu = function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) menu.classList.toggle('active');
  };
});
// Табы в обзоре Leon Bet
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.review-tabs-nav .review-tab');
    const tabPanels  = document.querySelectorAll('.review-tab-panel');

    if (!tabButtons.length || !tabPanels.length) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.tab;
            if (!target) return;

            // активный таб
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // активная панель
            tabPanels.forEach(panel => {
                panel.classList.toggle('active', panel.dataset.tab === target);
            });
        });
    });
});
