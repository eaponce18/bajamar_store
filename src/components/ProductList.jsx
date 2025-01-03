import { 
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid
} from '@mui/material';


function ProductList({ category }) {
  // Verificar si category existe y tiene productos
  if (!category || !category.products) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">
          No hay productos disponibles en esta categoría.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {category.name}
      </Typography>
      <Grid container spacing={3}>
        {category.products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ₡{product.price?.toLocaleString()}
                </Typography>
                {product.stock !== undefined && (
                  <Typography variant="body2" color="text.secondary">
                    Stock disponible: {product.stock}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList; 