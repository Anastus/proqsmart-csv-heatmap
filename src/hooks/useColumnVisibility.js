import { useState } from "react";

export default function useColumnVisibility(supplierNames) {
  // ✅ visibility stored by NAME, not index
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const map = {};
    supplierNames.forEach((name) => {
      map[name] = true;
    });
    return map;
  });

  // ✅ IMMUTABLE toggle
  const toggleColumn = (name) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return { visibleColumns, toggleColumn };
}