import { searchShows, getTrailerVideoId } from "./api.js";

const searchInput = document.querySelector("#q");
const searchBtn = document.querySelector("#search-button");
const resultsDiv = document.querySelector("#empty");
const playerBox = document.querySelector("#playerBox");
const resultMeta = document.querySelector("#resultMeta");

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  resultsDiv.innerHTML = `<p>Searching...</p>`;
  playerBox.innerHTML = "";

  const shows = await searchShows(query);
  resultsDiv.innerHTML = "";
  let totalShowsFound = shows.length
  if (totalShowsFound > 0) {
    resultMeta.textContent = `Showing ${totalShowsFound} results for "${query}"`;
  } else {
    resultMeta.textContent = "";
  }
  console.log(shows.length);
  if (shows.length === 0) {
    resultsDiv.innerHTML = `<p>No shows found for "${query}".</p>`;
    return;
  }

  shows.forEach((item) => {
    const show = item.show;
    if (!show.image) return;

    const div = document.createElement("div");
    div.className = "showCard";

    div.dataset.showName = show.name;

    div.innerHTML = `
            <img src="${show.image.medium}" alt="${show.name}">
            <div class="show-info">
                <h2 class="line-clamp-1">${show.name}</h2>
                <button class="watch-btn">Watch Trailer</button>
            </div>
        `;
    resultsDiv.appendChild(div);
  });
});

resultsDiv.addEventListener("click", async (e) => {
  if (e.target.classList.contains("watch-btn")) {
    playerBox.innerHTML = `<p>Finding trailer...</p>`;

    const showCard = e.target.closest(".showCard");
    const showName = showCard.dataset.showName;
    const videoId = await getTrailerVideoId(showName);

    if (videoId) {
      playerBox.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
    } else {
      playerBox.innerHTML = `<p>Sorry, trailer not found for ${showName}.</p>`;
    }
  }
});
