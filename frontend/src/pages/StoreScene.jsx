import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ShelfSidebar from "./ShelfSidebar";
import React, { useState } from "react";
function Shelf({
  item,
  selectedShelf,
  setSelectedShelf
}) {

  return (

    <mesh
      position={[
        item.x / 50,
        item.shelfHeight / 2 || 1,
        item.y / 50
      ]}

      onClick={() => setSelectedShelf(item)}
    >

      <boxGeometry
        args={[
          item.width / 50,
          item.shelfHeight || 2,
          item.height / 50
        ]}
      />

      <meshStandardMaterial
        color={
          selectedShelf?.id === item.id
            ? "hotpink"
            : "orange"
        }
      />

    </mesh>
  );
}

export default function StoreScene({
  layoutData,
  selectedShelf,
  setSelectedShelf
})  {
   
  return (

    <Canvas camera={{ position: [0, 15, 20] }}>

      <ambientLight intensity={0.8} />

      <pointLight position={[10, 10, 10]} />

      <OrbitControls />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Shelves */}
      {layoutData.map((item, index) => (

        <Shelf
            key={index}
            item={item}
            selectedShelf={selectedShelf}
            setSelectedShelf={setSelectedShelf}
        />
        ))}

    </Canvas>
  );
}