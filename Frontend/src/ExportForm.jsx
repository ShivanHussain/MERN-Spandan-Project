import React, { useState } from "react";
import axios from "axios";
import { exportToExcel } from "./exportToExcel";

const ExportForm = () => {
  const [endpoint, setEndpoint] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleExport = async (e) => {
    e.preventDefault();
    if (!endpoint || !fileName) {
      setMessage("Please enter both endpoint and filename.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const res = await axios.get(endpoint);
      exportToExcel(res.data, fileName);
      setMessage("✅ Excel file generated successfully.");
    } catch (error) {
      console.error("Export error:", error);
      setMessage("❌ Failed to fetch data. Check your endpoint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-900 text-white p-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Export Data to Excel</h2>
        <form onSubmit={handleExport} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">API Endpoint</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="/api/group-events/tid/T123"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">File Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Group_T123_Data"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Exporting..." : "Export to Excel"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default ExportForm;
