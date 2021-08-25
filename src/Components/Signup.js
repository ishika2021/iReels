import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Grid, TextField, NoSsr } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { database, storage } from '../Firebase';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    textfield: {
        color: "#BDBDBD"
    },
    signUpBtn: {
        borderColor: '#ff878d',
        color: '#ff878d',
        margin:'1em',
        marginTop:'0.1em'
    },

}));
const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: #BDBDBD;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #BDBDBD;
    }
    &:hover fieldset {
      border-color:#BDBDBD ;
    }
    &.Mui-focused fieldset {
      border-color: #BDBDBD;
    }
  }
`;
function Signup() {
    const classes = useStyles();
    const [username, setUname] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dp, setDp] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useContext(AuthContext);
    const [fileURL, setURL] = useState(null);
    const history = useHistory();
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if(username==''||name==''||dp==null){
                setError('Complete all fields');
                setTimeout(() => {
                    setError('');
                }, 2000);
                setLoading(false);
                setUname('');
                setName('');
                setEmail('');
                setDp(null);
                setURL(null);
                setPassword('');
                return;
            }
            let res = await signup(email, password);
            let uid = res.user.uid;
           
            const uploadTaskListener = storage.ref(`/users/${uid}/displayImage`).put(dp);
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }
            function fn2(error) {
                setError(error.message);
                setTimeout(() => {
                    setError('');
                }, 2000);
                setLoading(false);
            }
            async function fn3() {
                let downloadURL = await uploadTaskListener.snapshot.ref.getDownloadURL();
                await database.users.doc(uid).set({
                    username: username,
                    userId: uid,
                    name: name,
                    email: email,
                    createdAt: database.getCurrentTimeStamp(),
                    profileURL: downloadURL,
                    postIds: [],
                    bio: ""
                })
            }
            setLoading(false);
            history.push('/');
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false);
        }
    }
    const handleFileSubmit = (e) => {
        let file = e.target.files[0];
        if (file != null) {
            setURL(URL.createObjectURL(e.target.files[0]));
            setDp(file);
        }
    }
    return (

        <>
            <Box bgcolor="#121212" borderLeft="1px solid #BDBDBD" width="45%" height="100%">
                <Grid container direction="column" alignItems="center"
                    justifyContent="center" style={{ position: 'relative' }}>
                    <Typography variant="h5" style={{ color: '#BDBDBD', marginBottom: '0.1em',marginTop:'0.5em' ,fontFamily: 'Averia Libre, cursive' }}>Create Account</Typography>
                    <Avatar src={fileURL} style={{ height: '80px', width: '80px', marginBottom: '0.5em', marginTop: '0.3em' }} />
                    <input id="upload" accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleFileSubmit} />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span" style={{ position: 'absolute', top: '20%', left: '52%' }} >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <NoSsr>
                        <StyledTextField inputProps={{ className: classes.textfield }} InputLabelProps={{ style: { color: '#BDBDBD' } }} variant="outlined" label="UserName" style={{ marginBottom: '0.5em', color: 'white' }} value={username} onChange={(e) => setUname(e.target.value)} />
                        <StyledTextField inputProps={{ className: classes.textfield }} InputLabelProps={{ style: { color: '#BDBDBD' } }} variant="outlined" label="Name" style={{ marginBottom: '0.5em' }} value={name} onChange={(e) => setName(e.target.value)} />
                        <StyledTextField inputProps={{ className: classes.textfield }} InputLabelProps={{ style: { color: '#BDBDBD' } }} variant="outlined" label="Email" style={{ marginBottom: "0.5em" }} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <StyledTextField inputProps={{ className: classes.textfield }} InputLabelProps={{ style: { color: '#BDBDBD' } }} variant="outlined" type="password" label="Password" style={{ marginBottom: "0.5em" }} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </NoSsr>
                    <Button variant="outlined" className={classes.signUpBtn} onClick={handleSignup} disabled={loading}>
                        Signup
                    </Button>
                    {
                        
                        error != '' ? <h3 style={{ fontSize: '1rem', color: 'red', textAlign: 'center' }}>{error}</h3> : <></>
                    }
                </Grid>
            </Box>
        </>

    )
}

export default Signup
