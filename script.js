// ShipSight - Interactive JavaScript

// DOM ready function
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initMobileMenu();
    initTypingEffect();
    initParallaxEffect();
    initFAQAccordion();
    initContactForm();
    initCompanyLogos();
    initActiveNavigation();
    initMarketplaceAnimations();
    initVMSAnimations();
});

// Enhanced navigation with hover animations
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Enhanced hover animations for nav links (excluding dropdown toggles)
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.textShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
            }
        });

        link.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.textShadow = 'none';
            }
        });

        // Ripple effect on click
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('dropdown-toggle')) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(59, 130, 246, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    z-index: 0;
                `;

                this.style.position = 'relative';
                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation for grid items
                if (entry.target.parentElement.classList.contains('grid')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }

                entry.target.classList.add('animated');

                // Add special effects for certain elements
                if (entry.target.classList.contains('hero-content')) {
                    entry.target.classList.add('float-animation');
                }

                if (entry.target.classList.contains('btn-primary')) {
                    entry.target.classList.add('glow-effect');
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Enhanced mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Handle mobile dropdown toggles
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();

                    const dropdown = toggle.parentElement.querySelector('.dropdown-menu');
                    const isActive = dropdown.classList.contains('active');

                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                        menu.classList.remove('active');
                    });

                    // Toggle current dropdown
                    if (!isActive) {
                        dropdown.classList.add('active');
                    }
                }
            });
        });

        // Close menu when clicking on non-dropdown links
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && !e.target.classList.contains('dropdown-toggle')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    body.style.overflow = '';
                }
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.has-dropdown')) {
                document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        });
    }

    // Handle desktop dropdowns
    initDesktopDropdowns();
}

// Typing effect for hero section
function initTypingEffect() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    const texts = [
        'Secure Every Order',
        'Prevent Return Fraud',
        'Smart Video Proof',
        'Barcode-Linked Recording'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }
        
        setTimeout(typeWriter, speed);
    }
    
    typeWriter();
}

// Parallax scrolling effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            this.reset();
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-green)' : 'var(--accent-blue)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: var(--transition);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility functions
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

// Counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Initialize counters when in view
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Call initCounters when DOM is ready
document.addEventListener('DOMContentLoaded', initCounters);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Call lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Company logos animation
function initCompanyLogos() {
    const companyLogos = document.querySelectorAll('.company-logo');

    companyLogos.forEach((logo, index) => {
        // Staggered animation on load
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';

        setTimeout(() => {
            logo.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, index * 100);

        // Enhanced hover effect
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1) rotate(2deg)';
            this.style.filter = 'brightness(1.2)';

            // Glow effect
            const logoIcon = this.querySelector('.logo-icon');
            logoIcon.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.2)';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';

            const logoIcon = this.querySelector('.logo-icon');
            logoIcon.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        });

        // Click animation
        logo.addEventListener('click', function() {
            this.style.transform = 'translateY(-4px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.1) rotate(2deg)';
            }, 150);
        });
    });
}

// Desktop dropdown functionality
function initDesktopDropdowns() {
    const dropdownItems = document.querySelectorAll('.has-dropdown');

    dropdownItems.forEach(item => {
        let timeoutId;

        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                clearTimeout(timeoutId);
                const dropdown = item.querySelector('.dropdown-menu');
                dropdown.style.pointerEvents = 'all';
            }
        });

        item.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                timeoutId = setTimeout(() => {
                    const dropdown = item.querySelector('.dropdown-menu');
                    dropdown.style.pointerEvents = 'none';
                }, 100);
            }
        });
    });
}

// Mark active navigation item
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Window resize handler for responsive behavior
window.addEventListener('resize', debounce(() => {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        body.style.overflow = '';

        // Close all mobile dropdowns
        document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }
}, 250));

// Enhanced marketplace showcase animations
function initMarketplaceAnimations() {
    const marketplaceBoxes = document.querySelectorAll('.floating-marketplace-box');
    const marketplaceSection = document.querySelector('.marketplace-showcase-section');

    if (!marketplaceSection) return;

    // Enhanced intersection observer for marketplace section
    const marketplaceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger sequential animation for marketplace boxes
                marketplaceBoxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'scale(1) translateY(0)';
                        box.classList.add('animate-in');

                        // Add dynamic entry animation
                        box.style.animation = `
                            marketplaceEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                            dynamicFloat ${box.style.getPropertyValue('--duration') || '8s'} ease-in-out infinite,
                            marketplaceShimmer ${parseFloat(box.style.getPropertyValue('--duration') || '8') * 0.7}s ease-in-out infinite,
                            marketplaceBreathe ${parseFloat(box.style.getPropertyValue('--duration') || '8') * 1.3}s ease-in-out infinite
                        `;
                        box.style.animationDelay = `
                            0s,
                            ${box.style.getPropertyValue('--delay') || '0s'},
                            ${box.style.getPropertyValue('--delay') || '0s'},
                            ${box.style.getPropertyValue('--delay') || '0s'}
                        `;
                    }, index * 150);
                });

                // Add stats animation
                const stats = document.querySelectorAll('.marketplace-stats .stat-number');
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        animateMarketplaceCounter(stat);
                    }, 1200 + (index * 300));
                });
            }
        });
    }, { threshold: 0.2 });

    marketplaceObserver.observe(marketplaceSection);

    // Enhanced interactive hover effects for marketplace boxes
    marketplaceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.15) rotate(2deg)';
            this.style.zIndex = '30';
            this.style.boxShadow = `
                0 25px 50px rgba(79, 70, 229, 0.4),
                0 15px 30px rgba(139, 92, 246, 0.3),
                0 0 20px rgba(139, 92, 246, 0.2)
            `;
            this.style.borderColor = 'rgba(139, 92, 246, 0.8)';

            // Add dynamic pulse effect
            this.style.animation = 'marketplaceHoverPulse 0.6s ease-out';
        });

        box.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';

            // Resume normal animations
            this.style.animation = `
                dynamicFloat ${this.style.getPropertyValue('--duration') || '8s'} ease-in-out infinite,
                marketplaceShimmer ${parseFloat(this.style.getPropertyValue('--duration') || '8') * 0.7}s ease-in-out infinite,
                marketplaceBreathe ${parseFloat(this.style.getPropertyValue('--duration') || '8') * 1.3}s ease-in-out infinite
            `;
            this.style.animationDelay = `
                ${this.style.getPropertyValue('--delay') || '0s'},
                ${this.style.getPropertyValue('--delay') || '0s'},
                ${this.style.getPropertyValue('--delay') || '0s'}
            `;
        });
    });
}

// Enhanced VMS section animations
function initVMSAnimations() {
    const vmsElements = document.querySelectorAll('.fade-up-animation, .slide-up-animation, .scale-up-animation');

    const vmsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    vmsElements.forEach(element => {
        vmsObserver.observe(element);
    });

    // Marketplace list items staggered animation
    const marketplaceItems = document.querySelectorAll('.marketplace-item');
    marketplaceItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 12px 25px rgba(139, 92, 246, 0.3)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
            this.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.2)';
        });
    });

    // VMS benefit cards enhanced interaction
    const benefitCards = document.querySelectorAll('.vms-benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced counter animation function for marketplace stats
function animateMarketplaceCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Preserve the "+" sign for numbers like "17+"
        const originalText = element.textContent;
        const hasPlus = originalText.includes('+');
        const hasPercent = originalText.includes('%');

        if (hasPlus) {
            element.textContent = Math.floor(current) + '+';
        } else if (hasPercent) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}
