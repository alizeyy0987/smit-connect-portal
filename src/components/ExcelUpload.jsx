import React from "react";
import * as XLSX from "xlsx";
import { supabase } from "../supabaseClient";

export default function ExcelUpload() {

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("Excel Data:", jsonData);

      // Insert into Supabase
      const { data: result, error } = await supabase
        .from("students")
        .insert(jsonData);

      if (error) {
        console.log("Error:", error);
        alert("Upload failed");
      } else {
        console.log("Success:", result);
        alert("Students uploaded successfully!");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload Students Excel</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="border p-2"
      />
    </div>
  );
}