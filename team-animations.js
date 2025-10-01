// Modern Team Page Animations with Parallax Effects

// Parallax Effect System
class ParallaxController {
    constructor() {
        this.elements = [];
        this.ticking = false;
        this.init();
    }
    
    init() {
        // Find all parallax backgrounds
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        parallaxBgs.forEach(bg => {
            this.elements.push({
                element: bg,
                speed: 0.5
            });
        });
        
        this.bindEvents();
        this.update();
    }
    
    bindEvents() {
        window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
        window.addEventListener('resize', this.onResize.bind(this));
    }
    
    onScroll() {
        if (!this.ticking) {
            requestAnimationFrame(this.update.bind(this));
            this.ticking = true;
        }
    }
    
    onResize() {
        this.update();
    }
    
    update() {
        const scrollY = window.pageYOffset;
        
        this.elements.forEach(item => {
            if (item.element) {
                const rect = item.element.getBoundingClientRect();
                const elementTop = rect.top + scrollY;
                const elementHeight = rect.height;
                const windowHeight = window.innerHeight;
                
                // Check if element is in viewport
                if (elementTop < scrollY + windowHeight && elementTop + elementHeight > scrollY) {
                    const yPos = -(scrollY - elementTop) * item.speed;
                    item.element.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
        
        this.ticking = false;
    }
}

// Animation Controller
class AnimationController {
    constructor() {
        this.observers = [];
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupDelayedAnimations();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.dataset.delay || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animate-in');
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, options);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-slide-up');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    setupDelayedAnimations() {
        // Hero stats animation
        const heroStats = document.querySelectorAll('.hero-stats .stat-item');
        heroStats.forEach((stat, index) => {
            stat.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Team cards staggered animation
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach((card, index) => {
            card.dataset.delay = index * 200;
        });
        
        // Value items staggered animation
        const valueItems = document.querySelectorAll('.value-item');
        valueItems.forEach((item, index) => {
            item.dataset.delay = index * 200;
        });
    }
}

// Enhanced Team Card Interactions
class TeamCardController {
    constructor() {
        this.init();
    }
    
    init() {
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach(card => this.setupCard(card));
    }
    
    setupCard(card) {
        card.addEventListener('mouseenter', () => {
            this.addMouseTracking(card);
        });
        
        card.addEventListener('mouseleave', () => {
            this.removeMouseTracking(card);
            this.resetCard(card);
        });
    }
    
    addMouseTracking(card) {
        card.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }
    
    removeMouseTracking(card) {
        card.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    }
    
    handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
    
    resetCard(card) {
        card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
    }
}

// Navigation Controller
class NavigationController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.lastScrollY = 0;
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
    }
    
    setupMobileMenu() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            if (this.navbar) {
                // Add scrolled class
                if (scrollY > 50) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
                
                // Hide/show navbar on scroll
                if (scrollY > this.lastScrollY && scrollY > 200) {
                    this.navbar.style.transform = 'translateY(-100%)';
                } else {
                    this.navbar.style.transform = 'translateY(0)';
                }
            }
            
            this.lastScrollY = scrollY;
        }, { passive: true });
    }
    
    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Page Load Controller
class PageLoadController {
    constructor() {
        this.init();
    }
    
    init() {
        // Page load animation
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(30px)';
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                document.body.style.opacity = '1';
                document.body.style.transform = 'translateY(0)';
            }, 100);
        });
    }
}

// Initialize all controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxController();
    new AnimationController();
    new TeamCardController();
    new NavigationController();
    new PageLoadController();
    
    console.log('Modern team page animations initialized successfully!');
});

// CSS Animation Classes
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUpFade {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes glow {
        from {
            text-shadow: 
                0 0 20px rgba(212, 175, 55, 0.5),
                0 0 40px rgba(212, 175, 55, 0.3);
        }
        to {
            text-shadow: 
                0 0 30px rgba(212, 175, 55, 0.8),
                0 0 60px rgba(212, 175, 55, 0.5);
        }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
        }
        40% {
            transform: translateX(-50%) translateY(-10px);
        }
        60% {
            transform: translateX(-50%) translateY(-5px);
        }
    }
    
    .nav-menu.active {
        left: 0 !important;
    }
    
    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);
