import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Container, Typography, List, ListItem, ListItemText, Box, Paper, Button } from '@mui/material';

const backgrounds = [
  'https://img.freepik.com/free-vector/black-background-with-blue-purple-wave-design_483537-4450.jpg?size=626&ext=jpg',
  'https://img.freepik.com/free-vector/dark-blue-background-with-purple-blue-wave_483537-4449.jpg?size=626&ext=jpg'
];

function Resume() {
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
        backgroundColor: 'darkgray', // Fallback color
        transition: 'background-image 2s ease-in-out',
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <Typography variant="h3" gutterBottom align="center">
              My Resume
            </Typography>

            <Typography variant="h5" gutterBottom>
              Previous Internships
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Software Development Engineer at Amazon Web Services"
                  secondary="June 2023 - August 2023 | Seattle, WA"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Software Development Engineer at Amazon Web Services"
                  secondary="May 2024 - August 2024 | Seattle, WA"
                />
              </ListItem>
              {/* Add more experience items here */}
            </List>

            <Typography variant="h5" gutterBottom>
              Education
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Bachelor of Science in Computer Science, Bachelor of Arts in Data Science"
                  secondary="Rutgers University - New Brunswick | 2021 - 2024"
                />
              </ListItem>
              {/* Add more education items here */}
            </List>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                href="/AvinashPaluri_Resume.pdf"
                download="Avinash_Paluri_Resume.pdf"
              >
                Download Resume
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Resume;
