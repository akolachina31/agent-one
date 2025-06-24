import React from 'react';
import { Box, Typography, Paper, TextField, Checkbox, FormControlLabel, Button, FormGroup, Divider } from '@mui/material';

const products = [
  'Customer Success',
  'Product Experience',
  'Customer Communities',
  'Customer Education/Skilljar',
  'StaircaseAI',
];

const CompetitiveAgentPage: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#f4f6fa', minHeight: '100vh' }}>
      <Paper sx={{ maxWidth: 700, mx: 'auto', p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Competitive Intelligence Agent</Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Get real-time competitor monitoring and strategic positioning insights.
        </Typography>
        <Typography variant="subtitle2" mb={1}>Competitive Analysis Query:</Typography>
        <TextField label="Enter your query" placeholder="e.g. Compare StaircaseAI vs. Gainsight for enterprise clients" fullWidth margin="normal" multiline minRows={2} />
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle2" mb={1}>Product Focus:</Typography>
        <FormGroup row>
          {products.map((product) => (
            <FormControlLabel key={product} control={<Checkbox />} label={product} />
          ))}
        </FormGroup>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} fullWidth>
          Submit Query
        </Button>
      </Paper>
    </Box>
  );
};

export default CompetitiveAgentPage;
