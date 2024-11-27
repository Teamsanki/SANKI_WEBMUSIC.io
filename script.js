// Static Playlist with Spotify Preview URLs
const playlistData = [
  { name: "Song 1 - Artist 1", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_1" },
  { name: "Song 2 - Artist 2", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_2" },
  { name: "Song 3 - Artist 3", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_3" },
];

// Load Playlist
const playlistElement = document.getElementById("playlist");
const audioPlayer = document.getElementById("audioPlayer");

// Add Songs to the Playlist
playlistData.forEach((song) => {
  const li = document.createElement("li");
  li.textContent = song.name;
  li.addEventListener("click", () => playSong(song.preview_url));
  playlistElement.appendChild(li);
});

// Play Selected Song
function playSong(previewUrl) {
  audioPlayer.src = previewUrl;
  audioPlayer.play();
}
