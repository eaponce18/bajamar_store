import { auth } from "../pages/loginPage/firebaseConfig";
import { database } from "../pages/loginPage/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export const registerUser = async (email, password, role = "user") => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Guardar información adicional del usuario en Realtime Database
    await set(ref(database, `users/${userCredential.user.uid}`), {
      email,
      role,
      createdAt: new Date().toISOString()
    });

    return userCredential.user;
  } catch (error) {
    throw error;
  }
}; 