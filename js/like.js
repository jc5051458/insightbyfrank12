document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const upd = document.querySelector('.upd');
    
    upd.addEventListener('click', function() {
        container.classList.toggle('open');
        upd.classList.toggle('active');
    });

    // Add smooth scroll to navigation links
    const navLinks = document.querySelectorAll('.project3 a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add entrance animation for profile section
    const profile = document.querySelector('.profile');
    profile.style.opacity = '0';
    profile.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        profile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        profile.style.opacity = '1';
        profile.style.transform = 'translateY(0)';
    }, 100);
});
