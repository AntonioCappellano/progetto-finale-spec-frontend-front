import { useState, useEffect } from "react";
import { fetchGameById } from "../services/games";

export function useGamesByIds(ids) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (ids.length === 0) {
        setLoading(false);
        setData([]);
        return;
      }
      try {
        const promises = ids.map((id) => fetchGameById(id));
        const results = await Promise.all(promises);
        setData(results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.error(error);
      }
    }
    loadData();
  }, [ids]);
  return { data, loading, error };
}
