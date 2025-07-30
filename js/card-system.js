// Card System Management
class CardSystem {
    constructor() {
        this.cards = document.querySelectorAll('.card1');
        this.initializeCards();
        this.setupEventListeners();
        this.cardData['first-img']

    }
    
    initializeCards() {
        this.cards.forEach((card, index) => {
            const cardId = card.dataset.cardId || `card-${index}`;
            this.loadCardState(card, cardId);
            this.setupCardInteractions(card, cardId);
        });
        this.cardData['first-img']

    }

    loadCardState(card, cardId) {
        // Load likes
        const likeCount = parseInt(localStorage.getItem(`${cardId}-likes`)) || 0;
        const isLiked = localStorage.getItem(`${cardId}-liked`) === 'true';
        const likeElement = card.querySelector('.love1');
        
        if (likeElement) {
            const likeNumber = likeElement.querySelector('.like-number');
            const likeIcon = likeElement.querySelector('i');
            
            if (likeNumber) likeNumber.textContent = likeCount;
            if (isLiked && likeIcon) {
                likeIcon.classList.replace('fa-regular', 'fa-solid');
                likeIcon.classList.add('liked');
            }
            this.cardData['first-img']

        }

        // Load comments
        const commentCount = parseInt(localStorage.getItem(`${cardId}-comments`)) || 0;
        const commentElement = card.querySelector('.commit2 .like-number');
        if (commentElement) commentElement.textContent = commentCount;
    }

    setupCardInteractions(card, cardId) {
        // Like functionality
        const likeButton = card.querySelector('.love1');
        if (likeButton) {
            likeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleLike(cardId, likeButton);
            });
        }

        // Share functionality
        const shareButton = card.querySelector('.share-btn');
        if (shareButton) {
            shareButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleShare(card);
            });
        }

        // Card click
        card.addEventListener('click', () => {
            this.handleCardClick(card);
        });
    }

    handleLike(cardId, likeButton) {
        const icon = likeButton.querySelector('i');
        const counter = likeButton.querySelector('.like-number');
        const isLiked = icon.classList.contains('fa-solid');
        const currentCount = parseInt(counter.textContent);

        if (!isLiked) {
            icon.classList.replace('fa-regular', 'fa-solid');
            icon.classList.add('liked');
            counter.textContent = currentCount + 1;
            localStorage.setItem(`${cardId}-likes`, currentCount + 1);
            localStorage.setItem(`${cardId}-liked`, 'true');
        } else {
            icon.classList.replace('fa-solid', 'fa-regular');
            icon.classList.remove('liked');
            counter.textContent = Math.max(0, currentCount - 1);
            localStorage.setItem(`${cardId}-likes`, Math.max(0, currentCount - 1));
            localStorage.setItem(`${cardId}-liked`, 'false');
        }
    }

    async handleShare(card) {
        const title = card.querySelector('.text-sub h4').textContent;
        const description = card.querySelector('.text-sub p').textContent;
        const url = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: title,
                    text: description,
                    url: url
                });
            } else {
                await navigator.clipboard.writeText(url);
                this.showToast('Link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    }

    handleCardClick(card) {
        const cardData = {
            title: card.querySelector('.text-sub h4').textContent,
            description: card.querySelector('.text-sub p').textContent,
            image: card.querySelector('img').src,
            author: card.querySelector('.name2 h6').textContent,
            likes: card.querySelector('.love1 .like-number').textContent,
            comments: card.querySelector('.commit2 .like-number').textContent,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('selectedCard', JSON.stringify(cardData));
        window.location.href = 'meaven.html';
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
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
}

// Initialize the card system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CardSystem();
});
