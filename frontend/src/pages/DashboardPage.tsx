import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const agents = [
  {
    name: 'Research Agent',
    description: 'Market trends, competitor analysis, and strategic insights.',
    highlights: ['Market Trends', 'Competitor Analysis', 'Strategic Insights'],
    path: '/agent/research',
  },
  {
    name: 'Demo Preparation Agent',
    description: 'Personalized demo scripts and configuration guidance.',
    highlights: ['Demo Scripts', 'Configuration Guidance'],
    path: '/agent/demo-prep',
  },
  {
    name: 'Demo Feedback Agent',
    description: 'AI-powered analysis of demo performance and engagement.',
    highlights: ['Performance Analysis', 'Engagement Insights'],
    path: '/agent/demo-feedback',
  },
  {
    name: 'RFP Response Agent',
    description: 'Generate compelling responses to RFPs and questionnaires.',
    highlights: ['RFP Responses', 'Questionnaire Automation'],
    path: '/agent/rfp',
  },
  {
    name: 'Competitive Intelligence Agent',
    description: 'Real-time competitor monitoring and strategic positioning.',
    highlights: ['Competitor Monitoring', 'Strategic Positioning'],
    path: '/agent/competitive',
  },
  {
    name: 'Analytics & Insights',
    description: 'Team performance metrics and usage analytics.',
    highlights: ['Performance Metrics', 'Usage Analytics'],
    path: '/agent/analytics',
  },
];

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#f4f6fa', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={0} sx={{ mb: 4, borderRadius: 2 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo192.png" alt="AgentOne Logo" style={{ width: 36, marginRight: 12 }} />
            <Typography variant="h6" fontWeight={700} color="primary">AgentOne</Typography>
          </Box>
          <Button color="primary" variant="outlined" onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Welcome back, Anoosh! 👋
      </Typography>
      <Grid container spacing={3}>
        {agents.map((agent) => (
          <Grid item xs={12} sm={6} md={4} key={agent.name}>
            <Card sx={{ borderRadius: 3, minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>{agent.name}</Typography>
                <Typography variant="body2" color="textSecondary" mb={1}>{agent.description}</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {agent.highlights.map((h) => (
                    <li key={h} style={{ fontSize: 13, color: '#607d8b' }}>{h}</li>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth onClick={() => navigate(agent.path)}>
                  Launch Agent
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage;
