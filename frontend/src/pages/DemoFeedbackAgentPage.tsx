import React from 'react';
import { Box, Typography, Paper, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const products = [
  'Customer Success',
  'Product Experience',
  'Customer Communities',
  'Customer Education/Skilljar',
  'StaircaseAI',
];

const DemoFeedbackAgentPage: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#f4f6fa', minHeight: '100vh' }}>
      <Paper sx={{ maxWidth: 600, mx: 'auto', p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Demo Feedback Agent</Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Upload your demo recording for AI-powered feedback and engagement analysis.
        </Typography>
        <Box sx={{ border: '2px dashed #90caf9', borderRadius: 2, p: 3, textAlign: 'center', mb: 2, bgcolor: '#f8fbff' }}>
          <Typography variant="body1" color="primary" mb={1}>
            Drag & drop your demo file here
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Supported formats: MP4, MOV, AVI (up to 500MB)
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }}>Browse Files</Button>
        </Box>
        <Typography variant="subtitle2" mt={2} mb={1}>Select Products:</Typography>
        <FormGroup row>
          {products.map((product) => (
            <FormControlLabel key={product} control={<Checkbox />} label={product} />
          ))}
        </FormGroup>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} fullWidth>
          Submit for Feedback
        </Button>
      </Paper>
    </Box>
  );
};

export default DemoFeedbackAgentPage;
