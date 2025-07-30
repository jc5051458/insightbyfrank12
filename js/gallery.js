// Gallery image configuration
const projectImages = {
    'coffee-sales': [
        './assist/coffee store .png',
        './assist/Screenshot-2025-01-26-183650.png',
        './assist/Screenshot-2025-02-02-230300.png'
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize image galleries
    initializeGallery();
    setupImageNavigation();
});

function initializeGallery() {
    const mainImage = document.querySelector('.powerpoint img');
    const additionalImages = document.querySelector('.additional img');
    
    if (!mainImage || !additionalImages) return;

    let currentImageIndex = 0;
    const images = projectImages['coffee-sales'];

    // Set initial images
    updateGalleryImages(currentImageIndex);

    // Add navigation buttons
    const galleryNav = document.createElement('div');
    galleryNav.className = 'gallery-navigation';
    galleryNav.innerHTML = `
        <button class="prev-btn" aria-label="Previous image">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div class="gallery-dots"></div>
        <button class="next-btn" aria-label="Next image">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;

    // Add dots for each image
    const dotsContainer = galleryNav.querySelector('.gallery-dots');
    images.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `View image ${index + 1}`);
        dot.addEventListener('click', () => {
            currentImageIndex = index;
            updateGalleryImages(currentImageIndex);
        });
        dotsContainer.appendChild(dot);
    });

    mainImage.parentElement.appendChild(galleryNav);

    // Add click handlers for navigation
    galleryNav.querySelector('.prev-btn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImages(currentImageIndex);
    });

    galleryNav.querySelector('.next-btn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImages(currentImageIndex);
    });
}

function updateGalleryImages(currentIndex) {
    const images = projectImages['coffee-sales'];
    const mainImage = document.querySelector('.powerpoint img');
    const additionalImage = document.querySelector('.additional img');
    const dots = document.querySelectorAll('.gallery-dots .dot');

    if (!mainImage || !additionalImage) return;

    // Update main image
    mainImage.src = images[currentIndex];
    mainImage.alt = `Coffee Sales Dashboard View ${currentIndex + 1}`;

    // Update additional image (show next image in sequence)
    const nextIndex = (currentIndex + 1) % images.length;
    additionalImage.src = images[nextIndex];
    additionalImage.alt = `Coffee Sales Dashboard View ${nextIndex + 1}`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function setupImageNavigation() {
    // Add click handlers to make images interactive
    const mainImage = document.querySelector('.powerpoint img');
    const additionalImage = document.querySelector('.additional img');

    if (mainImage) {
        mainImage.style.cursor = 'pointer';
        mainImage.addEventListener('click', function() {
            openImageViewer(this.src);
        });
    }

    if (additionalImage) {
        additionalImage.style.cursor = 'pointer';
        additionalImage.addEventListener('click', function() {
            openImageViewer(this.src);
        });
    }
}

function openImageViewer(imageSrc) {
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.innerHTML = `
        <div class="viewer-content">
            <button class="close-viewer" aria-label="Close viewer">
                <i class="fa-solid fa-times"></i>
            </button>
            <img src="${imageSrc}" alt="Enlarged view">
        </div>
    `;

    viewer.addEventListener('click', (e) => {
        if (e.target === viewer || e.target.closest('.close-viewer')) {
            viewer.remove();
        }
    });

    document.body.appendChild(viewer);
}

// Add CSS for the gallery
const style = document.createElement('style');
style.textContent = `
    .gallery-navigation {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin: 1rem 0;
    }

    .prev-btn, .next-btn {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        transition: background 0.3s;
    }

    .prev-btn:hover, .next-btn:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    .gallery-dots {
        display: flex;
        gap: 0.5rem;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: none;
        background: rgba(0, 0, 0, 0.3);
        cursor: pointer;
        padding: 0;
    }

    .dot.active {
        background: rgba(0, 0, 0, 0.8);
    }

    .image-viewer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .viewer-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }

    .viewer-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }

    .close-viewer {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    }
`;
document.head.appendChild(style);
