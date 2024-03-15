import axios from 'axios';
import getAccessToken from './spotifyAuth';

const userId = 'YOUR_SPOTIFY_USER_ID';
const playlistsUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;

const createPlaylist = async (name, description) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(
      playlistsUrl,
      {
        name: name,
        description: description,
        public: true, // Set to true if you want the playlist to be public
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.id;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};

const addTracksToPlaylist = async (playlistId, trackUris) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: trackUris,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.snapshot_id;
  } catch (error) {
    console.error('Error adding tracks to playlist:', error);
    throw error;
  }
};

export { createPlaylist, addTracksToPlaylist };
