// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.querySelector('.contact-submit');
    const toast = document.getElementById('toastMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Disable submit button while processing
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Get form data
            const formData = new FormData(contactForm);
            
            // Send form using FormSubmit service
            fetch('https://formsubmit.co/ajax/frankgodwin796@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(response => response.json())
            .then(data => {
                showToast('Message sent successfully! Thank you.');
                contactForm.reset();
            })
            .catch(error => {
                showToast('Oops! Something went wrong. Please try again.');
                console.error('Form submission error:', error);
            })
            .finally(() => {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
        });
    }
});

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
