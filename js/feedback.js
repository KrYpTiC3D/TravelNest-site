/* Cache the form and its fields */
const fbForm = document.querySelector("#feedback-form");    // the form
const nameField = document.querySelector("#fb-name");       // name input
const emailField = document.querySelector("#fb-email");     // email input
const msgField = document.querySelector("#fb-message");     // message textarea
const fbConfirm = document.querySelector("#fb-confirm");    // success banner

const FEEDBACK_KEY = "tn_feedback";


/* Validation */

/* show or clear an inline error for one field */
function setFieldError(input, message) {
    const errorEl = document.querySelector("#" + input.id + "-error");
    if (message) {
        input.classList.add("invalid");
        errorEl.textContent = message;
    } else {
        input.classList.remove("invalid");
        errorEl.textContent = "";
    }
}

/* Validate all three fields and return true only if one passes */
function validateForm() {
    let ok = true;

    if (nameField.value.trim().length < 2) {
        setFieldError(nameField, "Please enter your name (2+ characters).");
        ok = false;
    } else {
        setFieldError(nameField, "");
    }


    if (!isValidEmail(emailField.value)) {
        setFieldError(emailField, "Please enter a valid email address.");
        ok = false;
    } else {
        setFieldError(emailField, "");
    }

    if (msgField.value.trim().length < 10) {
        setFieldError(msgField, "Your message should at least be 10 characters.");
        ok = false;
    } else {
        setFieldError(msgField, "");
    }

    return ok;
}


/* Handle submit */
function handleSubmit(e) {
    e.preventDefault();
    fbConfirm.classList.add("hidden");
    if (!validateForm()) return;

    /* Building a record with a timestamp */
    const record = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        message: msgField.value.trim(),
        date: new Date().toISOString()
    }

    /* Append it to the stored array of feedback submissions. */
    const all = storageGet(FEEDBACK_KEY, []);
    all.push(record);
    storageSet(FEEDBACK_KEY, all);

    fbConfirm.textContent = "Thank you, " + record.name + ". Your message was received.";
    fbConfirm.classList.remove("hidden");
    fbForm.reset();
}


/* FAQ Accordions */
function initAccordion() {
    const triggers = document.querySelectorAll(".accordion-trigger");

    triggers.forEach(function (trigger) {
        trigger.addEventListener("click", function () {
            const panel = trigger.nextElementSibling;
            const isOpen = trigger.getAttribute("aria-expanded") === "true";

            triggers.forEach(function (t) {
                t.setAttribute("aria-expanded", "false");
                t.nextElementSibling.style.maxHeight = null;
            });


            if (!isOpen) {
                trigger.setAttribute("aria-expanded", true);
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    if (fbForm) fbForm.addEventListener("submit", handleSubmit);
    initAccordion();
})