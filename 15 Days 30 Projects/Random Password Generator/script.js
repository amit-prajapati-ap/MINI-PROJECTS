const passwordBox = document.querySelector("#password-field");
const length = 12;
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = uppercase.toLowerCase();
const number = "0123456789";
let button = document.querySelector(".button");
const allChars = uppercase + lowercase + number;

button.addEventListener("click",generatePassword);

function generatePassword() {
    let password = "";
    while(password.length <= 12) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    passwordBox.value = password;
}

function copyPassword() {
    passwordBox.select();
    document.execCommand("copy");
}