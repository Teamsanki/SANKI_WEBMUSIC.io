// Check if user data is already saved in localStorage
if(localStorage.getItem("username") && localStorage.getItem("telegram") && localStorage.getItem("roomName")) {
  displayRoom();
}

// Handle user form submission
document.getElementById("submitBtn").addEventListener("click", function() {
  const username = document.getElementById("username").value;
  const telegram = document.getElementById("telegram").value;
  const roomName = document.getElementById("roomName").value;

  // Store user data in localStorage
  if(username && telegram && roomName) {
    localStorage.setItem("username", username);
    localStorage.setItem("telegram", telegram);
    localStorage.setItem("roomName", roomName);
    displayRoom();
  } else {
    alert("Please fill in all the fields.");
  }
});

function displayRoom() {
  const username = localStorage.getItem("username");
  const telegram = localStorage.getItem("telegram");
  const roomName = localStorage.getItem("roomName");

  const roomId = generateRoomId();

  document.getElementById("userForm").style.display = "none";
  document.getElementById("roomDetails").style.display = "block";

  document.getElementById("roomDisplay").textContent = roomName;
  document.getElementById("roomIdDisplay").textContent = roomId;

  loadPlaylist();

  // Send message to Telegram bot about new room and user
  sendMessageToTelegram(`New user "${username}" with Telegram username "@${telegram}" created a room named "${roomName}" (Room ID: ${roomId})`);
}

// Generate a unique room ID
function generateRoomId() {
  return Math.random().toString(36).substring(2, 10);
}

// Load music playlist
function loadPlaylist() {
  const playlist = [
    { name: "Song 1 - Artist 1", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_1" },
    { name: "Song 2 - Artist 2", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_2" },
    { name: "Song 3 - Artist 3", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_3" },
  ];

  const playlistElement = document.getElementById("playlist");
  playlist.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.addEventListener("click", () => playSong(song.preview_url));
    playlistElement.appendChild(li);
  });
}

// Play selected song
function playSong(previewUrl) {
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.src = previewUrl;
  audioPlayer.play();

  const roomId = document.getElementById("roomIdDisplay").textContent;
  const username = localStorage.getItem("username");
  sendMessageToTelegram(`User "${username}" in room "${roomId}" played the song: ${previewUrl}`);
}

// Send message to Telegram bot
function sendMessageToTelegram(message) {
  const botToken = "7902514308:AAGRWf0i1sN0hxgvVh75AlHNvcVpJ4j07HY";
  const chatId = "-1002148651992";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
}
