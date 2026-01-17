import "./HeatmapTable.css";
import { useState } from "react";
import useColumnFreeze from "../../hooks/useColumnFreeze";
import useTableSort from "../../hooks/useTableSort";
import useColumnVisibility from "../../hooks/useColumnVisibility";
import ColumnControl from "../ColumnControls/ColumnControl";

const COLUMN_WIDTHS = {
  item: 260,
  supplier: 150,
};

export default function HeatmapTable({ data }) {
  if (!data || data.length === 0) return null;

  const [activeColumnName, setActiveColumnName] = useState(null);

  const { freezeUntil, toggleFreeze } = useColumnFreeze();
  const { sortedData, sortConfig, handleSort } = useTableSort(data);

  const supplierNames = data[0].suppliers.map((s) => s.name);
  const { visibleColumns, toggleColumn } =
    useColumnVisibility(supplierNames);

  const visibleSupplierNames = supplierNames.filter(
    (name) => visibleColumns[name]
  );

  return (
    <div className="heatmap-table-wrapper" style={{ position: "relative" }}>
      <ColumnControl
        supplierNames={supplierNames}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        onFreeze={() => {
  if (!activeColumnName) return;

  const visibleIndex =
    visibleSupplierNames.indexOf(activeColumnName);

  console.log("FREEZE UNTIL =", visibleIndex + 1);

  toggleFreeze(visibleIndex + 1);
}}
        onSort={() =>
          activeColumnName &&
          handleSort(
            supplierNames.indexOf(activeColumnName)
          )
        }
      />

      <div className="heatmap-scroll">
        <table className="heatmap-table">
          <thead>
            <tr>
              <th
                className="freeze-item"
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 5,
                  background: "#fff",
                  width: COLUMN_WIDTHS.item,
                }}
              >
                Category / Item
              </th>

              {supplierNames.map((name) => {
                if (!visibleColumns[name]) return null;

                const visibleIndex =
                  visibleSupplierNames.indexOf(name);
                const isFrozen =
                  visibleIndex > -1 && visibleIndex < freezeUntil;
                  

                return (
                  <th
                    key={name}
                    onClick={() => setActiveColumnName(name)}
                    className={`${isFrozen ? "freeze-supplier" : ""} ${
                      name === activeColumnName ? "active-column" : ""
                    }`}
                    style={{
                      position: isFrozen ? "sticky" : "static",
                      left: isFrozen
                        ? COLUMN_WIDTHS.item +
                          visibleIndex *
                            COLUMN_WIDTHS.supplier
                        : undefined,
                      zIndex: isFrozen ? 4 : 1,
                      background: "#fff",
                      width: COLUMN_WIDTHS.supplier,
                      cursor: "pointer",
                    }}
                  >
                    {name}
                    {sortConfig.key ===
                      supplierNames.indexOf(name) && (
                      <span
                        className={
                          "sort-indicator " +
                          (sortConfig.direction === "asc"
                            ? "sort-asc"
                            : "sort-desc")
                        }
                      >
                        {sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"}
                      </span>
                    )}
                  </th>
                );
              })}

              <th>Est. Rate</th>
              <th>Qty</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((row) => (
              <tr key={row.itemCode}>
                <td
                  className="freeze-item"
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 3,
                    background: "#fff",
                    width: COLUMN_WIDTHS.item,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>
                    {row.itemCode}
                  </div>
                  <div style={{ fontSize: "12px", color: "#555" }}>
                    {row.material}
                  </div>
                </td>

                {row.suppliers.map((supplier) => {
                  if (!visibleColumns[supplier.name]) return null;

                  const visibleIndex =
                    visibleSupplierNames.indexOf(
                      supplier.name
                    );
                  const isFrozen =
                    visibleIndex > -1 &&
                    visibleIndex < freezeUntil;

                  return (
                    <td
                      key={supplier.name}
                      className={isFrozen ? "freeze-supplier" : ""}
                      style={{
                        position: isFrozen ? "sticky" : "static",
                        left: isFrozen
                          ? COLUMN_WIDTHS.item +
                            visibleIndex *
                              COLUMN_WIDTHS.supplier
                              : undefined,
                        backgroundColor: supplier.color,
                        zIndex: isFrozen ? 2 : 1,
                        
                          width: COLUMN_WIDTHS.supplier,
                      }}
                    >
                      <div className="supplier-cell">
                        <div className="supplier-value">
                          ${supplier.value}
                        </div>
                        <div
                          className={
                            "supplier-diff " +
                            (supplier.percentageDiff > 0
                              ? "up"
                              : supplier.percentageDiff < 0
                              ? "down"
                              : "")
                          }
                        >
                          {supplier.percentageDiff > 0 && "↑ "}
                          {supplier.percentageDiff < 0 && "↓ "}
                          {supplier.percentageDiff > 0 && "+"}
                          {supplier.percentageDiff}%
                        </div>
                      </div>
                    </td>
                  );
                })}

                <td>${row.estimatedRate}</td>
                <td>{row.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}