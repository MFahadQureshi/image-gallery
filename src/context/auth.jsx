import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged from Firebase
import { auth } from "../firebase/config"; // Import your initialized auth object

export const AuthContext = createContext({
    user: null,
    isLoading: false,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Start with loading as true

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false); // Set loading to false once the auth state is resolved
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const value = {
        user,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
