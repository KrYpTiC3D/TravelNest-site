

/*Reading a value from localStorage and parse it back into a JS value.
 Returns "fallback" if the key is missing or the data is unreadable.*/
 function storageGet(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        return JSON.parse(raw);
    }   
    catch (e) {
        console.warn("storageGet failed for", key, e);
        return fallback;
    }
 }

 /* Save a JS value to a JSON file and save it under "key" */
 function storageSet(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    catch (e) {
        console.warn("storageSet failed for", key, 0);
    }
 }

 /*Remove a single key from localStorage*/
 function storageRemove(key) {
    try { localStorage.removeItem(key); }
    catch (e) { console.warn("storageRemove failed", e); }
 }


 /*Validator that return true only if value looks like an emai*/
 function isValidEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // simple, readable email rule
  return pattern.test(String(value).trim());      // trim whitespace then test
}

/*Animated hamburger menu for mobile */
function initMobileMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    /*Toggle open state whenever the hamburger is clicked*/
    toggle.addEventListener("click", function() {
        const isOpen = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    /*Close the menu after tapping on a link*/
    links.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function() {
            links.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

/*highlight the link for the current page*/
function initActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (link) {
        const href = link.getAttribute("href");
        if (href === path) link.classList.add("active");
    })
}

/*Scroll Reveal*/
function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.15 });

    items.forEach(function (item) { observer.observe(item); });
}

/*Validates the email and stores it in localStorage*/
function initNewsletter() {
    const form = document.querySelector("#newsletter-form");
    if (!form) return;
    const input = form.querySelector("input[type='email']");
    const note = form.parentElement.querySelector("#newsletter-msg");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = input.value.trim();

        if (!isValidEmail(email)) {
            note.textContent = "Please enter a valid email address.";
            note.style.color = "var(--danger)";
            return;
        }

        const subs = storageGet("tn_newsletter", []);
        if (!subs.includes(email)) subs.push(email);
        storageSet("tn_newsletter", subs);

        note.textContent = "Thanks! You're subscribed.";
        note.style.color = "#9fe0c1";
        form.reset();
    });
}

/* Set the copyright year automatically */
function setFooterYear() {
    const span =document.querySelector("#year");
    if (span) span.textContent = new Date().getFullYear();
}


/* Registering the service worker so the site can work offline */
function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
            navigator.serviceWorker.register("./service-worker.js")
            .then(function() { console.log("Service worker registered.");})
            .catch(function(err) { console.warn("SW failed:", err); });
        });
    }
}

/* bootstrap - run all the shared setup once the html is parsed. */
document.addEventListener("DOMContentLoaded", function() {
    initMobileMenu();
    initActiveNav();
    initScrollReveal();
    initNewsletter();
    setFooterYear();
    registerServiceWorker();
});