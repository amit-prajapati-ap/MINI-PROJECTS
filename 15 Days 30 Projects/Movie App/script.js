const apiKey = "f60dfab5";




const searchButton = document.querySelector(".btn");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".input-box");

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== "") {
        getMovieInfo(movieName);
    }
    else {
        showErrorMessage("Enter movie name to get movie information");
    }
});

async function getMovieInfo(movie) {
    try {
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;
        let response = await fetch(url);
        let data = await response.json();
        if(!response.ok) {
            throw new Error("Unable to Fetch Movie Data");
        }
        showMovieData(data);
    }
    catch (error) {
        showErrorMessage("Movie Not Found!!!");
    }

}

function showMovieData(data) {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove("noBackground");

    //Object Destructuring
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-info");
    movieElement.innerHTML = `
        <h2>${Title}</h2>
        <p><strong>Rating: &#11088;</strong>${imdbRating}</p>
    `;
    const movieGenre = document.createElement("div");
    movieGenre.classList.add("movie-genre");
    Genre.split(",").forEach(element => {
        const p = document.createElement("p");
        p.innerText = element;
        movieGenre.appendChild(p);
    });
    movieElement.appendChild(movieGenre);

    movieElement.innerHTML += `
        <p><strong>Released Date: </strong>${Released}</p>
        <p><strong>Duration: </strong>${Runtime}</p>
        <p><strong>Cast: </strong>${Actors}</p>
        <p><strong>Plot: </strong>${Plot}</p>
    `;

    //Creating Movie Poster
    const moviePoster = document.createElement("div");
    moviePoster.classList.add("movie-poster");
    moviePoster.innerHTML = `<img src=${Poster}>`;

    movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(movieElement);
}

function showErrorMessage(message) {
    movieContainer.innerHTML = `<h2>${message}</h2>`
    movieContainer.classList.add("noBackground");
}