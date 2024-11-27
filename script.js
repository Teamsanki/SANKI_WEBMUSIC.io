// Define the bot token and group chat ID
const BOT_TOKEN = "7902514308:AAGRWf0i1sN0hxgvVh75AlHNvcVpJ4j07HY"; // Replace with your bot token
const CHAT_ID = "-1002148651992"; // Replace with your group's chat ID

// Simulated playlist data (use actual song preview URLs)
const playlistData = [
  { name: "Song 1 - Artist 1", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_1" },
  { name: "Song 2 - Artist 2", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_2" },
  { name: "Song 3 - Artist 3", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_3" },
];

let userName = "";
let roomName = "";
let roomID = "";

// Initialize the app
document.addEventListener("DOMContentLoaded", function() {
  // Check if username and roomName are stored in localStorage
  if (localStorage.getItem("userName") && localStorage.getItem("roomName")) {
    // Load stored values
    userName = localStorage.getItem("userName");
    roomName = localStorage.getItem("roomName");
    roomID = localStorage.getItem("roomID");
    document.getElementById("roomID").innerText = roomID;
    document.getElementById("roomInfo").style.display = "block";
    loadPlaylist();
    sendLogToTelegram(`${userName} has returned to room: ${roomName} with Room ID: ${roomID}`);
  } else {
    // If not stored, show input form
    document.getElementById("submitBtn").addEventListener("click", handleSubmit);
  }
});

// Handle form submission
function handleSubmit() {
  userName = document.getElementById("userName").value.trim();
  roomName = document.getElementById("roomName").value.trim();

  if (userName && roomName) {
    roomID = generateRoomID();
    document.getElementById("roomID").innerText = roomID;
    document.getElementById("roomInfo").style.display = "block";
    document.getElementById("userInput").style.display = "none";
    loadPlaylist();
    
    // Store values in localStorage
    localStorage.setItem("userName", userName);
    localStorage.setItem("roomName", roomName);
    localStorage.setItem("roomID", roomID);
    
    sendLogToTelegram(`${userName} has joined the room: ${roomName} with Room ID: ${roomID}`);
  }
}

// Generate a random room ID
function generateRoomID() {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Load Playlist and display it
function loadPlaylist() {
  const playlistElement = document.getElementById("playlist");
  playlistElement.style.display = "block";
  
  playlistData.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.addEventListener("click", () => playSong(song.preview_url, song.name));
    playlistElement.appendChild(li);
  });
}

// Play the song and send log to Telegram
function playSong(previewUrl, songName) {
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.src = previewUrl;
  audioPlayer.play();

  // Send the log to Telegram group
  sendLogToTelegram(`${userName} in room ${roomName} (ID: ${roomID}) is now playing: ${songName}`);
}

// Send log message to the Telegram group
function sendLogToTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: CHAT_ID,
    text: message,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        console.log("Log message sent to Telegram.");
      } else {
        console.error("Error sending message to Telegram:", data.description);
      }
    })
    .catch((error) => {
      console.error("Error connecting to Telegram API:", error);
    });
}
