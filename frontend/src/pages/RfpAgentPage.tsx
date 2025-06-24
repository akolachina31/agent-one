import React from 'react';
import { Box, Typography, Paper, TextField, Checkbox, FormControlLabel, Button, FormGroup, List, ListItem, ListItemText } from '@mui/material';

const products = [
  'Customer Success',
  'Product Experience',
  'Customer Communities',
  'Customer Education/Skilljar',
  'StaircaseAI',
];

const commonQuestions = [
  'What is your platform uptime guarantee?',
  'How do you handle data security and privacy?',
  'What integrations are available?',
  'Describe your customer support process.',
];

const RfpAgentPage: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#f4f6fa', minHeight: '100vh' }}>
      <Paper sx={{ maxWidth: 700, mx: 'auto', p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>RFP Response Agent</Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Input RFP questions and generate comprehensive, professional responses.
        </Typography>
        <TextField label="Enter RFP question(s)" placeholder="Paste or type your RFP questions here" fullWidth margin="normal" multiline minRows={3} />
        <Typography variant="subtitle2" mt={2} mb={1}>Select Products:</Typography>
        <FormGroup row>
          {products.map((product) => (
            <FormControlLabel key={product} control={<Checkbox />} label={product} />
          ))}
        </FormGroup>
        <Typography variant="subtitle2" mt={3} mb={1}>Common RFP Questions:</Typography>
        <List dense>
          {commonQuestions.map((q) => (
            <ListItem key={q} button>
              <ListItemText primary={q} />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} fullWidth>
          Generate Response
        </Button>
        <Box sx={{ mt: 4, bgcolor: '#f0f4f8', p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle2">RFP Response Output</Typography>
          <Typography variant="body2" color="textSecondary">(Your generated response will appear here.)</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RfpAgentPage;
