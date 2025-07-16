class FloatingNavigation {
    constructor() {
        this.scrollTopBtn = document.querySelector('.scroll-top');
        this.scrollDownBtn = document.querySelector('.scroll-down');
        this.scrollThreshold = 400; // Show buttons after scrolling this many pixels
        this.scrolling = false;
        
        this.init();
    }

    init() {
        this.handleScroll();
        this.setupEventListeners();
    }

    handleScroll() {
        window.addEventListener('scroll', () => {
            if (!this.scrolling) {
                window.requestAnimationFrame(() => {
                    this.updateButtonsVisibility();
                    this.scrolling = false;
                });
                this.scrolling = true;
            }
        });
    }

    setupEventListeners() {
        // Scroll to top button
        if (this.scrollTopBtn) {
            this.scrollTopBtn.addEventListener('click', () => {
                this.smoothScroll('top');
            });
        }

        // Scroll to bottom button
        if (this.scrollDownBtn) {
            this.scrollDownBtn.addEventListener('click', () => {
                this.smoothScroll('bottom');
            });
        }
    }

    updateButtonsVisibility() {
        const scrollPosition = window.pageYOffset;
        const pageHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        
        // Show/hide scroll top button
        if (scrollPosition > this.scrollThreshold) {
            this.scrollTopBtn?.classList.add('visible');
        } else {
            this.scrollTopBtn?.classList.remove('visible');
        }

        // Show/hide scroll down button
        if (scrollPosition + windowHeight < pageHeight - this.scrollThreshold) {
            this.scrollDownBtn?.classList.add('visible');
        } else {
            this.scrollDownBtn?.classList.remove('visible');
        }
    }

    smoothScroll(direction) {
        const start = window.pageYOffset;
        const target = direction === 'top' ? 0 : document.documentElement.scrollHeight;
        const duration = 1000; // Animation duration in ms
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeInOutCubic = progress => {
                return progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            };

            const ease = easeInOutCubic(progress);
            const currentPosition = start + (target - start) * ease;

            window.scrollTo(0, currentPosition);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FloatingNavigation();
});
