const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user-result img");
const compResult = document.querySelector(".comp-result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option-image");

optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active");

        userResult.src = compResult.src = "images/rock.png";
        result.textContent = "Wait...";
        optionImages.forEach((image2, index2) => {
            index !== index2 && image2.classList.remove("active");
        });

        gameContainer.classList.add("start");

        let time = setTimeout(() => {
            gameContainer.classList.remove("start");
            let imagesrc = e.target.querySelector("img").src;
            userResult.src = imagesrc;

            let random = Math.floor(Math.random() * 3);
            let compimg = ["images/paper.png", "images/rock.png", "images/scissors.png"]
            compResult.src = compimg[random];

            let compValue = ["R", "P", "S"][random];
            let userValue = ["R", "P", "S"][index];

            let outcomes = {
                RR: "Draw",
                RP: "Comp",
                RS: "User",
                PP: "Draw",
                PR: "User",
                PS: "Comp",
                SS: "Draw",
                SR: "Comp",
                SP: "User"
            };
            let outcomesValue = outcomes[compValue + userValue];

            result.textContent = userValue === compValue ? "Match Draw" : `${outcomesValue} Won!!`;
        }, 2500);

    });
});