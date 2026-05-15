// ==========================================
// PORTFOLIO - NEON MODERN THEME
// JavaScript Functionality
// ==========================================

// ==========================================
// Mobile Navigation Toggle
// ==========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==========================================
// Create Animated Stars
// ==========================================

function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = window.innerWidth > 768 ? 100 : 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Initialize stars when page loads
document.addEventListener('DOMContentLoaded', createStars);

// Recreate stars on window resize
window.addEventListener('resize', () => {
    const starsContainer = document.querySelector('.stars');
    starsContainer.innerHTML = '';
    createStars();
});

// ==========================================
// Navbar Background on Scroll
// ==========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 240, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)';
    }
});

// ==========================================
// Intersection Observer for Animations
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation to elements
document.querySelectorAll('.project-card, .skill-category, .stat-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// ==========================================
// Form Validation and Submission
// ==========================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[placeholder="Nama Anda"]').value;
        const email = contactForm.querySelector('input[placeholder="Email Anda"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            showNotification('Mohon lengkapi semua field!', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Email tidak valid!', 'error');
            return;
        }

        // Simulate sending (you can replace with actual backend call)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Pesan terkirim! Terima kasih telah menghubungi saya.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'rgba(6, 255, 165, 0.9)' : 'rgba(255, 1, 110, 0.9)'};
        color: ${type === 'success' ? '#000' : '#fff'};
        border-radius: 8px;
        box-shadow: 0 0 20px ${type === 'success' ? 'rgba(6, 255, 165, 0.5)' : 'rgba(255, 1, 110, 0.5)'};
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// Progress Bar Animation
// ==========================================

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'progress-fill 1s ease-out forwards';
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
}

document.addEventListener('DOMContentLoaded', animateProgressBars);

// ==========================================
// Smooth Scroll Behavior
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// Glow Effect on Mouse Move
// ==========================================

const heroSection = document.querySelector('.hero');

if (heroSection) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        heroSection.style.setProperty('--mouse-x', x);
        heroSection.style.setProperty('--mouse-y', y);
    });
}

// ==========================================
// Active Navigation Link Highlighting
// ==========================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#00f0ff';
            link.style.textShadow = '0 0 10px rgba(0, 240, 255, 0.8)';
        } else {
            link.style.color = '';
            link.style.textShadow = '';
        }
    });
});

// ==========================================
// Parallax Effect for Hero
// ==========================================

window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPos * 0.5}px)`;
        heroContent.style.opacity = `${1 - scrollPos / 500}`;
    }
});

// ==========================================
// Add Click Animation to Buttons
// ==========================================

document.querySelectorAll('.btn, .project-link').forEach(button => {
    button.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            return; // Skip for navigation links
        }

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            width: 100px;
            height: 100px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ==========================================
// Initialize on Page Load
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🚀');

    // Add a small delay to trigger animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// Keyboard Navigation
// ==========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==========================================
// Performance: Lazy Load Images
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Accessibility: Focus Management
// ==========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ==========================================
// Analytics: Track Scroll Depth
// ==========================================

let maxScrollDepth = 0;

window.addEventListener('scroll', () => {
    const scrollDepth = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        // You can send this data to analytics service
    }
});
