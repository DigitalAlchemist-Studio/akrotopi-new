// Akrotopi Website Animations - Das Bleibt Style
// Advanced animations using GSAP and Lenis for smooth, professional experience

class AkrotopiAnimations {
    constructor() {
        this.lenis = null;
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isMobile = window.innerWidth <= 768;
        
        this.init();
    }

    init() {
        // Initialize GSAP plugins
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        
        // Initialize smooth scrolling
        this.initLenis();
        
        // Initialize animations after DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initAnimations());
        } else {
            this.initAnimations();
        }
    }

    initLenis() {
        if (this.isReducedMotion) return;

        // Initialize Lenis smooth scrolling
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Connect Lenis with GSAP ScrollTrigger
        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    initAnimations() {
        // Set initial states for all animated elements
        this.setInitialStates();
        
        // Initialize all animation modules
        this.initNavigationAnimation();
        this.initHeroAnimation();
        this.initTextRevealAnimations();
        this.initImageAnimations();
        this.initSectionAnimations();
        this.initScrollAnimations();
        
        // Performance optimizations
        this.optimizePerformance();
    }

    setInitialStates() {
        // Hide elements that will be animated in
        gsap.set('.navbar', { y: -100, opacity: 0 });
        gsap.set('.hero-slider .slide.active img', { scale: 1.1, opacity: 0 });
        gsap.set('.about-subtitle, .about-main-text, .about-link', { y: 50, opacity: 0 });
        gsap.set('.choose-room-title, .room-description, .room-cta', { y: 30, opacity: 0 });
        gsap.set('.explore-title, .explore-subtitle', { y: 40, opacity: 0 });
        gsap.set('.testimonials-title', { y: 30, opacity: 0 });
        gsap.set('.gallery-title, .gallery-cta', { y: 30, opacity: 0 });
        
        // Set room items and gallery items initial state
        gsap.set('.room-item', { x: -30, opacity: 0 });
        gsap.set('.preview-images', { x: 30, opacity: 0 });
        gsap.set('.mobile-room-slide', { y: 50, opacity: 0 });
        gsap.set('.gallery-slide', { y: 30, opacity: 0 });
        gsap.set('.testimonial-slide', { y: 30, opacity: 0 });
        
        // Activity tags
        gsap.set('.activity-tag', { y: 20, opacity: 0 });
        gsap.set('.activity-description', { y: 30, opacity: 0 });
    }

    initNavigationAnimation() {
        const tl = gsap.timeline({ delay: 0.2 });
        
        // Main navigation fade in
        tl.to('.navbar', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Stagger navigation links
        tl.from('.nav-link, .nav-btn, .lang-link', {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.4');

        // Logo scale in
        tl.from('.logo-image', {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, '-=0.6');
    }

    initHeroAnimation() {
        const heroTl = gsap.timeline({ delay: 0.5 });

        // Hero image reveal
        heroTl.to('.hero-slider .slide.active img', {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
        });

        // Slider navigation fade in
        heroTl.from('.slider-nav .slider-btn', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.6');
    }

    initTextRevealAnimations() {
        // About section text reveals
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        aboutTl.to('.about-subtitle', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.about-main-text', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.about-link', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2');

        // Room section text reveals
        gsap.timeline({
            scrollTrigger: {
                trigger: '.choose-room',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        })
        .to('.choose-room-title', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.room-description', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2')
        .to('.room-cta', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2');

        // Explore section text reveals
        gsap.timeline({
            scrollTrigger: {
                trigger: '.explore-area',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        })
        .to('.explore-title', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.explore-subtitle p', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        }, '-=0.4');

        // Testimonials title reveal
        gsap.to('.testimonials-title', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.testimonials',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Gallery title reveal
        gsap.timeline({
            scrollTrigger: {
                trigger: '.gallery-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        })
        .to('.gallery-title', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.gallery-cta', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4');
    }

    initImageAnimations() {
        // Room gallery images animation
        gsap.to('.room-item', {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.choose-room-gallery',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.to('.preview-images', {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.choose-room-gallery',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        // Mobile room slides
        gsap.to('.mobile-room-slide', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.mobile-room-slider',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Gallery slides animation
        gsap.to('.gallery-slide', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.gallery-slider-container',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Testimonial slides
        gsap.to('.testimonial-slide', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.testimonials-slider',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    initSectionAnimations() {
        // Activity tags stagger animation
        gsap.to('.activity-tag', {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.activity-nav',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Activity descriptions
        gsap.to('.activity-description.active', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.activity-description-overlay',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Explore image parallax effect
        gsap.to('.explore-image', {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.explore-area',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    initScrollAnimations() {
        // Add subtle parallax to hero images
        gsap.to('.hero-slider .slide.active img', {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-slider',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Fade out hero content on scroll
        gsap.to('.hero-slider', {
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-slider',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Scale images on scroll reveal
        gsap.utils.toArray('.gallery-image, .main-image, .preview-image').forEach(img => {
            gsap.fromTo(img, {
                scale: 1.1,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: img,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    optimizePerformance() {
        // Add will-change property for better performance
        const animatedElements = document.querySelectorAll(`
            .navbar, .hero-slider img, .about-subtitle, .about-main-text, 
            .room-item, .preview-images, .gallery-slide, .testimonial-slide,
            .activity-tag, .explore-image
        `);

        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });

        // Remove will-change after animations complete
        ScrollTrigger.addEventListener('refresh', () => {
            setTimeout(() => {
                animatedElements.forEach(el => {
                    el.style.willChange = 'auto';
                });
            }, 1000);
        });

        // Optimize for mobile
        if (this.isMobile) {
            // Reduce animation complexity on mobile
            gsap.globalTimeline.timeScale(1.5); // Speed up animations
            
            // Disable some heavy animations on mobile
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.scrub) {
                    trigger.kill();
                }
            });
        }

        // Handle reduced motion preference
        if (this.isReducedMotion) {
            gsap.globalTimeline.timeScale(10); // Make animations nearly instant
            if (this.lenis) {
                this.lenis.destroy();
            }
        }
    }

    // Method to refresh animations on resize
    refresh() {
        ScrollTrigger.refresh();
        if (this.lenis) {
            this.lenis.resize();
        }
    }

    // Method to destroy animations
    destroy() {
        ScrollTrigger.killAll();
        if (this.lenis) {
            this.lenis.destroy();
        }
        gsap.killTweensOf('*');
    }
}

// Initialize animations
const akrotopiAnimations = new AkrotopiAnimations();

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        akrotopiAnimations.refresh();
    }, 250);
});

// Expose for debugging
window.AkrotopiAnimations = akrotopiAnimations;

