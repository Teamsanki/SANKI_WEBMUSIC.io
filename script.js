// Function to generate random room ID
function generateRoomId() {
  return 'ROOM-' + Math.random().toString(36).substring(2, 9).toUpperCase();
}

// Function to check if the user's session is valid
function checkSessionExpiry() {
  const timestamp = localStorage.getItem('sessionTimestamp');
  
  // If no session timestamp is found, set it for the first time
  if (!timestamp) {
    localStorage.setItem('sessionTimestamp', Date.now());
    return true;
  }

  const now = Date.now();
  const diff = now - timestamp;

  // If more than 24 hours have passed (86400000 ms), reset the session
  if (diff > 86400000) {
    localStorage.removeItem('username');
    localStorage.removeItem('roomname');
    localStorage.removeItem('roomId');
    localStorage.removeItem('sessionTimestamp');
    return false;
  }
  
  return true;
}

// Check if user has previously entered data (username, roomname, roomId)
let username = localStorage.getItem('username');
let roomname = localStorage.getItem('roomname');
let roomId = localStorage.getItem('roomId');

// If the session is expired, reset the user's data
if (!checkSessionExpiry()) {
  document.getElementById('user-info').style.display = 'block';  // Show the form to input user info
  document.getElementById('rejoin-room').style.display = 'none';  // Hide rejoin option
} else if (username && roomname && roomId) {
  document.getElementById('rejoin-room').style.display = 'block';  // Show the rejoin option
  document.getElementById('user-info').style.display = 'none';  // Hide the form
} else {
  document.getElementById('user-info').style.display = 'block';  // Show the form
  document.getElementById('rejoin-room').style.display = 'none';  // Hide rejoin option
}

// Submit Button for creating a new user
document.getElementById('joinRoomBtn').addEventListener('click', function() {
  username = document.getElementById('username').value;
  roomname = document.getElementById('roomname').value;

  if (username && roomname) {
    // Generate a room ID if it doesn't exist already
    if (!roomId) {
      roomId = generateRoomId();
      localStorage.setItem('roomId', roomId);
    }

    localStorage.setItem('username', username);
    localStorage.setItem('roomname', roomname);
    localStorage.setItem('sessionTimestamp', Date.now());  // Update session timestamp

    // Hide the user info form and display room info
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('room-info').style.display = 'block';
    document.getElementById('roomNameDisplay').textContent = roomname;
    document.getElementById('roomIdDisplay').textContent = roomId;

    loadPlaylist();
  } else {
    alert('Please enter both username and room name.');
  }
});

// Handle rejoining the room with room ID
document.getElementById('rejoinBtn').addEventListener('click', function() {
  const enteredRoomId = document.getElementById('roomIdInput').value;

  if (enteredRoomId === roomId) {
    // User rejoined successfully
    document.getElementById('rejoin-room').style.display = 'none';
    document.getElementById('room-info').style.display = 'block';
    document.getElementById('roomNameDisplay').textContent = roomname;
    document.getElementById('roomIdDisplay').textContent = roomId;

    loadPlaylist();
  } else {
    alert('Invalid Room ID. Please enter a valid room ID.');
  }
});

// Load Playlist
function loadPlaylist() {
  const playlistElement = document.getElementById('playlist');
  const audioPlayer = document.getElementById('audioPlayer');

  const playlistData = [
    { name: "Ishq di bajiyaan", preview_url: "https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sanki%2FIshq%20Di%20Baajiyaan%20-%20Diljit%20Dosanjh.mp3?alt=media&token=4e8f492c-57c1-44e9-8410-a6c4a0aa4109" },
    { name: "Song 2 - Artist 2", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_2" },
    { name: "Song 3 - Artist 3", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_3" },
  ];

  playlistData.forEach((song) => {
    const li = document.createElement('li');
    li.textContent = song.name;
    li.addEventListener('click', () => playSong(song.preview_url));
    playlistElement.appendChild(li);
  });
}

// Play Selected Song
function playSong(previewUrl) {
  const audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.src = previewUrl;
  audioPlayer.play();

  // Send message to Telegram Bot (you need to set up bot and chat_id here)
  const botToken = '7935479643:AAG_zxu1r6srCV09Jtcrw7CUoFqjL-rgdFk';
  const chatId = '-1002148651992';
  const message = `${username} played a song in room ${roomname} (Room ID: ${roomId}) (Song: ${name})`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
  fetch(url).then(response => response.json()).then(data => {
    if (data.ok) {
      console.log('Message sent to Telegram group');
    } else {
      console.error('Error sending message to Telegram group');
    }
  });
}
