document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initTypingAnimation();
    initScrollReveal();
    initActiveNavigation();
    initBackToTop();
    initContactForm();
});

/* ===========================
   Mobile Menu
=========================== */

function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

/* ===========================
   Typing Animation
=========================== */

function initTypingAnimation() {
    const element = document.querySelector(".typing-text");

    const words = [
        "AI Developer",
        "Full Stack Developer",
        "Project Manager",
        "Problem Solver"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (!deleting) {
            element.textContent = currentWord.substring(0, charIndex++);
        } else {
            element.textContent = currentWord.substring(0, charIndex--);
        }

        let speed = deleting ? 60 : 120;

        if (!deleting && charIndex === currentWord.length + 1) {
            deleting = true;
            speed = 1800;
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, speed);
    }

    type();
}

/* ===========================
   Scroll Reveal
=========================== */

function initScrollReveal() {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        section.style.transition = "all 0.8s ease";

        observer.observe(section);
    });
}

/* ===========================
   Active Navigation
=========================== */

function initActiveNavigation() {
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        links.forEach((link) => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }

        });

    });
}

/* ===========================
   Back To Top Button
=========================== */

function initBackToTop() {

    const button = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* ===========================
   Contact Form Validation
=========================== */

function initContactForm() {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const message = form.querySelector("textarea").value.trim();

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("Message sent successfully!");

        form.reset();

    });

}