import { Box, Typography } from '@material-ui/core'
import { Avatar } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles"
import { Button } from '@material-ui/core';
import Upload from './Upload';
import { useHistory } from 'react-router';
const useStyles = makeStyles(() => ({
    infoBox: {
        borderRadius: '14px',
        background:`linear-gradient(145deg, #131313, #101010)`,
        boxShadow: `8px 8px 8px #0d0d0d,
        -8px -8px 8px #171717`,
        marginTop: '2em',
        position:'fixed',
        height:'65vh',
        width:'25%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-evenly',

    },
    BtnBox:{
        display:'flex',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:'1em',
    },
    upload: {
        background: '#fa4848',
        color: '#fdc8c8',
        '&:hover': {
            backgroundColor: '#f96d6b',
            color: '#fedada',
        },
        margin:'1em',
    },
    profileBtn:{
        borderColor: '#ff878d',
        color: '#ff878d',
        margin:'1em',
    },
    input: {
        display: 'none',
    },
    edit:{
        background:'blue',
    }
}))

function UserDetail({ userData = null }) {
    const classes = useStyles();
    const[type,setType]=useState("button");
    const history=useHistory();
    return (
        <>
            {
                userData == null ?
                    <CircularProgress /> :
                    <Box className={classes.infoBox}>
                        <Avatar src={userData?.profileURL} style={{ height: '10rem', width: '10rem',marginTop:'2em' }} />
                        <Typography style={{ color: '#BDBDBD', fontSize: '2.5rem' }}>{userData?.username}</Typography>
                        <Typography style={{ color: '#BDBDBD' }}> Name: {userData?.name}</Typography>
                        <Typography style={{ color: '#BDBDBD' }}> Total Posts: {userData?.postIds?.length}</Typography>
                        <div className={classes.BtnBox}>
                                <Upload userData={userData} type={type} /> 
                                <Button variant="outlined" className={classes.profileBtn} onClick={()=>{history.push('/profile')}}>
                                    Profile
                                </Button>
                            
                        </div>
                    </Box>
            }
        </>

    )
}

export default UserDetail
