import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Box, Typography, TextField, Button, Container } from '@mui/material';

const backgrounds = [
  'https://img.freepik.com/free-vector/black-background-with-blue-purple-wave-design_483537-4450.jpg?size=626&ext=jpg',
  'https://img.freepik.com/free-vector/dark-blue-background-with-purple-blue-wave_483537-4449.jpg?size=626&ext=jpg'
];

function Contact() {
  useEffect(() => {
    let currentIndex = 0;
    const changeBackground = () => {
      currentIndex = (currentIndex + 1) % backgrounds.length;
      gsap.to('.background', {
        backgroundImage: backgrounds[currentIndex],
        duration: 2,
        ease: 'power2.inOut',
      });
    };

    const interval = setInterval(changeBackground, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      className="background"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 2s ease-in-out',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 2,
            padding: 4,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: 'white', textShadow: '2px 2px 8px rgba(0,0,0,0.7)', mb: 4, textAlign: 'center' }}
          >
            Contact Me
          </Typography>
          <form
            action="https://formspree.io/f/mwpezojv"
            method="POST"
            style={{ width: '100%' }}
          >
            <TextField
              label="Name"
              name="name"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ mb: 2 }}
              color="info"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ mb: 2 }}
              color="info"
            />
            <TextField
              label="Message"
              name="message"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              sx={{ mb: 2 }}
              color="info"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Send
            </Button>
          </form>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Contact;
