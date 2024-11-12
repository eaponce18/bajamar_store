import { Typography, Box, Grid, Container, IconButton, Paper } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const CompanyInfo = () => {
  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com/bajamar', color: '#1877F2' },
    { icon: <InstagramIcon />, url: 'https://instagram.com/bajamar', color: '#E4405F' },
    { icon: <TwitterIcon />, url: 'https://twitter.com/bajamar', color: '#1DA1F2' },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f8f8', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Sección Sobre Nosotros */}
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                color: '#333',
                borderBottom: '2px solid #eee',
                paddingBottom: 2,
                marginBottom: 4
              }}
            >
              Sobre Bajamar
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                color: '#666',
                lineHeight: 1.8
              }}
            >
              Bajamar es una tienda virtual especializada en vestidos de baño que combina elegancia, 
              comodidad y estilo. Nuestra misión es ofrecer productos de alta calidad que te hagan 
              sentir segura y hermosa en cada momento junto al mar.
            </Typography>
          </Grid>

          {/* Sección de Contacto */}
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                color: '#333',
                borderBottom: '2px solid #eee',
                paddingBottom: 2,
                marginBottom: 4
              }}
            >
              Contáctanos
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 2, color: '#666' }} />
              <Typography variant="body1" sx={{ color: '#666' }}>
                eddie18ponce@gmail.com
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 2, color: '#666' }} />
              <Typography variant="body1" sx={{ color: '#666' }}>
                +(506) 8302 4529
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <LocationOnIcon sx={{ mr: 2, color: '#666' }} />
              <Typography variant="body1" sx={{ color: '#666' }}>
                Alajuela, Alajuela, Costa Rica
              </Typography>
            </Box>

            {/* Redes Sociales */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
                Síguenos en redes sociales
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {socialLinks.map((social, index) => (
                  <IconButton 
                    key={index}
                    href={social.url}
                    target="_blank"
                    sx={{ 
                      color: social.color,
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        transition: 'transform 0.2s ease-in-out'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CompanyInfo;
