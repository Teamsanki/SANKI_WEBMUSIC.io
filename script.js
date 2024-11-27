// Static Playlist with Spotify Preview URLs
const playlistData = [
  { name: "Ihq di Bajiyaan - Diljit Dosanjh", preview_url: "https://open.spotify.com/track/6gHVMInOPMsA4ujf0nWHSt?si=bg0C6-OEQcy0ZWCeLoXvqw&context=spotify%3Asearch%3Aishq" },
  { name: "Payal - Yo Yo Honey Singh and paradox", preview_url: "https://open.spotify.com/track/76ZWOhRRQzmb4xMoZzTjJ9?si=C4N1mxwaTH6ybnscwLTpxw" },
  { name: "Zarror - Savi kahlon", preview_url: "https://open.spotify.com/track/5thVzD79BxlDTYy0LfHzvu?si=eMt5BHvDS6SKmuSGfxqWCQ&context=spotify%3Asearch%3Azarror" },
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
