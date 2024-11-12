import { Typography, Box, Grid, IconButton, Button, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext'; // Corregida la ruta de importación
import { useNavigate } from 'react-router-dom';

function ShoppingCartPage() {
  const { cartItems, total, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/payment');
  };

  // Calcular subtotal y el IVA
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const iva = subtotal * 0.13;
  const totalAmount = subtotal + iva;

  return (
    <Box sx={{ p: 4, maxWidth: 'lg', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Carrito de Compra
      </Typography>
      
      {cartItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Tu carrito está vacío
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/catalog')}
            sx={{ mt: 2 }}
          >
            Ir al Catálogo
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item, index) => (
              <Paper 
                key={index} 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 2 
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    ₡{item.price.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton 
                    onClick={() => updateQuantity(index, item.quantity - 1)} 
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ mx: 1 }}>{item.quantity.toString().padStart(2, '0')}</Typography>
                  <IconButton onClick={() => updateQuantity(index, item.quantity + 1)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => removeFromCart(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ textAlign: 'right' }}>SUBTOTAL: ₡{subtotal.toLocaleString()}</Typography>
              <Typography variant="body2" sx={{ textAlign: 'right' }}>IVA: ₡{iva.toLocaleString()}</Typography>
              <Typography variant="h6" sx={{ textAlign: 'right', mt: 1 }}>TOTAL: ₡{totalAmount.toLocaleString()}</Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleCheckout}
              sx={{ mt: 3, display: 'block', marginLeft: 'auto' }}
            >
              Procesar Pago
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default ShoppingCartPage;
