// Frank.js - Organized and improved
// Wait for DOM to load before running scripts
document.addEventListener("DOMContentLoaded", function() {
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

    // --- Card Title/Description from URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const description = urlParams.get('desc');
    if (title && document.getElementById('card-title')) {
        document.getElementById('card-title').textContent = title;
    }
    if (description && document.getElementById('card-description')) {
        document.getElementById('card-description').textContent = description;
    }

    // --- Remove or comment out incomplete code ---
    // const changeTexet = getElementById(); // Removed: not used/invalid
});
