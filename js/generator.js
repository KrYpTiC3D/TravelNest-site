/*Storing the elements used by this page*/
const typeSelect = document.querySelector("#type-filter");
const budgetSelect = document.querySelector("#budget-filter");
const resultCard = document.querySelector("#gen-result");
const wishlistEl = document.querySelector("#wishlist");

const WISHLIST_KEY = "tn_wishlist";
let currentPick = null;


/*Returns every destination that match the chosen travel type and budget */
function getMatches() {
    const type = typeSelect.value;
    const budget = budgetSelect.value;
    return DESTINATIONS.filter(function(d) {
        
        const typeOk = type === "any" || d.travelTypes.includes(type);
        const budgetOk = budget === "any" || d.budgetTier === budget;
        return typeOk && budgetOk;
    });
}

/* Pick a destination at random from the matches and display it */
function surpriseMe() {
    const matches = getMatches();

    if (matches.length === 0) {
        resultCard.innerHTML = '<p class="no-results">No destinations match those choices. Try wideing your scope.</p>';
        currentPick = null;
        return;
    }

    const pick = matches[Math.floor(Math.random() * matches.length)];
    currentPick = pick;

    resultCard.innerHTML = 
        '<div class="card pop">' +
            '<div class="card-img" aria-hidden="true"><img src="' + pick.image + '" alt="' +
            pick.name + '"></div>' + '<div class="card-body">' +
                '<h3>' + pick.name + '</h3>' +
                '<p class="card-region">' + pick.country + ' &middot; ' + pick.continent + '</p>' +
                '<p>' + pick.description + '</p>' +
                '<button class="heart-btn" id="add-wishlist">&#9825; Add to wishlist</button>' +
            '</div>'+
        '</div>'; 

        const addBtn = document.querySelector("#add-wishlist");
        if (addBtn) addBtn.addEventListener("click", function() {
            addToWishlist(pick.id)
        });
}


/* Add a destination to the wishlist if it is not already there. */
function addToWishlist(id) {
    const list = storageGet(WISHLIST_KEY, []);
    if (!list.includes(id)) {
        list.push(id);
        storageSet(WISHLIST_KEY, list);
        renderWishlist();
    }
}

/* Remove a destination from the wishlist */
function removeFromWishlist(id) {
    let list = storageGet(WISHLIST_KEY, []);
    list = list.filter(function (x) { return x !== id });
    storageSet(WISHLIST_KEY, list);
    renderWishlist();
}

/* Draw the wishlist with each destination*/
function renderWishlist() {
    const list = storageGet(WISHLIST_KEY, []);
    if (list.length === 0) {
        wishlistEl.innerHTML = '<li class="card-region">Your wishlist is empty.</li>';
        return;
    }
    wishlistEl.innerHTML = list.map(function (id) {
        const d = DESTINATIONS.find(function (x) { return x.id === id; });
        if (!d) return "";
        return '<li><span>' + d.name + ', ' + d.country + '</span>' +
                '<button data-id="' + id + '" aria-label="Remove from wishlist">' +
                '&times;</button></li>';
    }).join("");
}


/* Connection to the page */
document.addEventListener("DOMContentLoaded", function() {
    const surpriseBtn = document.querySelector("#surprise-btn");
    if (surpriseBtn) surpriseBtn.addEventListener("click", surpriseMe);

    if (wishlistEl) {
        wishlistEl.addEventListener("click", function (e) {
            if (e.target.matches("button[data-id]")) {
                removeFromWishlist(e.target.dataset.id);
            }
        });
        renderWishlist();
    }

    surpriseMe();
});