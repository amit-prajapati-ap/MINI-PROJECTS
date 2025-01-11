const url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
let imgBox = document.getElementById("img-box");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("text");
let button = document.querySelector(".btn");

button.addEventListener("click", generateQr);

function generateQr() {
    if (qrText.value.length > 0) {
        qrImage.src = url + qrText.value;
        imgBox.classList.add("show-img");
    }
    else {
        qrText.classList.add("error");
        setTimeout(() => {
            qrText.classList.remove("error");
        }, 1000);
    }
}