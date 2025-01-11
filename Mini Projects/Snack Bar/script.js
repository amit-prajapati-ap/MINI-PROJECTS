let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");

let toastBox = document.getElementById("toastbox");

let successMsg = '<i class="fa-solid fa-circle-check"></i>Successfully submitted';
let errorMsg = '<i class="fa-solid fa-circle-xmark"></i>Please fix the error!';
let invalidMsg = '<i class="fa-solid fa-circle-exclamation"></i>Invalid input, check again';

btn1.addEventListener("click",() => showToast(successMsg));
btn2.addEventListener("click",() => showToast(errorMsg));
btn3.addEventListener("click",() => showToast(invalidMsg));

function showToast(msg) {

    let toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = msg;
    toastBox.appendChild(toast);

    if(msg.includes("error")) {
        toast.classList.add("error");
    }
    if(msg.includes("Invalid")) {
        toast.classList.add("invalid");
    }

    setTimeout(() => {
        toast.remove();
    }, 6000);
}