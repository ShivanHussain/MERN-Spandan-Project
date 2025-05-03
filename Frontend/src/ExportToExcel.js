import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export const exportToExcel = (data, fileName = "data") => {
  // Convert pids array to a comma-separated string for each row
  const formattedData = data.map(item => ({
    ...item,
    pids: Array.isArray(item.pids) ? item.pids.join(", ") : item.pids
  }));

  const ws = XLSX.utils.json_to_sheet(formattedData);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array"
  });

  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(dataBlob, `${fileName}.xlsx`);
};


/*
export const exportToExcel = (data, fileName = "data") => {
  // Flatten data so each pid in `pids` gets its own row
  const flattenedData = data.flatMap(item =>
    item.pids.map(pid => ({
      name: item.name,
      pid: item.pid,        // Original (maybe group leader's) pid
      tid: item.tid,
      participantPid: pid,  // Individual pid from pids array
      eventName: item.eventName,
      collegeName: item.collegeName,
      eventType: item.eventType,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }))
  );

  const ws = XLSX.utils.json_to_sheet(flattenedData);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array"
  });

  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(dataBlob, `${fileName}.xlsx`);
};

*/
/*

export const exportToExcel = (data, fileName = "data") => {
  // Format pids array to show vertically in a single cell
  const formattedData = data.map(item => ({
    ...item,
    pids: Array.isArray(item.pids) ? item.pids.join("\n") : item.pids
  }));

  const ws = XLSX.utils.json_to_sheet(formattedData);
  
  // Enable line breaks in Excel cells
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = ws[cellAddress];
      if (cell && typeof cell.v === "string" && cell.v.includes("\n")) {
        if (!cell.s) cell.s = {};
        cell.s.alignment = { wrapText: true };
      }
    }
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true
  });

  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(dataBlob, `${fileName}.xlsx`);
};
*/

