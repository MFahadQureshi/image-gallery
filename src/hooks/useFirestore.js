import { collection, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const getData = () => {
      try {
        const q = query(collection(db, collectionName), orderBy("createAt", "desc"));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            images.push({
              imageUrl: data.imageUrl,
              createAt: data.createAt.toDate(),
              userEmail: data.userEmail,
              title: data.title || "Untitled"
            });
          });
          setDocs(images);
          setIsLoading(false);
        });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getData();

    return () => unsubscribe && unsubscribe();
  }, [collectionName]);

  return {
    docs,
    isLoading,
  };
};

export default useFirestore;
