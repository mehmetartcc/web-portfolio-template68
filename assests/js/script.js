// ============================================
// 1. DARK MODE TOGGLE
// ============================================

// Dark Mode Fonksiyonu
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Local Storage'a kaydet
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
} 

// Sayfa yüklendiğinde dark mode durumunu kontrol et
document.addEventListener('DOMContentLoaded', () => {
    const darkModeStatus = localStorage.getItem('darkMode');
    if (darkModeStatus === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

// ============================================
// 2. SCROLL TO TOP BUTTON
// ============================================

// Scroll olayını dinle
window.addEventListener('scroll', () => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to Top Fonksiyonu
function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// ============================================
// 3. MOBILE MENU TOGGLE
// ============================================

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
}

// Menu linkine tıklandığında menüyü kapat
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.nav-links');
            if (menu) menu.style.display = 'none';
        });
    });
});

// ============================================
// 4. FORM SUBMIT
// ============================================

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

// ============================================
// 5. ACTIVE NAV LINK
// ============================================

function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveLink);
window.addEventListener('hashchange', updateActiveLink);

// ============================================
// 6. NEWSLETTER FORM
// ============================================

function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert(`Teşekkür ederiz! ${email} adresine newsletter gönderilecek.`);
    event.target.reset();
}

// ============================================
// 7. FILTER FUNCTIONS
// ============================================

function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'slideUp 0.6s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterBlog(category) {
    const cards = document.querySelectorAll('.blog-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'slideUp 0.6s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchBlog() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.blog-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
