
import { useEffect } from "react";
import "../App.css";
import SearchComponent from "./SearchComponent";
import SpotifyLogin from "./SpotifyLogin";

// secret: b175dbeb03d9439498869bdf15df94c4

const MusicSearch = () => {
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "  ";
      window.localStorage.setItem("token", token);
    }
  }, [])


  return (
    <div className="App">
      <SearchComponent />
    </div>
  );
}

export default MusicSearch;