import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

const metrics = [
  { label: 'Total Demos Run', value: 128 },
  { label: 'Avg. Demo Duration', value: '42 min' },
  { label: 'RFPs Generated', value: 37 },
  { label: 'Active Users', value: 14 },
  { label: 'Feedback Reports', value: 52 },
  { label: 'Competitive Analyses', value: 21 },
];

const AnalyticsAgentPage: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#f4f6fa', minHeight: '100vh' }}>
      <Paper sx={{ maxWidth: 900, mx: 'auto', p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Analytics & Insights</Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Team performance metrics and usage analytics.
        </Typography>
        <Grid container spacing={3}>
          {metrics.map((m) => (
            <Grid item xs={12} sm={6} md={4} key={m.label}>
              <Card sx={{ borderRadius: 2, bgcolor: '#e3f2fd' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>{m.value}</Typography>
                  <Typography variant="body2" color="textSecondary">{m.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default AnalyticsAgentPage;
