const app = {
    init: function() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupHeroSlider();
        this.setupPortfolioFilter();
        this.setupScrollAnimations();
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if(e.state && e.state.page) {
                this.navigate(e.state.page, false);
            }
        });

        // Default load
        const initialPage = 'home';
        this.navigate(initialPage, false);
    },

    // --- NAVIGATION LOGIC (SPA) ---
    setupNavigation: function() {
        const navLinks = document.querySelectorAll('.nav-link');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                this.navigate(targetId);
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });

        // Hamburger toggle
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    },

    navigate: function(pageId, pushState = true) {
        // Hide all sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(pageId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo(0, 0);
        }

        // Update Active Link in Navbar
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === pageId) {
                link.classList.add('active');
            }
        });

        // Update URL (optional, for bookmarking)
        if (pushState) {
            history.pushState({page: pageId}, '', `#${pageId}`);
        }
    },

    // --- SCROLL EFFECTS ---
    setupScrollEffects: function() {
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    },

    // --- HERO SLIDER ---
    setupHeroSlider: function() {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Ganti gambar setiap 5 detik
    },

    // --- PORTFOLIO FILTER ---
    setupPortfolioFilter: function() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const container = document.getElementById('portfolio-container');
        const placeholder = document.getElementById('portfolio-placeholder');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Hide placeholder, show container
                placeholder.style.display = 'none';
                container.classList.add('show');

                // Filter Logic
                portfolioItems.forEach(item => {
                    if (filterValue === item.getAttribute('data-category')) {
                        item.style.display = 'block';
                        // Add animation reset
                        item.style.animation = 'none';
                        item.offsetHeight; /* trigger reflow */
                        item.style.animation = 'fadeInPage 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    },

    // --- SCROLL ANIMATIONS (Fade In) ---
    setupScrollAnimations: function() {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.scroll-animate');
        animateElements.forEach(el => observer.observe(el));
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
