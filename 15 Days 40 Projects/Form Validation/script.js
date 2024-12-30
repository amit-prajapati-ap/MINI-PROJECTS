let nameError = document.getElementById("name-error");
let phoneError = document.getElementById("phone-error");
let emailError = document.getElementById("email-error");
let messageError = document.getElementById("message-error");
let submitError = document.getElementById("submit-error");
let submit = document.querySelector(".btn");

function validateName() {
    let name = document.getElementById("contact-name").value;
    if (name.length == 0) {
        nameError.innerHTML = "Name is required";
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {//This condition is used for to check wheather a name should contain only alphabets and with one space in middel of full name.
        nameError.innerHTML = "Write full name";
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validatePhone() {
    let phone = document.getElementById("contact-phone").value;
    if (phone.length == 0) {
        phoneError.innerHTML = "Phone no. is required";
        return false;
    }
    if (phone.length !== 10) {
        phoneError.innerHTML = "Phone no should be 10 digits";
        return false;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
        phoneError.innerHTML = "Only digits allowed";
        return false;
    }
    phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateEmail() {
    let email = document.getElementById("contact-email").value;
    if (email.length == 0) {
        emailError.innerHTML = "Email is required";
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = "Email Invalid";
        return false;
    }
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateMessage() {
    let message = document.getElementById("contact-message").value;
    let required = 30;
    let left = required - message.length;
    if (left > 0) {
        messageError.innerHTML = left + ' more characters required';
        return false;
    }
    messageError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

submit.addEventListener("click", validateForm);

function validateForm(event) {
    if (!validateName() || !validatePhone() || !validateEmail() || !validateMessage()) {
        event.preventDefault();
        submitError.innerHTML = "Please Correct the Details";
    }
}