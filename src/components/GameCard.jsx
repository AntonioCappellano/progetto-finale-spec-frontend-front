import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function GameCard({ game, selectedCompare, handleCompare }) {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(game.id);

  const isSelected = selectedCompare.includes(game.id);
  const limitReached = selectedCompare.length >= 2;
  const isDisabled = isSelected || limitReached;

  function getButtonText(isSelected, limitReached) {
    if (isSelected) return "Selezionato";
    else if (limitReached) return "Limite Raggiunto";
    else return "Aggiungi al confronto";
  }
  return (
    <div className="col-4">
      <div className="card h-100 shadow-sm">
        <div
          className="card-body"
          onClick={() => navigate(`/games/${game.id}`)}
          style={{ cursor: "pointer" }}
        >
          <h5 className="card-title">{game.title}</h5>
          <p className="card-text">{game.category}</p>
          <div className="d-flex justify-content-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                favorite ? removeFavorite(game.id) : addFavorite(game.id);
              }}
            >
              <i
                className={
                  favorite ? "bi bi-heart-fill text-danger" : "bi bi-heart"
                }
              ></i>
            </button>
            <div onClick={(e) => e.stopPropagation()}>
              <button
                className="btn btn-primary btn-sm"
                disabled={isDisabled}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompare();
                }}
              >
                {getButtonText(isSelected, limitReached)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
