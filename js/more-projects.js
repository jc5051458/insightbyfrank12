class ProjectsCarousel {
    constructor() {
        this.container = document.querySelector('.more-project');
        this.cards = Array.from(document.querySelectorAll('.card1'));
        this.prevBtn = document.querySelector('.nav-btn.prev');
        this.nextBtn = document.querySelector('.nav-btn.next');
        this.currentIndex = 0;
        this.cardWidth = 0;
        this.visibleCards = 0;

        this.init();
    }

    init() {
        this.calculateDimensions();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupCardInteractions();
        window.addEventListener('resize', () => this.calculateDimensions());
    }

    calculateDimensions() {
        if (!this.cards.length) return;
        
        this.cardWidth = this.cards[0].offsetWidth;
        this.visibleCards = Math.floor(this.container.offsetWidth / this.cardWidth);
        this.updateNavigationState();
    }

    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.navigate('prev'));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.navigate('next'));
        }

        // Touch events for mobile swipe
        let startX, moveX;
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchmove', (e) => {
            if (!startX) return;
            moveX = e.touches[0].clientX;
            const diff = moveX - startX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                this.navigate(diff > 0 ? 'prev' : 'next');
                startX = null;
            }
        });
    }

    navigate(direction) {
        const increment = direction === 'next' ? 1 : -1;
        const newIndex = this.currentIndex + increment;

        if (newIndex >= 0 && newIndex <= this.cards.length - this.visibleCards) {
            this.currentIndex = newIndex;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        const offset = -this.currentIndex * (this.cardWidth + 32); // 32px for gap
        this.container.style.transform = `translateX(${offset}px)`;
        this.updateNavigationState();
    }

    updateNavigationState() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex >= this.cards.length - this.visibleCards;
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.cards.forEach(card => observer.observe(card));
    }

    setupCardInteractions() {
        this.cards.forEach(card => {
            // Like button interaction
            const likeBtn = card.querySelector('.love1');
            if (likeBtn) {
                likeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleLike(card);
                });
            }

            // Preview button interaction
            const previewBtn = card.querySelector('.preview-btn');
            if (previewBtn) {
                previewBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handlePreview(card);
                });
            }
        });
    }

    handleLike(card) {
        const likeBtn = card.querySelector('.love1');
        const likeCount = card.querySelector('.like-number');
        const isLiked = likeBtn.classList.contains('liked');
        
        likeBtn.classList.toggle('liked');
        const currentCount = parseInt(likeCount.textContent);
        likeCount.textContent = isLiked ? currentCount - 1 : currentCount + 1;

        // Animate heart icon
        const heart = likeBtn.querySelector('i');
        heart.classList.add('animate-like');
        setTimeout(() => heart.classList.remove('animate-like'), 300);

        // Show floating heart animation
        this.createFloatingHeart(likeBtn);
    }

    createFloatingHeart(target) {
        const heart = document.createElement('i');
        heart.className = 'fa-solid fa-heart floating-heart';
        document.body.appendChild(heart);

        const rect = target.getBoundingClientRect();
        heart.style.left = `${rect.left + rect.width / 2}px`;
        heart.style.top = `${rect.top + rect.height / 2}px`;

        setTimeout(() => heart.remove(), 1000);
    }

    handlePreview(card) {
        // Add preview functionality here
        console.log('Preview card:', card.dataset.projectId);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsCarousel();
});
