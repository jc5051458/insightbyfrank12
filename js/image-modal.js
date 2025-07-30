// Image Modal Functionality
function initializeImageModal() {
    // Create modal container if it doesn't exist
    if (!document.getElementById('imageModal')) {
        const modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal" aria-label="Close image preview">×</button>
                <img id="modalImage" src="" alt="Zoomed Image">
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Get modal elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = modal.querySelector('.close-modal');

    // Function to open modal with animation
    function openModal(imageSrc) {
        modalImg.src = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add loading animation
        modalImg.style.opacity = '0';
        modalImg.onload = function() {
            modalImg.style.transition = 'opacity 0.3s ease';
            modalImg.style.opacity = '1';
        };
    }

    // Function to close modal with animation
    function closeModal() {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('active');
            modal.style.opacity = '1';
            document.body.style.overflow = '';
        }, 300);
    }

    // Add click event to first-img
    const firstImg = document.querySelector('.first-img');
    if (firstImg) {
        firstImg.addEventListener('click', function() {
            const style = window.getComputedStyle(firstImg);
            const bgImage = style.backgroundImage.slice(4, -1).replace(/"/g, "");
            openModal(bgImage);
        });
        this.cardData['first-img']

    }

    // Add click event to powerpoint image
        const powerpointImg = document.querySelector('.powerpoint img');
    if (powerpointImg) {
        powerpointImg.addEventListener('click', function() {
            openModal(this.src);
        });
    }


    // Close modal when clicking close button
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Add zoom effect to images on hover
    const projectImages = document.querySelectorAll('.first-img, .powerpoint img');
    projectImages.forEach(img => {
        img.classList.add('zoomable');
    });

    // Add touch events for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    modal.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (Math.abs(touchStartX - touchEndX) > 50) {
            closeModal();
        }
    }, false);
}

// Initialize the modal functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create modal container if it doesn't exist
    if (!document.getElementById('imageModal')) {
        const modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal" aria-label="Close image preview">×</button>
                <div class="image-wrapper">
                    <div class="image-loading"></div>
                    <img id="modalImage" src="" alt="Zoomed Image">
                    <div class="zoom-indicator">Scroll to zoom • Drag to pan</div>
                </div>
            </div>
            <div class="zoom-controls">
                <button class="zoom-out" aria-label="Zoom out">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <button class="zoom-reset" aria-label="Reset zoom">
                    <i class="fa-solid fa-rotate"></i>
                </button>
                <button class="zoom-in" aria-label="Zoom in">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = modal.querySelector('.close-modal');
    const zoomControls = modal.querySelector('.zoom-controls');
    let currentScale = 1;
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let currentPos = { x: 0, y: 0 };

    function openModal(imageSrc) {
        modal.classList.add('active');
        modalImg.style.opacity = '0';
        modalImg.src = imageSrc;
        document.body.style.overflow = 'hidden';
        resetZoom();
        
        modalImg.onload = function() {
            modal.querySelector('.image-loading').style.display = 'none';
            modalImg.style.transition = 'opacity 0.3s ease';
            modalImg.style.opacity = '1';
        };
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        resetZoom();
    }

    function resetZoom() {
        currentScale = 1;
        currentPos = { x: 0, y: 0 };
        updateTransform();
    }

    function updateTransform() {
        modalImg.style.transform = `translate(${currentPos.x}px, ${currentPos.y}px) scale(${currentScale})`;
    }

    // Zoom functionality
    modal.addEventListener('wheel', function(e) {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        const newScale = Math.min(Math.max(1, currentScale + delta), 4);
        const rect = modalImg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        currentScale = newScale;
        updateTransform();
    });

    // Dragging functionality
    modalImg.addEventListener('mousedown', function(e) {
        isDragging = true;
        modalImg.classList.add('grabbing');
        startPos = {
            x: e.clientX - currentPos.x,
            y: e.clientY - currentPos.y
        };
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        currentPos = {
            x: e.clientX - startPos.x,
            y: e.clientY - startPos.y
        };
        updateTransform();
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        modalImg.classList.remove('grabbing');
    });

    // Zoom control buttons
    modal.querySelector('.zoom-in').addEventListener('click', function() {
        currentScale = Math.min(currentScale + 0.5, 4);
        updateTransform();
    });

    modal.querySelector('.zoom-out').addEventListener('click', function() {
        currentScale = Math.max(currentScale - 0.5, 1);
        updateTransform();
    });

    modal.querySelector('.zoom-reset').addEventListener('click', resetZoom);

    // Add click events to images
    const zoomableImages = document.querySelectorAll('.first-img, .powerpoint img, .additional img');
    zoomableImages.forEach(img => {
        img.classList.add('zoomable');
        img.addEventListener('click', function() {
            const src = this.src || window.getComputedStyle(this).backgroundImage.slice(4, -1).replace(/"/g, "");
            openModal(src);
        });
    });

    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    // Prevent zoom controls from closing modal
    zoomControls.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
