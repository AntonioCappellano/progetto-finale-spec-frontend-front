import { useGamesByIds } from "../hooks/useGamesByIds";
import GameDetailCard from "./GameDetailCard";
import { useEffect, useRef } from "react";

export default function CompareSection({ selectedIds, onRemove }) {
  const { data, loading, error } = useGamesByIds(selectedIds);
  const compareSectionRef = useRef(null);
  
  useEffect(() => {
    if (data.length > 0) {
      compareSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [data]);

  if (loading) return <div>sto caricando...</div>;
  if (error) return <div>C'è stato un errore</div>;

  return (
    <>
      <div ref={compareSectionRef}>
        {data.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
            <i
              className="bi bi-arrow-left-right"
              style={{ fontSize: "3rem" }}
            ></i>
            <p className="mt-3">
              <strong>Nessun gioco selezionato</strong>
            </p>
            <p className="text-muted">
              Seleziona fino a 2 giochi dalla lista per confrontarli
            </p>
          </div>
        ) : (
          <div className="row">
            {data.map((d) => (
              <div key={d.id} className="col-6">
                <div className="position-relative">
                  <button
                    onClick={() => onRemove(d.id)}
                    className="btn btn-sm btn-danger position-absolute top-0 end-0 z-1"
                  >
                    ✕
                  </button>
                  <GameDetailCard game={d} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
