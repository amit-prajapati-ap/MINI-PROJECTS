const click = document.querySelector(".click");
const popup = document.querySelector(".popup_box");
const cancleBtn = document.querySelector(".btn1");
const deleteBtn = document.querySelector(".btn2");

click.addEventListener("click", () => {
    popup.style.display = "block";
});

cancleBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

deleteBtn.addEventListener("click", () => {
    popup.style.display = "none";
    alert("Deleted");
});