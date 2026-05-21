import React, { useState } from "react";
import { Upload, Image as ImageIcon, Box } from "lucide-react";
import StoreScene from "./StoreScene";
import ShelfSidebar from "./ShelfSidebar";

export default function LandingPage() {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile,setSelectedFile] = useState(null);
  const [layoutData, setLayoutData] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadToBackend=async()=>{
    if(!selectedFile){
        alert("Please upload an image ");
        return ;
    }

    const formData= new FormData();

    formData.append("image",selectedFile);
    try{
        const response = await fetch("http://127.0.0.1:8000/upload",{
            method: "POST",
            body:formData,
        })
        const data = await response.json();

        setLayoutData(data.objects_detected);

        console.log(data.objects_detected);

        alert("Image uploaded successfully");

    } catch (error) {
        console.error(error);
  }

  }

  return (
    
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

    {/* Navbar */}
    <nav className="w-full flex justify-between items-center px-8 py-5 border-b border-gray-700">
      <h1 className="text-2xl font-bold tracking-wide">
        SmartStore 3D
      </h1>

      <button className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition">
        Dashboard
      </button>
    </nav>

    {/* Hero Section */}
    <section className="px-8 py-16 text-center">

      <div className="max-w-4xl mx-auto">

        <div className="flex justify-center items-center gap-3 mb-5">
          <Box size={40} className="text-cyan-400" />

          <span className="text-cyan-400 font-medium uppercase tracking-wider">
            AI Powered Store Mapping
          </span>
        </div>

        <h1 className="text-6xl font-bold leading-tight mb-6">

          Convert Your{" "}

          <span className="text-cyan-400">
            2D Shop Layout
          </span>

          {" "}Into an Interactive 3D Store

        </h1>

        <p className="text-gray-300 text-lg max-w-2xl mx-auto">

          Upload your grocery or inventory store map and let AI
          transform it into a smart 3D navigation experience.

        </p>

      </div>

    </section>

    {/* Upload Card BELOW Hero */}
    <section className="px-8 mb-10">

      <div className="bg-white/10 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl">

        <div className="flex items-center gap-3 mb-6">
          <Upload className="text-cyan-400" />

          <h2 className="text-2xl font-semibold">
            Upload Store Layout
          </h2>
        </div>

        <label className="border-2 border-dashed border-gray-500 rounded-2xl h-72 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 transition overflow-hidden">

          {preview ? (

            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-2xl"
            />

          ) : (

            <>
              <ImageIcon
                size={50}
                className="text-gray-400 mb-3"
              />

              <p className="text-gray-300 text-center px-4">
                Click to upload your 2D store map image
              </p>

              <p className="text-gray-500 text-sm mt-2">
                PNG, JPG, JPEG supported
              </p>
            </>

          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

        </label>

        {fileName && (
          <p className="mt-4 text-sm text-cyan-300">
            Uploaded: {fileName}
          </p>
        )}

        <button
          onClick={uploadToBackend}
          className="w-full mt-6 bg-cyan-400 text-black py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
        >
          Generate 3D Store
        </button>

      </div>

    </section>

    {/* Main Editor Area */}
    <section className="flex h-[900px] border-t border-gray-700">

      {/* 3D Scene */}
      <div className="flex-1">

        <StoreScene
          layoutData={layoutData}
          selectedShelf={selectedShelf}
          setSelectedShelf={setSelectedShelf}
        />

      </div>

      {/* Sidebar */}
      <ShelfSidebar
        selectedShelf={selectedShelf}
        setLayoutData={setLayoutData}
        layoutData={layoutData}
      />

    </section>

  </div>

  );
}