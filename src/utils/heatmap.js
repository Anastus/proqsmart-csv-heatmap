import { SUPPLIER_PREFIX } from "./constants";

export function normalizeRow(row) {
  const suppliers = [];
  let estimatedRate = Number(row["Estimated Rate"]);

  Object.keys(row).forEach((key) => {
    if (key.startsWith(SUPPLIER_PREFIX)) {
      const value = Number(row[key]);
      if (!Number.isNaN(value)) {
        suppliers.push({
          name: key,
          value,
        });
      }
    }
  });

  return {
    itemCode: row["Item Code"],
    material: row["Material"],
    quantity: Number(row["Quantity"]),
    estimatedRate,
    suppliers,
  };
}

export function normalizeData(rows) {
    return rows.map(normalizeRow);
}


export function getHeatmapColor(value, min, max) {
    if (min === max) {
      return "#fff8dd"; 
    }
  
    const ratio = (value - min) / (max - min);
  
    
    if (ratio <= 0.2) {
      return "#cfe9d9"; 
    }
  
    
    if (ratio <= 0.4) {
      return "#e6f4ea"; 
    }
  
    
    if (ratio <= 0.6) {
      return "#fff8dd"; 
    }
  
    
    if (ratio <= 0.8) {
      return "#fdecec"; 
    }
  
    
    return "#f8d7da"; 
  }

  export function enrichSuppliersWithHeatmap(row) {
    const values = row.suppliers.map((s) => s.value);
  
    const min = Math.min(...values);
    const max = Math.max(...values);
  
    const suppliersWithColor = row.suppliers.map((supplier) => {
      const diff =
        row.estimatedRate !== 0
          ? ((supplier.value - row.estimatedRate) / row.estimatedRate) * 100
          : 0;
  
      return {
        ...supplier,
        color: getHeatmapColor(supplier.value, min, max),
        percentageDiff: Number(diff.toFixed(1)),
      };
    });
  
    return {
      ...row,
      suppliers: suppliersWithColor,
    };
  }

export function applyHeatmap(data) {
    return data.map(enrichSuppliersWithHeatmap);
  }