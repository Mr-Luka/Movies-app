const movieSearchBox = document.querySelector("#movie-search-box");
const searchList = document.querySelector("#search-list");
const resultGrid = document.querySelector("#result-grid");

//  load movies from API
async function loadMovies(searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=ac7d252c`
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response === "True") displayMovieList(data.Search);
}
loadMovies("lord of the rings");


function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0) {
        searchList.classList.remove("hide-search-list");
        loadMovies(searchTerm);
    } else {
        searchList.classList.add("hide-search-list");
    }
}

function displayMovieList(movies) {

}