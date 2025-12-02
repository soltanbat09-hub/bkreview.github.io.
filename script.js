// Theme switching
document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const root = document.documentElement;

    // Theme switching
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Update active button
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update theme
            root.setAttribute('data-theme', theme);
            
            // Save theme to localStorage
            localStorage.setItem('theme', theme);
        });
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    
    // Update active theme button
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Star rating system
    function createStarRating() {
        const starRatings = document.querySelectorAll('.star-rating');
        
        starRatings.forEach(ratingElement => {
            // Check if stars already generated
            if (ratingElement.querySelector('.stars')) {
                return;
            }
            
            const rating = parseFloat(ratingElement.getAttribute('data-rating'));
            const starsContainer = document.createElement('div');
            starsContainer.className = 'stars';
            
            // Create 5 stars
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
                    // Full star
                    filledStar.style.width = '100%';
                } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                    // Partial star
                    const percentage = (rating - Math.floor(rating)) * 100;
                    filledStar.style.width = percentage + '%';
                } else {
                    // Empty star
                    filledStar.style.width = '0%';
                }
                
                starWrapper.appendChild(emptyStar);
                starWrapper.appendChild(filledStar);
                starsContainer.appendChild(starWrapper);
            }
            
            ratingElement.appendChild(starsContainer);
        });
    }

    // Initialize star ratings
    createStarRating();

    // Animate platform cards on scroll
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

    // Update copyright year
    const copyrightElements = document.querySelectorAll('.copyright p');
    const currentYear = new Date().getFullYear();
    copyrightElements.forEach(el => {
        el.textContent = el.textContent.replace('2025', currentYear);
    });

    // Add smooth scrolling for anchor links
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
});

// Track outbound links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[target="_blank"]');
    if (link) {
        // Here you can add analytics tracking
        console.log('Outbound link clicked:', link.href);
    }
});

// Mobile menu toggle (can be added if needed)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}