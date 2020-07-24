import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

const API_BASE_URL = 'http://localhost:9000'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        TeleVet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(http://bestfriendsvethospital.com/columbus_petvet/wp-content/uploads/2020/03/141479838_s.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [loginFailWarning, setLoginFailWarning] = React.useState(false);
  const [loginSuccessFlag, setLoginSuccessFlag] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('loging in');
    axios.post(API_BASE_URL + '/auth', {
      password: password,
      username: username
    }).then(response => {
      setLoginSuccessFlag(true);
      window.location.replace(getRedirectURL(JSON.parse(response.data)));
    }).catch(err => {
      setLoginFailWarning(true);
    });
  }

  const getRedirectURL = user => `/user/dashboard?id=${user.id}`;

  return (
      <div>
        <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => { setUsername(e.target.value) }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="PasswordReset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="PetSignUp" variant="body2">
                  {"Don't have an account? Sign Up as a Pet Owner"}
                </Link>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs>
                <Link href="" variant="body2">
                </Link>
              </Grid>
              <Grid item>
                <Link href="VetSignUp" variant="body2">
                  {"Or Sign Up as a Vet"}
                </Link>
              </Grid>
            </Grid>
            
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
        <Snackbar open={loginSuccessFlag} autoHideDuration={6000} onClose={() => setLoginSuccessFlag(false)}>
          <Alert onClose={() => setLoginSuccessFlag(false)} severity="success">
            User Found! Please wait while we load the dashboard.
          </Alert>
        </Snackbar>
        <Snackbar open={loginFailWarning} autoHideDuration={6000} onClose={() => setLoginFailWarning(false)}>
          <Alert onClose={() => setLoginFailWarning(false)} severity="error">
            Incorrect username or password.
          </Alert>
        </Snackbar>
      </div>
  );
}