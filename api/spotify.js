export default async function handler(req, res) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  async function getAccessToken() {
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`
    });
    const data = await response.json();
    return data.access_token;
  }

  const access_token = await getAccessToken();
  const action = req.query.action;

  if (action === 'current') {
    const r = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const json = await r.json();
    return res.status(200).json(json);
  }

  // Control commands
  if (action === 'volume') {
    const value = req.query.value;
    if (!value || isNaN(value)) {
      return res.status(400).json({ error: 'Missing or invalid volume value' });
    }
    const endpoint = `https://api.spotify.com/v1/me/player/volume?volume_percent=${value}`;
    await fetch(endpoint, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${access_token}` }
    });
    return res.status(200).json({ success: true });
  }

  let method = 'POST';
  let endpoint = '';
  switch (action) {
    case 'play': endpoint = 'https://api.spotify.com/v1/me/player/play'; break;
    case 'pause': endpoint = 'https://api.spotify.com/v1/me/player/pause'; break;
    case 'next': endpoint = 'https://api.spotify.com/v1/me/player/next'; break;
    case 'previous': endpoint = 'https://api.spotify.com/v1/me/player/previous'; break;
    default: return res.status(400).json({ error: 'Invalid action' });
  }

  await fetch(endpoint, {
    method,
    headers: { Authorization: `Bearer ${access_token}` }
  });

  return res.status(200).json({ success: true });
}
