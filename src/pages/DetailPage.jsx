import { useParams } from "react-router-dom";
import { fetchGameById } from "../services/games";
import { useState, useEffect } from "react";
import GameDetailCard from "../components/GameDetailCard";

export default function DetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetailPage() {
      try {
        const data = await fetchGameById(id);
        setGame(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.error(error);
      }
    }
    loadDetailPage();
  }, [id]);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <>
      <div className="container mt-5">
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <GameDetailCard game={game} />
        </div>
      </div>
    </>
  );
}
