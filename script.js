const playlistData = [
  { name: "Song 1 - Artist 1", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_1" },
  { name: "Song 2 - Artist 2", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_2" },
  { name: "Song 3 - Artist 3", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_3" },
];

let username = '';
let roomName = '';
let userTelegramUsername = '';

// DOM Elements
const popup = document.getElementById('popup');
const joinRoomBtn = document.getElementById('joinRoomBtn');
const userNameInput = document.getElementById('username');
const roomNameInput = document.getElementById('roomNameInput');
const roomNameForm = document.getElementById('roomNameForm');
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

// Check if username and room name are saved
if (localStorage.getItem('username')) {
  username = localStorage.getItem('username');
  roomName = localStorage.getItem('roomName');
  
  if (roomName) {
    roomNameElement.textContent = roomName;
    roomContainer.style.display = 'block';
    showToast(`${username}, welcome back to the ${roomName} room!`);
    loadPlaylist();
  } else {
    showRoomNameInput();
  }
} else {
  popup.style.display = 'flex';
}

// Join Room Button Logic
joinRoomBtn.addEventListener('click', () => {
  if (!username) {
    username = userNameInput.value.trim();
    if (username) {
      localStorage.setItem('username', username);
      showToast(`Hello ${username}, now enter your room name.`);
      showRoomNameInput();
    } else {
      alert('Please enter a valid name.');
    }
  } else {
    roomName = roomNameInput.value.trim();
    if (roomName) {
      localStorage.setItem('roomName', roomName);
      roomNameElement.textContent = roomName;
      popup.style.display = 'none';
      roomContainer.style.display = 'block';
      showToast(`Welcome to the ${roomName} room, ${username}!`);
      loadPlaylist();
    } else {
      alert('Please enter a valid room name.');
    }
  }
});

function showRoomNameInput() {
  userNameInput.style.display = 'none';
  roomNameForm.style.display = 'block';
}

function loadPlaylist() {
  if (playlistElement.children.length === 0) {
    playlistData.forEach((song) => {
      const li = document.createElement("li");
      li.textContent = song.name;
      li.addEventListener("click", () => playSong(song.preview_url, song.name));
      playlistElement.appendChild(li);
    });
  }
}

function playSong(previewUrl, songName) {
  audioPlayer.src = previewUrl;
  audioPlayer.play();

  if (!userTelegramUsername) {
    const telegramUsername = prompt("Enter your Telegram username:");
    if (telegramUsername) {
      userTelegramUsername = telegramUsername;
      showToast(`Telegram username saved: @${userTelegramUsername}`);
    } else {
      alert("You must enter your Telegram username to log the action.");
    }
  }

  logUserAction(username, songName);
}

function logUserAction(user, songName) {
  const message = `${user} played "${songName}" in room: ${roomName}. Telegram username: @${userTelegramUsername}`;
  sendToTelegram(message);
}

function sendToTelegram(message) {
  const token = 'YOUR_BOT_TOKEN'; 
  const chatId = '-1002148651992'; 
  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
    .then(response => response.json())
    .then(data => console.log('Message sent to Telegram:', data))
    .catch(error => console.error('Error sending message to Telegram:', error));
}
