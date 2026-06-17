import { useState, useEffect } from "react";
import { fetchGames } from "../services/games";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import CompareSection from "../components/CompareSection";

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
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const navigate = useNavigate();
 
  useEffect(() => {
    const timerId = setTimeout(() => {
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
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [search, category]);

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

  function handleCompareSelected(id) {
    const compareSelected = selectedForCompare.some((comp) => comp === id);
    if (!compareSelected && selectedForCompare.length < 2) {
      setSelectedForCompare([...selectedForCompare, id]);
    }
  }

  function handleRemoveFromCompare(id) {
    const removeComp = selectedForCompare.filter((s) => s !== id);
    setSelectedForCompare(removeComp);
  }

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
        <div className="row g-4 m-2">
          {gamesToDisplay.map((g) => (
            <GameCard
              key={g.id}
              game={g}
              selectedCompare={selectedForCompare}
              handleCompare={() => handleCompareSelected(g.id)}
            />
          ))}
        </div>
        <div className="mt-5 p-4 bg-light rounded-4 border border-2 border-dashed border-primary-subtle position-relative overflow-hidden">
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-white opacity-25 pointer-events-none"></div>

          <div className="position-relative z-1">
            <div className="text-center mb-4">
              <h3 className="fw-bold text-dark m-0">Confronta i giochi</h3>
              <p className="text-muted small">
                Seleziona due giochi dalle schede sopra per confrontarli
              </p>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <CompareSection
                  selectedIds={selectedForCompare}
                  onRemove={handleRemoveFromCompare}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
