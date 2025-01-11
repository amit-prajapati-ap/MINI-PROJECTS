const searchButton = document.getElementById("search-btn");
const usernameInput = document.getElementById("user-input");
const statsContainer = document.querySelector(".stats-container");
const easyProgressCircle = document.querySelector(".easy-progress");
const mediumProgressCircle = document.querySelector(".medium-progress");
const hardProgressCircle = document.querySelector(".hard-progress");
const easyLabel = document.getElementById("easy-label");
const mediumLabel = document.getElementById("medium-label");
const hardLabel = document.getElementById("hard-label");
const cardStatsContainer = document.querySelector(".stats-card");
let totalSubmissions = 0;

searchButton.addEventListener("click", () => {
    const username = usernameInput.value;
    if (validateUsername(username)) {
        statsContainer.style.display = "none";
        fetchUserDetails(username);
    }
});

//Returns True or false based on regex
function validateUsername(username) {
    if (username.trim() === "") {
        alert("Username should not be empty");
        return false;
    }

    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
        alert("Invalid Username");
        usernameInput.value = "";
    }
    return isMatching;
}

async function fetchUserDetails(username) {
    //Get Request URL
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

    try {
        searchButton.textContent = "Searching..."
        searchButton.disabled = true;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch the user details");
        }
        const data = await response.json();
        displayUserData(data);
    }
    catch (error) {
        statsContainer.innerHTML = `<p>No Data Found</p>`;
    }
    finally {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}

function displayUserData(data) {
    statsContainer.style.display = "block";
    const totalQues = data.totalQuestions;
    const totalHardQues = data.totalHard;
    const totalMediumQues = data.totalMedium;
    const totalEasyQues = data.totalEasy;

    const solvedTotalQues = data.totalSolved;
    const solvedTotalEasyQues = data.easySolved;
    const solvedTotalMediumQues = data.mediumSolved;
    const solvedTotalHardQues = data.hardSolved;

    document.querySelector("h2").innerHTML = `Username : ${usernameInput.value}`;
    usernameInput.value = "";

    updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
    updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
    updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

    totalSubs(data.submissionCalendar);

    const cardData = [
        { label: "Overall Submissions", value: totalSubmissions },
        { label: "Overall Easy Submissions", value: solvedTotalEasyQues },
        { label: "Overall Medium Submissions", value: solvedTotalHardQues },
        { label: "Overall Hard Submissions", value: solvedTotalMediumQues }
    ];
    insertCards(cardData);
}

function updateProgress(solved, total, label, circle) {
    const progressDegree = (solved / total) * 100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved} / ${total}`;
}

function totalSubs(subCalendar) {
    let sum = 0;
    for (let submission in subCalendar) {
        sum += subCalendar[submission];
    }
    totalSubmissions = sum;
}

function insertCards(cardData) {
    cardStatsContainer.innerHTML = cardData.map(
        data => {
            return `
                <div class="card">
                    <h3>${data.label}</h3>
                    <p>${data.value}</p>
                </div>     
            `;
        }
    ).join("");
}