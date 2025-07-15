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

    // --- Remove or comment out incomplete code ---
    // const changeTexet = getElementById(); // Removed: not used/invalid
});
