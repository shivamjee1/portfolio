/*=========================================================
    Shivam Kumar Engineering Portfolio
    Sprint 1 - script.js
=========================================================*/


/*====================================
        MOBILE MENU
=====================================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});



/*====================================
        STICKY NAVBAR
=====================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("sticky");

    }

    else {

        header.classList.remove("sticky");

    }

});



/*====================================
    ACTIVE NAVIGATION LINK
=====================================*/

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active-link");

        }

    });

});



/*====================================
    DASHBOARD COUNTERS
=====================================*/

const counters = document.querySelectorAll(".dashboard-card h2");

let counterStarted = false;

function startCounter() {

    if (counterStarted) return;

    const dashboard = document.querySelector(".dashboard");

    const position = dashboard.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const finalText = counter.innerText;

            const target = parseInt(finalText);

            let count = 0;

            const increment = Math.ceil(target / 60);

            const timer = setInterval(() => {

                count += increment;

                if (count >= target) {

                    counter.innerText = finalText;

                    clearInterval(timer);

                }

                else {

                    if (finalText.includes("+")) {

                        counter.innerText = count + "+";

                    }

                    else {

                        counter.innerText = count;

                    }

                }

            }, 20);

        });

    }

}

window.addEventListener("scroll", startCounter);

window.addEventListener("load", startCounter);




/*====================================
        SCROLL REVEAL
=====================================*/

const revealElements = document.querySelectorAll(

    ".hero-content, .hero-image, .dashboard-card, .section"

);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold: 0.15

    }

);

revealElements.forEach(el => {

    observer.observe(el);

});




/*====================================
    SMOOTH SCROLL
=====================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(

            this.getAttribute("href")

        );

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

        navLinks.classList.remove("active");

    });

});




/*====================================
    FOOTER YEAR
=====================================*/

const footer = document.querySelector("footer p");

if (footer) {

    const year = new Date().getFullYear();

    footer.innerHTML =

        `© ${year} Shivam Kumar. All Rights Reserved.`;

}




/*====================================
    CONSOLE MESSAGE
=====================================*/

console.log(
    "%cWelcome to Shivam Kumar's Engineering Portfolio",
    "color:#2563EB;font-size:18px;font-weight:bold;"
);

console.log(
    "Designed & Developed with ❤️"
);