import React, { useState, useEffect } from 'react';
import { database } from '../../pages/loginPage/firebaseConfig';
import { ref, get, child, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function AddProductsPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const dbRef = ref(database);
          const userSnapshot = await get(child(dbRef, `users/${user.uid}`));
          
          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const isUserAdmin = userData.role === 'admin';
            setIsAdmin(isUserAdmin);
            
            if (!isUserAdmin) {
              navigate('/unauthorized');
            }
          } else {
            navigate('/unauthorized');
          }
        } catch (error) {
          console.error('Error verificando rol de admin:', error);
          navigate('/unauthorized');
        }
      } else {
        navigate('/unauthorized');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Si no es admin, no renderizar el contenido
  if (!isAdmin) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });

    // Si es el campo de imagen, validar y mostrar preview
    if (name === 'imageUrl' && value) {
      // Validar si es una URL válida
      try {
        new URL(value);
        // Verificar si la URL termina en una extensión de imagen común
        if (value.match(/\.(jpeg|jpg|gif|png)$/i)) {
          setImagePreview(value);
        } else {
          setImagePreview('');
        }
      } catch (_) {
        setImagePreview('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Validaciones básicas
      if (!product.name || !product.price || !product.category) {
        setError('Por favor completa los campos obligatorios');
        return;
      }

      // Añade esta validación en handleSubmit antes de la línea 71
      if (product.imageUrl && !imagePreview) {
        setError('Por favor ingresa una URL válida de imagen');
        return;
      }

      // Crear referencia a la colección de productos
      const productsRef = ref(database, 'products');
      
      // Agregar el producto a la base de datos
      await push(productsRef, {
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock) || 0,
        createdAt: new Date().toISOString()
      });

      setSuccess('Producto agregado exitosamente');
      // Limpiar el formulario
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrl: ''
      });
    } catch (err) {
      setError('Error al agregar el producto: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Agregar Nuevo Producto</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Descripción"
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Precio"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="trajes-de-bano">Trajes de Baño</option>
              <option value="accesorios">Accesorios</option>
              <option value="ropa-playa">Ropa de Playa</option>
              <option value="proteccion-solar">Protección Solar</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock disponible"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <input
              type="url"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              placeholder="URL de la imagen"
              style={styles.input}
            />
          </div>

          {imagePreview && (
            <div style={styles.imagePreview}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  marginTop: '10px',
                  borderRadius: '5px'
                }}
              />
            </div>
          )}

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <button type="submit" style={styles.button}>
            Agregar Producto
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  textarea: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical'
  },
  select: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: '#fff'
  },
  button: {
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  error: {
    color: '#f44336',
    textAlign: 'center'
  },
  success: {
    color: '#4CAF50',
    textAlign: 'center'
  },
  imagePreview: {
    marginTop: '10px',
    textAlign: 'center',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9'
  }
};

export default AddProductsPage; 