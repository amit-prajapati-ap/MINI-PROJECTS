const notesCOntainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable","true");
    img.src = "images/delete.png";
    inputBox.appendChild(img);
    notesCOntainer.appendChild(inputBox);
});

notesCOntainer.addEventListener("click", (e) => {
    if(e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach((note) => {
            note.onkeyup = function() {
                updateStorage();
            }
        })
    }
});

document.addEventListener("keydown", event => {
    if(event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

function updateStorage() {
    localStorage.setItem("notes", notesCOntainer.innerHTML);
}

function showNotes() {
    notesCOntainer.innerHTML = localStorage.getItem("notes");
}
showNotes();