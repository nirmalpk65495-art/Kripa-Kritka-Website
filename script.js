// Navigation functionality
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Enhanced mobile menu toggle
navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Toggle via keyboard for accessibility
navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navToggle.click();
    }
});

// Close mobile menu when clicking on a link or outside
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links - Fixed to prevent going back
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Use scrollTo for more reliable behavior
            const targetPosition = target.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});



// Fixed 3D Hero Parallax Effect - No Blur on Scroll Up
document.addEventListener("DOMContentLoaded", () => {
    const heroContent = document.querySelector('.hero-content');
    const heroVideo = document.querySelector('.hero-video');
    const heroSection = document.querySelector('#home');
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroContent && heroVideo && heroSection && heroTitle) {
        let ticking = false;
        let lastScrollY = 0;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            // Only apply minimal parallax when hero is in view and scrolling down
            if (scrolled < heroHeight && scrolled > lastScrollY) {
                const parallaxSpeed = 0.1; // Very minimal speed
                
                // Only move video, keep text content stable
                heroVideo.style.transform = `translateY(${scrolled * 0.1}px)`;
                
                // Keep hero content completely stable to prevent blur
                heroContent.style.transform = 'translateZ(0)';
                heroTitle.style.transform = 'translateZ(0)';
            } else {
                // Reset all transforms when scrolling up or out of view
                heroContent.style.transform = 'translateZ(0)';
                heroVideo.style.transform = 'translateY(0)';
                heroTitle.style.transform = 'translateZ(0)';
            }
            
            lastScrollY = scrolled;
            ticking = false;
        }
        
        function requestParallaxTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener("scroll", requestParallaxTick, { passive: true });
        
        // Ensure hero content is always crisp on page load
        heroContent.style.transform = 'translateZ(0)';
        heroTitle.style.transform = 'translateZ(0)';
    }
});

// Enhanced Intersection Observer for 3D animations
const observerOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for animation (only those marked with animate classes)
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate, .animate-3d, .animate-left-3d, .animate-right-3d, .animate-scale-3d, .animate-rotate-3d');
    animatedElements.forEach(el => {
        // Let CSS control initial hidden state; only observe
        observer.observe(el);
    });
    
    // Debug: Log services section elements
    const servicesElements = document.querySelectorAll('#services .animate-3d, #services .animate-left-3d, #services .animate-right-3d, #services .animate-scale-3d, #services .animate-rotate-3d');
    console.log('Services animation elements found:', servicesElements.length);
    
    // Ensure services section animations work
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
        const servicesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animatedElements = entry.target.querySelectorAll('.animate-3d, .animate-left-3d, .animate-right-3d, .animate-scale-3d, .animate-rotate-3d');
                    animatedElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('active');
                        }, index * 100); // Stagger animations
                    });
                }
            });
        }, { threshold: 0.2 });
        
        servicesObserver.observe(servicesSection);
    }
});

// Hero video controls
const heroVideo = document.querySelector('.hero-video video');
if (heroVideo) {
    heroVideo.addEventListener('loadeddata', () => {
        console.log('Hero video loaded');
    });
    
    heroVideo.addEventListener('error', (e) => {
        console.error('Hero video error:', e);
    });
}

// About section video controls
const aboutVideo = document.querySelector('.video-container-enhanced video');
const playBtn = document.querySelector('.play-button');
const videoOverlay = document.querySelector('.video-overlay');

if (aboutVideo && playBtn && videoOverlay) {
    let isPlaying = false;
    
    // Ensure video is ready
    aboutVideo.addEventListener('loadeddata', () => {
        console.log('Studio video loaded successfully');
        playBtn.style.pointerEvents = 'auto';
    });
    
    // Handle video errors
    aboutVideo.addEventListener('error', (e) => {
        console.error('Studio video error:', e);
        playBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        playBtn.style.background = '#ef4444';
    });
    
    // Play button click handler
    playBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
            if (isPlaying) {
                aboutVideo.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            } else {
                aboutVideo.play().then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    isPlaying = true;
                }).catch(error => {
                    console.error('Error playing video:', error);
                    playBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
                });
            }
        } catch (error) {
            console.error('Video control error:', error);
        }
    });
    
    // Video event listeners
    aboutVideo.addEventListener('play', () => {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        videoOverlay.style.opacity = '0';
    });
    
    aboutVideo.addEventListener('pause', () => {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    aboutVideo.addEventListener('ended', () => {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        videoOverlay.style.opacity = '1';
    });
    
    // Show/hide overlay on hover
    const videoContainer = document.querySelector('.video-container-enhanced');
    if (videoContainer) {
        videoContainer.addEventListener('mouseenter', () => {
            if (!isPlaying) {
                videoOverlay.style.opacity = '1';
            }
        });
        
        videoContainer.addEventListener('mouseleave', () => {
            if (!isPlaying) {
                videoOverlay.style.opacity = '0';
            }
        });
    }
    
    // Make sure play button is initially visible
    playBtn.style.pointerEvents = 'auto';
    videoOverlay.style.opacity = '1';
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.firstName || !data.lastName || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Service cards hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Team cards hover effects
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateY(5deg)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0deg)';
        card.style.boxShadow = 'none';
    });
});

// Stats cards animation
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Contact cards hover effects
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Social media links hover effects
document.querySelectorAll('.team-social a, .footer-social a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.2) rotate(5deg)';
        link.style.background = '#d4af37';
        link.style.color = '#000';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1) rotate(0deg)';
        link.style.background = 'rgba(255, 255, 255, 0.1)';
        link.style.color = '#ffffff';
    });
});

// Respect reduced motion: limit JS-driven hover transforms
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
}

// Service icon rotation on hover
if (!prefersReducedMotion) {
    document.querySelectorAll('.service-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotate(360deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotate(0deg)';
        });
    });
}

// Hero indicators functionality
const indicators = document.querySelectorAll('.indicator');
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        // Remove active class from all indicators
        indicators.forEach(ind => ind.classList.remove('active'));
        // Add active class to clicked indicator
        indicator.classList.add('active');
        
        // Here you could add logic to change hero content based on indicator
        console.log(`Switched to slide ${index + 1}`);
    });
});

// Scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    setInterval(() => {
        scrollIndicator.style.transform = 'translateY(0)';
        setTimeout(() => {
            scrollIndicator.style.transform = 'translateY(-10px)';
        }, 1000);
    }, 2000);
}

// Form input focus effects
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#d4af37';
        input.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    input.addEventListener('blur', () => {
        input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        input.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// Video error handling
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        // Hide video and show fallback content
        video.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.innerHTML = `
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); display: flex; align-items: center; justify-content: center; color: #d4af37; font-size: 1.2rem;">
                <div style="text-align: center;">
                    <i class="fas fa-video" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Video unavailable</p>
                </div>
            </div>
        `;
        video.parentNode.appendChild(fallback);
    });
    
    video.addEventListener('loadstart', () => {
        console.log('Video loading started');
    });
    
    video.addEventListener('canplay', () => {
        console.log('Video can play');
    });
});

// Lazy loading for images
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

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // Trigger initial animations
    document.querySelectorAll('.hero-content > *').forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Equipment section functionality
const equipmentCategories = document.querySelectorAll('.equipment-categories .category-btn');
const equipmentCards = document.querySelectorAll('.equipment-card');

equipmentCategories.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        equipmentCategories.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Filter equipment cards
        equipmentCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Projects section functionality
const projectCategories = document.querySelectorAll('.project-categories .category-btn');
const projectCards = document.querySelectorAll('.project-card');

projectCategories.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        projectCategories.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Filter project cards
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Apply default projects filter on page load (use the active button or first one)
document.addEventListener('DOMContentLoaded', () => {
    const categoriesBar = document.querySelector('.project-categories');
    const projectsGrid = document.getElementById('all-projects-grid');
    if (categoriesBar && projectsGrid) {
        const activeBtn = categoriesBar.querySelector('.category-btn.active');
        const btnToClick = activeBtn || categoriesBar.querySelector('.category-btn');
        if (btnToClick) {
            btnToClick.click();
        }
    }
});

// Equipment card hover effects
document.querySelectorAll('.equipment-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateY(5deg)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0deg)';
        card.style.boxShadow = 'none';
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Equipment stats hover effects
document.querySelectorAll('.stat-item').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        stat.style.transform = 'scale(1.05)';
        stat.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    
    stat.addEventListener('mouseleave', () => {
        stat.style.transform = 'scale(1)';
        stat.style.boxShadow = 'none';
    });
});

// Equipment rent buttons
document.querySelectorAll('.equipment-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const equipmentName = btn.closest('.equipment-card').querySelector('h3').textContent;
        alert(`Rental request for ${equipmentName} has been submitted!`);
    });
});

// Equipment info buttons
document.querySelectorAll('.btn-info').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const equipmentName = btn.closest('.equipment-card').querySelector('h3').textContent;
        alert(`Detailed specifications for ${equipmentName} will be sent to your email.`);
    });
});

// Project play buttons - Removed conflicting handler (replaced by optimized YouTube redirect below)

// 3D Scroll Indicator Functionality
document.addEventListener("DOMContentLoaded", () => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const sections = document.querySelectorAll('section[id]');
    
    if (scrollIndicator && scrollDots.length > 0) {
        let ticking = false;
        
        function updateScrollIndicator() {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                    scrollDots.forEach(dot => dot.classList.remove('active'));
                    if (scrollDots[index]) {
                        scrollDots[index].classList.add('active');
                    }
                }
            });
            
            ticking = false;
        }
        
        function requestScrollIndicatorTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollIndicator);
                ticking = true;
            }
        }
        
        // Scroll indicator click functionality - Fixed to prevent going back
        scrollDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const targetSection = sections[index];
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - 80; // Account for navbar height
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        window.addEventListener("scroll", requestScrollIndicatorTick, { passive: true });
        updateScrollIndicator(); // Initial call
    }
});

// Immediate loading optimization
// document.addEventListener("DOMContentLoaded", () => {
//     // Activate all visible elements immediately on load
//     const allAnimateElements = document.querySelectorAll(".animate, .animate-3d, .animate-left-3d, .animate-right-3d, .animate-scale-3d, .animate-rotate-3d");
//     
//     // Activate elements in viewport immediately
//     allAnimateElements.forEach((el) => {
//         const rect = el.getBoundingClientRect();
//         if (rect.top < window.innerHeight && rect.bottom > 0) {
//             el.classList.add("active");
//         }
//     });
//     
//     // Preload next section for smoother experience
//     setTimeout(() => {
//         allAnimateElements.forEach((el) => {
//             const rect = el.getBoundingClientRect();
//             if (rect.top < window.innerHeight * 1.5 && !el.classList.contains("active")) {
//                 el.classList.add("active");
//             }
//         });
//     }, 200);
// });

// Parallax System
class ParallaxSystem {
    constructor() {
        this.elements = [];
        this.isScrolling = false;
        this.ticking = false;
        
        this.init();
        this.bindEvents();
    }
    
    init() {
        // Hero parallax layers
        this.elements.push({
            element: document.querySelector('.parallax-bg'),
            speed: 0.1,
            offset: 0
        });
        
        this.elements.push({
            element: document.querySelector('.parallax-mid'),
            speed: 0.2,
            offset: 0
        });
        
        this.elements.push({
            element: document.querySelector('.parallax-front'),
            speed: 0.3,
            offset: 0
        });
        
        // Section parallax backgrounds using CSS custom properties
        this.elements.push({
            element: document.querySelector('.services'),
            speed: 0.15,
            offset: 0,
            property: '--parallax-y'
        });
        
        this.elements.push({
            element: document.querySelector('.about'),
            speed: 0.2,
            offset: 0,
            property: '--parallax-y'
        });
        
        this.elements.push({
            element: document.querySelector('.equipment'),
            speed: 0.18,
            offset: 0,
            property: '--parallax-y'
        });
        
        this.elements.push({
            element: document.querySelector('.projects'),
            speed: 0.22,
            offset: 0,
            property: '--parallax-y'
        });
        
        this.elements.push({
            element: document.querySelector('.contact'),
            speed: 0.16,
            offset: 0,
            property: '--parallax-y'
        });
    }
    
    bindEvents() {
        window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
        window.addEventListener('resize', this.onResize.bind(this));
    }
    
    onScroll() {
        if (!this.ticking) {
            requestAnimationFrame(this.updateParallax.bind(this));
            this.ticking = true;
        }
    }
    
    onResize() {
        this.updateParallax();
    }
    
    updateParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        this.elements.forEach((item, index) => {
            if (item.element) {
                const rect = item.element.getBoundingClientRect();
                
                // Check if element is in viewport
                if (rect.bottom >= 0 && rect.top <= windowHeight) {
                    const yPos = -(scrollY * item.speed);
                    
                    if (item.property) {
                        // Use CSS custom property for pseudo-elements
                        item.element.style.setProperty(item.property, `${yPos}px`);
                    } else {
                        // Direct transform for regular elements
                        item.element.style.transform = `translateY(${yPos}px)`;
                    }
                }
            }
        });
        
        this.ticking = false;
    }
}

// Initialize parallax system
document.addEventListener("DOMContentLoaded", () => {
    window.parallaxSystem = new ParallaxSystem();
});

console.log('Cinema Studios website with 3D effects and parallax loaded successfully!');



// Optimized 3D Scroll Animation System
document.addEventListener("DOMContentLoaded", () => {
    // Get all animation elements
    const animateElements = document.querySelectorAll(".animate, .animate-3d, .animate-left-3d, .animate-right-3d, .animate-scale-3d, .animate-rotate-3d");
    
    // Performance optimization: Use requestAnimationFrame
    let ticking = false;
    let lastScrollY = 0;
    
    function updateAnimations() {
        const triggerBottom = window.innerHeight * 0.7;
        const scrollY = window.pageYOffset;
        
        // Only update if scroll direction changed or significant scroll
        if (Math.abs(scrollY - lastScrollY) < 10) {
            ticking = false;
            return;
        }
        
        animateElements.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            const elementHeight = el.getBoundingClientRect().height;
            
            // Check if element is in viewport
            const isInView = elementTop < triggerBottom && elementTop > -elementHeight;
            
            if (isInView && !el.classList.contains("active")) {
                // Immediate activation without delay for faster loading
                el.classList.add("active");
            }
        });
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    // Throttled scroll event with reduced frequency
    let scrollTimeout;
    window.addEventListener("scroll", () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(requestTick, 16); // ~60fps
    }, { passive: true });
    
    // Initial check - activate all visible elements immediately
    setTimeout(() => {
        animateElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight * 0.8) {
                el.classList.add("active");
            }
        });
    }, 100);
});


// Scroll-triggered animation for About & Equipment sections
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".animate");

    function animateOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if(elementTop < triggerBottom) {
                el.classList.add("active");
            } else {
                el.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // initial check
});

// Animate scroll for Projects Section (works for all animate elements)
document.addEventListener("DOMContentLoaded", () => {
    const animateElements = document.querySelectorAll(".animate");

    function scrollAnimate() {
        const triggerPoint = window.innerHeight * 0.85;

        animateElements.forEach(el => {
            const top = el.getBoundingClientRect().top;

            if(top < triggerPoint) {
                el.classList.add("active");
            } else {
                el.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", scrollAnimate);
    scrollAnimate(); // initial check
});

// Project Play Button YouTube Redirect Functionality - Instant Opening
document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll('.play-btn[data-youtube]');
    
    playButtons.forEach(button => {
        // Remove any existing event listeners to prevent conflicts
        button.onclick = null;
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            const youtubeUrl = button.getAttribute('data-youtube');
            
            if (youtubeUrl) {
                // Instant redirect - absolutely no delays
                if (window.innerWidth <= 768 || 'ontouchstart' in window) {
                    // Mobile: open in same tab for fastest loading
                    window.location.href = youtubeUrl;
                } else {
                    // Desktop: open in new tab
                    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
                }
            }
            
            return false;
        }, true); // Use capture phase to ensure this runs first
        
        // Add hover effect for better UX (only on non-touch devices)
        if (!('ontouchstart' in window)) {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
                button.style.transition = 'transform 0.2s ease';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });
        }
    });
});

// (waves removed)
