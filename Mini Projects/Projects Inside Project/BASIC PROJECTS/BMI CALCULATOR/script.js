const form = document.querySelector("form");
form.addEventListener("submit",(e) => {
    e.preventDefault();
    const height = parseInt(document.querySelector("#height").value);
    const weight = parseInt(document.querySelector("#weight").value);
    const result = document.getElementById("result");
    if(height === "" || height <= 0 || isNaN(height)) {
        result.innerHTML = "Please give a valid height"
    }
    else if(weight === "" || weight <= 0 || isNaN(weight)) {
        result.innerHTML = "Please give a valid weight"
    }
    else {
        let bmi = (weight / ((height*height)/10000)).toFixed(2);
        result.innerHTML = `<span>Your BMI Index is: ${bmi}</span>`;
        let measure = document.createElement("div");
        if(bmi < 18.6) {
            measure.innerHTML = `<span>You are Under Weight</span>`;
        }
        else if(bmi >= 24.9) {
            measure.innerHTML = `<span>You are Normal Weight</span>`;
        }
        else {
            measure.innerHTML = `<span>You are Over Weight</span>`;
        }
        result.appendChild(measure);
    }
})
const buttons = document.querySelectorAll(".button");
const body = document.querySelector("body");
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        switch(e.target.id) {
            case "black": 
            body.style.backgroundColor = e.target.id;
            body.style.color = "white";
            break;
            case "white": 
            body.style.backgroundColor = e.target.id;
            body.style.color = "black";
            break;
        }
    })
})