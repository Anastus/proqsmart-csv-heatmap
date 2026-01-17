import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import TablePage from "./pages/TablePage";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "24px" }}>
        <h1>CSV Supplier Heatmap – ProQSmart Assignment</h1>

        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;