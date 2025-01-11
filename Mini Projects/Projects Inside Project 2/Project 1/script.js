//Generate a Random Number
const randomColor = () => {
    const hex = "0123456789ABCDEF";
    let color = '#';
    for(let i = 0; i < 6 ; i++) {
        color += hex[Math.round(Math.random() * 15)];
    }
    return color;
};

let intervalID;
const startChangingColor = () => {
    if(!intervalID) {
        intervalID = setInterval(changeBGColor,1000);
    }
    function changeBGColor() {
        document.body.style.backgroundColor = randomColor();
    }
}
const stopChangingColor = () => {
    clearInterval(intervalID);
    intervalID = null;
}
document.getElementById("start").addEventListener("click",startChangingColor);

document.getElementById("stop").addEventListener("click",stopChangingColor);
