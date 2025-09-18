// Simple Animations for Static HTML - No Server Required
// Works immediately when opening HTML files directly in browser

(function() {
    'use strict';
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        return; // Skip animations if user prefers reduced motion
    }

    // Ultra-smooth scrolling implementation with advanced easing
    function smoothScrollTo(targetElement, duration = 1000, offset = 0) {
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.offsetTop - offset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        let animationId = null;

        // Advanced easing function for ultra-smooth animation
        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        // Alternative easing for different scroll distances
        function easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
        }

        // Choose easing based on scroll distance
        const scrollDistance = Math.abs(distance);
        const easingFunction = scrollDistance > 1000 ? easeInOutQuart : easeOutQuart;
        
        // Adjust duration based on distance for consistent feel
        const adjustedDuration = Math.min(Math.max(duration * (scrollDistance / 800), 400), 1200);

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / adjustedDuration, 1);
            const ease = easingFunction(progress);
            
            // Use transform for better performance
            const currentPosition = startPosition + distance * ease;
            window.scrollTo(0, currentPosition);
            
            if (timeElapsed < adjustedDuration) {
                animationId = requestAnimationFrame(animation);
            } else {
                // Ensure we end exactly at the target position
                window.scrollTo(0, targetPosition);
                animationId = null;
            }
        }

        // Cancel any existing animation
        if (window.currentScrollAnimation) {
            cancelAnimationFrame(window.currentScrollAnimation);
        }
        
        window.currentScrollAnimation = requestAnimationFrame(animation);
    }

    // Enhanced smooth scrolling for anchor links
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
            e.preventDefault();
            const targetId = target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Calculate header offset (adjust based on your header height)
                const headerHeight = 80;
                smoothScrollTo(targetElement, 1000, headerHeight);
            }
        }
    });

    // Global smooth scrolling enhancement for programmatic scrolling
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function(options) {
        if (typeof options === 'object' && options.behavior === 'smooth') {
            // Use our custom smooth scrolling for smooth behavior
            const targetY = options.top || 0;
            const targetElement = document.createElement('div');
            targetElement.style.position = 'absolute';
            targetElement.style.top = targetY + 'px';
            targetElement.style.left = '0';
            targetElement.style.width = '1px';
            targetElement.style.height = '1px';
            document.body.appendChild(targetElement);
            
            smoothScrollTo(targetElement, 1000, 0);
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(targetElement);
            }, 1000);
        } else {
            // Use original scrollTo for instant scrolling
            originalScrollTo.apply(this, arguments);
        }
    };

    // Utility function to add CSS class with animation
    function animateElement(element, animationClass, delay = 0) {
        if (!element) return;
        
        setTimeout(() => {
            element.classList.add(animationClass);
        }, delay);
    }

    // Intersection Observer for scroll-triggered animations - Optimized for speed
    const observerOptions = {
        threshold: 0.1, // Lower threshold for faster response
        rootMargin: '0px 0px -30px 0px' // Optimized margin for better timing
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate');
                scrollObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Initialize animations when page loads
    function initializeAnimations() {
        console.log('Initializing simple animations...');

        // 1. Navigation Animation (immediate)
        setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.add('animate');
            }
        }, 50);

        // 1b. Hero Section Animation (after navbar for homepage)
        setTimeout(() => {
            const heroSection = document.querySelector('.hero-slider');
            if (heroSection && (window.location.pathname.includes('index.html') || window.location.pathname === '/')) {
                heroSection.classList.add('animate');
            }
        }, 300);

        // 1c. Accommodations page animations
        setTimeout(() => {
            if (window.location.pathname.includes('accommodations.html')) {
                const heroSection = document.querySelector('.hero-slider');
                if (heroSection) {
                    heroSection.classList.add('animate');
                }
                
                const apartmentItems = document.querySelectorAll('.apartment-item');
                apartmentItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 100);
                });
            }
        }, 200);

        // 2. About page hero section animation (entire section fade-in)
        setTimeout(() => {
            const aboutHeroSection = document.querySelector('.hero-slider');
            if (aboutHeroSection && window.location.pathname.includes('about.html')) {
                aboutHeroSection.classList.add('about-hero-section', 'animate');
            }
        }, 300);

        // 2b. Room pages hero section animation (entire section fade-in)
        setTimeout(() => {
            const roomHeroSection = document.querySelector('.hero-slider');
            if (roomHeroSection && window.location.pathname.includes('apartments/')) {
                roomHeroSection.classList.add('room-hero-section', 'animate');
            }
        }, 300);

        // 3. Slider Buttons Animation
        setTimeout(() => {
            const sliderBtns = document.querySelectorAll('.slider-btn');
            sliderBtns.forEach((btn, index) => {
                setTimeout(() => {
                    btn.classList.add('animate');
                }, index * 200);
            });
        }, 800);

        // 4. Set up scroll-triggered animations for all pages
        const scrollElements = [
            // Index page elements
            '.about-subtitle',
            '.about-main-text', 
            '.about-link',
            '.explore-title',
            '.explore-subtitle',
            '.activity-tag',
            '.testimonials-title',
            '.testimonial-slide',
            '.gallery-title',
            '.gallery-cta',
            '.gallery-slide',
            '.mobile-room-slide',
            
            // About page elements
            '.column-image img', // Left side image in two-column section
            '.column-text h2', // Two-column text heading
            '.column-text p', // Two-column text paragraphs
            '.philosophy-section h2', // Philosophy heading
            '.philosophy-section p', // Philosophy text
            '.gallery-item', // Gallery grid items
            '.facilities-title', // Services main title
            '.facilities-description', // Services main description
            
            // Accommodations page elements
            '.hero-slider h1',
            '.hero-slider p',
            '.apartment-item',
            '.apartment-image',
            '.apartment-details',
            '.apartment-content',
            '.filter-btn',
            
            // Contact page elements
            '.contact-hero h1',
            '.contact-hero p',
            '.contact-details',
            '.contact-form',
            '.map-wrapper',
            
            // Gallery page elements (excluding masonry gallery)
            '.gallery-item:not(.masonry-gallery .gallery-item)',
            '.gallery-filter',
            '.gallery-grid img',
            
            // FAQ page elements
            '.faq-item',
            '.faq-category',
            
            // Room pages elements (apartments/*.html)
            '.apartment-overview',
            '.overview-title',
            '.overview-description',
            '.overview-specs',
            '.spec-item',
            '.gallery-section',
            '.gallery-header',
            '.gallery-title',
            '.gallery-slide',
            '.gallery-image',
            
            // Offers page elements
            '.single-column-text-section',
            '.text-content h2',
            '.text-content p',
            '.offers-deals-section',
            '.deals-table',
            '.pricing-note',
            '.no-date-section',
            '.no-date-container h2',
            '.no-date-container p',
            '.calendar-btn',
            
            // General page elements
            '.page-hero h1',
            '.page-hero p',
            '.page-content h2',
            '.page-content h3',
            '.page-content p',
            '.content-image',
            '.info-card',
            '.feature-list li',
            '.section-title',
            '.section-subtitle',
            '.section-content',
            '.cta-button',
            '.info-section',
            
            // Info page specific elements
            '.single-column-text-section',
            '.facilities-services-section',
            '.facilities-grid',
            '.facilities-main',
            '.facilities-column'
        ];

        // 4a. Room section - optimized for faster loading
        const roomTitle = document.querySelector('.choose-room-title');
        const roomDescription = document.querySelector('.room-description');
        const roomCta = document.querySelector('.room-cta');
        const roomItems = document.querySelectorAll('.room-item');
        const previewImages = document.querySelectorAll('.preview-images');
        
        // Faster observer with lower threshold for room title
        if (roomTitle) {
            const roomTitleObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        roomTitleObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1, // Trigger earlier
                rootMargin: '0px 0px -20px 0px' // Much less aggressive margin
            });
            roomTitleObserver.observe(roomTitle);
        }
        
        // Individual observers for faster response
        [roomDescription, roomCta].forEach(element => {
            if (element) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -20px 0px'
                });
                observer.observe(element);
            }
        });
        
        // Room items - animate all together when first one is visible
        if (roomItems.length > 0) {
            const roomItemsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate all room items at once when first is visible
                        roomItems.forEach(item => {
                            item.classList.add('animate');
                        });
                        previewImages.forEach(images => {
                            images.classList.add('animate');
                        });
                        roomItemsObserver.disconnect(); // Stop observing after first trigger
                    }
                });
            }, {
                threshold: 0.05, // Very low threshold for fast response
                rootMargin: '0px 0px 50px 0px' // Trigger before fully in view
            });
            
            // Observe the first room item for fastest response
            roomItemsObserver.observe(roomItems[0]);
        }

        // 4b. About page services section - line by line animations
        const servicesSection = document.querySelector('.facilities-services-section');
        if (servicesSection) {
            const servicesObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate service columns line by line
                        const facilityColumns = document.querySelectorAll('.facilities-column');
                        const middleColumn = facilityColumns[0]; // First .facilities-column (Included services)
                        const rightColumn = facilityColumns[1]; // Second .facilities-column (Optional services)
                        const middleItems = middleColumn ? middleColumn.querySelectorAll('li') : [];
                        const rightItems = rightColumn ? rightColumn.querySelectorAll('li') : [];
                        
                        // Animate subtitles first
                        const subtitles = document.querySelectorAll('.facilities-subtitle');
                        subtitles.forEach((subtitle, index) => {
                            setTimeout(() => {
                                subtitle.classList.add('animate');
                            }, index * 200);
                        });
                        
                        // Animate middle column items (Included services)
                        middleItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, 400 + (index * 100)); // Start after subtitles
                        });
                        
                        // Animate right column items (Optional services)
                        rightItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, 600 + (index * 100)); // Slight delay after middle column
                        });
                        
                        servicesObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -30px 0px'
            });
            
            servicesObserver.observe(servicesSection);
        }

        // 4d. Info page facilities sections - handle multiple grids
        const infoServicesSection = document.querySelector('.facilities-services-section');
        if (infoServicesSection && window.location.pathname.includes('info.html')) {
            const infoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate all facilities grids in the info page
                        const allFacilitiesGrids = entry.target.querySelectorAll('.facilities-grid');
                        
                        allFacilitiesGrids.forEach((grid, gridIndex) => {
                            const subtitles = grid.querySelectorAll('.facilities-subtitle');
                            const leftColumn = grid.querySelector('.facilities-column:first-of-type');
                            const rightColumn = grid.querySelector('.facilities-column:last-of-type');
                            const leftItems = leftColumn ? leftColumn.querySelectorAll('li') : [];
                            const rightItems = rightColumn ? rightColumn.querySelectorAll('li') : [];
                            
                            // Animate subtitles first
                            subtitles.forEach((subtitle, index) => {
                                setTimeout(() => {
                                    subtitle.classList.add('animate');
                                }, (gridIndex * 400) + (index * 200)); // Stagger between grids
                            });
                            
                            // Animate left column items
                            leftItems.forEach((item, index) => {
                                setTimeout(() => {
                                    item.classList.add('animate');
                                }, (gridIndex * 400) + 400 + (index * 100)); // Start after subtitles
                            });
                            
                            // Animate right column items
                            rightItems.forEach((item, index) => {
                                setTimeout(() => {
                                    item.classList.add('animate');
                                }, (gridIndex * 400) + 600 + (index * 100)); // Slight delay after left column
                            });
                        });
                        
                        infoObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -30px 0px'
            });
            
            infoObserver.observe(infoServicesSection);
        }

        // 4e. Offers page table rows - sequential animations
        const offersSection = document.querySelector('.offers-deals-section');
        if (offersSection) {
            const offersObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate table rows in sequence
                        const tableRows = entry.target.querySelectorAll('tbody tr');
                        tableRows.forEach((row, index) => {
                            setTimeout(() => {
                                row.classList.add('animate');
                            }, 200 + (index * 300)); // Staggered timing for each row
                        });
                        
                        offersObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -30px 0px'
            });
            
            offersObserver.observe(offersSection);
        }

        // 4c. Room pages spec items - staggered animations
        const overviewSection = document.querySelector('.apartment-overview');
        if (overviewSection) {
            const overviewObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate spec items in staggered way
                        const specItems = document.querySelectorAll('.spec-item');
                        specItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, 200 + (index * 100)); // Staggered timing
                        });
                        
                        overviewObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -30px 0px'
            });
            
            overviewObserver.observe(overviewSection);
        }

        // 4d. Room pages gallery slides - sequential animations
        const gallerySection = document.querySelector('.gallery-section');
        if (gallerySection) {
            const galleryObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate gallery slides in sequence
                        const gallerySlides = document.querySelectorAll('.gallery-slide');
                        gallerySlides.forEach((slide, index) => {
                            setTimeout(() => {
                                slide.classList.add('animate');
                            }, 100 + (index * 150)); // Sequential timing
                        });
                        
                        galleryObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -30px 0px'
            });
            
            galleryObserver.observe(gallerySection);
        }

        scrollElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                scrollObserver.observe(element);
            });
        });

        // 5. Optimized Masonry Gallery Layout with Custom Lazy Loading (for gallery.html)
        const masonryGallery = document.querySelector('.masonry-gallery');
        if (masonryGallery) {
            let isLayouting = false;
            let layoutTimeout;
            let loadedImages = 0;
            const totalImages = masonryGallery.querySelectorAll('.gallery-image').length;
            
            // Custom lazy loading implementation
            const lazyLoadImages = () => {
                const images = masonryGallery.querySelectorAll('.gallery-image[data-src]');
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            const src = img.getAttribute('data-src');
                            
                            if (src) {
                                img.src = src;
                                img.removeAttribute('data-src');
                                imageObserver.unobserve(img);
                                
                                // Load image with error handling
                                img.onload = () => {
                                    loadedImages++;
                                    debouncedLayout();
                                };
                                img.onerror = () => {
                                    console.warn('Failed to load image:', src);
                                    loadedImages++;
                                };
                            }
                        }
                    });
                }, {
                    rootMargin: '50px 0px', // Start loading 50px before image comes into view
                    threshold: 0.1
                });
                
                images.forEach(img => imageObserver.observe(img));
            };
            
            const layoutMasonry = () => {
                if (isLayouting) return;
                isLayouting = true;
                
                // Use requestAnimationFrame for smoother performance
                requestAnimationFrame(() => {
                    const items = masonryGallery.querySelectorAll('.gallery-item');
                    const containerWidth = masonryGallery.offsetWidth;
                    const gap = 15;
                    
                    // For very small screens (mobile), use simple stacked layout
                    if (containerWidth <= 480) {
                        items.forEach((item) => {
                            item.style.position = 'relative';
                            item.style.left = '0';
                            item.style.top = '0';
                            item.style.width = '100%';
                            item.style.marginBottom = '8px';
                        });
                        masonryGallery.style.height = 'auto';
                        isLayouting = false;
                        return;
                    }
                    
                    // Determine number of columns based on screen size
                    let numColumns = 3;
                    if (containerWidth <= 768) {
                        numColumns = 2;
                    }
                    
                    const itemWidth = (containerWidth - (gap * (numColumns - 1))) / numColumns;
                    const columns = new Array(numColumns).fill(0);
                    
                    items.forEach((item) => {
                        // Reset positioning for masonry layout
                        item.style.position = 'absolute';
                        item.style.width = `${itemWidth}px`;
                        item.style.marginBottom = '0';
                        
                        // Find the shortest column
                        const shortestColumnIndex = columns.indexOf(Math.min(...columns));
                        const left = shortestColumnIndex * (itemWidth + gap);
                        const top = columns[shortestColumnIndex];
                        
                        item.style.left = `${left}px`;
                        item.style.top = `${top}px`;
                        
                        // Update column height
                        columns[shortestColumnIndex] += item.offsetHeight + gap;
                    });
                    
                    // Set container height
                    masonryGallery.style.height = `${Math.max(...columns)}px`;
                    isLayouting = false;
                });
            };
            
            // Debounced layout function
            const debouncedLayout = () => {
                clearTimeout(layoutTimeout);
                layoutTimeout = setTimeout(layoutMasonry, 50);
            };
            
            // Initialize lazy loading
            lazyLoadImages();
            
            // Layout on load
            layoutMasonry();
            
            // Optimized resize handler
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(debouncedLayout, 150);
            });
        }

        // 5. Add parallax effect to hero image
        let ticking = false;
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroImg = document.querySelector('.hero-slider .slide.active img');
            
            if (heroImg && scrolled < window.innerHeight) {
                const yPos = -(scrolled * 0.2); // Das Bleibt style - subtle parallax
                heroImg.style.transform = `translateY(${yPos}px) scale(1)`;
                heroImg.style.opacity = '1'; // Ensure opacity stays at 1
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

        // 6. Enhanced click animations for interactive elements
        const interactiveElements = document.querySelectorAll('.nav-btn, .room-link, .gallery-nav-btn, .activity-tag');
        interactiveElements.forEach(element => {
            element.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Initialize info page animations
        initializeInfoAnimations();

        console.log('Simple animations initialized successfully!');
    }

    // Info page specific initialization
    function initializeInfoAnimations() {
        if (window.location.pathname.includes('info.html')) {
            // Initialize text reveal animations for info page
            setTimeout(() => {
                // Initialize text reveals for info page
                initializeTextReveals();
                
                // Force text reveals to be visible immediately for info page
                setTimeout(() => {
                    const textRevealElements = document.querySelectorAll('.info-page .heading-reveal, .info-page .paragraph-reveal, .info-page .text-reveal');
                    textRevealElements.forEach(element => {
                        element.classList.add('visible');
                    });
                }, 100);
                
                // Initialize hero section animations
                const heroSection = document.querySelector('.hero-slider');
                if (heroSection) {
                    heroSection.classList.add('animate');
                    
                    // Animate hero image with delay
                    setTimeout(() => {
                        const heroImage = heroSection.querySelector('.hero-image');
                        if (heroImage) {
                            heroImage.style.opacity = '1';
                            heroImage.style.transform = 'scale(1)';
                        }
                    }, 200);
                }
                
                // Make all info page elements visible immediately
                const infoElements = document.querySelectorAll(
                    '.single-column-text-section, ' +
                    '.facilities-services-section, ' +
                    '.facilities-grid, ' +
                    '.facilities-main, ' +
                    '.facilities-column, ' +
                    '.section-content'
                );
                
                infoElements.forEach(element => {
                    if (element) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        element.classList.add('animate');
                    }
                });
                
                // Specifically ensure all facilities grids are visible
                const allFacilitiesGrids = document.querySelectorAll('.facilities-grid');
                allFacilitiesGrids.forEach((grid, index) => {
                    if (grid) {
                        grid.style.opacity = '1';
                        grid.style.transform = 'translateY(0)';
                        grid.classList.add('animate');
                        
                        // Add staggered delay for second grid
                        if (index === 1) {
                            setTimeout(() => {
                                grid.classList.add('visible');
                            }, 200);
                        }
                    }
                });
                
                // Initialize text reveals immediately for info page
                setTimeout(() => {
                    if (!window.textRevealsInitialized) {
                        initializeTextReveals();
                        window.textRevealsInitialized = true;
                    }
                }, 50);
            }, 100);
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAnimations);
    } else {
        initializeAnimations();
    }

})();

