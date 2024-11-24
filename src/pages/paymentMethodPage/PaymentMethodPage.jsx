// PaymentMethodPage.js
import { Grid, Container, Paper } from '@mui/material';
import PayPalButton from './PayPalButton';
import CartSummary from '../../components/CartSummary';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

function PaymentMethodPage() {
  const { total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculamos el total con IVA
  const totalWithTax = total * 1.13;

  const handlePaymentSuccess = (details) => {
    console.log('Payment successful:', details);
    clearCart();
    navigate('/home');
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <CartSummary showTax={true} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <PayPalButton
              amount={totalWithTax}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentMethodPage;
