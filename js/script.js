const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// ==============================
// ACTIVE NAVIGATION
// ==============================

const sections = document.querySelectorAll("main section");

const updateActiveNav = () => {

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navItems.forEach((item) => {
                item.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-links a[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
};

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();

// ==============================
// BACK TO TOP
// ==============================

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ==============================
// CLOSE MOBILE MENU ON OUTSIDE CLICK
// ==============================

document.addEventListener("click", (event) => {
    const clickedInsideNav =
        navLinks.contains(event.target) ||
        menuToggle.contains(event.target);

    if (!clickedInsideNav) {
        navLinks.classList.remove("active");
    }
});

// ==============================
// SCROLL REVEAL
// ==============================

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .timeline-item, .project-card, .achievement-item, .contact-wrapper"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});

// ==============================
// HERO TYPING EFFECT
// ==============================

const heroSubtitle = document.querySelector(".hero h2");

const roles = [
    "Electronics & Communication Engineering Student",
    "Software Developer",
    "Python Backend Developer",
    "Embedded Systems Enthusiast",
    "VLSI & Digital Design Enthusiast",
    "Hardware + Software Developer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
    if (!heroSubtitle) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {
        heroSubtitle.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex >= currentRole.length) {
            deleting = true;

            // Keep the complete text visible before deleting
            setTimeout(typeRole, 1800);
            return;
        }

        setTimeout(typeRole, 70);

    } else {
        charIndex--;

        heroSubtitle.textContent = currentRole.substring(0, charIndex);

        if (charIndex <= 0) {
            charIndex = 0;
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;

            // Small pause before typing next role
            setTimeout(typeRole, 400);
            return;
        }

        setTimeout(typeRole, 40);
    }
}

typeRole();

// ==============================
// PROJECT FILTER
// ==============================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach((card) => {
            const category = card.dataset.category;
            const shouldShow =
                selectedFilter === "all" || category === selectedFilter;

            if (shouldShow) {
                card.style.display = "flex";

                requestAnimationFrame(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                });
            } else {
                card.style.opacity = "0";
                card.style.transform = "translateY(10px)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 250);
            }
        });
    });
});