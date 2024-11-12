import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardMedia, 
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { database } from '../pages/loginPage/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const productsRef = ref(database, 'products');
    
    onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        // Guardar todos los productos
        setProducts(Object.values(productsData));
        
        // Procesar categorías como antes
        const categorizedProducts = Object.entries(productsData).reduce((acc, [_, product]) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = {
              id: category,
              name: category,
              count: 1,
              image: product.imageUrl
            };
          } else {
            acc[category].count += 1;
          }
          return acc;
        }, {});
        
        setCategories(Object.values(categorizedProducts));
      }
    });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Categorías
      </Typography>
      
      {/* Grid de categorías */}
      <Grid container spacing={3}>
        {Array.isArray(categories) && categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={4}>
            <Card 
              onClick={() => handleCategoryClick(category)}
              sx={{ 
                height: '250px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={category.image || 'URL_de_imagen_por_defecto'}
                alt={category.name}
                sx={{ objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  padding: 2
                }}
              >
                <Typography variant="h6" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2">
                  {category.count} productos
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog para mostrar productos de la categoría */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedCategory?.name}
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {products
              .filter(product => product.category === selectedCategory?.name)
              .map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.imageUrl}
                      alt={product.name}
                    />
                    <Box p={2}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Precio: ${product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Stock: {product.stock}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CategoriesSection; 