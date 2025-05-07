// src/context/authContext.js

import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase"; // Firebase auth import
import { onAuthStateChanged, signOut } from "firebase/auth"; // Firebase auth functions

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user when auth state changes
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const logout = async () => {
    await signOut(auth); // Firebase logout
    setUser(null); // Clear user state after logout
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
