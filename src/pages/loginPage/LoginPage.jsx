import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { ref, set } from "firebase/database";
import { database } from "./firebaseConfig";
import './LoginPage.css';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Verificar si el email ya existe antes de intentar registrar
    if (!isLogin) {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, formData.email);
        if (methods.length > 0) {
          setError("Este correo electrónico ya está registrado. Por favor, inicia sesión o usa otro correo.");
          return;
        }
      } catch (err) {
        console.error("Error checking email:", err);
      }
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate("/home");
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Las contraseñas no coinciden");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await set(ref(database, 'users/' + userCredential.user.uid), {
          email: formData.email,
          role: "user",
          createdAt: new Date().toISOString()
        });
        navigate("/home");
      }
    } catch (err) {
      let errorMessage = "";
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Este correo electrónico ya está registrado. Por favor, inicia sesión o usa otro correo.";
          break;
        case 'auth/invalid-email':
          errorMessage = "El correo electrónico no es válido.";
          break;
        case 'auth/weak-password':
          errorMessage = "La contraseña debe tener al menos 6 caracteres.";
          break;
        case 'auth/user-not-found':
          errorMessage = "No existe una cuenta con este correo electrónico.";
          break;
        case 'auth/wrong-password':
          errorMessage = "Contraseña incorrecta.";
          break;
        default:
          errorMessage = isLogin 
            ? "Error de inicio de sesión: " + err.message
            : "Error de registro: " + err.message;
      }
      
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-right-panel">
        <h2 className="login-title">{isLogin ? "Iniciar sesión" : "Registrarse"}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="login-input"
              placeholder="Email"
              required
            />
          </div>
          <div className="login-form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="login-input"
              placeholder="Contraseña"
              required
            />
          </div>
          {!isLogin && (
            <div className="login-form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="login-input"
                placeholder="Confirmar Contraseña"
                required
              />
            </div>
          )}
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">
            <span className="login-button-text">
              {isLogin ? "Ingresar" : "Registrarse"}
            </span>
          </button>
          <p className="login-toggle-text" onClick={() => setIsLogin(!isLogin)}>
            {isLogin 
              ? "¿No tienes cuenta? Regístrate aquí" 
              : "¿Ya tienes cuenta? Inicia sesión"}
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;