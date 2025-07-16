// Frank.js - Organized and improved
// Wait for DOM to load before running scripts
document.addEventListener("DOMContentLoaded", function() {
    // --- Card Click Handler ---
    function handleCardClick(title, description, imageUrl) {
        // Save card data to localStorage for the detail page
        localStorage.setItem('selectedCard', JSON.stringify({
            title: title,
            description: description,
            image: imageUrl
        }));
        // Redirect to detail page
        window.location.href = 'meaven.html';
    }

    // Add click listeners to all cards
    document.querySelectorAll('.card1').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.text-sub h4').textContent;
            const description = this.querySelector('.text-sub p').textContent;
            const imageUrl = this.querySelector('img').src;
            handleCardClick(title, description, imageUrl);
        });

        // Add hover effect class
        card.classList.add('clickable');
    });

    // --- Navigation Functions ---
    function goToPage(page) {
        window.location.href = page;
    }
    window.goToPage = goToPage; // Expose if needed globally

    function redirectToPage(url) {
        window.location.href = url;
    }
    window.redirectToPage = redirectToPage;

    // --- Image Carousel ---
    // Array of image URLs for each project card (replace with your actual image URLs)
    const imageSets = {
        card1: [
            "./assist/Screenshot-2025-01-26-183650.png",
            "https://via.placeholder.com/300x150?text=Image+1",
            "https://via.placeholder.com/300x150?text=Image+2"
        ],
    };

    // Function to change images for each card
    function changeImages() {
        for (let cardId in imageSets) {
            let card = document.getElementById(cardId);
            if (!card) continue;
            let img = card.querySelector("img"); // Assumes an <img> inside the card
            if (!img) continue;
            let currentIndex = imageSets[cardId].indexOf(img.src);
            if (currentIndex === -1) currentIndex = 0;
            let nextIndex = (currentIndex + 1) % imageSets[cardId].length;
            img.src = imageSets[cardId][nextIndex];
        }
    }
    setInterval(changeImages, 3000);

    // --- Like & Comment Logic ---
    const likeIcon = document.getElementById("likeIcon");
    const commentIcon = document.getElementById("commentIcon");
    const likeCountSpan = document.getElementById("likeCount");
    const commentCountSpan = document.getElementById("commentCount");

    let likeCount = parseInt(localStorage.getItem("likeCount")) || 0;
    let liked = localStorage.getItem("liked") === "true";
    let commentCount = parseInt(localStorage.getItem("commentCount")) || 0;

    // Initial display
    if (likeCountSpan) likeCountSpan.textContent = likeCount;
    if (commentCountSpan) commentCountSpan.textContent = commentCount;
    if (liked && likeIcon) {
        likeIcon.classList.add("liked");
        likeIcon.classList.replace("fa-regular", "fa-solid");
    }

    if (likeIcon) {
        likeIcon.addEventListener("click", () => {
            liked = !liked;
            if (liked) {
                likeCount++;
                likeIcon.classList.add("liked");
                likeIcon.classList.replace("fa-regular", "fa-solid");
            } else {
                likeCount = Math.max(0, likeCount - 1);
                likeIcon.classList.remove("liked");
                likeIcon.classList.replace("fa-solid", "fa-regular");
            }
            if (likeCountSpan) likeCountSpan.textContent = likeCount;
            localStorage.setItem("likeCount", likeCount);
            localStorage.setItem("liked", liked);
        });
    }

    if (commentIcon) {
        commentIcon.addEventListener("click", () => {
            commentCount++;
            if (commentCountSpan) commentCountSpan.textContent = commentCount;
            localStorage.setItem("commentCount", commentCount);
        });
    }

    // --- Load Card Details on Detail Page ---
    if (window.location.pathname.includes('meaven.html')) {
        const selectedCard = JSON.parse(localStorage.getItem('selectedCard'));
        if (selectedCard) {
            // Update page content with selected card details
            if (document.getElementById('card-title')) {
                document.getElementById('card-title').textContent = selectedCard.title;
            }
            const powerBiImage = document.querySelector('.powerpoint img');
            if (powerBiImage) {
                powerBiImage.src = selectedCard.image;
                powerBiImage.alt = selectedCard.title;
            }
            
            // Update breadcrumb
            const mavenSpan = document.querySelector('.maeven span');
            if (mavenSpan) {
                mavenSpan.textContent = selectedCard.title;
            }

            // Animate content entrance
            document.querySelectorAll('.di-profile2, .powerpoint, .about')
                .forEach(element => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        element.style.transition = 'all 0.5s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100);
                });
        }
    }

    // --- Share Button Implementation ---
    const shareButtons = document.querySelectorAll('button:has(i.fa-share)');
    shareButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            const url = window.location.href;
            const title = document.querySelector('.coffee h2')?.textContent || 'Check out this project';
            
            try {
                if (navigator.share) {
                    // Use native share if available (mobile devices)
                    await navigator.share({
                        title: title,
                        url: url
                    });
                } else {
                    // Fallback to clipboard
                    await navigator.clipboard.writeText(url);
                    
                    // Show feedback
                    const originalText = button.textContent;
                    const originalIcon = button.innerHTML;
                    button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                    
                    setTimeout(() => {
                        button.innerHTML = originalIcon;
                    }, 2000);
                }
            } catch (err) {
                console.error('Error sharing:', err);
            }
        });
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // --- Dropdown Navigation ---
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    dropdowns.forEach(dropdown => {
        // Handle hover on desktop
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', function() {
                const menu = this.querySelector('.dropdown-menu');
                menu.style.display = 'block';
                menu.style.opacity = '0';
                menu.style.transform = 'translateY(-10px)';
                
                // Trigger animation
                setTimeout(() => {
                    menu.style.transition = 'all 0.3s ease';
                    menu.style.opacity = '1';
                    menu.style.transform = 'translateY(0)';
                }, 50);
            });

            dropdown.addEventListener('mouseleave', function() {
                const menu = this.querySelector('.dropdown-menu');
                menu.style.opacity = '0';
                menu.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 300);
            });
        }

        // Handle click on mobile
        dropdown.querySelector('.dropdown-toggle').addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const menu = this.nextElementSibling;
                const isExpanded = menu.classList.contains('show');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu.show').forEach(m => {
                    if (m !== menu) m.classList.remove('show');
                });

                menu.classList.toggle('show');
                
                // Animate height
                if (!isExpanded) {
                    menu.style.height = menu.scrollHeight + 'px';
                } else {
                    menu.style.height = '0';
                }
            }
        });
    });

    // --- Newsletter Subscription ---
    const newsletterForm = document.querySelector('.newsletter .email');
    if (newsletterForm) {
        const input = newsletterForm.querySelector('input[type="email"]');
        const button = newsletterForm.querySelector('button');
        const spam = newsletterForm.querySelector('.spam p');
        
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            const email = input.value;
            
            if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                showNewsletterMessage('Please enter a valid email address', 'error');
                return;
            }

            try {
                // Simulate API call - Replace with your actual API endpoint
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                showNewsletterMessage('Thank you for subscribing!', 'success');
                input.value = '';
                
                // Store in localStorage to remember subscription
                localStorage.setItem('newsletter_subscribed', 'true');
                
            } catch (error) {
                showNewsletterMessage('Something went wrong. Please try again.', 'error');
            }
        });

        function showNewsletterMessage(message, type) {
            const messageEl = document.createElement('div');
            messageEl.textContent = message;
            messageEl.style.marginTop = '10px';
            messageEl.style.color = type === 'error' ? '#ff4444' : '#4CAF50';
            
            // Remove existing messages
            newsletterForm.querySelectorAll('.message').forEach(el => el.remove());
            
            messageEl.classList.add('message');
            spam.parentNode.insertBefore(messageEl, spam);
            
            setTimeout(() => messageEl.remove(), 3000);
        }
    }

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Elements to observe
    const animatedElements = [
        '.card1',
        '.powerpoint',
        '.about',
        '.additional',
        '.profile',
        '.comment1'
    ].flatMap(selector => Array.from(document.querySelectorAll(selector)));

    // Add initial state and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });

    // Add necessary CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
