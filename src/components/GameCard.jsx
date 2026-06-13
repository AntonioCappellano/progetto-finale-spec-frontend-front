import { useNavigate } from "react-router-dom";

export default function GameCard({ game }) {
  const navigate = useNavigate();

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
        </div>
      </div>
    </div>
  );
}
