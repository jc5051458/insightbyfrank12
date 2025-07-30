// Performance optimization utilities

// Cache DOM elements
const cache = new Map();
const getElement = (selector) => {
    if (!cache.has(selector)) {
        cache.set(selector, document.querySelector(selector));
    }
    return cache.get(selector);
};

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizeScroll = debounce(() => {
    // Update scroll-based animations
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    scrollElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}, 10);

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Optimize image loading
function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('loading');
                    }
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Performance monitoring
function monitorPerformance() {
    const paintMetrics = performance.getEntriesByType('paint');
    const navigationMetrics = performance.getEntriesByType('navigation');
    
    console.group('Performance Metrics');
    if (paintMetrics.length > 0) {
        console.log('First Paint:', paintMetrics[0].startTime, 'ms');
        console.log('First Contentful Paint:', paintMetrics[1].startTime, 'ms');
    }
    if (navigationMetrics.length > 0) {
        console.log('DOM Content Loaded:', navigationMetrics[0].domContentLoadedEventStart, 'ms');
        console.log('Load Time:', navigationMetrics[0].loadEventStart, 'ms');
    }
    console.groupEnd();
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize performance monitoring
    monitorPerformance();
    
    // Initialize image optimization
    optimizeImages();
    
    // Add scroll listener with throttle
    window.addEventListener('scroll', throttle(() => {
        optimizeScroll();
    }, 100));
    
    // Remove preloader
    const preloader = getElement('#preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    }
});

// Export utilities for use in other files
window.perfUtils = {
    debounce,
    throttle,
    getElement,
    isElementInViewport,
    optimizeImages
};
