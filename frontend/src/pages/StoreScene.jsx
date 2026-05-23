import { Canvas } from "@react-three/fiber";
  import { OrbitControls, TransformControls } from "@react-three/drei";
  import React, { useRef, useState } from "react";

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
  function Board({ position, size, selected }) {
    return (
      <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={selected ? "#d946ef" : "#8b5a2b"}
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>
    );
  }

  function ShelfBody({ item, selected }) {
    const width = (Number(item.width) || 100) / 50;
    const depth = (Number(item.height) || 100) / 50;
    const height = Number(item.shelfHeight) || 2;
    const partitions = Number(item.partitions) || 2;
    const rows = Number(item.rows) || 3;
    const board = 0.08;

    return (
      <>
        {/* Back panel */}
        <Board
          selected={selected}
          position={[0, 0, -depth / 2]}
          size={[width, height, board]}
        />

        {/* Left and right sides */}
        <Board
          selected={selected}
          position={[-width / 2, 0, 0]}
          size={[board, height, depth]}
        />

        <Board
          selected={selected}
          position={[width / 2, 0, 0]}
          size={[board, height, depth]}
        />

        {/* Horizontal shelves */}
        {Array.from({ length: rows + 1 }).map((_, index) => {
          const y = -height / 2 + (index * height) / rows;

          return (
            <Board
              key={`row-${index}`}
              selected={selected}
              position={[0, y, 0]}
              size={[width, board, depth]}
            />
          );
        })}

        {/* Vertical partitions */}
        {Array.from({ length: partitions - 1 }).map((_, index) => {
          const x = -width / 2 + ((index + 1) * width) / partitions;

          return (
            <Board
              key={`partition-${index}`}
              selected={selected}
              position={[x, 0, 0]}
              size={[board, height, depth]}
            />
          );
        })}

            {item.items?.map((product) => (
        <ProductBox
          key={product.id}
          product={product}
          shelf={item}
        />
      ))}
      </>
    );
  }

  function DraggableShelf({
    item,
    selectedShelf,
    setSelectedShelf,
    updateShelfPosition,
    setDragging,
  }) {
    const groupRef = useRef();

    const shelfHeight = Number(item.shelfHeight) || 2;
    const isSelected = selectedShelf?.id === item.id;

    const position = [
      (Number(item.x) || 0) / 50,
      item.positionY === undefined ? shelfHeight / 2 : Number(item.positionY),
      (Number(item.y) || 0) / 50,
    ];

    const syncPosition = () => {
      if (!groupRef.current) return;

      const pos = groupRef.current.position;

      updateShelfPosition(item.id, {
        x: pos.x * 50,
        y: pos.z * 50,
        positionY: pos.y,
      });
    };

    return (
      <>
        {isSelected && (
          <TransformControls
            object={groupRef}
            mode="translate"
            onMouseDown={() => setDragging(true)}
            onMouseUp={() => {
              setDragging(false);
              syncPosition();
            }}
            onObjectChange={syncPosition}
          />
        )}

        <group
          ref={groupRef}
          position={position}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedShelf(item);
          }}
        >
          <ShelfBody item={item} selected={isSelected} />
        </group>
      </>
    );
  }

  export default function StoreScene({
    layoutData,
    selectedShelf,
    setSelectedShelf,
    setLayoutData,
  }) {
    const [dragging, setDragging] = useState(false);

    const updateShelfPosition = (id, newPosition) => {
      setLayoutData((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                ...newPosition,
              }
            : item
        )
      );
    };

    return (
      <Canvas shadows camera={{ position: [0, 10, 18], fov: 50 }}>
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[8, 12, 8]}
          intensity={1.2}
          castShadow
        />

        <OrbitControls enabled={!dragging} />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#afaaaa" />
        </mesh>

        {layoutData.map((item, index) => (
          <DraggableShelf
            key={item.id ?? index}
            item={item}
            selectedShelf={selectedShelf}
            setSelectedShelf={setSelectedShelf}
            updateShelfPosition={updateShelfPosition}
            setDragging={setDragging}
          />
        ))}
      </Canvas>
    );
  }