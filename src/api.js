
export async function searchShows(query) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch shows:", error);
    return [];
  }
}

export async function getTrailerVideoId(showName) {
  const API_KEY = "AIzaSyDLBKjQNXEsrTNdQ6-J7IdJ6a6MOHQ9VFU";
  const query = encodeURIComponent(`${showName} official trailer`);

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&type=type=video&maxResults=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("YouTube API request failed");
    }
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

// export default searchShows
