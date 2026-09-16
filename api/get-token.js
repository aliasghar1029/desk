export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://desk-tool.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      res.status(200).json({ access_token: data.access_token });
    } else {
      res.status(400).json({ error: 'Token refresh failed', details: data });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
