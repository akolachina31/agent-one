import React from 'react';
import { Box, Typography, Paper, TextField, Checkbox, FormControlLabel, Button, FormGroup } from '@mui/material';

const products = [
  'Customer Success',
  'Product Experience',
  'Customer Communities',
  'Customer Education/Skilljar',
  'StaircaseAI',
];

const ResearchAgentPage: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#f4f6fa', minHeight: '100vh' }}>
      <Paper sx={{ maxWidth: 600, mx: 'auto', p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Research Agent</Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Query Market Trends, Competitor Analysis, and Strategic Insights.
        </Typography>
        <TextField label="Enter your query" placeholder="e.g. Latest trends in Customer Success platforms" fullWidth margin="normal" multiline minRows={3} />
        <Typography variant="subtitle2" mt={2} mb={1}>Select Products:</Typography>
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

export default ResearchAgentPage;
