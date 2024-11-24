import { Box, Typography, TextField, Button, Tabs, Tab } from '@mui/material';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaypalIcon from '@mui/icons-material/Payment';

function PayPalButton({ amount, onSuccess, onError }) {
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    phone: '',
    name: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTabChange = (event, newValue) => {
    setPaymentMethod(newValue);
  };

  const isFormValid = () => {
    if (paymentMethod === 'card') {
      return formData.address && formData.email && formData.phone && 
             formData.name && formData.cardNumber && formData.expDate && formData.cvv;
    }
    return formData.address && formData.email && formData.phone && formData.name;
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Información de Pago
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Nombre Completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
      </Box>

      <Tabs value={paymentMethod} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab icon={<CreditCardIcon />} label="Tarjeta de Crédito" value="card" />
        <Tab icon={<PaypalIcon />} label="PayPal" value="paypal" />
      </Tabs>

      {paymentMethod === 'card' && (
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Número de Tarjeta"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Fecha de Vencimiento (MM/YY)"
              name="expDate"
              value={formData.expDate}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              label="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Box>
        </Box>
      )}

      <Typography variant="subtitle1" gutterBottom>
        Subtotal: ₡{(amount / 1.13).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        IVA (13%): ₡{(amount - (amount / 1.13)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total a pagar: ₡{amount.toLocaleString()}
      </Typography>

      {paymentMethod === 'card' ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onSuccess({ customerInfo: formData })}
          disabled={!isFormValid()}
          sx={{ mt: 2 }}
        >
          Procesar Pago con Tarjeta
        </Button>
      ) : (
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: (amount / 500).toFixed(2),
                    currency_code: "USD"
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            onSuccess({ ...details, customerInfo: formData });
          }}
          onError={onError}
        />
      )}
    </Box>
  );
}

export default PayPalButton; 