import { useState } from "react";
import { parseCsvFile } from "../utils/csvParser";

export function useCsvParser() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const parseFile = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const parsedData = await parseCsvFile(file);
      setData(parsedData);
    } catch (err) {
      setError(err.message || "Failed to parse CSV file");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    parseFile,
  };
}