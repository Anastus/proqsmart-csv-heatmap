import { useState, useMemo } from "react";

/**
 * Table sort hook
 * - Sorts rows by supplier price
 * - Toggles ASC / DESC on same column
 */
export default function useTableSort(data) {
  const [sortConfig, setSortConfig] = useState({
    key: null,        // supplier index
    direction: "asc", // "asc" | "desc"
  });

  const handleSort = (supplierIndex) => {
    setSortConfig((prev) => {
      if (prev.key === supplierIndex) {
        return {
          key: supplierIndex,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return {
        key: supplierIndex,
        direction: "asc",
      };
    });
  };

  const sortedData = useMemo(() => {
    if (sortConfig.key === null) return data;

    const sorted = [...data].sort((a, b) => {
      const aVal = a.suppliers[sortConfig.key]?.value ?? 0;
      const bVal = b.suppliers[sortConfig.key]?.value ?? 0;

      return sortConfig.direction === "asc"
        ? aVal - bVal
        : bVal - aVal;
    });

    return sorted;
  }, [data, sortConfig]);

  return {
    sortedData,
    sortConfig,
    handleSort,
  };
}