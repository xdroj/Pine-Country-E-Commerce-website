/**
 * Pine Country Steakhouse Website
 * Main JavaScript file for interactivity and functionality
 */

// Global variables
let currentTheme = 'light';
let isLoading = true;
let currentMenuPage = 0;
let currentGalleryPage = 0;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Window Load Event for Fire Loader
window.addEventListener('load', function() {
    hideFireLoader();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Initialize theme
    initializeTheme();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize parallax effects
    initializeParallax();
    
    // Initialize gallery
    initializeGallery();
    
    // Initialize menu tabs
    initializeMenuTabs();
    
    // Initialize feedback form
    initializeFeedbackForm();
    
    // Initialize pagination
    initializePagination();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    console.log('Pine Country Steakhouse website initialized');
}

/**
 * Theme Toggle Functionality
 */
function initializeTheme() {
    const themeToggle = document.querySelectorAll('input[name="theme"]');
    const savedTheme = localStorage.getItem('pine-country-theme') || 'light';
    
    // Apply saved theme
    applyTheme(savedTheme);
    
    // Set radio button
    document.getElementById(`${savedTheme}-theme`).checked = true;
    
    // Add event listeners
    themeToggle.forEach(toggle => {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                applyTheme(this.value);
                localStorage.setItem('pine-country-theme', this.value);
            }
        });
    });
}

function applyTheme(theme) {
    currentTheme = theme;
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    
    // Update theme-specific elements
    updateThemeElements(theme);
}

function updateThemeElements(theme) {
    // This will be expanded in Phase 2 with CSS variables
    const root = document.documentElement;
    
    if (theme === 'dark') {
        root.style.setProperty('--current-bg', 'var(--dark-bg)');
        root.style.setProperty('--current-text', 'var(--dark-text)');
    } else {
        root.style.setProperty('--current-bg', 'var(--light-bg)');
        root.style.setProperty('--current-text', 'var(--light-text)');
    }
}

/**
 * Smooth Scrolling Navigation
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                smoothScrollTo(targetSection);
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Update active nav item
                updateActiveNavItem(this);
            }
        });
    });
    
    // Also handle CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                smoothScrollTo(targetSection);
            }
        });
    });
}

function smoothScrollTo(element) {
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    const targetPosition = element.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function updateActiveNavItem(activeLink) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

/**
 * Mobile Menu Functionality
 */
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav')) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const isOpen = navMenu.classList.contains('active');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navMenu.classList.add('active');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
}

function closeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
}

/**
 * Fire Loader Functionality
 */
function hideFireLoader() {
    const loader = document.getElementById('fire-loader');
    
    if (loader) {
        // Add fade out animation
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease-out';
        
        // Remove from DOM after animation
        setTimeout(() => {
            loader.style.display = 'none';
            isLoading = false;
            
            // Trigger any post-load animations
            triggerPostLoadAnimations();
        }, 500);
    }
}

function triggerPostLoadAnimations() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('loaded');
    }
    
    // Start scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.classList.add('animate');
    }
}

/**
 * Parallax Effects
 */
function initializeParallax() {
    window.addEventListener('scroll', handleParallaxScroll);
}

function handleParallaxScroll() {
    const scrollY = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        // Parallax effect for hero background
        const speed = 0.5;
        parallaxBg.style.transform = `translateY(${scrollY * speed}px)`;
    }
    
    // Update navigation based on scroll position
    updateNavigationOnScroll();
}

function updateNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Update active navigation item
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

/**
 * Gallery Functionality
 */
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    // Lightbox controls
    if (lightboxModal) {
        const closeBtn = lightboxModal.querySelector('.lightbox-close');
        const prevBtn = lightboxModal.querySelector('.lightbox-prev');
        const nextBtn = lightboxModal.querySelector('.lightbox-next');
        
        closeBtn?.addEventListener('click', closeLightbox);
        prevBtn?.addEventListener('click', () => navigateLightbox('prev'));
        nextBtn?.addEventListener('click', () => navigateLightbox('next'));
        
        // Close on backdrop click
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleLightboxKeyboard);
    }
}

function openLightbox(index) {
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = lightboxModal.querySelector('.lightbox-image');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems[index]) {
        lightboxImage.src = galleryItems[index].src;
        lightboxImage.alt = galleryItems[index].alt;
        lightboxModal.setAttribute('aria-hidden', 'false');
        lightboxModal.style.display = 'flex';
        document.body.classList.add('lightbox-open');
        
        // Store current index
        lightboxModal.dataset.currentIndex = index;
    }
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightbox-modal');
    lightboxModal.setAttribute('aria-hidden', 'true');
    lightboxModal.style.display = 'none';
    document.body.classList.remove('lightbox-open');
}

function navigateLightbox(direction) {
    const lightboxModal = document.getElementById('lightbox-modal');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentIndex = parseInt(lightboxModal.dataset.currentIndex);
    
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % galleryItems.length;
    } else {
        currentIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    }
    
    openLightbox(currentIndex);
}

function handleLightboxKeyboard(e) {
    const lightboxModal = document.getElementById('lightbox-modal');
    if (lightboxModal.style.display === 'flex') {
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox('prev');
                break;
            case 'ArrowRight':
                navigateLightbox('next');
                break;
        }
    }
}

/**
 * Menu Tab Functionality
 */
function initializeMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('aria-controls');
            switchMenuCategory(targetCategory, this);
        });
    });
}

function switchMenuCategory(categoryId, activeTab) {
    // Hide all menu categories
    document.querySelectorAll('.menu-category').forEach(category => {
        category.classList.remove('active');
        category.hidden = true;
    });
    
    // Show target category
    const targetCategory = document.getElementById(categoryId);
    if (targetCategory) {
        targetCategory.classList.add('active');
        targetCategory.hidden = false;
    }
    
    // Update tab states
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
}

/**
 * Feedback Form Functionality
 */
function initializeFeedbackForm() {
    const feedbackForm = document.querySelector('.feedback-form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    }
}

function handleFeedbackSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const feedbackData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Basic client-side validation
    if (validateFeedbackForm(feedbackData)) {
        // Simulate form submission
        submitFeedback(feedbackData);
    }
}

function validateFeedbackForm(data) {
    const errors = [];
    
    if (!data.name.trim()) {
        errors.push('Name is required');
    }
    
    if (!data.email.trim() || !isValidEmail(data.email)) {
        errors.push('Valid email is required');
    }
    
    if (!data.message.trim()) {
        errors.push('Message is required');
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormErrors(errors) {
    // Create or update error display
    let errorDiv = document.querySelector('.form-errors');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'form-errors';
        const form = document.querySelector('.feedback-form');
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    errorDiv.innerHTML = `
        <ul>
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;
}

function submitFeedback(data) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        document.querySelector('.feedback-form').reset();
        
        // Show success message
        showSuccessMessage('Thank you for your feedback!');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Remove any error messages
        const errorDiv = document.querySelector('.form-errors');
        if (errorDiv) {
            errorDiv.remove();
        }
    }, 1500);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.feedback-form');
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

/**
 * Pagination Functionality
 */
function initializePagination() {
    const paginationContainers = document.querySelectorAll('.pagination');
    
    paginationContainers.forEach(container => {
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        const dots = container.querySelectorAll('.pagination-dot');
        
        prevBtn?.addEventListener('click', () => handlePagination('prev', container));
        nextBtn?.addEventListener('click', () => handlePagination('next', container));
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToPage(index, container));
        });
    });
}

function handlePagination(direction, container) {
    const section = container.closest('section');
    const isMenuSection = section.id === 'menu';
    const isGallerySection = section.id === 'gallery';
    
    if (isMenuSection) {
        const currentPage = currentMenuPage;
        const totalPages = getTotalPages('menu');
        
        if (direction === 'next' && currentPage < totalPages - 1) {
            currentMenuPage++;
        } else if (direction === 'prev' && currentPage > 0) {
            currentMenuPage--;
        }
        
        updateMenuPagination();
    } else if (isGallerySection) {
        const currentPage = currentGalleryPage;
        const totalPages = getTotalPages('gallery');
        
        if (direction === 'next' && currentPage < totalPages - 1) {
            currentGalleryPage++;
        } else if (direction === 'prev' && currentPage > 0) {
            currentGalleryPage--;
        }
        
        updateGalleryPagination();
    }
}

function goToPage(pageIndex, container) {
    const section = container.closest('section');
    
    if (section.id === 'menu') {
        currentMenuPage = pageIndex;
        updateMenuPagination();
    } else if (section.id === 'gallery') {
        currentGalleryPage = pageIndex;
        updateGalleryPagination();
    }
}

function getTotalPages(section) {
    // This will be implemented based on content in Phase 4
    return 3; // Placeholder
}

function updateMenuPagination() {
    // Implementation will be added in Phase 4 with actual content
    updatePaginationDots('.menu-section .pagination', currentMenuPage);
}

function updateGalleryPagination() {
    // Implementation will be added in Phase 4 with actual content
    updatePaginationDots('.gallery-section .pagination', currentGalleryPage);
}

function updatePaginationDots(selector, currentPage) {
    const container = document.querySelector(selector);
    if (container) {
        const dots = container.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }
}

/**
 * Scroll Effects
 */
function initializeScrollEffects() {
    window.addEventListener('scroll', handleScrollEffects);
}

function handleScrollEffects() {
    const scrollY = window.pageYOffset;
    
    // Sticky header effect
    const header = document.querySelector('.main-header');
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (scrollY > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
    
    // Animate elements on scroll
    animateOnScroll();
}

function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('animated');
        }
    });
}

/**
 * Utility Functions
 */
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

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(handleParallaxScroll, 16);
const debouncedScrollEffects = debounce(handleScrollEffects, 16);

// Replace original event listeners with debounced versions
window.removeEventListener('scroll', handleParallaxScroll);
window.removeEventListener('scroll', handleScrollEffects);
window.addEventListener('scroll', debouncedScrollHandler);
window.addEventListener('scroll', debouncedScrollEffects);

// Export functions for potential use in other modules
window.PineCountryApp = {
    applyTheme,
    openLightbox,
    closeLightbox,
    switchMenuCategory,
    updateMenuPagination,
    updateGalleryPagination
};