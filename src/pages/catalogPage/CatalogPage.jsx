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
    <Box>
      <Container>
        <CategoriesSection onCategoryClick={handleCategoryClick} />
        {selectedCategory && (
          <ProductList category={selectedCategory} />
        )}
      </Container>
    </Box>
  );
}

export default CatalogPage; 