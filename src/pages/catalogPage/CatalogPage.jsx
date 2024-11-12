import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import CategoriesSection from '../../components/CategoriesSection';
import ProductList from '../../components/ProductList';

function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ pt: 8 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            my: 4,
            fontWeight: 600,
            color: '#333'
          }}
        >
          Nuestro Catálogo
        </Typography>
        <CategoriesSection onCategoryClick={handleCategoryClick} />
        {selectedCategory && (
          <ProductList category={selectedCategory} />
        )}
      </Container>
    </Box>
  );
}

export default CatalogPage; 