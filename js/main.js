// Main JavaScript for Parvez's Portfolio

// Smooth scrolling function (for single page navigation if needed)
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Fade in animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }
}

// Typing effect for hero section (only on home page)
function initTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroSubtitle && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Add active class to current page navigation
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Copy email to clipboard function
function copyEmail() {
    navigator.clipboard.writeText('parvezpathan09@email.com').then(() => {
        // Could add a toast notification here
        console.log('Email copied to clipboard');
    });
}

// Form validation (if contact form is added later)
function validateForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    return errors;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Parallax effect for hero background (optional enhancement)
function initParallaxEffect() {
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Loading animation (optional)
function showLoading() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
}

function hideLoading() {
    document.body.style.opacity = '1';
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initScrollAnimations();
    initHeaderScrollEffect();
    initMobileMenu();
    setActiveNavigation();

    // Optional enhancements
    initTypingEffect();

    // Hide loading screen
    hideLoading();

    console.log('🚀 Parvez\'s Portfolio loaded successfully!');
});

// Window load event for additional setup
window.addEventListener('load', () => {
    // Any additional setup after all resources are loaded
    console.log('✅ All resources loaded');
});

// Export functions for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        copyEmail,
        validateForm,
        isValidEmail
    };
}