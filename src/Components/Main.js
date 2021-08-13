import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import logo from './logomain.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    outerContainer: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2d2e2e',
    },
    innerContainer: {
        backgroundColor: 'red',
        height: '28rem',
        width: '42rem',
        borderRadius: '50px',
        backgroundColor: '#2d2e2e',
        boxShadow: ` -20px -20px 74px #202020,
        20px 20px 74px #3b3c3c`,
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
        color:"#09e1e5",

        
    }

}));
function Main() {
    const classes = useStyles();
    const [element,setElement]=useState("");
    return (
        <>
            <div className={classes.outerContainer}>
                <Box className={classes.innerContainer}>
                    <div className={classes.logoContainer}>
                        <Avatar alt="Remy Sharp" src={logo} style={{ height: '8rem', width: '8rem' }} />
                        <span className={classes.nameFont}>iReels</span>
                        <Typography variant="h6" component="h1" style={{color:'white',fontFamily:'Averia Libre, cursive'}}>
                           Let's Connect
                        </Typography>
                        <Box mt={3}>
                            <Button variant="outlined" color="primary" style={{margin:'10px'}} onClick={()=>{setElement("login")}}>LOGIN</Button>
                            <Button variant="outlined" color="primary" style={{margin:'10px'}} onClick={()=>{setElement("signup")}}>SIGNUP</Button>
                        </Box>
                    </div>
                    {element=="login"?<Login/>:element=="signup"?<Signup/>:<></>}
                    
                </Box>
            </div>
            
        </>
    )
}

export default Main
