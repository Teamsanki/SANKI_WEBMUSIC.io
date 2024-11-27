// Static Playlist with Spotify Preview URLs
const playlistData = [
  { name: "Ihq di Bajiyaan - Diljit Dosanjh", preview_url: "http://dartextremely.com/a76twv57zn?urz=82&refer=https%3A%2F%2Fdjpunjab.is%2Fsingle-track%2Fishq-di-baajiyaan-diljit-dosanjh-mp3-song-288132.html&kw=%5B%22ishq%22%2C%22di%22%2C%22baajiyaan%22%2C%22diljit%22%2C%22dosanjh%22%2C%22mp3%22%2C%22song%22%2C%22download%22%2C%22djpunjab%22%5D&key=343dbc93144cfe49ae5af42906d3a1dd&scrWidth=393&scrHeight=852&tz=5.5&v=24.10.2259&ship=&psid=djpunjab.is,djpunjab.is&sub3=invoke_layer&res=14.501&dev=e" },
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
