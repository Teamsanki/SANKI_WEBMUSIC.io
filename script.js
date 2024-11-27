// Static Playlist with Spotify Preview URLs
const playlistData = [
  { name: "Song 1 - Artist 1", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_1" },
  { name: "Song 2 - Artist 2", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_2" },
  { name: "Song 3 - Artist 3", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_3" },
];

let username = '';
let roomName = 'Music Room';
let usersInRoom = [];

// DOM elements
const playlistElement = document.getElementById("playlist");
const audioPlayer = document.getElementById("audioPlayer");
const joinRoomBtn = document.getElementById("joinRoomBtn");
const userNameInput = document.getElementById("username");

// Function to join room
joinRoomBtn.addEventListener('click', () => {
  username = userNameInput.value.trim();
  if (username) {
    roomName = `Room of ${username}`;
    usersInRoom.push(username);
    alert(`${username}, you have joined ${roomName}`);
    loadPlaylist();
    sendToTelegram(`${username} joined the room.`);
  } else {
    alert('Please enter a name');
  }
});

// Load Playlist
function loadPlaylist() {
  playlistData.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.addEventListener("click", () => playSong(song.preview_url));
    playlistElement.appendChild(li);
  });
}

// Play selected song
function playSong(previewUrl) {
  audioPlayer.src = previewUrl;
  audioPlayer.play();
  logUserAction(username, previewUrl);
}

// Log user actions and send to Telegram
function logUserAction(user, songUrl) {
  const songName = playlistData.find(song => song.preview_url === songUrl).name;
  const message = `${user} played: ${songName}`;
  sendToTelegram(message);
}

// Send log to Telegram (via bot)
function sendToTelegram(message) {
  const token = '7902514308:AAGRWf0i1sN0hxgvVh75AlHNvcVpJ4j07HY'; // Replace with your Telegram bot token
  const chatId = '-1002148651992'; // Replace with your Telegram chat ID
  
  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
    .then(response => response.json())
    .then(data => console.log('Message sent to Telegram:', data))
    .catch(error => console.error('Error sending message to Telegram:', error));
}
