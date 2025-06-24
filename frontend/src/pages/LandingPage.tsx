import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 6, borderRadius: 3, textAlign: 'center', maxWidth: 500 }}>
        <img src="/logo192.png" alt="AgentOne Logo" style={{ width: 80, marginBottom: 16 }} />
        <Typography variant="h3" fontWeight={700} mb={2} color="primary">AgentOne</Typography>
        <Typography variant="h6" color="textSecondary" mb={3}>
          AI-powered presales command center
        </Typography>
        <Typography variant="body1" mb={4}>
          Streamline your presales process with intelligent agents for research, demo prep, feedback, RFPs, and more.
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => navigate('/login')}>
          Get Started
        </Button>
      </Paper>
    </Box>
  );
};

export default LandingPage;
