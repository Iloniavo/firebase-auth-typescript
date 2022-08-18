import React, {  useState } from 'react';
import { signInWithRedirect , GoogleAuthProvider , signInWithPopup , signInWithEmailAndPassword , GithubAuthProvider , FacebookAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import auth from '../config/config';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FacebookIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Grid, makeStyles, Paper, Stack, Typography } from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import Background from './Background';



interface State {
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }

export default function Login(){
    const [values, setValues] = React.useState<State>({
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    const navigate = useNavigate();
    const [ loading , setLoading ] = useState<boolean>(false)
    const [authing, setAuthing] = useState<boolean>(false)
    const [ email , setEmail ] = useState<string>("");
    const [ pass , setPassword ] = useState<string>("");
    
 
    
    const signInEmail = async () => {
        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
    // Signed in 
        const user = userCredential.user;
        navigate('/')
    // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode+ " Error code");
    console.log(errorMessage+ " Error message");
        });
    }

    const signInWithGoogle = async () => {
       
        setAuthing(true);
        signInWithRedirect(auth, new GoogleAuthProvider()).then((response)=>{
            console.log(response);
            
            navigate('/');
        })
        .catch((error)=>{
            console.log(error);
            setAuthing(false)
        })
    } 
    const signInWithGithub = async () => {
        setAuthing(true);
        signInWithPopup(auth, new GithubAuthProvider()).then((response)=>{
            console.log(response);
            navigate('/');
        })
        .catch((error)=>{
            console.log(error);
            setAuthing(false)
        })
    }

    const signInWithFacebook = async () => {
        setAuthing(true);
        signInWithPopup(auth, new FacebookAuthProvider()).then((response)=>{
            console.log(response);
            navigate('/');
        })
        .catch((error)=>{
            
            console.log(error);
            setAuthing(false)
        })
    }
    function Copyright(props: any) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to={''} >
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
    
     
      
    return (     
     
       <Background>
        <div className="contain" style={{width: '60%', margin: 'auto', opacity: '0.8', position: 'relative' , background: 'none' }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{borderRadius:'5px' , background: 'none'}} square>
            <Box maxWidth={'xl'} sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              }}>
           
            <h3 style={{paddingBottom :'2px'}}>Login  <LoginIcon/></h3>
            <div className='input'>
                <Box component="form" noValidate sx={{ mt: 1 }} >
                   
                    <Grid item xs={12}>
                    <TextField 
                    
                    margin="normal" 
                    fullWidth 
                    required 
                    autoFocus 
                    id="filled-basic" 
                    type="email" 
                    label="Email" 
                    variant="outlined" 
                    value={email}
                    onChange={(e:any) => setEmail(e.target.value)}
                    sx={{ input : { color:'whitesmoke' }}}
                     />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField margin="normal" required fullWidth autoFocus id="filled-basic" type="password" label="Password" variant="outlined" value={pass} onChange={(e:any) => setPassword(e.target.value)}/>
                    </Grid>
                        
                            <Stack direction="column" spacing={2}>
                                
                                <Button sx={{ fontSize: '2vh'  }} fullWidth onClick={()=> {navigate("/signup")}} variant="contained">Create an account</Button>
                                <Button sx={{ fontSize: '2vh'}} fullWidth onClick={signInEmail} variant="contained">Sign in</Button>

                                <Stack direction="row" spacing={2} sx={{ justifyContent :'center', alignItems: 'center'}} >
                                        <Grid item xs={12} sm={4}>
                                        <Button sx={{ fontSize: '1.8vh'}} fullWidth onClick={()=>signInWithGoogle()} variant="contained" color='error'><span> Google</span> <GoogleIcon/></Button>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                        <Button sx={{width :'10vw' , fontSize: '0.8rem'}} onClick={()=>signInWithGithub() } variant="contained" color='secondary'><span> github</span> <GitHubIcon/> </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                        <Button sx={{width :'10vw' , fontSize: '0.8rem'}} onClick={()=>signInWithFacebook()} variant="contained" color='primary'><span> facebook</span>  <FacebookIcon/></Button>
                                        </Grid>
                                    </Stack>
                            </Stack>  
                                                  
                    
                </Box>
            </div> 
            <Copyright sx={{ mt: 5 , mb: 3}} />
            </Box>
            </Grid>
        </div>
        </Background>
     
      
    )
}