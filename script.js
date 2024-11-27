// Check if user has previously entered data (username and roomname)
let username = localStorage.getItem('username');
let roomname = localStorage.getItem('roomname');
let roomId = localStorage.getItem('roomId');

// Static Playlist with Spotify Preview URLs
const playlistData = [
  { name: "Ishq di bajiyaan", preview_url: "https://firebasestorage.googleapis.com/v0/b/social-bite-skofficial.appspot.com/o/Sanki%2FIshq%20Di%20Baajiyaan%20-%20Diljit%20Dosanjh.mp3?alt=media&token=4e8f492c-57c1-44e9-8410-a6c4a0aa4109" },
  { name: "Song 2 - Artist 2", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_2" },
  { name: "Song 3 - Artist 3", preview_url: "https://p.scdn.co/mp3-preview/your_preview_url_3" },
];

// Function to generate random room ID
function generateRoomId() {
  return 'ROOM-' + Math.random().toString(36).substring(2, 9).toUpperCase();
}

// Check if data exists in localStorage to decide the flow
if (!username || !roomname || !roomId) {
  // First time visit, ask for username and room name
  document.getElementById('user-info').style.display = 'block';
  document.getElementById('joinRoomBtn').addEventListener('click', function() {
    username = document.getElementById('username').value;
    roomname = document.getElementById('roomname').value;

    if (username && roomname) {
      // If no roomId exists, generate and save it
      if (!roomId) {
        roomId = generateRoomId();
        localStorage.setItem('roomId', roomId);
      }

      localStorage.setItem('username', username);
      localStorage.setItem('roomname', roomname);

      // Show room info
      document.getElementById('room-info').style.display = 'block';
      document.getElementById('roomNameDisplay').textContent = roomname;
      document.getElementById('roomIdDisplay').textContent = roomId;
      document.getElementById('user-info').style.display = 'none';
      loadPlaylist();
    } else {
      alert('Please enter both username and room name.');
    }
  });
} else {
  // User has previously saved room, ask for room ID to rejoin
  document.getElementById('rejoin-room').style.display = 'block';
  document.getElementById('rejoinBtn').addEventListener('click', function() {
    const enteredRoomId = document.getElementById('roomIdInput').value;

    if (enteredRoomId === roomId) {
      document.getElementById('room-info').style.display = 'block';
      document.getElementById('roomNameDisplay').textContent = roomname;
      document.getElementById('roomIdDisplay').textContent = roomId;
      document.getElementById('rejoin-room').style.display = 'none';
      loadPlaylist();
    } else {
      alert('Invalid Room ID. Please enter a valid room ID.');
    }
  });
}

// Load Playlist
function loadPlaylist() {
  const playlistElement = document.getElementById('playlist');
  const audioPlayer = document.getElementById('audioPlayer');

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
  const botToken = '7902514308:AAGRWf0i1sN0hxgvVh75AlHNvcVpJ4j07HY';
  const chatId = '-1002148651992';
  const message = `${username} played a song in room ${roomname} (Room ID: ${roomId})`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
  fetch(url).then(response => response.json()).then(data => {
    if (data.ok) {
      console.log('Message sent to Telegram group');
    } else {
      console.error('Error sending message to Telegram group');
    }
  });
}
