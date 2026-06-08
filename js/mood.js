/*Mood page logic*/

/*Ambient sounds*/
const TRACK_KEY = "tn_tracking";
const moodListEl = document.querySelector("#mood-list");

/* Create a loop for the audio element for a given path */
function buildAudio(src) {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.8;
    return audio;
}

/* mapping each sound name to an audio object that loops quietly */
const sounds = {
    beach: buildAudio("assets/sounds/beach.mp3"),
    forest: buildAudio("assets/sounds/forest.mp3"),
    city: buildAudio("assets/sounds/city.mp3")
};

function toggleSound(name, button) {
    const audio = sounds[name];
    if (audio.paused) {
        audio.play().catch(function () {
            console.warn("Could not play" + name + "— is the .mp3 file in assets/sounds?");
        });
        button.classList.add("playing");
        button.setAttribute("aria-pressed", "true");
    } else {
        audio.pause();
        button.classList.remove("playing");
        button.setAttribute("aria-pressed", "false");
    }
}

/*Get the destination list with currently visited and planned state */
function renderMoodList() {
    if (!moodListEl) return;
    const tracking = storageGet(TRACK_KEY, {});

    moodListEl.innerHTML = DESTINATIONS.map(function(d) {
        const status = tracking[d.id];
        const visitedCls = status === "visited" ? " on-visited" : "";
        const plannedCls = status === "planned" ? " on-planned" : "";
        return (
            '<li class="mood-item">' +
                '<span>' + d.name + ', ' + d.country + '</span>' +
                '<span class="chip-group">' +
                    '<button class="chip-toggle' + visitedCls + '" ' + 'data-id="' +
                            d.id + '" data-status="visited">Visited</button>'+
                    '<button class="chip-toggle' + plannedCls + '" ' + 'data-id="' +
                            d.id + '" data-status="planned">Planned</button>'+
                '</span>' +
            '</li>'
        );
    }).join("");
}

/* Visited or planned location area */
function setStatus(id, status) {
    const tracking = storageGet(TRACK_KEY, {});
    if (tracking[id] === status) {
        delete tracking[id];
    } else {
        tracking[id] = status;
    }
    storageSet(TRACK_KEY, tracking);
    renderMoodList();
}


/* Connecting to HTML */
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".sound-toggle").forEach(function (btn) {
        btn.addEventListener("click", function() {
            toggleSound(btn.dataset.sound, btn);
        });
    });

    if (moodListEl) {
        moodListEl.addEventListener("click", function(e) {
            const btn = e.target.closest(".chip-toggle");
            if (btn) setStatus(btn.dataset.id, btn.dataset.status);
        });
        renderMoodList();
    }
});

