// Main Script for Akrotopi Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation fade-in animation
    function showNavigation() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
        }
    }


    // Always show navigation on page load
    showNavigation();

    // Mobile Navigation Toggle
    const navHamburger = document.getElementById('nav-hamburger');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuCloseMobile = document.getElementById('mobile-menu-close-mobile');

    if (navHamburger && mobileMenuOverlay) {
        // Open mobile menu
        navHamburger.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close mobile menu
        function closeMobileMenu() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }

        // Close button for desktop split menu
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }

        // Close button for mobile fullscreen menu
        if (mobileMenuCloseMobile) {
            mobileMenuCloseMobile.addEventListener('click', closeMobileMenu);
        }

        // Close when clicking outside the menu content
        mobileMenuOverlay.addEventListener('click', function(event) {
            // For desktop split menu - close when clicking outside navigation and image areas
            const mobileMenuLeft = event.target.closest('.mobile-menu-left');
            const mobileMenuRight = event.target.closest('.mobile-menu-right');
            const mobileMenuFullscreen = event.target.closest('.mobile-menu-fullscreen');
            
            // If click is not inside any menu content area, close the menu
            if (!mobileMenuLeft && !mobileMenuRight && !mobileMenuFullscreen) {
                closeMobileMenu();
            }
        });

        // Close when clicking on navigation links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(248, 248, 248, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'rgba(248, 248, 248, 0.95)';
        navbar.style.backdropFilter = 'none';
    }
});

// Active Navigation Link Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Image Lazy Loading Fallback (for older browsers)
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
});

// Form Validation and Enhancement
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Basic validation
        if (!formObject.name || !formObject.email || !formObject.message) {
            showNotification('Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία.', 'error');
            return;
        }

        if (!isValidEmail(formObject.email)) {
            showNotification('Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Αποστολή...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(300px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Gallery Lightbox - Removed to prevent conflicts with page-specific lightboxes

// Booking Form Enhancement
function initializeBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    if (!bookingForm) return;

    // Add date validation
    const checkinInput = bookingForm.querySelector('input[name="checkin"]');
    const checkoutInput = bookingForm.querySelector('input[name="checkout"]');
    
    if (checkinInput && checkoutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkinInput.setAttribute('min', today);
        
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            const minCheckout = new Date(checkinDate);
            minCheckout.setDate(minCheckout.getDate() + 1);
            checkoutInput.setAttribute('min', minCheckout.toISOString().split('T')[0]);
            
            if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
                checkoutInput.value = minCheckout.toISOString().split('T')[0];
            }
        });
    }
}

// Hero Slider Functionality
function initializeHeroSlider() {
    const sliderWrapper = document.getElementById('slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (!sliderWrapper || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    
    // Show specific slide
    function showSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide(); // Restart auto slide
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide(); // Restart auto slide
    });
    

    
    // Pause auto slide on hover
    sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
    sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    
    sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
    }
    
    // Start auto slide
    startAutoSlide();
    
    // Initialize first slide
    showSlide(0);
}


// Mobile Room Slider - Das Bleibt Style
function initializeMobileRoomSlider() {
    const slider = document.getElementById('mobileRoomSlides');
    const prevBtn = document.getElementById('mobileRoomPrev');
    const nextBtn = document.getElementById('mobileRoomNext');
    const dots = document.querySelectorAll('.mobile-room-dot');
    const slides = document.querySelectorAll('.mobile-room-slide');
    
    if (!slider || !prevBtn || !nextBtn || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideWidth = 86; // 85% + 1% margin
    
    function updateSlider() {
        const translateX = -currentSlide * slideWidth;
        slider.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }
    
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            currentSlide = slideIndex;
            updateSlider();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        
        const diff = startX - endX;
        const minSwipeDistance = 50;
        
        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Initialize first slide
    updateSlider();
    
    // Auto-play (optional)
    // setInterval(nextSlide, 5000);
}

// Room Selection Slideshow
function initializeChooseRoom() {
    const roomItems = document.querySelectorAll('.room-item');
    const previewImages = document.querySelectorAll('.preview-images');
    const mainImageWrappers = document.querySelectorAll('.main-image-wrapper');
    const gallery = document.getElementById('chooseRoomGallery');
    
    function showRoomImages(roomType) {
        // Remove active from all room items first
        roomItems.forEach(item => item.classList.remove('active'));
        
        // Add active to the hovered room item immediately
        const activeRoomItem = document.querySelector(`.room-item[data-room="${roomType}"]`);
        if (activeRoomItem) {
            activeRoomItem.classList.add('active');
        }
        
        // Fade out current images first
        previewImages.forEach(images => images.classList.remove('active'));
        mainImageWrappers.forEach(wrapper => wrapper.classList.remove('active'));
        
        // Show corresponding preview images immediately for smoother transition
        const correspondingPreviewImages = document.querySelector(`.preview-images[data-room="${roomType}"]`);
        if (correspondingPreviewImages) {
            correspondingPreviewImages.classList.add('active');
        }
        
        // Show corresponding main image immediately
        const correspondingMainImage = document.querySelector(`.main-image-wrapper[data-room="${roomType}"]`);
        if (correspondingMainImage) {
            correspondingMainImage.classList.add('active');
        }
    }
    
    // Add hover events to room items
    roomItems.forEach(roomItem => {
        roomItem.addEventListener('mouseenter', () => {
            const roomType = roomItem.getAttribute('data-room');
            showRoomImages(roomType);
        });
    });
    
    // Add parallax effect on mouse move
    if (gallery) {
        gallery.addEventListener('mousemove', (e) => {
            const rect = gallery.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const moveX = deltaX * 20; // Maximum movement of 20px
            const moveY = deltaY * 20;
            
            // Apply parallax to active main image
            const activeMainImage = document.querySelector('.main-image-wrapper.active .main-image');
            if (activeMainImage) {
                activeMainImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            }
            
            // Apply parallax to preview images (opposite direction for depth)
            const activePreviewImages = document.querySelectorAll('.preview-images.active .preview-image');
            activePreviewImages.forEach((img, index) => {
                const multiplier = index % 2 === 0 ? -0.5 : 0.5;
                img.style.transform = `translate(${moveX * multiplier}px, ${moveY * multiplier}px) rotate(${img.classList.contains('preview-1') ? '-2deg' : '3deg'})`;
            });
        });
        
        gallery.addEventListener('mouseleave', () => {
            // Reset transforms for active main image
            const activeMainImage = document.querySelector('.main-image-wrapper.active .main-image');
            if (activeMainImage) {
                activeMainImage.style.transform = '';
            }
            
            const allPreviewImages = document.querySelectorAll('.preview-image');
            allPreviewImages.forEach(img => {
                img.style.transform = img.classList.contains('preview-1') ? 'rotate(-2deg)' : 'rotate(3deg)';
            });
        });
    }
    
    // Initialize with first room active
    showRoomImages('studio-1');
}

// Explore Area Activities
function initializeExploreArea() {
    const activityTags = document.querySelectorAll('.activity-tag');
    const exploreImage = document.querySelector('.explore-image');
    const activityDescriptions = document.querySelectorAll('.activity-description');
    const prevBtn = document.querySelector('.prev-activity');
    const nextBtn = document.querySelector('.next-activity');
    
    if (!activityTags.length || !exploreImage || !activityDescriptions.length) return;
    
    // Activity images mapping
    const activityImages = {
        'tolo': 'assets/images/Placeholders/Slider/view-1.jpg',
        'nafplio': 'assets/images/Placeholders/Slider/view-2.jpg',
        'beaches': 'assets/images/Placeholders/Slider/view.jpg',
        'activities': 'assets/images/Placeholders/Slider/hotel.jpg',
        'gastronomy': 'assets/images/Placeholders/Accommodations/comfort/room-1.jpg',
        'culture': 'assets/images/Placeholders/Accommodations/standard-1/room-1.jpg'
    };
    
    let currentActivityIndex = 0;
    const activities = Array.from(activityTags);
    
    function showActivity(index) {
        // Remove active from all tags
        activityTags.forEach(tag => tag.classList.remove('active'));
        
        // Remove active from all activity descriptions
        activityDescriptions.forEach(desc => desc.classList.remove('active'));
        
        // Add active to current tag
        if (activities[index]) {
            activities[index].classList.add('active');
            const activityType = activities[index].getAttribute('data-activity');
            
            // Show corresponding activity description
            const correspondingDescription = document.querySelector(`.activity-description[data-activity="${activityType}"]`);
            if (correspondingDescription) {
                correspondingDescription.classList.add('active');
            }
            
            // Change image with smoother transition (only if image exists for this activity)
            if (activityImages[activityType]) {
                exploreImage.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                exploreImage.style.opacity = '0';
                exploreImage.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    exploreImage.src = activityImages[activityType];
                    exploreImage.style.opacity = '1';
                    exploreImage.style.transform = 'scale(1)';
                }, 250);
            }
        }
        
        currentActivityIndex = index;
    }
    
    function nextActivity() {
        const nextIndex = (currentActivityIndex + 1) % activities.length;
        showActivity(nextIndex);
    }
    
    function prevActivity() {
        const prevIndex = (currentActivityIndex - 1 + activities.length) % activities.length;
        showActivity(prevIndex);
    }
    
    // Click events for activity tags
    activityTags.forEach((tag, index) => {
        tag.addEventListener('click', () => {
            showActivity(index);
        });
    });
    
    // Navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', nextActivity);
    if (prevBtn) prevBtn.addEventListener('click', prevActivity);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevActivity();
        } else if (e.key === 'ArrowRight') {
            nextActivity();
        }
    });
    
    // Auto-rotate every 8 seconds
    setInterval(nextActivity, 8000);
    
    // Initialize with first activity
    showActivity(0);
}

// Testimonials Slider
function initializeTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    
    function showSlide(index) {
        // Remove active from all slides first
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Small delay to ensure previous slide fades out completely
        setTimeout(() => {
            // Add active to new slide
            if (slides[index]) {
                slides[index].classList.add('active');
            }
        }, 50);
        
        // Update dots immediately
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000); // Change every 6 seconds
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Navigation button events
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
    // Pause on hover
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', stopAutoSlide);
        testimonialsSection.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Start auto slide
    startAutoSlide();
    
    // Initialize first slide
    showSlide(0);
}

// Gallery Slider with Drag
function initializeGallerySlider() {
    const gallerySlider = document.getElementById('gallery-slider');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    if (!gallerySlider) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    let slideWidth = 350 + 24; // slide width + gap
    
    // Calculate slide width dynamically
    function updateSlideWidth() {
        const slide = gallerySlider.querySelector('.gallery-slide');
        if (slide) {
            const slideRect = slide.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(gallerySlider);
            const gap = parseInt(computedStyle.gap) || 24;
            slideWidth = slideRect.width + gap;
        }
    }
    
    // Smooth scroll function
    function smoothScrollTo(target) {
        gallerySlider.scrollTo({
            left: target,
            behavior: 'smooth'
        });
    }
    
    // Navigation functions
    function scrollNext() {
        const maxScroll = gallerySlider.scrollWidth - gallerySlider.clientWidth;
        const currentPosition = gallerySlider.scrollLeft;
        
        if (currentPosition >= maxScroll - 10) {
            // At the end, loop back to start
            smoothScrollTo(0);
        } else {
            const newPosition = Math.min(currentPosition + slideWidth, maxScroll);
            smoothScrollTo(newPosition);
        }
    }
    
    function scrollPrev() {
        const currentPosition = gallerySlider.scrollLeft;
        
        if (currentPosition <= 10) {
            // At the beginning, loop to end
            const maxScroll = gallerySlider.scrollWidth - gallerySlider.clientWidth;
            smoothScrollTo(maxScroll);
        } else {
            const newPosition = Math.max(currentPosition - slideWidth, 0);
            smoothScrollTo(newPosition);
        }
    }
    
    // Mouse drag events
    gallerySlider.addEventListener('mousedown', (e) => {
        isDown = true;
        gallerySlider.style.cursor = 'grabbing';
        startX = e.pageX - gallerySlider.offsetLeft;
        scrollLeft = gallerySlider.scrollLeft;
        gallerySlider.style.scrollBehavior = 'auto';
    });
    
    gallerySlider.addEventListener('mouseleave', () => {
        isDown = false;
        gallerySlider.style.cursor = 'grab';
        gallerySlider.style.scrollBehavior = 'smooth';
    });
    
    gallerySlider.addEventListener('mouseup', () => {
        isDown = false;
        gallerySlider.style.cursor = 'grab';
        gallerySlider.style.scrollBehavior = 'smooth';
    });
    
    gallerySlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gallerySlider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        gallerySlider.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    gallerySlider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchScrollLeft = gallerySlider.scrollLeft;
        gallerySlider.style.scrollBehavior = 'auto';
    });
    
    gallerySlider.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touchX = e.touches[0].clientX;
        const walk = (touchStartX - touchX) * 2;
        gallerySlider.scrollLeft = touchScrollLeft + walk;
    });
    
    gallerySlider.addEventListener('touchend', () => {
        gallerySlider.style.scrollBehavior = 'smooth';
    });
    
    // Button navigation
    if (nextBtn) nextBtn.addEventListener('click', scrollNext);
    if (prevBtn) prevBtn.addEventListener('click', scrollPrev);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            scrollPrev();
        } else if (e.key === 'ArrowRight') {
            scrollNext();
        }
    });
    
    // Update slide width on resize
    window.addEventListener('resize', updateSlideWidth);
    updateSlideWidth();
    
    // Prevent context menu on drag
    gallerySlider.addEventListener('contextmenu', (e) => {
        if (isDown) e.preventDefault();
    });
    
    // Prevent image dragging
    const images = gallerySlider.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

// Footer Functionality
function initializeFooter() {
    // Back to top functionality
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            const footer = document.querySelector('.footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const isFooterVisible = footerRect.top < window.innerHeight;
                
                if (isFooterVisible) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.visibility = 'visible';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.visibility = 'hidden';
                }
            }
        });
    }
}

// Apartments Page Functionality
function initializeApartmentsPage() {
    const roomTabs = document.querySelectorAll('.room-tab');
    const apartmentItems = document.querySelectorAll('.apartment-item');
    
    if (!roomTabs.length || !apartmentItems.length) return;
    
    // Add scroll reveal to apartment items
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    apartmentItems.forEach(item => {
        revealObserver.observe(item);
    });
    
    // Room highlighting based on scroll position (DasBleibt.at style)
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const roomType = entry.target.getAttribute('data-room');
            const correspondingTab = document.querySelector(`[data-room="${roomType}"]`);
            
            if (entry.isIntersecting) {
                // Remove previous highlights
                roomTabs.forEach(tab => {
                    if (tab.getAttribute('data-room') !== 'all') {
                        tab.classList.remove('in-view');
                    }
                });
                
                // Add highlight to current room tab
                if (correspondingTab && roomType !== 'all') {
                    correspondingTab.classList.add('in-view');
                }
            }
        });
    }, {
        threshold: 0.6,
        rootMargin: '-100px 0px -100px 0px'
    });

    // Observe each apartment item for highlighting
    apartmentItems.forEach(item => {
        highlightObserver.observe(item);
    });
    
    // Room filtering functionality
    roomTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetRoom = tab.getAttribute('data-room');
            
            // Update active tab
            roomTabs.forEach(t => {
                t.classList.remove('active');
                t.classList.remove('in-view');
            });
            tab.classList.add('active');
            
            // Filter apartment items
            apartmentItems.forEach(item => {
                const itemRoom = item.getAttribute('data-room');
                
                if (targetRoom === 'all' || itemRoom === targetRoom) {
                    item.style.display = 'flex';
                    // Re-trigger animation
                    item.classList.remove('revealed');
                    setTimeout(() => {
                        if (item.getBoundingClientRect().top < window.innerHeight) {
                            item.classList.add('revealed');
                        }
                    }, 100);
                } else {
                    item.style.display = 'none';
                }
            });
            
            // If showing all rooms, restart the highlight observer
            if (targetRoom === 'all') {
                apartmentItems.forEach(item => {
                    highlightObserver.observe(item);
                });
            }
        });
    });
    
    // Mobile toggle functionality
    const toggleMenu = document.querySelector('.toggle-menu');
    const roomSelector = document.querySelector('.room-selector');
    
    if (toggleMenu && roomSelector) {
        toggleMenu.addEventListener('click', () => {
            roomSelector.classList.toggle('collapsed');
        });
    }
}


// Apartment Lightbox Functionality - Updated to match Gallery lightbox style
function initializeApartmentLightbox() {
    const gallerySlides = document.querySelectorAll('[data-lightbox="apartment-gallery"]');
    
    if (gallerySlides.length === 0) return;
    
    let currentImages = [];
    let currentImageIndex = 0;
    
    // Collect all images for navigation
    gallerySlides.forEach((slide, index) => {
        const img = slide.querySelector('.gallery-image');
        const caption = slide.querySelector('.gallery-image-title');
        if (img) {
            currentImages.push({
                src: img.src,
                alt: img.alt,
                caption: caption ? caption.textContent : ''
            });
        }
    });
    
    // Open lightbox when clicking on gallery images
    gallerySlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            currentImageIndex = index;
            openApartmentLightbox(currentImages[index].src, currentImages[index].alt, currentImages[index].caption);
        });
    });
}

function openApartmentLightbox(src, alt, caption) {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('apartment-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'apartment-lightbox';
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img id="apartment-lightbox-image" src="" alt="">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Add close functionality
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const content = lightbox.querySelector('.lightbox-content');
        
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeApartmentLightbox();
        });
        
        // ROBUST click outside to close - this will work!
        lightbox.addEventListener('click', function(e) {
            // Always close unless clicking directly on image or close button
            const img = lightbox.querySelector('#apartment-lightbox-image');
            const closeBtn = lightbox.querySelector('.lightbox-close');
            
            if (e.target !== img && e.target !== closeBtn) {
                closeApartmentLightbox();
            }
        });
        
        // Prevent any event bubbling on the image
        lightbox.addEventListener('click', function(e) {
            const img = lightbox.querySelector('#apartment-lightbox-image');
            if (e.target === img) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        });
        
        // Add keyboard support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                closeApartmentLightbox();
            }
        });
    }
    
    // Set image
    const img = lightbox.querySelector('#apartment-lightbox-image');
    img.src = src;
    img.alt = alt;
    
    // Show lightbox
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeApartmentLightbox() {
    const lightbox = document.getElementById('apartment-lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Navigation function removed - lightbox now shows single images only

// Other Rooms Slider Functionality
function initializeOtherRoomsSlider() {
    const slider = document.getElementById('other-rooms-slider');
    const prevBtn = document.querySelector('.other-rooms-prev');
    const nextBtn = document.querySelector('.other-rooms-next');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    const itemWidth = 300 + 48; // item width + gap
    let currentPosition = 0;
    const maxPosition = slider.children.length * itemWidth - slider.parentElement.offsetWidth;
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentPosition}px)`;
        
        // Update button states
        prevBtn.style.opacity = currentPosition <= 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentPosition >= maxPosition ? '0.3' : '1';
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition = Math.max(0, currentPosition - itemWidth);
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPosition < maxPosition) {
            currentPosition = Math.min(maxPosition, currentPosition + itemWidth);
            updateSlider();
        }
    });
    
    // Initialize button states
    updateSlider();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newMaxPosition = slider.children.length * itemWidth - slider.parentElement.offsetWidth;
        if (currentPosition > newMaxPosition) {
            currentPosition = newMaxPosition;
            updateSlider();
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeHeroSlider();
    initializeChooseRoom();
    initializeMobileRoomSlider(); // Add mobile room slider
    initializeExploreArea();
    initializeTestimonials();
    initializeGallerySlider();
    initializeFooter();
    initializeBookingForm();
    initializeApartmentsPage();
    initializeApartmentLightbox();
    initializeOtherRoomsSlider();
    initializeGalleryPage();
    
    // Page-specific functionality
    initializeGalleryFilters(); // Gallery page filters
    initializeFAQ(); // FAQ page functionality
    initializeApartmentBooking(); // Apartment booking calculations
});

// Performance Optimization: Debounced Resize Handler
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Handle resize-specific functionality here
        console.log('Window resized');
    }, 250);
});

// Error Handling for Missing Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip to content link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Μετάβαση στο κύριο περιεχόμενο';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content wrapper
    const heroSection = document.querySelector('.hero');
    if (heroSection && !heroSection.id) {
        heroSection.id = 'main-content';
    }
});

// Google Analytics (placeholder - replace with actual tracking ID)
function initializeAnalytics() {
    // Example Google Analytics initialization
    // Replace 'GA_TRACKING_ID' with actual tracking ID
    /*
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'GA_TRACKING_ID', 'auto');
    ga('send', 'pageview');
    */
}

// Call analytics initialization
// initializeAnalytics();


// Gallery Filter Functionality
function initializeGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterBtns.length || !galleryItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// FAQ Functionality
function initializeFAQ() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (!categoryBtns.length && !faqQuestions.length) return;
    
    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('active'); // Close if opened
                }
            });
        });
    });
    
    // FAQ accordion
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                faqItem.classList.remove('active');
            } else {
                faqItem.classList.add('active');
            }
        });
    });
}

// Apartment Booking Calculation
function initializeApartmentBooking() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const nightsSpan = document.getElementById('nights');
    const subtotalSpan = document.getElementById('subtotal');
    const totalSpan = document.getElementById('total');
    
    if (!checkinInput || !checkoutInput) return;
    
    // Determine price based on current page/apartment type
    let pricePerNight = 45; // Default price
    const currentPath = window.location.pathname;
    
    // Set prices based on apartment type (you can adjust these prices as needed)
    if (currentPath.includes('comfort-apartment')) {
        pricePerNight = 65;
    } else if (currentPath.includes('two-bedroom-apartment')) {
        pricePerNight = 85;
    } else if (currentPath.includes('standard-apartment')) {
        pricePerNight = 55;
    } else if (currentPath.includes('studio')) {
        pricePerNight = 45;
    } else if (currentPath.includes('bunk-beds')) {
        pricePerNight = 35;
    }
    
    // Check for data-price attribute override
    const priceElement = document.querySelector('[data-price]');
    if (priceElement) {
        pricePerNight = parseInt(priceElement.getAttribute('data-price')) || pricePerNight;
    }
    
    const cityTax = 3;
    
    function calculateBooking() {
        const checkin = new Date(checkinInput.value);
        const checkout = new Date(checkoutInput.value);
        
        if (checkin && checkout && checkout > checkin) {
            const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
            const subtotal = nights * pricePerNight;
            const total = subtotal + cityTax;
            
            if (nightsSpan) nightsSpan.textContent = nights;
            if (subtotalSpan) subtotalSpan.textContent = '€' + subtotal;
            if (totalSpan) totalSpan.textContent = '€' + total;
        } else {
            if (nightsSpan) nightsSpan.textContent = '0';
            if (subtotalSpan) subtotalSpan.textContent = '€0';
            if (totalSpan) totalSpan.textContent = '€' + cityTax;
        }
    }
    
    checkinInput.addEventListener('change', calculateBooking);
    checkoutInput.addEventListener('change', calculateBooking);
    
    // Run initial calculation if dates are already set
    calculateBooking();
}

// Gallery functionality for gallery.html page
function initializeGalleryPage() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Initialize masonry layout
    initializeMasonryLayout();
    
    // Re-layout on window resize
    window.addEventListener('resize', debounce(initializeMasonryLayout, 250));
    
    // Initialize lightbox functionality for gallery images
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            const caption = this.querySelector('.gallery-overlay p');
            if (img) {
                openGalleryLightbox(img.src, img.alt, caption ? caption.textContent : '');
            }
        });
    });
}

function initializeMasonryLayout() {
    const gallery = document.querySelector('.masonry-gallery');
    const items = document.querySelectorAll('.gallery-item');
    
    if (!gallery || items.length === 0) return;
    
    // Reset gallery height
    gallery.style.height = 'auto';
    
    // Get gallery width and calculate column info
    const galleryWidth = gallery.offsetWidth - 30; // Account for padding
    const gap = 15;
    let columns = 3;
    let itemWidth = (galleryWidth - (gap * (columns - 1))) / columns;
    
    // Responsive column adjustment
    if (window.innerWidth <= 768) {
        columns = 2;
        itemWidth = (galleryWidth - (gap * (columns - 1))) / columns;
    }
    if (window.innerWidth <= 480) {
        columns = 1;
        itemWidth = galleryWidth;
        gap = 8;
    }
    
    // Initialize column heights array
    const columnHeights = new Array(columns).fill(0);
    
    items.forEach((item, index) => {
        // Set item width
        item.style.width = `${itemWidth}px`;
        
        // Find shortest column
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        
        // Calculate position
        const left = shortestColumnIndex * (itemWidth + gap);
        const top = columnHeights[shortestColumnIndex];
        
        // Position the item
        item.style.left = `${left}px`;
        item.style.top = `${top}px`;
        
        // Update column height (add item height + gap)
        const itemHeight = item.offsetHeight;
        columnHeights[shortestColumnIndex] += itemHeight + gap;
    });
    
    // Set gallery height to tallest column
    const maxHeight = Math.max(...columnHeights);
    gallery.style.height = `${maxHeight}px`;
}

// Debounce utility function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Gallery lightbox functionality
function openGalleryLightbox(src, alt, caption) {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'gallery-lightbox';
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img id="gallery-lightbox-image" src="" alt="">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Add close functionality
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const content = lightbox.querySelector('.lightbox-content');
        
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeGalleryLightbox();
        });
        
        // ROBUST click outside to close - this will work!
        lightbox.addEventListener('click', function(e) {
            // Always close unless clicking directly on image or close button
            const img = lightbox.querySelector('#gallery-lightbox-image');
            const closeBtn = lightbox.querySelector('.lightbox-close');
            
            if (e.target !== img && e.target !== closeBtn) {
                closeGalleryLightbox();
            }
        });
        
        // Prevent any event bubbling on the image
        lightbox.addEventListener('click', function(e) {
            const img = lightbox.querySelector('#gallery-lightbox-image');
            if (e.target === img) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        });
        
        // Add keyboard support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                closeGalleryLightbox();
            }
        });
    }
    
    // Set image
    const img = lightbox.querySelector('#gallery-lightbox-image');
    img.src = src;
    img.alt = alt;
    
    // Show lightbox
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGalleryLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        console.log('Gallery lightbox closed'); // Debug log
    }
}


