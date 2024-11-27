const API_KEY = 'AIzaSyB4MnMiAWAcVFK4VxGKaEOl0T5zqa7CXxM';  // Replace with your YouTube API Key

function searchMusic() {
    const query = document.getElementById('searchInput').value;
    if (!query) {
        alert('Please enter a search term!');
        return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(videos) {
    const musicResults = document.getElementById('musicResults');
    musicResults.innerHTML = ''; // Clear previous results

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');

        const thumbnail = document.createElement('img');
        thumbnail.src = video.snippet.thumbnails.high.url;
        thumbnail.alt = video.snippet.title;

        const title = document.createElement('p');
        title.textContent = video.snippet.title;

        const playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.onclick = () => playVideo(video.id.videoId);

        videoElement.appendChild(thumbnail);
        videoElement.appendChild(title);
        videoElement.appendChild(playButton);

        musicResults.appendChild(videoElement);
    });
}

function playVideo(videoId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.width = '560';
    iframe.height = '315';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    const musicResults = document.getElementById('musicResults');
    musicResults.innerHTML = '';  // Clear previous results
    musicResults.appendChild(iframe);
}
