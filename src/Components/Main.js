import React, { useContext, useEffect, useState } from 'react'
import Signup from './Signup'
import Login from './Login';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import logo from './logomain.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
const useStyles = makeStyles((theme) => ({
    outerContainer: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
    },
    innerContainer: {
        height: '28rem',
        width: '42rem',
        borderRadius: '14px',
        background:`linear-gradient(145deg, #131313, #101010)`,
        boxShadow: `8px 8px 8px #0d0d0d,
        -8px -8px 8px #171717`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    logoContainer: {
        width: '45%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameFont:{
        fontFamily: 'Pacifico, cursive',
        fontSize:'2.5rem',
        color:"#2fbfce",
    },
    loginBtn:{
        borderColor: '#31BDCE',
        color: '#31BDCE',
        
        margin:'1em',
        marginTop:'0.1em'
    },
    input: {
        display: 'none',
    },
    edit:{
        background:'blue',
    },
    signUpBtn: {
        borderColor: '#ff878d',
        color: '#ff878d',
        
        margin:'1em',
        marginTop:'0.1em'
    },

}));
function Main() {
    const classes = useStyles();
    const [element,setElement]=useState("");
    const {currentUser}=useContext(AuthContext);
    const history=useHistory();
    useEffect(()=>{
        if(currentUser){
            history.push('/');
        }
    },[])
    return (
        <>
            <div className={classes.outerContainer}>
                <Box className={classes.innerContainer}>
                    <div className={classes.logoContainer}>
                        <Avatar alt="Remy Sharp" src={logo} style={{ height: '8rem', width: '8rem' }} />
                        <span className={classes.nameFont}>iReels</span>
                        <Typography variant="h6" component="h1" style={{color:'#BDBDBD',fontFamily:'Averia Libre, cursive'}}>
                           Let's Connect
                        </Typography>
                        <Box mt={3}>
                            {/* <Button variant="outlined" color="primary" style={{margin:'10px'}} onClick={()=>{setElement("login")}}>LOGIN</Button>
                            <Button variant="outlined" color="primary" style={{margin:'10px'}} onClick={()=>{setElement("signup")}}>SIGNUP</Button> */}
                            <Button variant="outlined" className={classes.loginBtn} onClick={()=>{setElement("login")}}>
                                Login
                            </Button>
                            <Button variant="outlined" className={classes.signUpBtn} onClick={()=>{setElement("signup")}}>
                                Signup
                            </Button>
                            
                        </Box>
                    </div>
                    {element=="login"?<Login/>:element=="signup"?<Signup/>:<></>}
                    
                </Box>
            </div>
            
        </>
    )
}

export default Main
