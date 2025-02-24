import React from 'react';

export const OverlappingImages = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-8 border">
      <div className="relative max-w-6xl mx-auto flex items-center">
        {/* Back image - beige */}
        <div className="relative z-10 -mr-72 border">
          <div className="rounded-2xl max-w-xl">
            <img
              src="/demo-no-border.png"
              alt="First overlapping image"
              className="rounded-xl w-full"
            />
          </div>
        </div>

        {/* Middle image - white */}
        <div className="relative z-20 -mr-32 -mt-48 border">
          <div className="rounded-2xl max-w-xl">
            <img
              src="/spreadsheet.png"
              alt="Second overlapping image"
              className="rounded-xl w-full"
            />
          </div>
        </div>

        {/* Front image - light blue-grey */}
        <div className="relative z-30 mt-12 -pl-72 border">
          <div className="rounded-2xl max-w-xl">
            <img
              src="/demo-no-border.png"
              alt="Third overlapping image"
              className="rounded-xl w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlappingImages;