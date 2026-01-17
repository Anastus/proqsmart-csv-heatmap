import { useLocation } from "react-router-dom";
import { normalizeData, applyHeatmap } from "../utils/heatmap";
import HeatmapTable from "../components/HeatmapTable/HeatmapTable";

function TablePage() {
  const location = useLocation();
  const rawData = location.state?.data || [];

  const normalized = normalizeData(rawData);
  const heatmapData = applyHeatmap(normalized);

  return (
    <div>
      <HeatmapTable data={heatmapData} />
    </div>
  );
}

export default TablePage;