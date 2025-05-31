// export interface Images{
//   secure_url:string,
//   public_id:string,
//   _id:string
// }
// const ImageGallery = ({ images }:{images:Images[]}) => {
//   return (
//     <section className="py-8 px-4">
//       {/* <h2 className="text-2xl font-bold mb-6 text-center">Image Gallery</h2> */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {images.map((src, index:number) => (
//           <div key={index} className="overflow-hidden rounded-lg shadow-md">
//             <img
//               src={src?.secure_url}
//               alt={`Gallery Image ${index + 1}`}
//               className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ImageGallery;

"use client";

import { useState } from "react";

export interface Images {
  secure_url: string;
  public_id: string;
  _id: string;
}

const ImageGallery = ({ images }: { images: Images[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"gallery" | "slideshow">("gallery");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <section className="py-8 px-4">
        <div className="text-center text-gray-500">No images to display</div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      {/* View Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
              viewMode === "gallery"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setViewMode("gallery")}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Gallery View
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
              viewMode === "slideshow"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setViewMode("slideshow")}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
            </svg>
            Slideshow
          </button>
        </div>
      </div>

      {viewMode === "gallery" ? (
        /* Your Original Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {images.map((src, index: number) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer"
            >
              <img
                src={src?.secure_url || "/placeholder.svg"}
                alt={`Gallery Image ${index + 1}`}
                className="w-[600px] h-[200px]  object-cover hover:scale-105 transition-transform duration-300"
                onClick={() => {
                  setCurrentIndex(index);
                  setViewMode("slideshow");
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Slider Layout */
        <div className="relative max-w-4xl mx-auto">
          {/* Main Slider Container */}
          <div className="relative overflow-hidden rounded-lg shadow-lg bg-black">
            <div className="relative h-96 md:h-[500px]">
              <img
                src={images[currentIndex]?.secure_url || "/placeholder.svg"}
                alt={`Gallery Image ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Fullscreen Button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                onClick={() => setIsFullscreen(true)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </button>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                    onClick={prevSlide}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                    onClick={nextSlide}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex
                      ? "bg-blue-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}

          {/* Thumbnail Strip */}
          <div className="mt-4 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {images.map((src, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentIndex
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <img
                    src={src?.secure_url || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={images[currentIndex]?.secure_url || "/placeholder.svg"}
              alt={`GalleryImage${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors duration-200 flex items-center justify-center text-lg font-bold"
              onClick={() => setIsFullscreen(false)}
            >
              ✕
            </button>

            {/* Fullscreen Navigation */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                  onClick={prevSlide}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="15,18 9,12 15,6"></polyline>
                  </svg>
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                  onClick={nextSlide}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>
              </>
            )}

            {/* Fullscreen Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;