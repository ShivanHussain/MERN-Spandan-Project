import  { useState } from "react";
import axios from "axios";
import { exportToExcel } from "./exportToExcel";

const ExportButton = ({ endpoint, fileName }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);
      const res = await axios.get(endpoint);
      exportToExcel(res.data, fileName);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      disabled={loading}
    >
      {loading ? "Exporting..." : `Export ${fileName}`}
    </button>
  );
};

export default ExportButton;
