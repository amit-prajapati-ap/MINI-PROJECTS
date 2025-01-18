const button = document.getElementById("btn");
const content = document.getElementById("content");
const voice = document.getElementById("voice");

let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

button.addEventListener("click", () => {
    recognition.start();
    button.style.display = "none";
    voice.style.display = "block";
});

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    console.log(currentIndex);
    let transcript = event.results[currentIndex][0].transcript;
    takeCommand(transcript.toLowerCase());
};

function takeCommand(message) {
    button.style.display = "flex";
    voice.style.display = "none";
    if (message.includes("hello") || message.includessage.includes("hi")) {s("hey") || me
        speaking("Hi, What can I Help You?");
    }
    else if (message.includes("who are you")) {
        speaking("mey ek virtual assistant hoon, mujhe Amit Prajapati ji ne banaya hai");
    }
    else if (message.includes("who is amit")) {
        speaking("Amit prajapati ji ek mahan vyakti hai jinhone mujhe apni coding ki kaushalta se banaya hai. Agar aaj vo na hote to mera bhi yaha koi vajood nahi hota, Dhanyavaad Amit Prajapati ji.");
    }
    else if (message.includes("open youtube")) {
        speaking("Opening Youtube");
        window.open("https://www.youtube.com/");
    }
    else if (message.includes("open google")) {
        speaking("Opening Google");
        window.open("https://www.google.com/");
    }
    else if (message.includes("open calculator")) {
        speaking("Opening calculator");
        window.open("calculator://");
    }
    else if (message.includes("open whatsapp")) {
        speaking("Opening whatsapp");
        window.open("whatsapp://");
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speaking(time);
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speaking(date);
    }
    else {
        let finalText = "Jo hookum mere aaka, me dhoond rahi hoon" + (message.replace("ana", "") || message.replace("anna", "")) + "ke baare me";
        speaking(finalText);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}

function speaking(text) {
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    textSpeak.lang = "hi-GB";
    window.speechSynthesis.speak(textSpeak);
}

function wishMe() {
    let date = new Date();
    let hours = date.getHours();
    if (hours >= 0 && hours < 12) {
        speaking("Good Morning, me aapki kis prakar ki seva kar sakti hoon? kripaya mujhe hookum dijiye");
    }
    else if (hours >= 12 && hours < 16) {
        speaking("Good Afternoon, me aapki kis prakar ki seva kar sakti hoon? kripaya mujhe hookum dijiye");
    }
    else {
        speaking("Good Evening, me aapki kis prakar ki seva kar sakti hoon? kripaya mujhe hookum dijiye");
    }
}

window.addEventListener("load", () => {
    setTimeout(() => {
        wishMe();
    }, 1);
});