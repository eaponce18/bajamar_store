import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Box, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

const CartSummary = () => {
  const { cartItems, total } = useContext(CartContext);

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Resumen de Compra
      </Typography>
      <List>
        {cartItems.map((item, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={item.name}
              secondary={item.description}
            />
            <Typography variant="body2">
              ₡{item.price.toLocaleString()}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">₡{total.toLocaleString()}</Typography>
      </Box>
    </Box>
  );
};

export default CartSummary;
