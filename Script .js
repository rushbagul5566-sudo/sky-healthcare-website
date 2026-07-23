document.addEventListener('DOMContentLoaded', () => {

    // 1. Remove Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500); // Small delay for visual effect
    });

    // 2. Set Current Year in Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 3. Header Scroll Effect & Back to Top Button
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopBtn.classList.add('visible');
            backToTopBtn.classList.remove('hidden');
        } else {
            header.classList.remove('scrolled');
            backToTopBtn.classList.remove('visible');
            backToTopBtn.classList.add('hidden');
        }
    });

    // Back to top click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Ensure hamburger icon color is visible on white background when menu is open
        if(navMenu.classList.contains('active')) {
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.style.backgroundColor = '#03045E');
        } else if(window.scrollY <= 50) {
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.style.backgroundColor = '#FFFFFF');
        }
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 5. Scroll Animations (Intersection Observer)
    const animateElements = document.querySelectorAll('.fade-up, .slide-left, .slide-right');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animateElements.forEach(el => scrollObserver.observe(el));

    // 6. Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const countUp = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    const statsSection = document.querySelector('.stats-container');
    
    if(statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                countUp();
                counted = true;
            }
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    } else {
        // Fallback if stats container isn't in view
        countUp();
    }

    // 7. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 8. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get values
            const name = document.getElementById('name').value;
            const btn = contactForm.querySelector('button[type="submit"]');
            
            // Simulate sending
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Request Sent';
                btn.classList.remove('btn-primary');
                btn.style.backgroundColor = '#25D366'; // Success color
                
                // Reset form
                contactForm.reset();
                
                // Revert button after 3s
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.classList.add('btn-primary');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
