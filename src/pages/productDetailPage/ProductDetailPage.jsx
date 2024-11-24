import { Box, Grid, Typography, Button, Rating, IconButton, Container, TextField, Avatar, Paper, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';

function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'María G.',
      rating: 4,
      comment: 'Excelente calidad, muy cómodo y el color es hermoso.',
      date: '2024-03-15'
    }
  ]);

  const product = {
    id: id,
    name: 'Vestido de Baño Coral',
    description: 'Elegante vestido de baño de una pieza con detalles únicos',
    price: 20000,
    image: 'src/assets/vestido1.jpg',
    rating: 3,
    sizes: ['XS', 'S', 'M', 'L']
  };

  const handleAddComment = () => {
    if (comment.trim() && userRating > 0) {
      const newComment = {
        id: comments.length + 1,
        user: 'Usuario',
        rating: userRating,
        comment: comment.trim(),
        date: new Date().toISOString().split('T')[0]
      };
      setComments([...comments, newComment]);
      setComment('');
      setUserRating(0);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/category')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Vestidos de Baño 2 Piezas
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 1
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Rating value={product.rating} readOnly sx={{ mb: 2 }} />
          <Typography variant="h5" color="primary" gutterBottom>
            ₡{product.price.toLocaleString()}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Tallas Disponibles
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size)}
                  sx={{
                    minWidth: '60px',
                    height: '60px',
                    borderRadius: 2
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>
          </Box>

          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            fullWidth
            disabled={!selectedSize}
            onClick={() => {
              addToCart({...product, size: selectedSize});
              navigate('/cart');
            }}
            sx={{ 
              mt: 2,
              py: 2,
              borderRadius: 2
            }}
          >
            Agregar al Carrito
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Comentarios y Calificaciones
        </Typography>
        
        <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Califica este producto
          </Typography>
          <Rating
            value={userRating}
            onChange={(event, newValue) => {
              setUserRating(newValue);
            }}
            size="large"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comparte tu opinión sobre este producto..."
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            disabled={!comment.trim() || userRating === 0}
          >
            Publicar Comentario
          </Button>
        </Box>

        <Box>
          {comments.map((item) => (
            <Paper key={item.id} sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 2 }}>{item.user[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle1">{item.user}</Typography>
                  <Rating value={item.rating} readOnly size="small" />
                </Box>
                <Typography variant="caption" sx={{ ml: 'auto' }}>
                  {item.date}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {item.comment}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default ProductDetailPage;
