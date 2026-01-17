import { useState, useRef, useEffect } from "react";
import "./ColumnControl.css";

export default function ColumnControl({
  supplierNames,
  visibleColumns,
  toggleColumn,
  onFreeze,
  onSort,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="column-control" ref={ref}>
      {/* Freeze */}
      <button
        className="icon-btn"
        onClick={onFreeze}
        title="Freeze column"
      >
        𖦐
      </button>

      {/* Sort */}
      <button
        className="icon-btn"
        onClick={onSort}
        title="Sort column"
      >
        ⇅
      </button>

      {/* Hide dropdown */}
      <div className="dropdown-wrapper">
        <button
          className="icon-btn"
          onClick={() => setOpen((v) => !v)}
          title="Show / Hide columns"
        >
          ⌗
        </button>

        {open && (
          <div className="dropdown">
            <div className="dropdown-title">Columns</div>

            {supplierNames.map((name) => (
              <label key={name} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={visibleColumns[name]}
                  onChange={() => toggleColumn(name)}
                />
                <span>{name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}