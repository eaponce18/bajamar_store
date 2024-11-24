import { Box, Container, Grid, Typography, Button, IconButton, Paper, Divider } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext'; // Corregida la ruta de importación
import { useNavigate } from 'react-router-dom';

function ShoppingCartPage() {
  const { cartItems, total, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/payment');
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  // Calcular subtotal y el IVA
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const iva = subtotal * 0.13;
  const totalAmount = subtotal + iva;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<HomeIcon />}
          onClick={() => navigate('/home')}
        >
          Inicio
        </Button>
      </Box>
      
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item, index) => (
              <Paper 
                key={index} 
                sx={{ 
                  p: 3, 
                  mb: 2,
                  borderRadius: 2
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        borderRadius: 1
                      }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6">{item.name}</Typography>
                      <IconButton onClick={() => removeFromCart(item.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton 
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton 
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="h6">
                        ₡{(item.price * item.quantity).toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Resumen de Compra
              </Typography>
              <Box sx={{ my: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>₡{subtotal.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>IVA (13%)</Typography>
                  <Typography>₡{iva.toLocaleString()}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">₡{totalAmount.toLocaleString()}</Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
              >
                Procesar Pago
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ShoppingCartPage;
