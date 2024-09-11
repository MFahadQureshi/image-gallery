import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage, db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "./useAuth";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const startUpload = (file, title) => {
    if (!file) {
      return;
    }

    const fileId = uuidv4();
    const formatFile = file.type.split("/")[1];
    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Save to Firestore
        await addDoc(collection(db, "images"), {
          imageUrl: downloadURL,
          createAt: new Date(),
          userEmail: user.email,
          title: title || "Untitled" // Ensure title is saved
        });
      }
    );
  };

  return { progress, error, startUpload };
};

export default useStorage;
