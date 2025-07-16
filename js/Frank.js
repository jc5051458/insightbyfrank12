document.addEventListener('DOMContentLoaded', function() {
    // --- Constants and Cached Elements ---
    const MAX_LIKES = 9999;
    const ANIMATION_DURATION = 300;
    
    // --- Card Management ---
    const cards = document.querySelectorAll('.card1');
    const likeButtons = document.querySelectorAll('.love1');
    const commentButtons = document.querySelectorAll('.commit2');

    // Initialize card interactions
    function initializeCards() {
        cards.forEach((card, index) => {
            // Load saved likes/comments from localStorage
            const cardId = `card-${index}`;
            const likes = parseInt(localStorage.getItem(`${cardId}-likes`)) || 0;
            const comments = parseInt(localStorage.getItem(`${cardId}-comments`)) || 0;

            // Update display
            const likeCount = card.querySelector('.love1 .like-number');
            const commentCount = card.querySelector('.commit2 .like-number');
            if (likeCount) likeCount.textContent = likes;
            if (commentCount) commentCount.textContent = comments;

            // Add click handler
            card.addEventListener('click', function(e) {
                // Don't navigate if clicking like/comment buttons
                if (e.target.closest('.love1') || e.target.closest('.commit2')) {
                    return;
                }
                
                const title = card.querySelector('.text-sub h4').textContent;
                const description = card.querySelector('.text-sub p').textContent;
                const image = card.querySelector('img').src;
                
                saveCardDetails(title, description, image);
                window.location.href = 'meaven.html';
            });
        });
    }

    // Save card details for detail page
    function saveCardDetails(title, description, image) {
        const cardData = {
            title: title,
            description: description,
            image: image,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('selectedCard', JSON.stringify(cardData));
    }

    // --- Like & Comment System ---
    function initializeLikeSystem() {
        likeButtons.forEach((button, index) => {
            const cardId = `card-${index}`;
            const likeCount = button.querySelector('.like-number');
            const icon = button.querySelector('i');

            // Check if already liked
            const isLiked = localStorage.getItem(`${cardId}-liked`) === 'true';
            if (isLiked) {
                icon.classList.replace('fa-regular', 'fa-solid');
            }

            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const currentLikes = parseInt(likeCount.textContent);
                const isCurrentlyLiked = icon.classList.contains('fa-solid');

                if (!isCurrentlyLiked && currentLikes < MAX_LIKES) {
                    // Like animation
                    icon.classList.add('animate-like');
                    icon.classList.replace('fa-regular', 'fa-solid');
                    likeCount.textContent = currentLikes + 1;
                    localStorage.setItem(`${cardId}-likes`, currentLikes + 1);
                    localStorage.setItem(`${cardId}-liked`, 'true');
                } else {
                    // Unlike
                    icon.classList.remove('animate-like');
                    icon.classList.replace('fa-solid', 'fa-regular');
                    likeCount.textContent = Math.max(0, currentLikes - 1);
                    localStorage.setItem(`${cardId}-likes`, Math.max(0, currentLikes - 1));
                    localStorage.setItem(`${cardId}-liked`, 'false');
                }

                // Remove animation class after animation completes
                setTimeout(() => {
                    icon.classList.remove('animate-like');
                }, ANIMATION_DURATION);
            });
        });
    }

    // --- Comment System ---
    function initializeCommentSystem() {
        commentButtons.forEach((button, index) => {
            const cardId = `card-${index}`;
            const commentCount = button.querySelector('.like-number');

            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Scroll to comment section if on detail page
                const commentSection = document.querySelector('.comment1');
                if (commentSection) {
                    commentSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // --- Share Button ---
    const shareButtons = document.querySelectorAll('button:has(i.fa-share)');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = window.location.href;
            
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: url
                }).catch(console.error);
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(url)
                    .then(() => {
                        const originalText = button.textContent;
                        button.textContent = 'Copied!';
                        setTimeout(() => {
                            button.textContent = originalText;
                        }, 2000);
                    })
                    .catch(console.error);
            }
        });
    });

    // --- Navigation Dropdown ---
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-menu').classList.add('show');
        });
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-menu').classList.remove('show');
        });
    });

    // --- Initialize Everything ---
    initializeCards();
    initializeLikeSystem();
    initializeCommentSystem();

    // Add smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Newsletter Form ---
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Add your newsletter subscription logic here
            console.log('Newsletter subscription:', email);
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Thank you for subscribing!';
            successMessage.style.color = 'green';
            this.appendChild(successMessage);
        });
    }

    // Add CSS class for animations when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    });

    // Observe elements that should animate on scroll
    document.querySelectorAll('.card1, .powerpoint, .about, .additional')
        .forEach(el => observer.observe(el));
});