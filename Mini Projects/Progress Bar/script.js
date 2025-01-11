let num1 = document.querySelector(".num1");
let num2 = document.querySelector(".num2");
let num3 = document.querySelector(".num3");
let counter = 0;
setInterval(() => {
    if (counter == 75) {
        clearInterval();
    }
    else {
        counter += 1;
        num1.innerHTML = counter + '%';
        num2.innerHTML = counter + '%';
        num3.innerHTML = counter + '%';
    }
}, 18);
