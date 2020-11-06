import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import '../../../css/Login.css'

const useStyles = makeStyles((theme) => ({
    paper: {
      paddingTop: theme.spacing(15),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: '80px',
      paddingRight: '80px',
      marginLeft: 0
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '150%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      height: '3rem'
    },
  }));


const Login = () =>{
    const classes = useStyles();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    
    const gologin = ()=> {
      sessionStorage.setItem('id', id)
    }

    return(
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                로그인
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  className="text-form"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="ID"
                  autoComplete="id"
                  autoFocus
                  value={id}
                  onChange={(e)=>setId(e.target.value)}
                />
                <TextField
                  className="text-form"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={gologin}
                >
                  로그인
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                    비밀번호를 잊으셨나요?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/Join" variant="body2">
                        아직 회원이 아니신가요?
                      {/* {"Don't have an account? Sign Up"} */}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
    }

export default Login;