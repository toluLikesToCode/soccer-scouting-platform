import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";
import PlayerStats from "./components/Players/PlayerStats";
import GameStats from "./components/Games/GameStats";
import GameStatsProjection from "./components/Games/GameStatsProjection";
import SelectionQuery from "./components/Games/SelectionQuery";

import GameUpdateForm from "./components/Games/GameUpdateForm";
import GameCreation from "./components/Games/GameCreation";
import TableSelection from "./components/DynamicSelection/TableSelection";

import PlayerCountByClub from "./components/Players/PlayerCountByClub";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/players" element={<PlayerStats />} />
          <Route exact path="/games" element={<GameStats />} />
          <Route exact path="/tables/selection" element={<TableSelection />} />
          <Route exact path="/games/selection-query" element={<SelectionQuery />} />
          <Route exact path="/games/projection" element={<GameStatsProjection />} />
          <Route exact path="/games/update" element={<GameUpdateForm />} />
          <Route exact path="/games/add" element={<GameCreation />} />
          <Route exact path="/players/count_by_club" element={<PlayerCountByClub/>} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;