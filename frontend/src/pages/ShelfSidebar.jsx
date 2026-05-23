import React, { useState } from "react";



function ProductBox({ product, shelf }) {
    const width = (Number(shelf.width) || 100) / 50;
    const depth = (Number(shelf.height) || 100) / 50;
    const height = Number(shelf.shelfHeight) || 2;

    const rows = Number(shelf.rows) || 3;
    const partitions = Number(shelf.partitions) || 3;

    const cellWidth = width / partitions;
    const cellHeight = height / rows;

    const x = -width / 2 + cellWidth * (product.col + 0.5);
    const y = -height / 2 + cellHeight * (product.row + 0.45);
    const z = depth / 2 - 0.2;

    return (
      <mesh position={[x, y, z]}>
        <boxGeometry args={[cellWidth * 0.45, cellHeight * 0.45, 0.25]} />
        <meshStandardMaterial color={product.color || "red"} />
      </mesh>
    );
  }
export default function ShelfSidebar({
  selectedShelf,
  setLayoutData,
  layoutData,
}) {
  const currentShelf = layoutData.find(
  (item) => item.id === selectedShelf?.id
);
  const [row,setRow]= useState(0);
  const [col,setCol]= useState(0);


  const addItemToShelf = () => {
    const newProduct = {
      id: crypto.randomUUID(),
      row: Number(row),
      col: Number(col),
      color: "red",
    };

    setLayoutData((prev) =>
      prev.map((item) =>
        item.id === selectedShelf.id
          ? {
              ...item,
              items: [...(item.items || []), newProduct],
            }
          : item
      )
    );
  };

  if (!currentShelf) {
    return (
      <div className="w-80 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-4">
          Shelf Editor
        </h2>

        <p className="text-gray-400">
          Select a shelf to edit
        </p>
      </div>
    );
  }

  const updateShelf = (field, value) => {

    const updated = layoutData.map((item) => {

      if (item.id === selectedShelf.id) {

        return {
          ...item,
          [field]: Number(value),
        };
      }

      return item;
    });

    setLayoutData(updated);
  };

  return (
    <div className="w-80 bg-gray-900 text-white p-5 border-l border-gray-700">

      <h2 className="text-2xl font-bold mb-6">
        Shelf Editor
      </h2>

       <button
        onClick={addItemToShelf}
        className="w-full bg-cyan-400 text-white py-2 rounded font-semibold"
      >
        Add Item
      </button>

    {/* Row*/ }
      <div className="mb-5">

        <label className="block mb-2">
          Row
        </label>

        <input
          type="number"
          value={row}
          onChange={(e)=>{setRow(e.target.value)}}
          className="w-full p-2 rounded bg-gray-800"
        />

      </div>

      {/* Partition*/ }
      <div className="mb-5">
        <label className="block mb-2">
          Partition
        </label>

        <input
          type="number"
          value={col}
          onChange={(e)=>{setCol(e.target.value)}}
          className="w-full p-2 rounded bg-gray-800"
        />
      </div>


      {/* Width */}
      <div className="mb-5">

        <label className="block mb-2">
          Width
        </label>

        <input
          type="number"
          value={currentShelf.width}
          onChange={(e) =>
            updateShelf("width", e.target.value)
          }
          className="w-full p-2 rounded bg-gray-800"
        />

      </div>

      {/* Depth */}
      <div className="mb-5">

        <label className="block mb-2">
          Depth
        </label>

        <input
          type="number"
          value={currentShelf.height}
          onChange={(e) =>
            updateShelf("height", e.target.value)
          }
          className="w-full p-2 rounded bg-gray-800"
        />

      </div>

      {/* Shelf Height */}
      <div className="mb-5">

        <label className="block mb-2">
          Shelf Height
        </label>

        <input
          type="number"
          value={currentShelf.shelfHeight || 2}
          onChange={(e) =>
            updateShelf("shelfHeight", e.target.value)
          }
          className="w-full p-2 rounded bg-gray-800"
        />

      </div>

      {/* Partitions */}
      <div className="mb-5">

        <label className="block mb-2">
          Partitions
        </label>

        <input
          type="number"
          value={currentShelf.partitions || 2}
          onChange={(e) =>
            updateShelf("partitions", e.target.value)
          }
          className="w-full p-2 rounded bg-gray-800"
        />

      </div>

    </div>
  );
}