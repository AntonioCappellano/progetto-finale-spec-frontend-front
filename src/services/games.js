const urlGames = `http://localhost:3001`;

export async function fetchGames() {
  try {
    const response = await fetch(`${urlGames}/games`);
    if (!response.ok) {
      throw new Error("non è stato possibile recuperare il videogioco");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchGameById(id) {
  try {
    const response = await fetch(`${urlGames}/games/${id}`);
    if (!response.ok) {
      throw new Error("non è stato possibile recuperare il videogioco");
    }
    const data = await response.json();
    return data.game;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
