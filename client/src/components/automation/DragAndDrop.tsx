import React, { useState } from 'react';

export const DragAndDrop: React.FC = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItem, setDroppedItem] = useState<string | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: string
  ) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDroppedItem(draggedItem);
    setDraggedItem(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-heading">
        Drag and Drop
      </h2>
      <div className="flex justify-between">
        <div
          className="w-1/2 p-4 border rounded bg-gray-100"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-testid="drop-zone"
        >
          {droppedItem ? (
            <div
              className="p-4 bg-blue-500 text-white rounded"
              data-testid="dropped-item"
            >
              {droppedItem}
            </div>
          ) : (
            <div className="text-gray-500" data-testid="drop-here">
              Drop here
            </div>
          )}
        </div>
        <div className="w-1/2 p-4 space-y-4">
          {['Item 1', 'Item 2', 'Item 3'].map((item) => (
            <div
              key={item}
              className="p-4 bg-blue-500 text-white rounded cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              data-testid={`drag-item-${item}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
