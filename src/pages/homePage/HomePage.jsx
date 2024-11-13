import { AppBar, Toolbar, Typography, Grid, Box, Paper, Container, Button, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CompanyInfo from '../../components/CompanyInfo';
import CatalogSection from '../../components/CatalogSection';
import CategoriesSection from '../../components/CategoriesSection';
import './HomePage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../loginPage/firebaseConfig';
import { signOut } from 'firebase/auth';

function HomePage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCatalogClick = () => {
    navigate('/catalog');
  };

  const handleNosotrosClick = () => {
    const companyInfoSection = document.getElementById('company-info');
    if (companyInfoSection) {
      companyInfoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleClose();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="App">
      <AppBar position="fixed" elevation={0} sx={{ background: 'rgba(255, 255, 255, 0.95)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ color: '#333' }}>
            BAJAMAR
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 4 }}>
            <Button color="inherit" sx={{ color: '#333' }}>Inicio</Button>
            <Button 
              color="inherit" 
              sx={{ color: '#333' }} 
              onClick={handleCatalogClick}
            >
              Catálogo
            </Button>
            <Button 
              color="inherit" 
              sx={{ color: '#333' }} 
              onClick={handleNosotrosClick}
            >
              Nosotros
            </Button>
          </Box>
          <IconButton
            onClick={handleClick}
            sx={{ color: '#333' }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Mi Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Mi Carrito</MenuItem>
            <MenuItem onClick={handleClose}>Configuración</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box id="Fondo1" className="hero-section">
        <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography 
            variant="h2" 
            color="white" 
            sx={{ 
              fontWeight: 700,
              marginBottom: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
            }}
          >
            Bienvenidos a Bajamar
          </Typography>
          <Typography 
            variant="h5" 
            color="white" 
            sx={{ 
              maxWidth: '600px',
              marginBottom: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
            }}
          >
            Descubre nuestra exclusiva colección de trajes de baño para este verano
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleCatalogClick}
            sx={{ 
              width: 'fit-content',
              backgroundColor: '#fff',
              color: '#333',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)'
              }
            }}
          >
            Ver Catálogo
          </Button>
        </Container>
      </Box>
      <Grid item xs={12} className="background-alt">
        <Paper elevation={3} sx={{ padding: '20px' }}>
        </Paper>
        <CatalogSection />
      </Grid>
      <Grid item xs={12} className="background" id="company-info">
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <CompanyInfo />
        </Paper>
      </Grid>
    </div>
  );
}

export default HomePage;
