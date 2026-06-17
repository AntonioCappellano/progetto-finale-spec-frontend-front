import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import FavoriteCard from "../components/FavoriteCard";
import { useNavigate } from "react-router-dom";
import { useGamesByIds } from "../hooks/useGamesByIds";

export default function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const { data: favoriteGame, loading, error } = useGamesByIds(favorites);

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
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Scopri i giochi
          </button>
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
