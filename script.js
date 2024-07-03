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


function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach(movie=> {
        movie.addEventListener("click", async()=> {
            searchList.classList.add("hide-search-list");
            movieSearchBox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=ac7d252c`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        })
    })
}