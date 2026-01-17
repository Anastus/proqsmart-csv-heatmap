export default function HeatmapTable({ data }) {
    if (!data || data.length === 0) return null;
  
    const supplierNames = data[0].suppliers.map((s) => s.name);
  
    return (
      <div className="heatmap-table-wrapper">
        <table className="heatmap-table">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Material</th>
              <th>Qty</th>
              <th>Est. Rate</th>
              {supplierNames.map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>
  
          <tbody>
            {data.map((row) => (
              <tr key={row.itemCode}>
                <td>{row.itemCode}</td>
                <td>{row.material}</td>
                <td>{row.quantity}</td>
                <td>${row.estimatedRate}</td>
  
                {row.suppliers.map((supplier) => (
                    <td
  key={supplier.name}
  style={{
    backgroundColor: supplier.color,
    textAlign: "center",
    padding: "8px",
  }}
>
  <div style={{ fontSize: "14px", fontWeight: 600 }}>
    {supplier.value}
  </div>
  <div
    style={{
      fontSize: "11px",
      opacity: 0.8,
      marginTop: "2px",
    }}
  >
    {supplier.percentageDiff > 0 ? "+" : ""}
    {supplier.percentageDiff}%
  </div>
</td>
))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }