import { Typography, Box, Grid, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  // Simulación de datos del producto
  const product = {
    id: id,
    name: 'Vestido de Baño Coral',
    description: 'Elegante vestido de baño de una pieza con detalles únicos',
    price: 20000, // Usa el valor numérico para cálculos
    image: 'src/assets/vestido1.jpg'
  };

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <Box padding={4}>
      <Button 
        variant="outlined" 
        onClick={() => navigate('/category')}
        sx={{ mb: 3 }}
      >
        Volver a Categorías
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 1
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ₡{product.price.toLocaleString()}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={handleAddToCart}
            sx={{ mt: 2 }}
          >
            Agregar al Carrito
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetailPage;
