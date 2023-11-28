const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 0);
});

let menu =  document.querySelector('#menu-icon');
let navbar =  document.querySelector('.navbar');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navbar.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navbar.classList.remove('open');
};


const apiKey = 'AIzaSyBLBgv1qQcPij0nR9xS9IP5tm6dLjYdmLE'; // Replace with your YouTube Data API key
const channelId = 'UCA6yfpYhy5sWMjRGOT-OAIQ'; // Replace with the channel ID

const apiUrl = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=8&key=${apiKey}`;

async function fetchPlaylists() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		append(data.items);
		// console.log('Playlist Data:', data.items.map((playlist => playlist.id)));
		// You can handle the data as needed
	} catch (error) {
		console.error('Error fetching playlist:', error);
	}
}

function append(data) {
	let container = document.getElementById("videocontainer");

	data.forEach(({ snippet, id}) => {
		let img = snippet?.thumbnails?.high?.url;
		let title = snippet.title;
		let channelTitle = snippet.channelTitle;

		let div = document.createElement('div');
		div.className = 'video-card';
		div.innerHTML = `
	<div>
		<img src="${img}" alt="${title}">
	</div>
	<div class="video-info">
		<div class="video-title">${title}</div>
		<div class="video-channel">${channelTitle}</div>
	</div>
`;
let playlistId = {id, snippet}; // Extract the playlist ID
		div.addEventListener("click", function () {
			localStorage.setItem("playlistId", JSON.stringify(playlistId));
			window.location.href = "ytlanding.html"
		})
		container.append(div);
	});
}

fetchPlaylists();