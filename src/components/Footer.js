import React, { useState } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Footer() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setCursorPos({ x: event.clientX, y: event.clientY });
  };

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'primary.main', color: 'white', py: 3 }}
      onMouseMove={handleMouseMove}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          {[
            { href: "https://github.com/NoHaxJustCode", ariaLabel: "GitHub", Icon: FaGithub },
            { href: "https://linkedin.com/in/avinash-paluri", ariaLabel: "LinkedIn", Icon: FaLinkedin },
            { href: "mailto:avinash.paluril@yahoo.com", ariaLabel: "Email", Icon: FaEnvelope }
          ].map(({ href, ariaLabel, Icon }, index) => (
            <motion.div
              key={index}
              initial={{ x: 0, y: 0 }}
              whileHover={{
                x: Math.min(
                  Math.max((cursorPos.x - window.innerWidth / 2) / 30, -10),
                  10
                ),
                y: Math.min(
                  Math.max((cursorPos.y - window.innerHeight / 2) / 30, -10),
                  10
                ),
                scale: 1.2
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ margin: '0 8px' }}
            >
              <IconButton
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                aria-label={ariaLabel}
              >
                <Icon />
              </IconButton>
            </motion.div>
          ))}
        </Box>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Avinash Paluri. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
