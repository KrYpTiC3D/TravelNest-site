
/*Caching the elements we are going to use repeatedly.*/
const form = document.querySelector("#budget-form");
const destSelect = document.querySelector("#budget-dest");
const daysInput = document.querySelector("#budget-days");
const dailyInput = document.querySelector("#budget-daily");
const totalEl = document.querySelector("#budget-total");
const statusEl = document.querySelector("#budget-status");
const barEl = document.querySelector("#budget-bar");
const savedListEl = document.querySelector("#saved-list");

const STORAGE_KEY = "tn_budgets";

/*Helper fucntions*/

function classifyBudget(daily) {
    if (daily < 10000) return { label: "Low", cls: "badge-low", pct: 33};
    if (daily < 40000) return { label: "Moderate", cls: "badge-moderate", pct: 66 };
    return { label: "Luxury", cls: "badge-luxury", pct: 100};
}

/*Animate a number to a target inside a given element*/
function animateCount(el, target) {
    let current = 0;
    const steps = 30;
    const increment = target / steps;
    const timer = setInterval(function () {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = "LKR " + Math.round(current).toLocaleString();
    }, 20);
}

/*Calculations*/

function calculateBudget(e) {
    e.preventDefault();

    const days = parseInt(daysInput.value, 10);
    const daily = parseFloat(dailyInput.value);

    if (!days || days < 1 || !daily || daily < 1) {
        statusEl.innerHTML = '<span class="badge badge-luxury">Please enter valid numbers.</span>';
    return;
    }

    const total = days * daily;
    const tier = classifyBudget(daily);

    animateCount(totalEl, total);
    statusEl.innerHTML = '<span class="badge '+ tier.cls + '">' + tier.label + ' budget</span>';
    barEl.style.width = tier.pct + "%";
}

/*Save the current form values as a named budget entry*/
function saveBudget() {
    const days = parseInt(daysInput.value, 10);
    const daily = parseFloat(dailyInput.value);
    if (!days || !daily) return;

    const budgets = storageGet(STORAGE_KEY, []);
    budgets.push({
        dest: destSelect.value,
        days: days,
        daily: daily,
        total: days * daily
    });
    storageSet(STORAGE_KEY, budgets);
    renderSaved();
}

/*Draw the saved budgets list from localStorage*/
function renderSaved() {
    const budgets = storageGet(STORAGE_KEY, []);
    if (budgets.length === 0) {
        savedListEl.innerHTML = '<li class="card-region">No saved budgets yet.</li>';
        return;
    }
    savedListEl.innerHTML = budgets.map(function(b, i) {
        return '<li><span>' + b.dest + ' &middot; ' + b.days +
        ' days &middot; LKR' + b.total.toLocaleString() + '</span>'
        + '<button data-index="' + i + '" aria-label="Delete saved budget">'
        + '&times;</button></li>';
    }).join("");

}

/*Delete one saved budget by its index, and re-render the list.*/
function deleteBudget(index) {
    const budgets = storageGet(STORAGE_KEY, []);
    budgets.splice(index, 1);
    storageSet(STORAGE_KEY, budgets);
    renderSaved();
}


/* Connecting to event */
document.addEventListener("DOMContentLoaded", function () {
    if (destSelect) {
        DESTINATIONS.forEach(function(d) {
            const opt = document.createElement("option");
            opt.value = d.name; 
            opt.textContent = d.name + " (" + d.country + ")";
            destSelect.appendChild(opt);
        });
    }

    if (form) form.addEventListener("submit", calculateBudget);
    const saveBtn = document.querySelector("#save-budget");
    if (saveBtn) saveBtn.addEventListener("click", saveBudget);

    if (savedListEl) {
        savedListEl.addEventListener("click", function (e) {
            if (e.target.matches("button[data-index]")) {
                deleteBudget(parseInt(e.target.dataset.index, 10));
            }
        });
        renderSaved();
    }
});


