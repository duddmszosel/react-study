import { Routes, Route } from "react-router-dom";
import DiaryMain from "./components/DiaryMain";
import MusicSearch from "./components/MusicSearch";
import CalendarMain from "./components/CalendarMain";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DiaryMain/>} />
        <Route path="/diary" element={<DiaryMain/>} />
        <Route path="/search" element={<MusicSearch/>} />
        <Route path="/calendar" element={<CalendarMain/>} />
      </Routes>
    </>
  );
}

export default App;