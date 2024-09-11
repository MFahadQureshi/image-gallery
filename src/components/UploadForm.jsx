import { useState } from "react";
import useStorage from "../hooks/useStorage";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false); // State for controlling the modal visibility
  const [isUploading, setIsUploading] = useState(false); // State for tracking upload status
  const { startUpload } = useStorage();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      setIsUploading(true);
      setShowModal(true); // Show the modal on form submit
      startUpload(selectedFile, title).then(() => {
        setIsUploading(false);
      });
    }
    setSelectedFile(null);
    setTitle("");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="text-center mt-10">
      <form onSubmit={handleSubmit} className="flex items-center flex-col gap-8">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-neutral gap-3">
          Upload
        </button>
      </form>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 shadow-lg text-center w-96">
            {isUploading ? (
              <>
                <h2 className="text-xl font-bold mb-4">Uploading...</h2>
                <progress className="progress w-56"></progress>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Upload Complete!</h2>
                <button className="btn btn-primary mt-4" onClick={closeModal}>
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
