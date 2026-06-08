/* Rendering the Destination cards and implementing the filtering */

const grid = document.querySelector("#dest-grid");
const continentSelect = document.querySelector("#continent-filter");
const searchInput = document.querySelector("#search-input");

function cardHTML(dest) {
    return (
        '<article class="card reveal" data-id="' + dest.id +'" ' +
        'tabindex="0" role="button" aria-label="view details for ' +
        dest.name + '">' + '<div class="card-img" aria-hidden="true"><img src="' + dest.image +
         '" alt="' + dest.name + '" ></div>' + '<div class="card-body">' +
         '<h3>' + dest.name + '</h3>' + 
         '<p class="card-region" >' + dest.country + ' &middot; ' + dest.continent + '</p>' +
         '</div>' +
         '</article>'
    );
}

function renderCards(list) {
    if (!grid) return;
    if (list.length === 0) {
        grid.innerHTML = '<p class="no-results">No destinations match your filters.</p>';
        return;
    }

    grid.innerHTML = list.map(cardHTML).join("");
    if (typeof initScrollReveal === "function") initScrollReveal();
}

function applyFilters() {
    const continent = continentSelect ? continentSelect.value : "all";
    const term = searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filtered = DESTINATIONS.filter(function (dest) {
        const continentMatch = continent === "all" || dest.continent === continent;
        const nameMatch = dest.name.toLowerCase().includes(term);
        return continentMatch && nameMatch;
    });

    renderCards(filtered);
}


/* Modal showing details of each destination */
const modal = document.querySelector("#dest-modal");
const modalBody = document.querySelector("#modal-body");

function openModal(id) {
    const dest = DESTINATIONS.find(function (d) { return d.id === id });
    if (!dest || !modal) return;

    const attractions = dest.attractions.map(function (a) { return "<li>" + a + "</li>"}).join("");

    modalBody.innerHTML =
    '<div class="modal-img" aria-hidden="true"><img src="' + dest.image + '" alt="' + dest.name + '"></div>' +
    '<p class="card-region">' + dest.country + ' &middot; ' + dest.continent + '</p>' +
    '<p>' + dest.description + '</p>' +
    '<h3>Popular attractions</h3>' +
    '<ul>' + attractions + '</ul>' +
    '<h3>Travel cost comparison (per day)</h3>' +
    '<table class="cost-table">' +
        '<thead><tr><th>Style</th><th>Estimated daily cost</th></tr></thead>'+
        '<tbody>' +
            '<tr><td>Budget</td><td>LKR ' + dest.costs.budget + '</td></tr>' +
            '<tr><td>Mid-range</td><td>LKR ' + dest.costs.mid + '</td></tr>' +
            '<tr><td>Luxury</td><td>LKR ' + dest.costs.luxury + '</td></tr>' +
        '</tbody>' +
    '</table>';

    document.querySelector("#modal-title").textContent = dest.name;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

/*Closing the modal*/
function closeModal() {
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
}


/*Connecting to the html*/

document.addEventListener("DOMContentLoaded", function() {
    renderCards(DESTINATIONS);

    /*Populating the continent dropdown from the data*/
    if (continentSelect) {
        const continents = [...new Set(DESTINATIONS.map(function(d) {
            return d.continent;
        }))].sort();
        continents.forEach(function(c) {
            const opt = document.createElement("option");
            opt.value = c;
            opt.textContent = c;
            continentSelect.appendChild(opt);
        });
        continentSelect.addEventListener("change", applyFilters);
    }

    /*Re-filters on every keystroke*/
    if (searchInput) searchInput.addEventListener("input", applyFilters);

    /* Open a modal when a card is clicked */
    if (grid) {
        grid.addEventListener("click", function (e) {
            const card = e.target.closest(".card");
            if (card) openModal(card.dataset.id);
        });

        grid.addEventListener("keydown", function(e) {
            if (e.key === "Enter" || e.key === " ") {
                const card = e.target.closest(".card");
                if (card) { e.preventDefault(); openModal(card.dataset.id); }
            }
        });
    }

    const closeBtn = document.querySelector("#modal-close");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") closeModal();
    });
});