import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { database, storage } from '../Firebase';
import Video from './Video';

import Avatar from '@material-ui/core/Avatar';

import { CardHeader } from '@material-ui/core';


import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddComment from './AddComment';
import Comment from './Comment';
const useStyles = makeStyles(() => ({
    postOuterBox: {
        width: '80%',
        margin: '0 auto',
        display: 'flex',
        marginTop: '1em',
        marginBottom:'1em',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        borderRadius: '14px',
        background: '#121212',
    },
    postInnerBox: {
        maxHeight: '300px',
        width: '25%',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1em',
        marginTop: '2.5em',
        position: 'relative',
        borderRadius: '14px',
        background: `linear-gradient(145deg, #131313, #101010)`,
        boxShadow: `8px 8px 8px #0d0d0d,
        -8px -8px 8px #171717`,
        padding: '1em',
    },
    deleteIcon: {
        color: 'white',
        position: 'absolute',
        top: '0',
        right: '1%'
    },
    vContainer: {
        background: "#121212",
        width: '45%',
        maxHeight: '450px',
        display: 'flex',
        justifyContent: 'center',

    },
    ExtraContainer: {
        background: "#1d1c21",
        width: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: "#121212",
         },
    seeComments: {
        height: '48vh',
        overflowY: 'auto',
        background: "#1d1c21",
        margin: '0 auto',
        marginTop: '0.6em',
        width: '80%',
        borderRadius: '10px'
    },
    LCBox: {
        height: '5rem',
        width: '90%',
        background: "#1d1c21",
        margin: '0 auto',
        marginTop: '0.5em',
        borderRadius: '10px',
        marginBottom: '0.5em',
        position:'relative',
    },
    dialogcommentBox: {
        width: '100%',
        height: '2rem',
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingBottom:'1em'
    },
    postDialogContainer:{
        maxHeight: '90vh', 
        width: '50vw', 
        background: '#121212', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-evenly',
        paddingBottom:'20px',
        overflow:'hidden'
    },
    LikedByTextStyle:{
        color: '#BDBDBD',
        marginBottom: '0.3em',
        marginTop:'0.3em', 
        marginLeft: '1.2em'
    },
    menu: {
        "& .MuiPaper-root": {
          backgroundColor: "#121212",
          color:'#e8e8e8',
        }
      }
    
}))
function ProfileBottom({ userData = null }) {
    const classes = useStyles();
    const [posts, setPosts] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openId, setOpenId] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleDialogOpen = (id) => {
        setOpenId(id);
    };
    const handleDialogClose = () => {
        setOpenId(null);
    };
    const handleDelete = async (post) => {
        setAnchorEl(null);
        const obj = userData?.postIds.filter((x) => {
            return x != post.postId;
        })
        await database?.users.doc(userData?.userId).update({
            postIds: obj
        })

        post.comments.map(async (el) => {
            await database.comments.doc(el).delete();
        })

        let ref = storage.refFromURL(post.pUrl);
        ref.delete().then(() => {
           
        }).catch((err) => {
            console.log(err);
        })

        database.posts.doc(post.postId).delete().then(() => {
           
        }).catch((err) => {
            console.log(err);
        })

    };
    const openDialog=()=>{
        
    }
    useEffect(() => {
        let parr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            parr = [];
            querySnapshot.forEach(doc => {
                if (doc.data().userId == userData?.userId) {
                    let obj = {
                        ...doc.data(),
                        postId: doc.id
                    };
                    parr.push(obj);
                }
            })
            setPosts(parr)
        })
        return unsub;
    }, []);

    return (
        <>
            {
                userData == null || posts == null ? <CircularProgress /> :
                    <Box className={classes.postOuterBox}>
                        {
                            posts.map((post) => (
                                <>
                                    <Box className={classes.postInnerBox} onClick={() => handleDialogOpen(post.pId)}>
                                        <Video source={post.pUrl} onClick={openDialog} />
                                    </Box>
                                    <Dialog maxWidth="md" onClose={handleDialogClose} open={openId == post.pId}>
                                        <MuiDialogContent className={classes.postDialogContainer}>
                                            <div className={classes.vContainer}>
                                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em', marginBottom: '1em' }}>
                                                    <Video source={post.pUrl} id={post.pId} />
                                                </div>
                                            </div>
                                            <div className={classes.ExtraContainer}>
                                                <Card height="100%" width="100%" style={{ backgroundColor: '#121212' }}>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar style={{ height: '2rem', width: '2rem', }} src={post.uProfile} />
                                                        }
                                                        action={<>
                                                                <IconButton aria-label="settings" className={classes.deleteIcon} onClick={handleClick}>
                                                                    <MoreVertIcon />
                                                                </IconButton>
                                                                <Menu
                                                                    id="simple-menu"
                                                                    anchorEl={anchorEl}
                                                                    keepMounted
                                                                    open={Boolean(anchorEl)}
                                                                    onClose={handleClose}
                                                                    className={classes.menu}
                                                                >
                                                                    <MenuItem onClick={()=>{handleDelete(post)}}>Delete</MenuItem>                                       
                                                                </Menu>
                                                                </>
                                                            }
                                                        title={<h4 style={{ color: '#BDBDBD' }}>{post?.uName}</h4>}
                                                        style={{ background: '#1d1c21', height: '1rem', width: '80%', borderRadius: '10px', margin: '0 auto', marginTop: '0.6em' }}
                                                    />
                                                    <CardContent className={classes.seeComments}>
                                                        <Comment userData={userData} post={post} />
                                                    </CardContent>

                                                </Card>
                                                <div className={classes.LCBox}>
                                                <Typography variant='body2' className={classes.LikedByTextStyle}>{post.likes.length > 0 ? post.likes.length : ""} likes</Typography>
                                                    <div className={classes.dialogcommentBox}>
                                                        <AddComment userData={userData} post={post} />
                                                    </div>
                                                </div>
                                            </div>
                                        </MuiDialogContent>
                                    </Dialog>
                                </>
                            ))
                        }
                    </Box>
            }
        </>
    )
}

export default ProfileBottom
