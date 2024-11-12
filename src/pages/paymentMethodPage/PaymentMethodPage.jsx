// PaymentMethodPage.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Grid, Container, Paper } from '@mui/material';
import PaymentForm from './PaymentForm';
import CartSummary from '../../components/CartSummary';

const stripePromise = loadStripe('your_publishable_key');

function PaymentMethodPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Columna del resumen del carrito */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <CartSummary />
          </Paper>
        </Grid>
        
        {/* Columna del formulario de pago */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentMethodPage;
