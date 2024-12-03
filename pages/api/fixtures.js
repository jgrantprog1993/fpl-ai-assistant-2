import fetch from 'node-fetch';

export default async function handler(req, res) {

  try {
    const response = await fetch(`https://fantasy.premierleague.com/api/fixtures/`);
    if (!response.ok) {
      return res.status(response.status).end();
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}