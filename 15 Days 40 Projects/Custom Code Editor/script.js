let htmlInput = document.querySelector('.html-editor textarea');
let cssInput = document.querySelector('.css-editor textarea');
let jsInput = document.querySelector('.js-editor textarea');
let outputContainer = document.querySelector('.output-container');
let output = document.querySelector('#output');
let save = document.querySelector('#save');
let fullScreen = document.querySelector("#full");
let copy = document.querySelectorAll(".copy");

save.addEventListener('click', function () {
    output.contentDocument.body.innerHTML = htmlInput.value;
    output.contentDocument.head.innerHTML = `<style>${cssInput.value}</style>`;
    output.contentWindow.eval(jsInput.value);
});

fullScreen.addEventListener('click', function () {
    outputContainer.classList.toggle('output-full-active');
    if (outputContainer.classList.contains('output-full-active')) {
        fullScreen.style.transform = "rotate(180deg)";
    } else {
        fullScreen.style.transform = "rotate(0deg)";
    }
});

copy.forEach((e) => {
    e.addEventListener('click', function () {
        if (e.classList.contains("copy1")) {
            navigator.clipboard.writeText(htmlInput.value);
        }
        else if (e.classList.contains("copy2")) {
            navigator.clipboard.writeText(cssInput.value);
        }
        else if (e.classList.contains("copy3")) {
            navigator.clipboard.writeText(jsInput.value);
        }
    })
})