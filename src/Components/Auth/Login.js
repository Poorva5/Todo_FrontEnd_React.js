import * as React from 'react';
import {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme ();

const Login = () => {
  const handleSubmit = event => {
    event.preventDefault ();
    const data = new FormData (event.currentTarget);
    console.log ({
      email: data.get ('email'),
      password: data.get ('password'),
    });
  };

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [errors, setErrors] = useState (false);
  const [loading, setLoading] = useState (true);

  useEffect (() => {
    if (localStorage.getItem ('token') !== null) {
      window.location.replace ('http://localhost:3000/dashboard');
    } else {
      setLoading (false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault ();

    const user = {
      email: email,
      password: password,
    };

    fetch ('http://127.0.0.1:8000/api/user/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (user),
    })
      .then (res => res.json ())
      .then (data => {
        if (data.key) {
          localStorage.clear ();
          localStorage.setItem ('token', data.key);
          window.location.replace ('http://localhost:3000/dashboard/');
        } else {
          setEmail ('');
          setPassword ('');
          localStorage.clear ();
          setErrors (true);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}} />
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail (e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword (e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={onSubmit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
