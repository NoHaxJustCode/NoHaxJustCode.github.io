import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // State to store the cursor position
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Handle cursor move event
  const handleMouseMove = (event) => {
    setCursorPos({ x: event.clientX, y: event.clientY });
  };

  return (
    <AppBar position="static" color="primary" onMouseMove={handleMouseMove}>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Avinash Paluri
          </Typography>
          {['/', '/projects', '/resume', '/contact'].map((path, index) => (
            <motion.div
              key={index}
              initial={{ x: 0, y: 0 }}
              whileHover={{
                x: Math.min(
                  Math.max((cursorPos.x - window.innerWidth / 2) / 20, -10),
                  10
                ),
                y: Math.min(
                  Math.max((cursorPos.y - window.innerHeight / 2) / 20, -10),
                  10
                ),
                scale: 1.05
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ margin: '0 8px' }}
            >
              <Button
                onClick={() => navigate(path)}
                color="inherit"
                sx={{ position: 'relative', overflow: 'hidden' }}
              >
                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Button>
            </motion.div>
          ))}
          <IconButton
            sx={{ ml: 1 }}
            onClick={theme.toggleColorMode}
            color="inherit"
          >
            {/* Add your icon here */}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
