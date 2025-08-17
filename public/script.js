const colorThief = new ColorThief(); 

async function getCurrentlyPlaying() {
  const res = await fetch('/api/spotify?action=current');
  const data = await res.json();

  if (data && data.item) {
    document.getElementById('album-art').src = data.item.album.images[0].url;
    document.getElementById('track-name').textContent = data.item.name;
    document.getElementById('artist-name').textContent = data.item.artists.map(a => a.name).join(', ');

    albumArt.onload = () => {
      const [r, g, b] = colorThief.getColor(albumArt); // dominant color
      document.body.style.background = `linear-gradient(to bottom, rgba(${r},${g},${b},0.7), #000)`;
    };
  }
}

async function controlSpotify(command) {
  await fetch(`/api/spotify?action=${command}`, { method: 'POST' });
  setTimeout(getCurrentlyPlaying, 500);
}

document.getElementById('play').addEventListener('click', () => controlSpotify('play'));
document.getElementById('next').addEventListener('click', () => controlSpotify('next'));
document.getElementById('prev').addEventListener('click', () => controlSpotify('previous'));

setInterval(getCurrentlyPlaying, 5000);
getCurrentlyPlaying();
