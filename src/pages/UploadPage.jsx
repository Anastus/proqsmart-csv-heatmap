import { useNavigate } from "react-router-dom";
import { useCsvParser } from "../hooks/useCsvParser";

function UploadPage() {
  const { data, error, loading, parseFile } = useCsvParser();
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await parseFile(file);
  };

  // When data is ready, move to table page
  if (data.length > 0) {
    navigate("/table", { state: { data } });
  }

  return (
    <div style={{ maxWidth: "600px", margin: "80px auto" }}>
      <h2>Upload CSV File</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ marginTop: "16px" }}
      />

      {loading && <p>Parsing CSV file…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default UploadPage;