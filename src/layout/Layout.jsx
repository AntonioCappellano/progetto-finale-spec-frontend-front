import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { FavoritesProvider } from "../context/FavoritesContext";
import { GameProvider } from "../context/GameContext";

export default function Layout() {
  return (
    <>
      <GameProvider>
        <FavoritesProvider>
          <NavBar />
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-2 p-0">
                <SideBar />
              </div>
              <main className="col-10 p-0">
                <Outlet />
              </main>
            </div>
          </div>
        </FavoritesProvider>
      </GameProvider>
    </>
  );
}
