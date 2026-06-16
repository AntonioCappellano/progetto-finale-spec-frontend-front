import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { fetchGameById } from "../services/games";
import FavoriteCard from "../components/FavoriteCard";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favoriteGame, setFavoriteGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  useEffect(() => {
    async function favGames() {
      if (favorites.length === 0) {
        setLoading(false);
        setFavoriteGame([]);
        return;
      }
      try {
        const promises = favorites.map((id) => fetchGameById(id));
        const results = await Promise.all(promises);
        setFavoriteGame(results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.error(error);
      }
    }
    favGames();
  }, [favorites]);
  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;
  return (
    <>
      {favoriteGame.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
          <i className="bi bi-emoji-frown" style={{ fontSize: "3rem" }}></i>
          <p>
            <strong>Non hai ancora preferiti</strong>
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>Scopri i giochi</button>
        </div>
      ) : (
        <div className="row g-4 m-2">
          {favoriteGame.map((f) => (
            <FavoriteCard key={f.id} game={f} />
          ))}
        </div>
      )}
    </>
  );
}
