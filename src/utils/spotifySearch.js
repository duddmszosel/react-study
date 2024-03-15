// src/utils/spotifySearch.js
import axios from 'axios';
import getAccessToken from './spotifyAuth';

const searchUrl = 'https://api.spotify.com/v1/search';

const searchSongs = async (query) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(searchUrl, {
      params: {
        q: query,
        type: 'track',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.tracks.items;
  } catch (error) {
    console.error('Error searching songs:', error);
    throw error;
  }
};

export default searchSongs;
