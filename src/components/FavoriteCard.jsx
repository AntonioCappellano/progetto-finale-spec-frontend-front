import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoriteCard({ game }) {
  const navigate = useNavigate();
  const { removeFavorite } = useFavorites();

  return (
    <div className="col-4">
      <div className="card h-100 shadow-sm">
        <div
          className="card-body"
          onClick={() => navigate(`/games/${game.id}`)}
          style={{ cursor: "pointer" }}
        >
          <h5 className="card-title">{game.title}</h5>
          <p className="card-text">Categoria: {game.category}</p>
          <p className="card-text">Prezzo: {game.price}$</p>
          <p className="card-text">Rating: {game.rating}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFavorite(game.id);
            }}
          >
            <i className="bi bi-heart-fill text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
