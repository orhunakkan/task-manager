import React, { useState, useEffect } from 'react';

export const LoadingImages: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 4;
  const imageUrls = [
    '/image1.png',
    '/image2.png',
    '/image3.png',
    '/image4.png',
  ];

  useEffect(() => {
    const loadImagesSequentially = () => {
      imageUrls.forEach((url, idx) => {
        setTimeout(() => {
          const img = new Image();
          img.src = url;
          img.onload = () => setImagesLoaded((prev) => prev + 1);
        }, idx * 2000);
      });
    };

    loadImagesSequentially();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-heading">Loading Images</h2>
      {imagesLoaded < totalImages && (
        <div className="flex justify-center items-center mb-4">
          <svg className="animate-spin h-8 w-8 text-gray-500" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A8 8 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z"
            />
          </svg>
          <p className="text-gray-500 ml-2">Please wait until the images are loaded...</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {imageUrls.slice(0, imagesLoaded).map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Image ${idx + 1}`}
            className="w-1/2 h-auto"
          />
        ))}
      </div>
      {imagesLoaded === totalImages && (
        <p className="text-green-500 mt-4 text-center">
          All images are loaded!
        </p>
      )}
    </div>
  );
};