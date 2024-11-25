import { Box, Typography, Button, Container, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

function PaymentConfirmationPage({ success = true }) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        {success ? (
          <>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              ¡Pago Realizado con Éxito!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Gracias por tu compra. Recibirás un correo electrónico con los detalles de tu pedido.
            </Typography>
          </>
        ) : (
          <>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Error en el Pago
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Lo sentimos, no se pudo procesar tu pago. Por favor, intenta nuevamente.
            </Typography>
          </>
        )}
        
        <Button 
          variant="contained" 
          onClick={() => navigate('/home')}
          sx={{ mt: 3 }}
        >
          Volver al Inicio
        </Button>
      </Paper>
    </Container>
  );
}

export default PaymentConfirmationPage; 