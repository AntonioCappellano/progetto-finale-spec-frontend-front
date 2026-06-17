import { useFavorites } from "../context/FavoritesContext";
import { useGame } from "../context/GameContext";

export default function SideBar() {
  const { games } = useGame();
  const { favorites } = useFavorites();

  const sidebarFav = games.filter((f) => favorites.includes(f.id));

  return (
    <div
      className="bg-dark text-white d-flex flex-column p-3 border-end border-secondary h-100"
      style={{ minHeight: "100vh" }}
    >
      <div className="sidebar-header pb-3 mb-3 border-bottom border-secondary">
        <h5 className="m-0 fw-bold text-primary">I Tuoi Preferiti</h5>
      </div>
      <ul className="list-group">
        {sidebarFav.length === 0 ? (
          <li className="list-group-item">Nessun Preferito</li>
        ) : (
          sidebarFav.map((s) => (
            <li key={s.id} className="list-group-item mt-2">
              <h6>{s.title}</h6>
              <p>{s.category}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
