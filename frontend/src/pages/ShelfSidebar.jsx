import React from "react";

export default function ShelfSidebar({
  selectedShelf,
  setLayoutData,
  layoutData,
}) {

  if (!selectedShelf) {
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

      {/* Width */}
      <div className="mb-5">

        <label className="block mb-2">
          Width
        </label>

        <input
          type="number"
          value={selectedShelf.width}
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
          value={selectedShelf.height}
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
          value={selectedShelf.shelfHeight || 2}
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
          value={selectedShelf.partitions || 2}
          onChange={(e) =>
            updateShelf("partitions", e.target.value)
          }
          className="w-full p-2 rounded bg-gray-800"
        />

      </div>

    </div>
  );
}