import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database } from '../pages/loginPage/firebaseConfig';
import { ref, get, child } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Obtener datos adicionales del usuario desde Realtime Database
        const dbRef = ref(database);
        try {
          const snapshot = await get(child(dbRef, `users/${user.uid}`));
          const userData = snapshot.val();
          
          setUser({
            ...user,
            role: userData?.role || 'user',
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 