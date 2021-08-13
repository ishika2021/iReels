import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField,NoSsr} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    textfield:{
       color:"white"
    },
    
}));
const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: #0cb3d1;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: white;
    }
    &:hover fieldset {
      border-color:#0cb3d1 ;
    }
    &.Mui-focused fieldset {
      border-color: #0cb3d1;
    }
  }
`;
function Login() {
    const classes=useStyles();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const [loading,setLoading]=useState('');
    const {login}=useContext(AuthContext);
    const handleLogin=async(e)=>{
        try{
            setLoading(true);
            let res=await login(email,password);
            console.log("User LOGGED IN");
            setLoading(false);
        }catch(error){
            setError(error);
            setTimeout(()=>{setError('')});
            setLoading(false);
        }
    }
    return (
        <Box bgcolor="#2d2e2e" width="45%" height="90%" display="flex" alignItems="center">
                <Grid container direction="column" alignItems="center"
                    justifyContent="center" style={{position:'relative'}}>
                    <Typography variant="h5" style={{color:'white',marginBottom:'1em',fontFamily:'Averia Libre, cursive'}}>Login</Typography>
                    <NoSsr>
                    <StyledTextField inputProps={{className:classes.textfield}} InputLabelProps={{style:{color:'#fff'}}} variant="outlined" label="Email" style={{ marginBottom: "1em" }} value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <StyledTextField inputProps={{className:classes.textfield}} InputLabelProps={{style:{color:'#fff'}}} variant="outlined" type="password" label="Password" style={{ marginBottom: "1em" }} value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </NoSsr>
                    <Button variant="outlined" color="primary" onClick={handleLogin} disabled={loading}>
                        Login
                    </Button>
                </Grid>
        </Box>
    )
}

export default Login
