async function getAccessToken() {
  const res = await fetch("/api/token");
  const data = await res.json();
  return data.access_token;
}

async function getCurrentlyPlaying() {
  const token = await getAccessToken();
  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.status === 204) {
    document.getElementById("track-name").textContent = "Not Playing";
    document.getElementById("artist-name").textContent = "";
    document.getElementById("album-art").src = "";
    return;
  }

  const data = await res.json();
  if (!data.item) return;

  document.getElementById("track-name").textContent = data.item.name;
  document.getElementById("artist-name").textContent = data.item.artists.map(a => a.name).join(", ");
  document.getElementById("album-art").src = data.item.album.images[0].url;
}

async function controlPlayback(action) {
  const token = await getAccessToken();
  let url = "";
  let method = "POST";

  if (action === "play") url = "https://api.spotify.com/v1/me/player/play";
  if (action === "pause") url = "https://api.spotify.com/v1/me/player/pause";
  if (action === "next") url = "https://api.spotify.com/v1/me/player/next";
  if (action === "prev") url = "https://api.spotify.com/v1/me/player/previous";

  await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}` }
  });

  setTimeout(getCurrentlyPlaying, 1000);
}

document.getElementById("play-pause").addEventListener("click", async () => {
  const token = await getAccessToken();
  const res = await fetch("https://api.spotify.com/v1/me/player", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();

  if (data.is_playing) {
    controlPlayback("pause");
  } else {
    controlPlayback("play");
  }
});
document.getElementById("next").addEventListener("click", () => controlPlayback("next"));
document.getElementById("prev").addEventListener("click", () => controlPlayback("prev"));

setInterval(getCurrentlyPlaying, 5000);
getCurrentlyPlaying();
