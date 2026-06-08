/* Auto Rotating Hero Quotes */
function initQuoteRotator() {
    const el = document.querySelector("#hero-quote");
    if (!el) return;

    let index = 0;

    /* Fade the element out, swap the text and fade it in again */
    function showQuote(i) {
        el.style.opacity = "0"
        setTimeout(function() {
            el.textContent = "\u201C" + TRAVEL_QUOTES[i] + "\u201D";
            el.style.opacity = "1";
        }, 400);
    }

    showQuote(index);

    /* Every 5 seconds advance to the next quote, looping back to start */
    setInterval(function () {
        index = (index + 1) % TRAVEL_QUOTES.length;
        showQuote(index);
    }, 5000);
}

/* Function to find how many days has passed since the start of the current year */
function dayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function initDestinationOfDay() {
    const box = document.querySelector("#dotd-content");
    if (!box) return;

    const index = dayOfYear() % DESTINATIONS.length;
    const dest = DESTINATIONS[index];

    box.innerHTML = '<div class="card-img" aria-hidden="true"><img src="'+ dest.image + '" alt="'
    + dest.name + '">' + '</div>' + '<div>' + '<h3>' + dest.name + '</h3>' + '<p class="card-region" >'
    + dest.country + ' &middot; ' + dest.continent + '</p>' + '<p>' + dest.description + '</p>' +
    '<a class="btn btn-outline" href="explorer.html" >Explore destinations</a>' + '</div>';
}

/* Initialize both functions */
document.addEventListener("DOMContentLoaded", function() {
    initQuoteRotator();
    initDestinationOfDay();
})