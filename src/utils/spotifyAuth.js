// src/utils/spotifyAuth.js
import axios from 'axios';


const getAccessToken = async () => {
  const {
    VITE_SPOTIFY_CLIENT_ID,
    VITE_SPOTIFY_SECRET_ID,
    // VITE_REDIRECT_URI
  } = import.meta.env;

  const basicAuth = btoa(`${VITE_SPOTIFY_CLIENT_ID}:${VITE_SPOTIFY_SECRET_ID}`);
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  try {
    const response = await axios.post(
      tokenUrl,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

export default getAccessToken;
