// ==========================================
// SKY HEALTHCARE - SCRIPT.JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sky Healthcare Website Loaded Successfully!");

    // Smooth animation for cards
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {
            card.style.transition = "all 0.6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200);
    });

    // Header shadow on scroll
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
        } else {
            header.style.boxShadow = "0 4px 18px rgba(0,0,0,0.08)";
        }
    });
});
