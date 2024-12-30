const terminal = document.querySelector(".terminal");
const addItem = async (item) => {
    await randomDelay();
    let div = document.createElement("div");
    div.innerHTML = item;
    terminal.append(div);
}

const randomDelay = () => {
    const timeout = 1 + 6 * Math.random();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout * 1000);
    })
}

async function main() {
    let t = setInterval(() => {
        let last = terminal.lastElementChild;
        if(last.innerHTML.endsWith("...")) {
            last.innerHTML = last.innerHTML.slice(0, last.innerHTML.length - 3);
        }
        else {
            last.innerHTML = last.innerHTML + ".";
        }
    }, 400);

    const text = ["Initialized Hacking now reading your data",
        "Reading your files",
        "Password files detected",
        "Sending all passwords and personal files to server",
        "Cleaning up"
    ]

    for (let i = 0; i < text.length; i++) {
        await addItem(text[i]);
    }

    await randomDelay();
    clearInterval(t);
}

main();
