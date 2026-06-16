import { createContext, useContext, useEffect, useState } from "react";
import { fetchGames } from "../services/games";
const GameContext = createContext();

function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function loadGames() {
      try {
        const data = await fetchGames("","");
        setGames(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadGames();
  }, []);
  const value = { games };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
function useGame() {
  const context = useContext(GameContext);
  return context;
}

export { GameProvider, useGame };
