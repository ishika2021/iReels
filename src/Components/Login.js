import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, NoSsr } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  textfield: {
    color: "#BDBDBD"
  },
  loginBtn:{
    borderColor: '#31BDCE',
    color: '#31BDCE',
    
    margin:'1em',
    marginTop:'0.1em'
},


}));
const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: white;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: white;
    }
    &:hover fieldset {
      border-color:white ;
    }
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;
function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const handleLogin = async (e) => {
    try {
      setLoading(true);
      let res = await login(email, password);
      setLoading(false);
      history.push('/');
    } catch (error) {
      setError(error);
      setTimeout(() => { setError('') }, 2000);
      setLoading(false);
    }
  }
  return (
    <Box bgcolor="#121212" borderLeft="1px solid #F0F0F0" width="45%" height="70%" display="flex" alignItems="center">
      <Grid container direction="column" alignItems="center"
        justifyContent="center" style={{ position: 'relative' }}>
        <Typography variant="h5" style={{ color: '#BDBDBD', marginBottom: '1em', fontFamily: 'Averia Libre, cursive' }}>Login</Typography>
        <NoSsr>
          <StyledTextField inputProps={{ className: classes.textfield }} InputLabelProps={{ style: { color: '#BDBDBD' } }} variant="outlined" label="Email" style={{ marginBottom: "1em" }} value={email} onChange={(e) => setEmail(e.target.value)} />
          <StyledTextField inputProps={{ className: classes.textfield }} InputLabelProps={{ style: { color: '#BDBDBD' } }} variant="outlined" type="password" label="Password" style={{ marginBottom: "1em" }} value={password} onChange={(e) => setPassword(e.target.value)} />
        </NoSsr>
        
        <Button variant="outlined" className={classes.loginBtn} onClick={handleLogin} disabled={loading}>
          Login
        </Button>
        {
          error != '' ? <h3 style={{ fontSize: '1rem', color: 'red', textAlign: 'center' }}>{error.message}</h3> : <></>
        }
      </Grid>

    </Box>

  )
}

export default Login
