import React, { useRef, useEffect, useState } from 'react';

export const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = 'black';

    const startDrawing = (e: MouseEvent) => {
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
      setIsDrawing(true);
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
    };

    const stopDrawing = () => {
      context.closePath();
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [isDrawing]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-heading">
        Drawing in Canvas
      </h2>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border border-gray-300"
        data-testid="drawing-canvas"
      ></canvas>
    </div>
  );
};
