// Navbar functionality
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.progressBar = document.querySelector('.scroll-progress-bar');
        this.navLinks = document.querySelectorAll('.nav-link[data-scroll]');
        this.lastScroll = 0;
        
        this.init();
    }

    init() {
        this.setupScrollListeners();
        this.setupSmoothScroll();
        this.setupMobileMenu();
    }

    setupScrollListeners() {
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
            this.updateScrollProgress();
        });
    }

    handleNavbarScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Hide/show navbar based on scroll direction
        if (currentScroll > this.lastScroll && currentScroll > 500) {
            // Scrolling down
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            this.navbar.style.transform = 'translateY(0)';
        }

        this.lastScroll = currentScroll;
    }

    updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (this.progressBar) {
            this.progressBar.style.width = scrolled + '%';
        }
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu if open
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            });
        });
    }

    setupMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler) {
            navbarToggler.addEventListener('click', () => {
                // Add fade effect to menu items
                const navItems = document.querySelectorAll('.navbar-nav .nav-item');
                navItems.forEach((item, index) => {
                    item.style.animation = 'none';
                    item.offsetHeight; // Trigger reflow
                    item.style.animation = `fadeInDown 0.5s ease forwards ${index * 0.1}s`;
                });
            });

            // Close menu on click outside
            document.addEventListener('click', (e) => {
                if (navbarCollapse.classList.contains('show') &&
                    !navbarCollapse.contains(e.target) &&
                    !navbarToggler.contains(e.target)) {
                    navbarToggler.click();
                }
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});
