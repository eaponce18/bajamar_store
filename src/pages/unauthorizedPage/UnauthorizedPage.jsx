import React from 'react';
import { useNavigate } from 'react-router-dom';

function UnauthorizedPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Acceso No Autorizado</h1>
        <p style={styles.message}>
          Lo sentimos, no tienes permisos para acceder a esta página.
        </p>
        <button onClick={handleGoBack} style={styles.button}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  },
  content: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%'
  },
  title: {
    color: '#dc3545',
    marginBottom: '20px',
    fontSize: '2rem'
  },
  message: {
    color: '#666',
    marginBottom: '30px',
    fontSize: '1.1rem'
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#0056b3'
    }
  }
};

export default UnauthorizedPage; 