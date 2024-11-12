import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { ref, set } from "firebase/database";
import { database } from "./firebaseConfig";

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
    <div style={styles.container}>
      <div style={styles.rightPanel}>
        <h2 style={styles.title}>{isLogin ? "Iniciar sesión" : "Registrarse"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Email"
              required
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Contraseña"
              required
            />
          </div>
          {!isLogin && (
            <div style={styles.formGroup}>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                placeholder="Confirmar Contraseña"
                required
              />
            </div>
          )}
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            <span style={styles.buttonText}>
              {isLogin ? "Ingresar" : "Registrarse"}
            </span>
          </button>
          <p style={styles.toggleText} onClick={() => setIsLogin(!isLogin)}>
            {isLogin 
              ? "¿No tienes cuenta? Regístrate aquí" 
              : "¿Ya tienes cuenta? Inicia sesión"}
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundImage: 'url(src/assets/loginbackground.png)',
  },
  leftPanel: {
    flex: '1',
    position: 'relative',
    overflow: 'hidden',
  },
  rightPanel: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '32px',
    marginBottom: '40px',
    color: '#fff',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: '2px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  formGroup: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    transition: 'all 0.3s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#00f2fe',
      boxShadow: '0 0 15px rgba(0, 242, 254, 0.3)',
    },
  },
  button: {
    padding: '15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(45deg, #00f2fe, #4facfe)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(0, 242, 254, 0.4)',
    },
  },
  buttonText: {
    position: 'relative',
    zIndex: '1',
    fontWeight: '500',
    letterSpacing: '1px',
  },
  error: {
    color: '#ff4757',
    textAlign: 'center',
    fontSize: '14px',
    marginTop: '10px',
  },
  toggleText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline',
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 0.8,
    },
  }
};

export default LoginPage;