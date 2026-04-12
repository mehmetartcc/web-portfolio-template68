// Toggle Mobile Menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
}

// Scroll to Top Button
window.addEventListener('scroll', () => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Form Submit
function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate
    if (!name || !email || !message) {
        alert('Lütfen tüm gerekli alanları doldurun!');
        return;
    }

    // Show success message
    alert(`Teşekkür ederiz ${name}! Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.`);

    // Reset form
    event.target.reset();
}

// Set active nav link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
