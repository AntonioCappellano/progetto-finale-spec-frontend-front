export default function GameDetailCard({ game }) {
  return (
    <div
      className="card shadow-lg border-0 mx-auto"
      style={{ maxWidth: "700px" }}
    >
      {game.img && (
        <img
          src={game.img}
          className="card-img-top"
          alt={game.title}
          style={{ height: "350px", objectFit: "cover" }}
        />
      )}

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="card-title mb-0">{game.title}</h2>
          <span className="badge bg-warning text-dark fs-6">
            {game.rating}/10
          </span>
        </div>

        <h6 className="text-muted mb-3">{game.category}</h6>

        {game.description && <p className="card-text">{game.description}</p>}

        <div className="row mt-4">
          <div className="col-md-6">
            <p>
              <strong> Prezzo:</strong> ${game.price}
            </p>
          </div>

          <div className="col-md-6">
            <p>
              <strong> Uscita:</strong> {game.release}
            </p>
          </div>
        </div>

        {game.platform?.length > 0 && (
          <div className="mt-3">
            <strong>Piattaforme:</strong>
            <div className="mt-2">
              {game.platform.map((plat) => (
                <span key={plat} className="badge bg-primary me-2 mb-2">
                  {plat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
