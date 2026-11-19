// 1. Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('nav');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark'); // Changes hamburger to 'X'
        navbar.classList.toggle('active');
    };
}

// 2. Active Link Highlighting based on current page
const currentLocation = location.href;
const menuItem = document.querySelectorAll('nav a');
const menuLength = menuItem.length;

for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].className = "active";
    }
}

// 3. Scroll Reveal Animation using Intersection Observer
const observerOptions = {
    threshold: 0.2 // Trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            
            // Special animation for skill bars when they come into view
            const progressLines = entry.target.querySelectorAll('.progress-line span');
            progressLines.forEach(line => {
                // Force a reflow to ensure animation plays
                const width = line.style.width;
                line.style.width = '0';
                setTimeout(() => {
                    line.style.width = width;
                }, 100);
            });
            
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Target all elements with the 'reveal-on-scroll' class
const revealElements = document.querySelectorAll('.reveal-on-scroll');
revealElements.forEach(el => observer.observe(el));