// src/components/SpotifyLogin.js
import { useEffect, useState } from 'react';

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
  ];

function SpotifyLogin() {

    const [token, setToken] = useState("");

    const {
        VITE_SPOTIFY_CLIENT_ID,
        // VITE_SPOTIFY_SECRET_ID,
        VITE_REDIRECT_URI
    } = import.meta.env;

    const RESPONSE_TYPE = "token";
    

    const handleLogin = () => {
        const authUrl = `${AUTH_ENDPOINT}?client_id=${VITE_SPOTIFY_CLIENT_ID}&redirect_uri=${VITE_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes.join(
        '%20',
        )}&show_dialog=false`;
        window.location.href = authUrl;
    };

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) setToken(token);
    }, []);

    return (
        <header>
            <h2>React Study</h2>
            {
                token.length > 0 ?
                <button onClick={logout}>logout</button> :
                <button onClick={handleLogin}>Login</button>
            }
        </header>
    );
}

export default SpotifyLogin;
