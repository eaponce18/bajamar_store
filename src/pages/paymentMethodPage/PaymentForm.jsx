import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography, TextField, Alert } from '@mui/material';
import { CartContext } from '../../context/CartContext';

function PaymentForm() {
  const { total } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Campos adicionales
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: cardholderName, // Nombre del titular
          email: email, // Correo
          phone: phone, // Teléfono
          address: {
            line1: address, // Dirección
          },
        },
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      // Aquí normalmente enviarías el paymentMethod.id a tu backend
      console.log('PaymentMethod:', paymentMethod);

      // Simulamos un pago exitoso
      setTimeout(() => {
        setProcessing(false);
        navigate('/'); // Redirige al inicio después del pago
      }, 2000);

    } catch (err) {
      setError('Ocurrió un error al procesar el pago');
      setProcessing(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Información de Pago
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
        Total a pagar: ₡{total.toLocaleString()}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Dirección"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              background: 'rgba(255, 255, 255, 0.9)',
              '& fieldset': {
                borderColor: 'rgba(36, 117, 183, 0.3)',
                borderRadius: '12px',
              },
              '&:hover fieldset': {
                borderColor: '#2475B7',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#164c74',
                borderWidth: '2px',
              },
            },
          }}
        />
        <TextField
          label="Correo"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              background: 'rgba(255, 255, 255, 0.9)',
              '& fieldset': {
                borderColor: 'rgba(36, 117, 183, 0.3)',
                borderRadius: '12px',
              },
              '&:hover fieldset': {
                borderColor: '#2475B7',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#164c74',
                borderWidth: '2px',
              },
            },
          }}
        />
        <TextField
          label="Teléfono"
          variant="outlined"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              background: 'rgba(255, 255, 255, 0.9)',
              '& fieldset': {
                borderColor: 'rgba(36, 117, 183, 0.3)',
                borderRadius: '12px',
              },
              '&:hover fieldset': {
                borderColor: '#2475B7',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#164c74',
                borderWidth: '2px',
              },
            },
          }}
        />
        <TextField
          label="Nombre del Titular"
          variant="outlined"
          fullWidth
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              background: 'rgba(255, 255, 255, 0.9)',
              '& fieldset': {
                borderColor: 'rgba(36, 117, 183, 0.3)',
                borderRadius: '12px',
              },
              '&:hover fieldset': {
                borderColor: '#2475B7',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#164c74',
                borderWidth: '2px',
              },
            },
          }}
        />
        <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 1, mb: 2 }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={processing || !stripe || !elements}
          sx={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2475B7 0%, #164c74 100%)',
            textTransform: 'none',
            fontSize: '1.1rem',
            py: 1.5,
            boxShadow: '0 4px 15px rgba(36, 117, 183, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #164c74 0%, #0f3854 100%)',
              boxShadow: '0 6px 20px rgba(36, 117, 183, 0.4)',
            },
          }}
        >
          {processing ? 'Procesando...' : 'Confirmar Pago'}
        </Button>
      </form>
    </Box>
  );
}

export default PaymentForm;
