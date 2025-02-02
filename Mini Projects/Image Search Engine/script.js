const accessKey = 'ftY63DmBoEcY3mX7dkGupIGSdXhaD54nCtlCH69DR_s';




const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const searchButton = document.getElementById("search");
let keyword = "";
let page = 1;
async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=6`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if(page === 1) {
        searchResult.innerHTML = "";
    }
    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        const imageLink = document.createElement("a");
        image.src = result.urls.small;
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMoreBtn.style.display = "block";
}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
});

showMoreBtn.addEventListener("click",(e) => {
    e.preventDefault();
    page++;
    searchImage();
})