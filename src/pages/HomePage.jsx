import { useState, useEffect } from "react";
import { fetchGames } from "../services/games";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [initialLoading, setInitialLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchGames("", "");
        const allGames = data.map((g) => g.category);
        const uniqueGame = new Set(allGames);
        const uniqueGamesArray = [...uniqueGame];
        setAllCategories(uniqueGamesArray);
      } catch (error) {
        console.error(error);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadGames() {
      try {
        setLoading(true);
        const data = await fetchGames(search, category);
        setGames(data);
        setInitialLoading(false);
        setLoading(false);
      } catch (error) {
        setInitialLoading(false);
        setLoading(false);
        setError(error.message);
        console.error(error);
      }
    }
    loadGames();
  }, [search, category]);

  function handleSort(field) {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }
  const sortedGame = () => {
    if (sortField === "") {
      return [...games];
    }
    return [...games].sort((a, b) => {
      return sortOrder === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    });
  };

  const gamesToDisplay = sortedGame();

  if (initialLoading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;
  return (
    <>
      <div className="container my-4">
        <div className="card p-4 shadow-sm">
          <h4 className="mb-3 text-secondary">Cerca il gioco:</h4>

          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cerca per titolo o categoria..."
                />
                {loading && (
                  <span className="input-group-text bg-white border-start-0">
                    <div
                      className="spinner-border spinner-border-sm text-primary"
                      role="status"
                    >
                      <span className="visually-hidden">sto cercando..</span>
                    </div>
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Tutte le categorie</option>
                {allCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 d-flex gap-2">
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => handleSort("title")}
              >
                Ordina per Titolo
              </button>
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => handleSort("category")}
              >
                Ordina per Categoria
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4 m-2">
        {gamesToDisplay.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </>
  );
}
