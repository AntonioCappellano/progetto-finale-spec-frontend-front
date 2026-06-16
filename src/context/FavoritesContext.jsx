import { createContext, useState, useContext } from "react";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  function addFavorite(id) {
    const isFavorite = favorites.some((favId) => favId === id);
    if (!isFavorite) {
      setFavorites([...favorites, id]);
    }
  }
  function removeFavorite(id) {
    const removeFav = favorites.filter((f) => f !== id);
    setFavorites(removeFav);
  }
  function isFavorite(id) {
    return favorites.some((favId) => favId === id);
  }

  const value = { favorites, addFavorite, removeFavorite, isFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve essere usato dentro FavoritesProvider");
  }
  return context;
}

export { FavoritesProvider, useFavorites };
