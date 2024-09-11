import { useState } from "react";
import useFirestore from "../hooks/useFirestore";

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore("images");
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the clicked image
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid md:grid-cols-4 justify-center gap-4 mt-10 mx-6 mb-5">
        {images.map((image, index) => (
          <div
            key={index}
            className="card bg-base-100 w-full shadow-xl cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <figure className="px-5 pt-10">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{image.title}</h2>
              <p>Upload by: {image.userEmail}</p>
              <span>Created on: {image.createAt.toDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying selected image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden w-11/12 md:w-1/2">
            <div className="p-4">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto"
              />
              <div className="text-center mt-4">
                <h2 className="text-lg font-bold">{selectedImage.title}</h2>
                <p>Upload by: {selectedImage.userEmail}</p>
                <span>
                  Created on: {selectedImage.createAt.toDateString()}
                </span>
              </div>
            </div>
            <div className="text-right p-4">
              <button
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
