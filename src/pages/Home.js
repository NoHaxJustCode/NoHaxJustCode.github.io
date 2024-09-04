import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Box, Typography } from '@mui/material';

const backgrounds = [
  'https://img.freepik.com/free-vector/black-background-with-blue-purple-wave-design_483537-4450.jpg?size=626&ext=jpg',
  'https://img.freepik.com/free-vector/dark-blue-background-with-purple-blue-wave_483537-4449.jpg?size=626&ext=jpg'
];

function Home() {
  useEffect(() => {
    let currentIndex = 0;
    const changeBackground = () => {
      currentIndex = (currentIndex + 1) % backgrounds.length;
      gsap.to('.background', {
        backgroundImage: `url(${backgrounds[currentIndex]})`,
        duration: 2,
        ease: 'power2.inOut',
      });
    };

    const interval = setInterval(changeBackground, 5000); // Change background every 5 seconds
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
        backgroundColor: 'darkgray', // Fallback color
        transition: 'background-image 2s ease-in-out',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: 'white', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          Welcome to My Portfolio
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mt: 3,
            color: 'white',
            textShadow: '1px 1px 5px rgba(0,0,0,0.5)',
          }}
        >
          Explore my projects, experience, and get in touch!
        </Typography>
      </motion.div>
    </Box>
  );
}

export default Home;
