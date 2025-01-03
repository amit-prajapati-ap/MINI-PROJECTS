const copy = document.querySelectorAll(".copy");
const speaker = document.querySelectorAll(".speaker");
const translate = document.querySelector(".translate");
const input = document.querySelector("#input");
let output = document.querySelector("#output");
const selectTag = document.querySelectorAll("select");

function handlingSelect() {
    selectTag.forEach((select, id) => {
        for (let lang in languages) {
            let selected;
            if (id == 1 && lang == "hi-IN") {
                selected = "selected";
            }
            else if (id == 0 && lang == "en-US") {
                selected = "selected";
            }
            let option = `<option value="${lang}" ${selected}>${languages[lang]}</option>`;
            select.insertAdjacentHTML("beforeend", option);
        }
    });
}

async function translater(text, lang) {
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${lang}`;
    let response = await fetch(url);
    let data = await response.json();
    output.value = data.responseData.translatedText;
}

function handlingTranslateButton() {
    translate.addEventListener("click", () => {
        let text = input.value;
        let lang = selectTag[0].value + "|" + selectTag[1].value;
        translater(text, lang);
    });
}

function speaking() {
    let utterance;
    speaker[0].addEventListener("click", () => {
        utterance = new SpeechSynthesisUtterance(input.value);
        utterance.lang = selectTag[0].value;
        speechSynthesis.speak(utterance);
    });
    speaker[1].addEventListener("click", () => {
        utterance = new SpeechSynthesisUtterance(output.value);
        utterance.lang = selectTag[1].value;
        speechSynthesis.speak(utterance);
    });
}

function copying() {
    copy[0].addEventListener("click", () => {
        console.log("copied1");
        navigator.clipboard.writeText(input.textContent);
    });
    copy[1].addEventListener("click", () => {
        navigator.clipboard.writeText(input.textContent);
        console.log("copied2");
    });
}

function main() {
    handlingSelect();
    handlingTranslateButton();
    speaking();
    copying();
}

main();