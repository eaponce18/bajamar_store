import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

function CartSummary({ items }) {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3, mt: 3, bgcolor: '#f9f9f9', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Resumen del Carrito
      </Typography>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
            <ListItemText
              primary={item.name}
              secondary={`Precio: $${item.price.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ textAlign: 'right', mt: 2 }}>
        Total: ${items.reduce((total, item) => total + item.price, 0).toFixed(2)}
      </Typography>
    </Box>
  );
}

export default CartSummary;
