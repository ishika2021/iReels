import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';

import { TextField, NoSsr } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { database, storage } from '../Firebase';
const StyledTextField = styled(TextField)`
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
const useStyles = makeStyles(() => ({

    editBtn: {
        borderColor: '#31BDCE',
        color: '#31BDCE',
        fontSize: '1rem',
        maxHeight: '2rem',
        marginLeft: '1em',
        marginTop: '1.5em',
    },
    textfield: {
        color: '#BDBDBD'
    },
    settingBox: {
        maxHeight: '80vh',
        width: '30vw',
        background: '#121212',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginTop: '0.5em',
        width: '6rem',
        marginBottom: '0.5em',
    },
    dialogHeader: {
        background: '#1d1c21',
        width: '90%',
        height: '3rem',
        margin: '0 auto',
        marginTop: '0.2em',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogMiddle: {
        background: '#1d1c21',
        width: '90%',
        height: '90%',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dialogBottom: {
        background: '#1d1c21',
        margin: '0 auto',
        width: '85%',
        height: '3rem',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '0.2em',
        marginBottom: '0.5em',
    },
    closeBtn:{
        borderColor: '#31BDCE',
        color: '#31BDCE',
        marginRight:'1em'
    },
    saveBtn:{
        borderColor: '#ff878d',
        color: '#ff878d',
        marginLeft:'1em'
    }
}));

function EditProfile({ userData }) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [file, setfile] = useState(userData?.profileURL);
    const [username, setUsername] = useState(null);
    const [bio, setBio] = useState(null);
    const [dp, setDp] = useState(null);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleFileSubmit = (e) => {
        const file = e.target.files[0];
        if (file != null) {
            setfile(URL.createObjectURL(file));
            setDp(file);
        }
    }
    const handleSave = async () => {
        if (username != userData?.username) {
            await database.users.doc(userData?.userId).update({
                username: username
            })
        }
        if (bio != '') {
            await database.users.doc(userData?.userId).update({
                bio: bio
            })
        }
        if (dp != null) {
            const uploadTaskListener = storage.ref(`/users/${userData?.userId}/displayImage`).put(dp);
            uploadTaskListener.on('state_changed', fn3);
            async function fn3() {
                let downloadURL = await uploadTaskListener.snapshot.ref.getDownloadURL();
                await database.users.doc(userData?.userId).update({
                    profileURL: downloadURL
                })
            }

        }
        setOpen(false);
    }
    return (
        <>
            <Button variant="outlined" className={classes.editBtn} onClick={handleClickOpen}>
                Edit
            </Button>
            {
                open == true ? <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{ background: '#121212', color: '#BDBDBD' }}>
                        <div className={classes.dialogHeader}>
                            Settings
                        </div>
                    </DialogTitle>
                    <DialogContent className={classes.settingBox}>
                        <div className={classes.dialogMiddle}>
                            <Avatar src={file} style={{ height: '7rem', width: '7rem', marginTop: '0.5em' }} />
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleFileSubmit} />
                            <NoSsr>
                                <StyledTextField size="small" defaultValue={userData?.username} value={username} onChange={(e) => setUsername(e.target.value)} inputProps={{ className: classes.textfield }} InputLabelProps={{ style: { color: '#BDBDBD' } }} variant="outlined" style={{ marginBottom: '0.5em', color: '#BDBDBD' }} />
                                <StyledTextField size="small" multiline maxRows={3} defaultValue={userData?.bio} value={bio} onChange={(e) => setBio(e.target.value)} inputProps={{ className: classes.textfield }} InputLabelProps={{ style: { color: '#BDBDBD' } }} variant="outlined" style={{ marginBottom: '1em', color: '#BDBDBD' }} />
                            </NoSsr>
                        </div>

                    </DialogContent>
                    <DialogActions style={{ background: '#121212', color: '#BDBDBD' }}>
                        <div className={classes.dialogBottom}>
                            <Button variant="outlined" className={classes.closeBtn} onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="outlined" className={classes.saveBtn} onClick={handleSave}>
                                Save
                            </Button>
                        </div>

                    </DialogActions>
                </Dialog> :
                    <></>
            }
        </>
    )
}

export default EditProfile
