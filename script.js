// Check if user data is already saved in localStorag
window.onload = function () {
  const savedUsername = localStorage.getItem("username");
  const savedTelegram = localStorage.getItem("telegram");
  const savedRoomName = localStorage.getItem("roomName");

  if (savedUsername && savedTelegram && savedRoomName) {
    // User already entered data, show room details
    showRoomDetails(savedUsername, savedTelegram, savedRoomName);
  } else {
    // Prompt user to enter their details
    document.getElementById("userForm").style.display = "block";
  }
};

// Submit button click event
document.getElementById("submitBtn").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const telegram = document.getElementById("telegram").value;
  const roomName = document.getElementById("roomName").value;

  // Validate input
  if (username && telegram && roomName) {
    // Store data in localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("telegram", telegram);
    localStorage.setItem("roomName", roomName);

    // Show room details
    showRoomDetails(username, telegram, roomName);

    // Hide user form
    document.getElementById("userForm").style.display = "none";
  } else {
    alert("Please fill out all fields.");
  }
});

// Function to display room details
function showRoomDetails(username, telegram, roomName) {
  const roomId = generateRoomId();
  document.getElementById("roomDisplay").textContent = roomName;
  document.getElementById("roomIdDisplay").textContent = roomId;
  document.getElementById("welcomeMessage").textContent = `Welcome, ${username}!`;

  // Show the room details section
  document.getElementById("roomDetails").style.display = "block";

  // Populate the playlist (this is static for now, could be dynamic if needed)
  const playlist = [
    { name: "Ishq Di Baajiyaan - Diljit Dosanjh", preview_url: "https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sanki%2FIshq%20Di%20Baajiyaan%20-%20Diljit%20Dosanjh.mp3?alt=media&token=4e8f492c-57c1-44e9-8410-a6c4a0aa4109" }
  ];

  const playlistElement = document.getElementById("playlist");
  playlist.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.addEventListener("click", () => playSong(song.preview_url, roomName, roomId));
    playlistElement.appendChild(li);
}

// Generate a random room ID
function generateRoomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Play the song and log the action
function playSong(previewUrl, roomName, roomId) {
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.src = previewUrl;
  audioPlayer.play();

  // Log to Telegram
  const botToken = "7902514308:AAGRWf0i1sN0hxgvVh75AlHNvcVpJ4j07HY";
  const chatId = "-1002148651992"; // Your Telegram Group Chat ID
  const message = `${roomName} (ID: ${roomId}) - User is playing: ${previewUrl}`;

  // Send message to Telegram group
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
}
