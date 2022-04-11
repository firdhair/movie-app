        const search = document.querySelector(".search-value")
        const submit = document.querySelector(".submit-button")
        const movieWrapper = document.querySelector(".movie-wrapper")
        submit.addEventListener("click", getSearch)

        async function getSearch(e) {
            e.preventDefault();
            restart()
            let getMovie = search.value;
            
            const response = await fetch(`http://www.omdbapi.com/?apikey=76c0f8e8&s=${getMovie}&plot=short`, { mode: 'cors' });
            const movieData = await response.json();
            const getMovie2 = movieData.Search
            
            for(let i = 1; i < getMovie2.length; i++) {
                console.log(getMovie2[i])
                const getMovieId = movieData.Search[i].imdbID
                const response2 = await fetch(`http://www.omdbapi.com/?apikey=76c0f8e8&i=${getMovieId}`, { mode: 'cors' });
                const movieData2 = await response2.json();
                const getMoviePlot = movieData2.Plot
                
                //console.log(movieData.Search[i].Poster)
                if(movieData.Search[i].Poster !== "N/A"){
                movieWrapper.innerHTML += `
                     <div class="col-6 col-sm-6 col-md-6 col-lg-4 kartu">
                        <div class="card-body">
                            <img src="${movieData.Search[i].Poster}">
                            <h5 class="card-title">${movieData.Search[i].Title}  (${movieData.Search[i].Year})</h5>
                            <p>${getMoviePlot}</p>
                        </div>
                    </div>
                    `
                }
            }
        }


function restart(e) {
 document
    .querySelectorAll(".kartu")
    .forEach((e) => e.parentNode.removeChild(e));
}
  