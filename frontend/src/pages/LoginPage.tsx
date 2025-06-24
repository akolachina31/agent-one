import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Link, Paper, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const demoEmail = 'demo@agentone.ai';
const demoPassword = 'Demo1234!';

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean;
  authed: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, authed }) => {
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authed) navigate('/dashboard');
  }, [authed, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please use the demo credentials.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 5, minWidth: 350, maxWidth: 400, width: '100%', borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <img src="/logo192.png" alt="AgentOne Logo" style={{ width: 60, marginBottom: 8 }} />
          <Typography variant="h4" fontWeight={700} gutterBottom>AgentOne</Typography>
        </Box>
        <Typography variant="subtitle1" align="center" color="textSecondary" mb={2}>
          AI-powered presales command center
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" placeholder="Enter your email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
          <TextField label="Password" placeholder="Enter your password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          <FormControlLabel control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} />} label="Remember me" />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 1 }} size="large" type="submit">
            Sign In
          </Button>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Link href="#" underline="hover" variant="body2">Forgot password?</Link>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box sx={{ bgcolor: '#f0f4f8', p: 2, borderRadius: 2, mt: 2 }}>
          <Typography variant="caption" color="textSecondary">
            <b>Demo Credentials:</b><br />
            Email: <code>{demoEmail}</code><br />
            Password: <code>{demoPassword}</code>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
