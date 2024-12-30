let progress = document.getElementById("progress");
let song = document.getElementById("song");
let playSong = document.querySelector(".play-song");
let ctrlIcon = document.getElementById("ctrlIcon");

playSong.addEventListener("click",playPause);

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if(ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

if(song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.onchange = () => {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

