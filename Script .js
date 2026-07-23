/**
 * SKY HEALTHCARE - Interactive Engine
 * Core Functionalities: Preloader, Navbar Scroll, Mobile Drawer, Counter Animation,
 * Lightbox Gallery, FAQ Accordion, Smooth Scroll, and Form Handling.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Preloader Handler ---
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 400);
  });

  // --- 2. Header & Scroll Effects ---
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- 3. Mobile Navigation Menu Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // --- 4. Counter Animation for Statistics ---
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const startCounters = () => {
    statNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 200; 
      const increment = target / speed;

      const updateCount = () => {
        const count = +counter.innerText;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    window.addEventListener('scroll', () => {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.2;

      if (sectionPos < screenPos && !animated) {
        startCounters();
        animated = true;
      }
    });
  }

  // --- 5. Gallery Lightbox Modal ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-src');
      const captionText = item.querySelector('.gallery-overlay span').innerText;

      lightboxImg.src = imgSrc;
      lightboxCaption.innerText = captionText;
      lightbox.style.display = 'flex';
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  // --- 6. FAQ Accordion Toggle ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other accordions
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- 7. Booking Form Validation & WhatsApp Redirection ---
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const mobile = document.getElementById('mobile').value.trim();
      const email = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;
      const date = document.getElementById('date').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !mobile || !service || !date) {
        alert('Please complete all required fields.');
        return;
      }

      // Format WhatsApp message text
      const waMessage = `*New Booking Request - Sky Healthcare*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Mobile:* ${encodeURIComponent(mobile)}%0A` +
        `*Email:* ${encodeURIComponent(email || 'N/A')}%0A` +
        `*Service:* ${encodeURIComponent(service)}%0A` +
        `*Date:* ${encodeURIComponent(date)}%0A` +
        `*Notes:* ${encodeURIComponent(message || 'None')}`;

      // Redirect to WhatsApp
      const waUrl = `https://wa.me/919876543210?text=${waMessage}`;
      window.open(waUrl, '_blank');

      alert('Thank you! Redirecting your request to our Sky Healthcare team on WhatsApp.');
      bookingForm.reset();
    });
  }

  // --- 8. Active Link Highlight on Scroll ---
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

});
