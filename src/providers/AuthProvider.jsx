import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import app from "../firebase/firebase.config";

const AuthContext = createContext();
export { AuthContext };

const auth = getAuth(app);

// *Create Google Provider For Google Sign-In
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // *Create User With Email And Password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // *Sign In With Email And Password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // *Sign In With Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // *Update User Profile (Name, Photo)
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // *Log Out User
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // **Observer For User State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser?.email) {
          setUser(currentUser);
          await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            {
              email: currentUser.email,
            },
            { withCredentials: true },
          );
        } else {
          setUser(currentUser);
          await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
