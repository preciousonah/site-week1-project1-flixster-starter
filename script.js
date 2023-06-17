var submitBtn = document.getElementById("submitBtn");
var clearIcon = document.getElementById("clearIcon");
var moviesDiv = document.getElementById("moviesDiv");
var apiKey = "473f04abd2fbfb01e4074bd83ed605eb";
var currentPage = 1;
var totalPages = 0;
var searchQuery = '';

// Function to fetch movies from the API and add them to the list
async function fetchAndDisplayMovies() {
  try {
    let url;
    if (searchQuery) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;

    totalPages = data.total_pages;

    movies.forEach((movie) => {
      const title = movie.title;
      const posterPath = movie.poster_path;
      const votes = movie.vote_count;

      // Create movie card
      const card = document.createElement("div");
      card.classList.add("movie-card");

      // Add movie poster image
      const posterImage = document.createElement("img");

      if (posterPath === null){
        posterImage.src = `https://www.ncenet.com/wp-content/uploads/2020/04/no-image-png-2.png`;
      } else {
        posterImage.src = `https://image.tmdb.org/t/p/w500/${posterPath}`;
      }
      card.appendChild(posterImage);
      // Add movie title
      const titleElement = document.createElement("h2");
      titleElement.textContent = title;
      card.appendChild(titleElement);

      // Add movie votes
      const votesElement = document.createElement("p");
      votesElement.textContent = `⭐️ ${votes}`;
      card.appendChild(votesElement);

      // Add movie card to moviesDiv
      moviesDiv.appendChild(card);
    });

    // console.log(data.results[0]);
    // console.log(data.results[0].title);
  } catch (error) {
    console.log(error);
  }
}

// Function to handle the "Load More" button click event
function handleLoadMoreClick() {
  if (currentPage < totalPages) {
    currentPage++;
    fetchAndDisplayMovies();
  } else {
    // Disable the "Load More" button if all pages have been loaded
    loadMoreBtn.disabled = true;
  }
}

// Function to clear the movie results
// Function to clear the movie results and display all movies
function clearMovieResults() {
  moviesDiv.innerHTML = "";
  currentPage = 1;
  totalPages = 0;
  loadMoreBtn.disabled = false;
}

// Perform initial movie search when the page loads
fetchAndDisplayMovies();

// Add event listeners
submitBtn.addEventListener("click", async (event) => {
  console.log("Running serach handler")
  event.preventDefault();
  clearMovieResults(); // Clear the existing movie list
  searchQuery = document.getElementById("searchInput").value; // Get the search query
  await fetchAndDisplayMovies();
});

clearIcon.addEventListener("click", async () => {
  console.log("Running clear handler")
  document.getElementById("searchInput").value = ""; // Clear the search input value
  searchQuery = ""; // Clear the search query
  clearMovieResults(); // Clear the movie results and display all movies
  await fetchAndDisplayMovies();
});

loadMoreBtn.addEventListener("click", handleLoadMoreClick);