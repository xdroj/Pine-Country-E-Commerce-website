/**
 * Pine Country Steaks & Waffles Website
 * Main JavaScript file for interactivity and functionality
 * Dark theme permanent design
 */

// Remove all theme-related functions:
// DELETE: applyTheme(), initializeTheme(), theme toggle event listeners

// Keep only the essential functionality:
document.addEventListener('DOMContentLoaded', () => {
    console.log('Pine Country Steaks & Waffles website initialized');
    
    // Initialize mobile navigation only
    initializeMobileNavigation();
    
    // Remove scroll hide initialization
    // initializeScrollHide(); // DELETE THIS LINE
    
    // Keep your existing functions
    initializeNativeVideo();
    
    // Fire Loader
    setTimeout(() => {
        const loader = document.getElementById('fire-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Trigger scroll animations
                const heroContent = document.querySelector('.hero-content');
                const scrollIndicator = document.querySelector('.scroll-indicator');
                
                if (heroContent) heroContent.classList.add('loaded');
                if (scrollIndicator) scrollIndicator.classList.add('animate');
            }, 500);
        }
    }, 3000);
    
    // Menu tab switching
    initializeMenuTabs();
    
    // Feedback form handling
    initializeFeedbackForm();
    
    // Intersection Observer for animations
    initializeScrollAnimations();
    
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
});

/**
 * Pine Country Steaks & Waffles Website
 * Clean mobile navigation implementation
 */

// Mobile Navigation Implementation (updated)
function initializeMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileToggle || !mainNav) {
        console.log('Navigation elements not found');
        return;
    }
    
    // Hamburger toggle functionality
    mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMobileMenu();
    });
    
    function toggleMobileMenu() {
        const isOpen = mainNav.classList.contains('active');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        mainNav.classList.add('active');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
        
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
        
        console.log('Mobile menu opened');
    }
    
    function closeMobileMenu() {
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleEscapeKey);
        
        console.log('Mobile menu closed');
    }
    
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    }
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    console.log('Mobile navigation initialized');
}

// Enhanced video background handling
function initializeVideoBackground() {
    const videoContainer = document.querySelector('.video-background');
    const iframe = document.querySelector('.hero-video');
    
    if (!iframe || !videoContainer) return;
    
    // Force autoplay by updating iframe src with autoplay parameters
    const originalSrc = iframe.src;
    
    // Enhanced Canva autoplay URL
    const autoplaySrc = originalSrc.includes('?') 
        ? `${originalSrc}&autoplay=1&loop=1&muted=1&controls=0&playsinline=1`
        : `${originalSrc}?autoplay=1&loop=1&muted=1&controls=0&playsinline=1`;
    
    // Update iframe src for autoplay
    iframe.src = autoplaySrc;
    
    // Add load event listener
    iframe.addEventListener('load', () => {
        console.log('Video iframe loaded');
        setTimeout(() => {
            videoContainer.classList.add('loaded');
            
            // Try to trigger autoplay via postMessage
            try {
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } catch (e) {
                console.log('PostMessage failed, continuing with normal flow');
            }
        }, 1000);
    });
    
    // Fallback: Add loaded class after timeout
    setTimeout(() => {
        videoContainer.classList.add('loaded');
        console.log('Video fallback loaded');
    }, 3000);
    
    // Handle iframe errors
    iframe.addEventListener('error', () => {
        console.log('Video failed to load, using fallback background');
        videoContainer.classList.add('video-error');
    });
    
    // Try to enable autoplay on user interaction
    document.addEventListener('click', enableVideoAutoplay, { once: true });
    document.addEventListener('scroll', enableVideoAutoplay, { once: true });
    
    function enableVideoAutoplay() {
        try {
            // Reload iframe with autoplay after user interaction
            iframe.src = autoplaySrc;
            console.log('Video autoplay enabled after user interaction');
        } catch (e) {
            console.log('Could not enable autoplay after interaction');
        }
    }
}

// Native video handling
function initializeNativeVideo() {
    const videoContainer = document.querySelector('.video-background');
    const video = document.getElementById('bgvideo');
    
    if (!video || !videoContainer) {
        console.log('Video elements not found');
        return;
    }
    
    console.log('Initializing native video...');
    
    // Video event listeners
    video.addEventListener('loadeddata', () => {
        console.log('Video data loaded');
        videoContainer.classList.add('loaded');
    });
    
    video.addEventListener('canplay', () => {
        console.log('Video can start playing');
        video.play().catch(error => {
            console.log('Autoplay failed:', error);
            // Show play button or handle autoplay failure
        });
    });
    
    video.addEventListener('loadstart', () => {
        console.log('Video loading started');
    });
    
    video.addEventListener('error', (e) => {
        console.log('Video error:', e);
        videoContainer.classList.add('video-error');
        // Fallback to CSS background
    });
    
    video.addEventListener('stalled', () => {
        console.log('Video loading stalled');
    });
    
    // Force play attempt after a delay
    setTimeout(() => {
        if (video.paused) {
            video.play().catch(error => {
                console.log('Delayed play attempt failed:', error);
            });
        }
    }, 2000);
    
    // User interaction fallback
    document.addEventListener('click', () => {
        if (video.paused) {
            video.play().catch(error => {
                console.log('Click-triggered play failed:', error);
            });
        }
    }, { once: true });
    
    // Fallback timeout - show video even if events don't fire
    setTimeout(() => {
        if (!videoContainer.classList.contains('loaded')) {
            console.log('Video loading timeout, showing anyway');
            videoContainer.classList.add('loaded');
        }
    }, 5000);
}

/**
 * Enhanced Navigation with Scroll Hide & Modern Mobile Menu
 */

// Enhanced mobile menu with scroll hide functionality
function initializeNavigation() {
    const header = document.querySelector('.main-header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    // Check if elements exist
    if (!header) {
        console.log('Header element not found');
        return;
    }
    
    // Mobile Menu Toggle with Animation
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMobileMenu();
        });
    }
    
    function toggleMobileMenu() {
        const isOpen = navMenu.classList.contains('active');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        navMenu.classList.add('active');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
        
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
    }
    
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleEscapeKey);
    }
    
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    }
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Enhanced Scroll Hide/Show Header Functionality
    function updateNavOnScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show logic
        if (currentScrollY > 100) { // Only hide after scrolling 100px
            if (currentScrollY > lastScrollY && !navMenu.classList.contains('active')) {
                // Scrolling down & menu is closed - hide header
                header.classList.add('hidden');
                console.log('Hiding header - scrolling down');
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show header
                header.classList.remove('hidden');
                console.log('Showing header - scrolling up');
            }
        } else {
            // At top of page - always show header
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    // Throttled scroll listener
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavOnScroll);
            ticking = true;
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Active navigation highlighting
    updateActiveNavigation();
    
    // Debug: Log initial state
    console.log('Navigation initialized. Header element:', header);
    console.log('Mobile toggle:', mobileToggle);
    console.log('Nav menu:', navMenu);
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Account for fixed header
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial check
    highlightActiveSection();
    
    // Update on scroll
    window.addEventListener('scroll', highlightActiveSection, { passive: true });
}

// Update global object
window.PineCountryApp = {
    // Remove theme-related functions
    openLightbox,
    closeLightbox,
    switchMenuCategory,
    updateMenuPagination,
    updateGalleryPagination
};

// Keep existing lightbox and other functionality...
// (Your existing lightbox, gallery, and other functions remain the same)