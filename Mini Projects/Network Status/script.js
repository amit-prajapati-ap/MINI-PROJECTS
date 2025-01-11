//selecting all required elements

const wrapper = document.querySelector(".wrapper");
const toast = document.querySelector(".toast");
const wifiIcon = document.querySelector(".icon");
const title = document.querySelector("span");
const subTitle = document.querySelector("p");
const closeIcon = document.querySelector(".close-icon");

window.onload = () => {
    checkNetwork();
};

function checkNetwork() {
    fetch("https://jsonplaceholder.typicode.com/posts/1").
        then(() => {
            console.log("Online");
            online();
        }).
        catch(() => {
            console.log("Offline");
            wifiIcon.classList.remove("online");
        });
}

function online() {
    wifiIcon.classList.add("online");
    title.innerText = "You're online now";
    subTitle.innerText = "Hurray! Internet is connected.";
    wifiIcon.innerHTML = '<i class="fa-solid fa-wifi"></i>';
    toast.style.borderLeft = "5px solid #2ecc71";

    closeIcon.addEventListener("click", () => {
        wrapper.classList.add("hide");
    });
    setTimeout(() => {
        wrapper.classList.add("hide");
    }, 5000);
}