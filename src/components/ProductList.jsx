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
  // Aquí deberías obtener los productos de la categoría seleccionada
  // Puedes usar una API o un estado global como Redux/Context

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {category.name}
      </Typography>
      <Grid container spacing={3}>
        {category.products?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList; 