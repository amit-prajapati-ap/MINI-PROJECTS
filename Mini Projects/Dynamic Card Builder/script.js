function createCard(tit, cname, views, monthsOld, dura, thumbnail) {
    let container = document.querySelector(".container");
    let card = document.createElement("div");
    card.className = "card";
    let cardThumbnail = document.createElement("div");
    cardThumbnail.className = "card-thumbnail";
    let img = document.createElement("img");
    img.className = "card-img";
    let cardInfo = document.createElement("div");
    cardInfo.className = "card-info";
    let title = document.createElement("h3");
    title.className = "title";
    let cardInfoMini = document.createElement("div");
    cardInfoMini.className = "card-info-mini";
    let channelName = document.createElement("div");
    channelName.className = "cname";
    let duration = document.createElement("div");
    duration.className = "duration";
    let months = document.createElement("div");
    months.className = "months";
    let view = document.createElement("div");
    view.className = "views";
    let actualViews = "";
    let actualMonths = "";

    if (monthsOld > 12) {
        actualMonths = Math.floor(monthsOld / 12) + " years ago";
    }
    else {
        actualMonths = monthsOld + "months ago";
    }

    if (views > 1000000) {
        actualViews = Math.floor(views / 1000000) + "M views";
    }
    else if (views > 1000) {
        actualViews = Math.floor(views / 1000) + "K views";
    }
    else {
        actualViews = views + " views";
    }

    months.textContent = `${actualMonths}`;
    view.textContent = `${actualViews}`;
    channelName.textContent = `${cname}`;
    title.textContent = `${tit}`;
    duration.textContent = `${dura}`;
    img.src = thumbnail;

    card.appendChild(cardThumbnail);
    card.appendChild(cardInfo);
    cardThumbnail.appendChild(img);
    cardThumbnail.appendChild(duration);
    cardInfo.appendChild(title);
    cardInfo.appendChild(cardInfoMini);
    cardInfoMini.appendChild(channelName);
    cardInfoMini.appendChild(view);
    cardInfoMini.appendChild(months);
    container.appendChild(card);
}

function show() {
    const randomViews = Math.round(Math.random() * 100000000);
    const randomMonths = Math.floor(Math.random() * 60 + 1);
    const randomMin = Math.floor(Math.random() * 60);
    const randomSec = Math.floor(Math.random() * 60);
    const randomDura = `${randomMin}:${randomSec}`;
    createCard("Installing VS Code & How Websites Work | Sigma Web Development Course - Tutorial #1", "CodeWithHarry", randomViews, randomMonths, randomDura, "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCKktmHuXV_macV6MoUwhKxwzXJ7w");
}

function remove() {
    let container = document.querySelector(".container");
    let child = container.childNodes;
    container.removeChild(child[0]);
}

const addCard = document.querySelector(".add");
addCard.addEventListener("click",show);

const removeCard = document.querySelector(".remove");
removeCard.addEventListener("click",remove);