// script.js — полностью исправленный файл

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       TWO-CIRCLE THEME TOGGLE (black/white)
    ========================================== */

    const circleBtns = document.querySelectorAll('.circle-toggle .circle');

    function activateCircle(theme) {
        circleBtns.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.theme === theme);
        });
    }

    circleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const theme = btn.dataset.theme;

            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);

            activateCircle(theme);
        });
    });

    // при загрузке страницы
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute("data-theme", savedTheme);
    activateCircle(savedTheme);



    /* ==========================================
       STAR RATING (оставлено без изменений)
    ========================================== */
    function createStarRating() {
        const starRatings = document.querySelectorAll('.star-rating');
        
        starRatings.forEach(ratingElement => {
            if (ratingElement.querySelector('.stars')) return;
            
            const rating = parseFloat(ratingElement.getAttribute('data-rating'));
            const starsContainer = document.createElement('div');
            starsContainer.className = 'stars';
            
            for (let i = 1; i <= 5; i++) {
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
                    filledStar.style.width = percentage + '%';
                } else {
                    filledStar.style.width = '0%';
                }
                
                starWrapper.appendChild(emptyStar);
                starWrapper.appendChild(filledStar);
                starsContainer.appendChild(starWrapper);
            }
            
            ratingElement.appendChild(starsContainer);
        });
    }

    createStarRating();



    /* ==========================================
       PLATFORM CARDS ANIMATION
    ========================================== */
    const platformCards = document.querySelectorAll('.platform-card');
    if (platformCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        platformCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }



    /* ==========================================
       COPYRIGHT YEAR AUTO UPDATE
    ========================================== */
    const copyrightElements = document.querySelectorAll('.copyright p');
    const currentYear = new Date().getFullYear();
    copyrightElements.forEach(el => {
        el.textContent = el.textContent.replace('2025', currentYear);
    });



    /* ==========================================
       SMOOTH SCROLL FOR ANCHORS
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

}); // ← закрывающий DOMContentLoaded



/* ==========================================
   OUTBOUND LINK TRACKING
========================================== */
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[target="_blank"]');
    if (link) {
        console.log('Outbound link clicked:', link.href);
    }
});


/* ==========================================
   MOBILE MENU TOGGLE
========================================== */
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}
