// Initialize EmailJS with your user ID
(function() {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

// Handle newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.querySelector('.newsletter .email');
    const emailInput = document.querySelector('.newsletter input[type="email"]');
    const subscribeButton = document.querySelector('.newsletter button');
    const toast = document.getElementById('toastMessage');

    subscribeButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address');
            return;
        }

        // Disable button while sending
        subscribeButton.disabled = true;
        subscribeButton.textContent = 'Subscribing...';

        // Prepare template parameters
        const templateParams = {
            to_email: 'frankgodwin796@gmail.com',
            from_email: email,
            message: `New newsletter subscription request from: ${email}`
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                showToast('Thanks for subscribing!');
                emailInput.value = ''; // Clear input
            })
            .catch(function(error) {
                showToast('Oops! Something went wrong. Please try again.');
                console.error('EmailJS Error:', error);
            })
            .finally(function() {
                // Re-enable button
                subscribeButton.disabled = false;
                subscribeButton.textContent = 'Subscribe';
            });
    });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast message helper
function showToast(message) {
    const toast = document.getElementById('toastMessage');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}
