document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const mobileIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between hamburger and X
        if (navLinks.classList.contains('active')) {
            mobileIcon.classList.remove('ph-list');
            mobileIcon.classList.add('ph-x');
        } else {
            mobileIcon.classList.remove('ph-x');
            mobileIcon.classList.add('ph-list');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileIcon.classList.remove('ph-x');
            mobileIcon.classList.add('ph-list');
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve if you only want the animation to happen once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });
});console.log("Sky Healthcare Website Loaded Successfully");
