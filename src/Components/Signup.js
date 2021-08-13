import React, { useContext, useState } from 'react'
import AuthProvider, { AuthContext } from '../Context/AuthProvider';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Grid, TextField,NoSsr} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { database,storage } from '../Firebase';
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
function Signup() {
    const classes = useStyles();
    const [username, setUname] = useState('');
    const [name,setName]=useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dp, setDp] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useContext(AuthContext);
    const [fileURL,setURL]=useState(null);
    const handleSignup = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            let res = await signup(email, password);
            let uid = res.user.uid;
            const uploadTaskListener=storage.ref(`/users/${uid}/displayImage`).put(dp);
            uploadTaskListener.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                let progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("upload is "+progress+ '% done');
            }
            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError('');
                },2000);
                setLoading(false);
            }
            async function fn3(){
                let downloadURL= await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log("File available at ",downloadURL);
                await database.users.doc(uid).set({
                    username:username,
                    name: name,
                    email:email,
                    createdAt:database.getCurrentTimeStamp(),
                    profileURL:downloadURL,
                    postIds:[]

                })
            }
            console.log("uid=", uid);
            console.log("USER SIGNED IN");
            setLoading(false);
        } catch (err) {
            setError(err);
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false);
        }
    }
    const handleFileSubmit = (e) => {
        let file = e.target.files[0];
        console.log("dp=", file);
        if (file != null) {
            setURL(URL.createObjectURL(e.target.files[0]));
            setDp(file);
        }
    }
    return (

        <>
            <Box bgcolor="#2d2e2e" width="45%" height="90%">
                <Grid container direction="column" alignItems="center"
                    justifyContent="center" style={{position:'relative'}}>
                     <Typography variant="h5" style={{color:'white',marginBottom:'0.1em',fontFamily:'Averia Libre, cursive'}}>Create Account</Typography>
                    <Avatar src={fileURL} style={{ height: '80px', width: '80px', marginBottom: '0.5em', marginTop: '0.3em'}} />
                    <input id="upload" accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleFileSubmit} />
                        <label htmlFor="icon-button-file">
                            <IconButton  color="primary" aria-label="upload picture" component="span" style={{position:'absolute',top:'18%',left:'52%'}} >
                                <PhotoCamera/>
                            </IconButton>
                        </label>
                    <NoSsr>
                    <StyledTextField inputProps={{className:classes.textfield}} InputLabelProps={{style:{color:'#fff'}}} variant="outlined" label="UserName" style={{ marginBottom: '0.5em',color:'white' }} value={username} onChange={(e)=>setUname(e.target.value)}/>
                    <StyledTextField inputProps={{className:classes.textfield}} InputLabelProps={{style:{color:'#fff'}}} variant="outlined" label="Name" style={{ marginBottom: '0.5em' }} value={name} onChange={(e)=>setName(e.target.value)} />
                    <StyledTextField inputProps={{className:classes.textfield}} InputLabelProps={{style:{color:'#fff'}}} variant="outlined" label="Email" style={{ marginBottom: "0.5em" }} value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <StyledTextField inputProps={{className:classes.textfield}} InputLabelProps={{style:{color:'#fff'}}} variant="outlined" type="password" label="Password" style={{ marginBottom: "0.5em" }} value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </NoSsr>
                    <Button variant="outlined" color="primary" onClick={handleSignup} disabled={loading}>
                        Signup
                    </Button>
                </Grid>
            </Box>
        </>

    )
}

export default Signup
