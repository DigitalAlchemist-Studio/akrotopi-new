// Immediate Animations - Works without external libraries as fallback
// This ensures animations work even if GSAP/Lenis fail to load

(function() {
    'use strict';
    
    // Check if animations should be disabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = 'auto';
        return;
    }

    // Smooth scroll polyfill
    document.documentElement.style.scrollBehavior = 'smooth';

    // Animation utility functions
    function fadeInElement(element, delay = 0, duration = 600) {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }

    function slideInElement(element, delay = 0, duration = 800, direction = 'up') {
        if (!element) return;
        
        const translateValue = direction === 'up' ? 'translateY(50px)' : 
                              direction === 'down' ? 'translateY(-50px)' :
                              direction === 'left' ? 'translateX(50px)' : 'translateX(-50px)';
        
        element.style.opacity = '0';
        element.style.transform = translateValue;
        element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
        }, delay);
    }

    function scaleInElement(element, delay = 0, duration = 600) {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9)';
        element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, delay);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animate || 'fade';
                const delay = parseInt(element.dataset.delay) || 0;
                
                switch (animationType) {
                    case 'fade':
                        fadeInElement(element, delay);
                        break;
                    case 'slide-up':
                        slideInElement(element, delay, 800, 'up');
                        break;
                    case 'slide-down':
                        slideInElement(element, delay, 800, 'down');
                        break;
                    case 'slide-left':
                        slideInElement(element, delay, 800, 'left');
                        break;
                    case 'slide-right':
                        slideInElement(element, delay, 800, 'right');
                        break;
                    case 'scale':
                        scaleInElement(element, delay);
                        break;
                }
                
                scrollObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Initialize animations when DOM is ready
    function initAnimations() {
        // Navigation animation
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            slideInElement(navbar, 100, 800, 'down');
            
            // Stagger navigation links
            const navLinks = document.querySelectorAll('.nav-link, .nav-btn, .lang-link');
            navLinks.forEach((link, index) => {
                fadeInElement(link, 300 + (index * 100), 500);
            });
            
            // Logo animation
            const logo = document.querySelector('.logo-image');
            if (logo) {
                scaleInElement(logo, 200, 600);
            }
        }

        // Hero section animation
        const heroImage = document.querySelector('.hero-slider .slide.active img');
        if (heroImage) {
            heroImage.style.transform = 'scale(1.05)';
            heroImage.style.transition = 'transform 1200ms ease, opacity 1200ms ease';
            
            setTimeout(() => {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
            }, 600);
        }

        // Hero navigation buttons
        const sliderBtns = document.querySelectorAll('.slider-btn');
        sliderBtns.forEach((btn, index) => {
            scaleInElement(btn, 800 + (index * 200), 600);
        });

        // Set up scroll animations for various elements
        const animatedElements = [
            { selector: '.about-subtitle', animation: 'fade', delay: 0 },
            { selector: '.about-main-text', animation: 'slide-up', delay: 200 },
            { selector: '.about-link', animation: 'fade', delay: 400 },
            { selector: '.choose-room-title', animation: 'slide-up', delay: 0 },
            { selector: '.room-description', animation: 'fade', delay: 200 },
            { selector: '.room-cta', animation: 'fade', delay: 400 },
            { selector: '.explore-title', animation: 'slide-up', delay: 0 },
            { selector: '.explore-subtitle', animation: 'fade', delay: 200 },
            { selector: '.testimonials-title', animation: 'slide-up', delay: 0 },
            { selector: '.gallery-title', animation: 'slide-up', delay: 0 },
            { selector: '.gallery-cta', animation: 'fade', delay: 200 }
        ];

        animatedElements.forEach(({ selector, animation, delay }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.dataset.animate = animation;
                element.dataset.delay = delay;
                scrollObserver.observe(element);
            });
        });

        // Room items stagger animation
        const roomItems = document.querySelectorAll('.room-item');
        roomItems.forEach((item, index) => {
            item.dataset.animate = 'slide-right';
            item.dataset.delay = index * 100;
            scrollObserver.observe(item);
        });

        // Preview images animation
        const previewImages = document.querySelectorAll('.preview-images');
        previewImages.forEach(images => {
            images.dataset.animate = 'slide-left';
            images.dataset.delay = 0;
            scrollObserver.observe(images);
        });

        // Mobile room slides
        const mobileRoomSlides = document.querySelectorAll('.mobile-room-slide');
        mobileRoomSlides.forEach((slide, index) => {
            slide.dataset.animate = 'slide-up';
            slide.dataset.delay = index * 150;
            scrollObserver.observe(slide);
        });

        // Gallery slides
        const gallerySlides = document.querySelectorAll('.gallery-slide');
        gallerySlides.forEach((slide, index) => {
            slide.dataset.animate = 'scale';
            slide.dataset.delay = index * 100;
            scrollObserver.observe(slide);
        });

        // Activity tags
        const activityTags = document.querySelectorAll('.activity-tag');
        activityTags.forEach((tag, index) => {
            tag.dataset.animate = 'fade';
            tag.dataset.delay = index * 100;
            scrollObserver.observe(tag);
        });

        // Testimonial slides
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        testimonialSlides.forEach(slide => {
            slide.dataset.animate = 'slide-up';
            slide.dataset.delay = 0;
            scrollObserver.observe(slide);
        });

        // Add parallax effect to hero on scroll
        let ticking = false;
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-slider .slide.active img');
            
            if (hero && scrolled < window.innerHeight) {
                const yPos = -(scrolled * 0.5);
                hero.style.transform = `translate3d(0, ${yPos}px, 0) scale(1)`;
            }
            
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });

        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        console.log('Akrotopi immediate animations initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }

    // Expose for debugging
    window.AkrotopiImmediateAnimations = {
        fadeInElement,
        slideInElement,
        scaleInElement
    };

})();

