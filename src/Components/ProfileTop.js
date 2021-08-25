import React, { useState } from 'react'
import { Avatar, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Button } from '@material-ui/core';
import EditProfile from './EditProfile';
const useStyles = makeStyles(() => ({
    topBox: {
        height: '40vh',
        width: '80%',
        margin: '0 auto',
        marginTop: '4em',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '14px',
        background:'#121212'
    },
    infoBox: {
        height: '100%',
        width: '60%',
          marginLeft: '2em',
        color: '#BDBDBD',
    },
    
    uNameBox:{
        display:'flex',
        height:'30%',
        width:'50%',
    },
    username:{
        fontFamily:'Lato, sans-serif',
        color:'#BDBDBD',
        
    },
    input: {
        display: 'none',
    },
    edit: {
        background: 'blue',
    },
    bio:{
        color:'#BDBDBD'
    }
}))
function ProfileTop({ userData = null }) {
    const classes = useStyles();
    return (
        <>
            {userData == null ? <CircularProgress /> :
                <Box className={classes.topBox}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                         <Avatar src={userData?.profileURL} style={{ height: '8rem', width: '8rem', marginLeft: '1em' }} />
                         <EditProfile userData={userData} />
                    </div>
                    <div className={classes.infoBox}>
                        <div className={classes.uNameBox}>
                            <h1 className={classes.username}>{userData?.username}</h1>
                           
                        </div>
                        <Typography variant="h5" style={{marginTop:'0.5em',marginBottom:'0.2em'}}>{userData?.name}</Typography>
                        <Typography className={classes.bio} style={{ width:'50%'}}>{userData?.bio}</Typography>
                    </div>
                </Box>}
        </>
    )
}

export default ProfileTop
