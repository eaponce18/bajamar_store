// PaymentMethodPage.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Grid, Container, Paper, Box, useTheme } from '@mui/material';
import PaymentForm from './PaymentForm';
import CartSummary from '../../components/CartSummary';

const stripePromise = loadStripe('your_publishable_key');

function PaymentMethodPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          linear-gradient(
            135deg,
            rgba(173, 216, 230, 0.9),
            rgba(135, 206, 235, 0.9)
          ),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='50%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23ADD8E6' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%2387CEEB' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%2300CED1' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%234682B4' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%231E90FF' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3C/g%3E%3C/svg%3E")
        `,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        py: 6,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={16}
              sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 150, 255, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px rgba(0, 150, 255, 0.2)',
                }
              }}
            >
              <CartSummary />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper
              elevation={16}
              sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 150, 255, 0.1)',
                transition: 'all 0.3s ease-in-out',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px rgba(0, 150, 255, 0.2)',
                }
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(90deg, #87CEEB 0%, #4682B4 100%)',
                  height: '8px'
                }}
              />
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PaymentMethodPage;
