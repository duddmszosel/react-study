import { Routes, Route } from "react-router-dom";
import DiaryMain from "./components/DiaryMain";
import MusicSearch from "./components/MusicSearch";
import CalendarMain from "./components/CalendarMain";
import Header from "./components/SpotifyLogin.jsx";


function App() {
  return (
    <>
        <div>
            <Header/>
            <div className='neonLine'></div>
        </div>
      <Routes>
        <Route path="/" element={<CalendarMain/>}  />
        <Route path="/diary" element={<DiaryMain/>} />
        <Route path="/search" element={<MusicSearch/>} />
        {/* <Route path="/calendar" element={<CalendarMain/>} /> */}
      </Routes>
    </>
  );
}

export default App;