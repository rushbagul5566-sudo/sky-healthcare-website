// ===============================
// SKY HEALTHCARE SCRIPT.JS
// ===============================

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });
        }

    });

});


// Scroll animation
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.2
});


cards.forEach(card=>{

    card.style.opacity="0";
    card.style.transform="translateY(30px)";
    card.style.transition="0.6s";

    observer.observe(card);

});


// Contact form message

const form = document.querySelector("form");

if(form){

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Thank you! Sky Healthcare team will contact you soon.");

    form.reset();

});

}


// Page loading effect

window.addEventListener("load",()=>{

    document.body.style.opacity="1";

});
