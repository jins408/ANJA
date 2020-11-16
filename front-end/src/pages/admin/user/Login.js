import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import swal from 'sweetalert';
import '../../../css/Login.css'
import axios from 'axios';

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
      margin: theme.spacing(5, 0, 2),
      height: '3rem',
    },
    login_form:{
      color: 'black',
      fontWeight: "bold",
    }
  }));


const Login = () =>{
    const classes = useStyles();
    const history = useHistory();
    const [uid, setUid] = useState('');
    const [password, setPassword] = useState('');
    
    const gologin = (e)=> {
      if (e.key === 'Enter' || e.type === 'click') {
        if(uid === '' && password === ''){
          swal("아이디와 비밀번호를 입력해주세요!", {
            buttons: false,
            timer: 1500,
          });
        }else if(uid === ''){
          swal("아이디를 입력해주세요!", {
            buttons: false,
            timer: 1500,
          });
        }else if(password === ''){
          swal("비밀번호를 입력해주세요!", {
            buttons: false,
            timer: 1500,
          });
        }else{
          axios.post('https://k3b101.p.ssafy.io/api/users/sign',{
            uid: uid,
            password: password
          })
          .then((res)=>{
            if(res.data.data === 'NOT FOUND USER'){
              swal("등록되지 않은 사용자입니다!", {
                buttons: false,
                timer: 1500,
              });
              setUid('')
              setPassword('')
            }else if(res.data.data === 'INVALID PW'){
              swal("비밀번호를 다시 확인해주세요!", {
                buttons: false,
                timer: 1500,
              });
              setPassword('')
            }else{
              sessionStorage.setItem('uid', uid)
              swal("로그인 성공!", {
                buttons: false,
                timer: 1500,
              });
              history.push('/admin/home')
            }
          })
          .catch((err)=>{
            // console.log(err)
          })
        }
    }
  }

    return(
            <div className="login_bg">
            <div className="img-cover"></div>
            <div className="login-form">
            <Container component="main" maxWidth="xs">
            <div className="lglg">
            <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography className={classes.login_form} component="h1" variant="h5">
                  로그인
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    className="text-form"
                    // variant="outlined"
                    placeholder=" 아이디를 입력해주세요."
                    margin="normal"
                    required
                    fullWidth
                    // label="ID"
                    autoComplete="id"
                    autoFocus
                    value={uid}
                    onChange={(e)=>setUid(e.target.value)}
                  />
                  <TextField
                    className="text-form2"
                    // variant="outlined"
                    placeholder=" 비밀번호를 입력해주세요."
                    margin="normal"
                    required
                    fullWidth
                    // label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    onKeyPress={gologin}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={gologin}
                  >
                    로그인
                  </Button>
                  {/* <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                      비밀번호를 잊으셨나요?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/Join" variant="body2">
                          아직 회원이 아니신가요?
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid> */}
                </form>
          </div>
              </div>
          
          </Container>
            </div>
            </div>
        );
    }

export default Login;