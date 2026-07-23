/**
 * Sky Healthcare - Production JavaScript
 * Handles Navigation, FAQ Accordions, Stats Counting, Form Validation, and Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      
      const iconOpen = mobileToggle.querySelector('.icon-open');
      const iconClose = mobileToggle.querySelector('.icon-close');
      
      if (isOpen) {
        iconOpen.style.display = 'none';
        iconClose.style.display = 'inline-block';
      } else {
        iconOpen.style.display = 'inline-block';
        iconClose.style.display = 'none';
      }
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.querySelector('.icon-open').style.display = 'inline-block';
        mobileToggle.querySelector('.icon-close').style.display = 'none';
      });
    });
  }

  // 2. Navbar Scroll Shadow & Active Navigation Highlight
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Toggle shadow
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy for nav links
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // 3. FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const faqAnswer = faqItem.querySelector('.faq-answer');
      const isOpen = faqItem.classList.contains('active');

      // Close all accordions
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        item.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle current if was not open
      if (!isOpen) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      }
    });
  });

  // 4. Stats Number Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasCounted = false;

  const countUp = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // 2 seconds
          const increment = Math.ceil(target / (duration / 16));

          let current = 0;
          const updateCount = () => {
            current += increment;
            if (current < target) {
              counter.innerText = current;
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
        observer.disconnect();
      }
    });
  };

  const statsObserver = new IntersectionObserver(countUp, { threshold: 0.5 });
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    statsObserver.observe(statsBar);
  }

  // 5. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealOnScroll, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Contact Form Validation & Submission Handling
  const bookingForm = document.getElementById('booking-form');
  const formFeedback = document.getElementById('form-feedback');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;

      // Inputs
      const nameInput = document.getElementById('full-name');
      const phoneInput = document.getElementById('phone');
      const serviceSelect = document.getElementById('service');
      const localityInput = document.getElementById('locality');

      // Helper for setting error state
      const checkField = (input, condition) => {
        const group = input.parentElement;
        if (!condition) {
          group.classList.add('invalid');
          isValid = false;
        } else {
          group.classList.remove('invalid');
        }
      };

      // Validate
      checkField(nameInput, nameInput.value.trim().length > 2);
      
      const phoneRegex = /^[6-9]\d{9}$/; // Valid 10-digit Indian Mobile Number
      checkField(phoneInput, phoneRegex.test(phoneInput.value.trim()));

      checkField(serviceSelect, serviceSelect.value !== "");
      checkField(localityInput, localityInput.value.trim().length > 2);

      if (isValid) {
        // Show success state
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${nameInput.value.trim()}! Your request has been received. Our Pune medical coordinator will call you back within 15 minutes.`;
        
        bookingForm.reset();

        // Clear message after 6 seconds
        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 6000);
      }
    });
  }
});
