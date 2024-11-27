// Static Playlist Data
const playlistData = [
  { name: "Ihsq Di Bajiyaan", preview_url: "https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sanki%2FIshq%20Di%20Baajiyaan%20-%20Diljit%20Dosanjh.mp3?alt=media&token=4e8f492c-57c1-44e9-8410-a6c4a0aa4109" },
  { name: "Song 2 - Artist 2", preview_url: "https://p.scdn.co/mp3-preview/sample2" },
  { name: "Song 3 - Artist 3", preview_url: "https://p.scdn.co/mp3-preview/sample3" },
];

// Telegram Bot Details
const BOT_TOKEN = "7935479643:AAG_zxu1r6srCV09Jtcrw7CUoFqjL-rgdFk"; // Replace with your bot's token
const CHAT_ID = "-1002148651992"; // Replace with your group's chat ID

// Store User Information
let telegramUsername = localStorage.getItem("telegramUsername");
let roomName = localStorage.getItem("roomName");
let roomID = localStorage.getItem("roomID");

// DOM Elements
const popup = document.getElementById("popup");
const popupInput = document.getElementById("popup-input");
const popupButton = document.getElementById("popup-button");
const popupTitle = document.getElementById("popup-title");
const playlistElement = document.getElementById("playlist");
const roomNameElement = document.getElementById("room-name");
const roomIDElement = document.getElementById("room-id");
const audioPlayer = document.getElementById("audioPlayer");

// Initialize the App
function initializeApp() {
  if (!telegramUsername) {
    showPopup("Enter Telegram Username");
  } else if (!roomName) {
    showPopup("Enter Room Name");
  } else {
    displayRoomDetails();
    loadPlaylist();
  }
}

// Show Popup for User Input
function showPopup(title) {
  popup.style.display = "block";
  popupTitle.textContent = title;
  popupButton.addEventListener("click", handlePopupSubmit);
}

// Handle Popup Submit
function handlePopupSubmit() {
  const inputValue = popupInput.value.trim();
  if (inputValue) {
    if (!telegramUsername) {
      telegramUsername = inputValue;
      localStorage.setItem("telegramUsername", telegramUsername);
      popupInput.value = "";
      popup.style.display = "none";
      showPopup("Enter Room Name");
    } else if (!roomName) {
      roomName = inputValue;
      roomID = generateRoomID();
      localStorage.setItem("roomName", roomName);
      localStorage.setItem("roomID", roomID);
      popup.style.display = "none";
      displayRoomDetails();
      loadPlaylist();
    }
  }
}

// Generate Room ID
function generateRoomID() {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Display Room Details
function displayRoomDetails() {
  roomNameElement.textContent = roomName;
  roomIDElement.textContent = roomID;
}

// Load Playlist
function loadPlaylist() {
  playlistData.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.addEventListener("click", () => playSong(song.preview_url, song.name));
    playlistElement.appendChild(li);
  });
}

// Play Song and Log Action
function playSong(previewUrl, songName) {
  audioPlayer.src = previewUrl;
  audioPlayer.play();
  logAction(`${telegramUsername} played "${songName}" in room: ${roomName}, ID: ${roomID}.`);
}

// Log Action to Telegram with Error Handling
function logAction(message) {
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
    .then((response) => response.json())  // Make sure to parse the JSON response
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

// Start the App
initializeApp();
