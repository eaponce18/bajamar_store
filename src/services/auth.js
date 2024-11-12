import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

export const registerUser = async (email, password, role = "user") => {
  try {
    // Crear usuario en Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Guardar información adicional del usuario en Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email,
      role,
      createdAt: new Date(),
    });

    return userCredential.user;
  } catch (error) {
    throw error;
  }
}; 