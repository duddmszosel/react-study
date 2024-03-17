import { Routes, Route } from "react-router-dom";
import DiaryMain from "./components/DiaryMain";
import MusicSearch from "./components/MusicSearch";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DiaryMain/>} />
        <Route path="/search" element={<MusicSearch/>} />
      </Routes>
    </>
  );
}

export default App;