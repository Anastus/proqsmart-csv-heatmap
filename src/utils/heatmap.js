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
      return "rgb(254, 243, 199)"; 
    }
  
    const ratio = (value - min) / (max - min);
  
    if (ratio <= 0.5) {
      
      const greenToYellow = ratio / 0.5;
      const red = Math.round(255 * greenToYellow);
      return `rgb(${red}, 200, 0)`;
    } else {
      
      const yellowToRed = (ratio - 0.5) / 0.5;
      const green = Math.round(200 * (1 - yellowToRed));
      return `rgb(255, ${green}, 0)`;
    }
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