import React from "react";

export default function Uploader({ onFileChange }) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-8 rounded-xl bg-white shadow-sm">

      <p className="text-gray-600 mb-4">
        Upload your file
      </p>

      <input
        type="file"
        onChange={onFileChange}
        className="cursor-pointer"
      />

    </div>
  );
}