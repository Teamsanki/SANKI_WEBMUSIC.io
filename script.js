const clientId = "c7f630571ba54877bbf43d04ebec8f9c";
const redirectUri = "http://localhost:5500"; // E.g., http://localhost:5500
const scope = "user-read-playback-state user-modify-playback-state";

let accessToken;

// Step 1: Authenticate User
document.getElementById("loginButton").addEventListener("click", () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}`;
  window.location = authUrl;
});

// Step 2: Retrieve Access Token from URL
window.onload = () => {
  const hash = window.location.hash;
  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    accessToken = params.get("access_token");
    loadPlaylist();
  }
};

// Step 3: Fetch Songs from Spotify
async function loadPlaylist() {
  if (!accessToken) return;

  const response = await fetch("https://api.spotify.com/v1/playlists/YOUR_PLAYLIST_ID", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await response.json();
  const playlist = document.getElementById("playlist");

  data.tracks.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.track.name;
    li.addEventListener("click", () => playTrack(item.track.preview_url));
    playlist.appendChild(li);
  });
}

// Step 4: Play Selected Track
function playTrack(previewUrl) {
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.src = previewUrl;
  audioPlayer.play();
}
