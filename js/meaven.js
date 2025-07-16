
class MavenPageManager {
    constructor() {
        this.MAX_CHARS = 2000;
        this.initializeComponents();
        this.setupEventListeners();
    }

    initializeComponents() {
        const urlParams = new URLSearchParams(window.location.search);
        this.cardData = this.getCardData(urlParams);
        this.showLoadingState();
        this.updatePageContent();
        this.initializeTooltips();
        this.setupCommentSystem();
        this.hideLoadingState();
    }

    getCardData(urlParams) {
        try {
            const storedData = localStorage.getItem('selectedCard');
            if (storedData) {
                return JSON.parse(storedData);
            }
            return {
                title: urlParams.get('title') || 'Untitled Project',
                description: urlParams.get('desc') || '',
                image: urlParams.get('img') || './assist/default-project.png'
            };
        } catch (e) {
            console.warn('Error parsing card data:', e);
            return null;
        }
    }

    showLoadingState() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(loader);
    }

    hideLoadingState() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 500);
        }
    }

    updatePageContent() {
        if (!this.cardData) return;

        // Update title and description
        const elements = {
            'card-title': this.cardData.title,
            'card-description': this.cardData.description
        };

        for (const [id, content] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = content;
                element.classList.add('fade-in');
            }
        }

        // Update breadcrumb
        const mavenSpan = document.querySelector('.maeven span');
        if (mavenSpan) {
            mavenSpan.textContent = this.cardData.title;
        }

        // Update images
        const powerBiImage = document.querySelector('.powerpoint img');
        if (powerBiImage && this.cardData.image) {
            powerBiImage.src = this.cardData.image;
            powerBiImage.alt = this.cardData.title;
            this.setupImageLoadingEffect(powerBiImage);
        }
    }

    setupImageLoadingEffect(img) {
        img.style.opacity = '0';
        img.onload = () => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
        };
    }

    initializeTooltips() {
        if (typeof $ !== 'undefined') {
            $('[data-toggle="tooltip"]').tooltip();
        }
    }

    setupCommentSystem() {
        const textarea = document.querySelector('.comment1 textarea');
        const charCounter = document.querySelector('.comment1 p');
        
        if (textarea && charCounter) {
            this.setupCharacterCounter(textarea, charCounter);
            this.setupAutoResize(textarea);
            this.setupCommentSubmission(textarea);
        }
    }

    setupCharacterCounter(textarea, counter) {
        counter.textContent = `${this.MAX_CHARS} characters remaining`;
        
        textarea.addEventListener('input', () => {
            const remaining = this.MAX_CHARS - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            counter.style.color = remaining < 100 ? '#ff4444' : 'gray';
            
            if (textarea.value.length > this.MAX_CHARS) {
                textarea.value = textarea.value.substring(0, this.MAX_CHARS);
            }
        });
    }

    setupAutoResize(textarea) {
        textarea.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        });
    }

    setupCommentSubmission(textarea) {
        const submitBtn = document.querySelector('.comment1 button');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCommentSubmission(textarea.value);
                textarea.value = '';
                textarea.style.height = 'auto';
            });
        }
    }

    async handleCommentSubmission(comment) {
        if (!comment.trim()) return;

        try {
            // Simulate API call - Replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.showToast('Comment posted successfully!');
            
            // Update comment count
            const commentCount = document.querySelector('.commit2 .like-number');
            if (commentCount) {
                const currentCount = parseInt(commentCount.textContent) || 0;
                commentCount.textContent = currentCount + 1;
            }
        } catch (error) {
            this.showToast('Failed to post comment. Please try again.', 'error');
        }
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-message ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        }, 100);
    }

    setupEventListeners() {
        // Handle back navigation
        document.querySelector('.maeven a')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.back();
        });

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            localStorage.removeItem('selectedCard');
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MavenPageManager();
});