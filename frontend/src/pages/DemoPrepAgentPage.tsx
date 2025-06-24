import React from 'react';
import { Box, Typography, Paper, TextField, Checkbox, FormControlLabel, Button, FormGroup, Grid } from '@mui/material';

const products = [
  'Customer Success',
  'Product Experience',
  'Customer Communities',
  'Customer Education/Skilljar',
  'StaircaseAI',
];

const DemoPrepAgentPage: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#f4f6fa', minHeight: '100vh' }}>
      <Paper sx={{ maxWidth: 700, mx: 'auto', p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Demo Preparation Agent</Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Enter customer context to generate a personalized demo script.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Company Name" fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Industry" fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Audience" fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Primary Use Case" fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Demo Duration (minutes)" type="number" fullWidth margin="normal" />
          </Grid>
        </Grid>
        <Typography variant="subtitle2" mt={2} mb={1}>Select Products:</Typography>
        <FormGroup row>
          {products.map((product) => (
            <FormControlLabel key={product} control={<Checkbox />} label={product} />
          ))}
        </FormGroup>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} fullWidth>
          Generate Demo Script
        </Button>
        <Box sx={{ mt: 4, bgcolor: '#f0f4f8', p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle2">Demo Script Output</Typography>
          <Typography variant="body2" color="textSecondary">(Your tailored script will appear here.)</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default DemoPrepAgentPage;
