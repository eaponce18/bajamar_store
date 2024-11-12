import { 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Container,
  CardActionArea 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CatalogSection() {
  const navigate = useNavigate();

  const handleImageClick = (itemId) => {
    navigate(`/category`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          textAlign: 'center', 
          mb: 6, 
          fontWeight: 300,
          color: '#333',
          borderBottom: '2px solid #eee',
          paddingBottom: 2
        }}
      >
        Nuestra Colección
      </Typography>
      
      <Grid container spacing={4}>
        {itemData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 2,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardActionArea onClick={() => handleImageClick(item.id)}>
                <CardMedia
                  component="img"
                  height="400"
                  image={item.img}
                  alt={item.title}
                  sx={{
                    objectFit: 'cover'
                  }}
                />
                <CardContent sx={{ textAlign: 'center', bgcolor: 'white' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 500,
                      color: '#333',
                      textTransform: 'capitalize'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      mt: 1 
                    }}
                  >
                    {item.author}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const itemData = [
  {
    img: 'src/assets/vestido1.jpg',
    title: 'Vestido Rojo Verano',
    author: 'Colección Premium',
    id: 1,
  },
  {
    img: 'src/assets/vestido2.jpg',
    title: 'Vestido Amarillo Sol',
    author: 'Colección Elegance',
    id: 2,
  },
  {
    img: 'src/assets/vestido3.jpeg',
    title: 'Vestido Azul Marina',
    author: 'Colección Resort',
    id: 3,
  },
  {
    img: 'src/assets/playera1.jpg',
    title: 'Playera Celeste Brisa',
    author: 'Colección Casual',
    id: 4,
  },
  {
    img: 'src/assets/short1.png',
    title: 'Short Flores Tropical',
    author: 'Colección Summer',
    id: 5,
  },
  {
    img: 'src/assets/sombrero1.png',
    title: 'Sombrero Riviera',
    author: 'Accesorios Premium',
    id: 6,
  }
];
