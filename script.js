// Static Playlist with Spotify Preview URLs
const playlistData = [
  { name: "Song 1 - Artist 1", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_1" },
  { name: "Song 2 - Artist 2", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_2" },
  { name: "Song 3 - Artist 3", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_3" },
];

let username = '';
let roomName = 'SANKI HOUSE'; // Default room name
let userTelegramUsername = '';

// DOM elements
const popup = document.getElementById('popup');
const joinRoomBtn = document.getElementById('joinRoomBtn');
const userNameInput = document.getElementById('username');
const roomNameInput = document.getElementById('roomNameInput');
const roomContainer = document.getElementById('roomContainer');
const roomNameElement = document.getElementById('roomName');
const playlistElement = document.getElementById("playlist");
const audioPlayer = document.getElementById("audioPlayer");
const toast = document.getElementById('toast');

// Function to show toast message
function showToast(message) {
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// Check if the username is already stored in localStorage
if (localStorage.getItem('username')) {
  username = localStorage.getItem('username');
  roomName = localStorage.getItem('roomName') || 'SANKI HOUSE'; // Default or saved room name
  roomNameElement.textContent = roomName;
  roomContainer.style.display = 'block';
  showToast(`${username}, welcome back to the room!`);
  loadPlaylist();
} else {
  // If not, show the popup to enter the username
  popup.style.display = 'flex';
}

// Join room process (for room name)
joinRoomBtn.addEventListener('click', () => {
  if (!username) {
    username = userNameInput.value.trim();
    if (username) {
      localStorage.setItem('username', username); // Save username in localStorage
      showToast(`${username}, you have joined the platform!`);
      showRoomNameInput(); // Show room name input
    } else {
      alert('Please enter a name');
    }
  } else {
    roomName = roomNameInput.value.trim();
    if (roomName) {
      // Store room name and show the music list
      localStorage.setItem('roomName', roomName);
      roomNameElement.textContent = roomName;
      roomContainer.style.display = 'block';
      popup.style.display = 'none';
      showToast(`Welcome to ${roomName}, ${username}!`);
      loadPlaylist();
    } else {
      alert('Please enter a valid room name');
    }
  }
});

// Show room name input
function showRoomNameInput() {
  const roomNameForm = document.getElementById('roomNameForm');
  roomNameForm.style.display = 'block';
}

// Load Playlist
function loadPlaylist() {
  // Prevent loading the playlist multiple times
  if (playlistElement.children.length === 0) {
    playlistData.forEach((song) => {
      const li = document.createElement("li");
      li.textContent = song.name;
      li.addEventListener("click", () => playSong(song.preview_url, song.name));
      playlistElement.appendChild(li);
    });
  }
}

// Play selected song
function playSong(previewUrl, songName) {
  // Display room name with song name
  alert(`Now playing in room: ${roomName} - Song: ${songName}`);
  
  audioPlayer.src = previewUrl;
  audioPlayer.play();

  // Check if Telegram username is set, if not ask for it
  if (!userTelegramUsername) {
    let telegramUsername = prompt("Please enter your Telegram username:");
    if (telegramUsername) {
      userTelegramUsername = telegramUsername;
      showToast(`Your Telegram username is saved: @${userTelegramUsername}`);
    } else {
      alert("You must enter your Telegram username to log the action.");
    }
  }

  // Log user action and send message to Telegram
  logUserAction(username, songName);
}

// Log user actions and send to Telegram
function logUserAction(user, songName) {
  const message = `${user} played: ${songName} in room: ${roomName}. Telegram username: @${userTelegramUsername}`;
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
