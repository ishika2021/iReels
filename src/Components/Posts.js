import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Video from './Video';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { CardHeader } from '@material-ui/core';
import { database } from '../Firebase';
import Likes from './Likes';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddComment from './AddComment';
import Comment from './Comment';
const useStyles = makeStyles((theme) => ({
    outerBox: {
        width: '100%',
        height: '4rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#121212', 
        display: 'flex', 
        justifyContent: 'space-evenly'
    },
    dpNameBox: {
        width: '90%',
        height: '70%',
        borderRadius: '10px',
        backgroundColor: '#1d1c21',
        display: 'flex',
        alignItems: 'center',
        marginTop: '1.2em',
        marginBottom:'1.2em',
    },
    commentBox: {
        width: '90%',
        height: '70%',
        borderRadius: '10px',
        backgroundColor: '#1d1c21',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.2em',
        position:'relative',
    },
    likeCommentBox: {
        width: '40%',
        height: '70%',
        borderRadius: '10px',

        backgroundColor: '#1d1c21',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    postBox: {
        height: '100%',
        width: '90%',
        backgroundColor: '#1d1c21',
        borderRadius: '10px',
    },
    textfield: {
        color: '#BDBDBD'
    },
    videoContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    postContainer: {
        display:'flex',
        flexDirection:'column',
        width:'80%',
        marginTop:'2em',
        marginBottom:'2em',
        borderRadius: '14px',
        background:`linear-gradient(145deg, #131313, #101010)`,
        boxShadow: `8px 8px 8px #0d0d0d,
        -8px -8px 8px #171717`,
        
    },
    postOuterBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '450px',

    },
    vContainer: {
        background: "#121212",
        width: '45%',
        maxHeight:'450px',
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
    postDialogBox:{
        maxHeight: '90vh', 
        width: '50vw', 
        background: '#121212', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-evenly',
        paddingBottom:'20px',
        overflow:'hidden'
    },
    cardHeader:{
        background: '#1d1c21', 
        height: '1rem', 
        width: '80%', 
        borderRadius: '10px', 
        margin: '0 auto', 
        marginTop: '0.6em' 
    },
    LikedByTextStyle:{
        color: '#BDBDBD',
        marginBottom: '0.3em',
        marginTop:'0.3em', 
        marginLeft: '1.2em'
    },
    videoBox:{
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '1em', 
        marginBottom: '1em' 
    },
    commentIconStyle:{
        color: "#fa4848", 
        fontSize: "1.3rem", 
        marginLeft: '0.2em'
    }
}));
function Posts({ userData }) {
    const classes = useStyles();
    const [posts, setPosts] = useState(null);
    const [openId, setOpenId] = useState(null);
    const handleClickOpen = (id) => {
        setOpenId(id);
    };
    const handleClose = () => {
        setOpenId(null);
    };
    const callback = (entries) => {

        entries.forEach(element => {
            let el = element.target.childNodes[0];
            el.play().then(() => {
                if (!el.paused && !element.isIntersecting) {
                    el.pause();
                }
            })
        })
    }
    const observer = new IntersectionObserver(callback, { threshold: 0.85 });
    useEffect(() => {
        let parr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            parr = [];
            querySnapshot.forEach((doc) => {
                let data = {
                    ...doc.data(),
                    postId: doc.id
                }
                parr.push(data);
            })
            setPosts(parr);
        })
        return unsub;
    }, [])
    useEffect(() => {
        let elements = document.querySelectorAll(".videos");
        elements.forEach(el => {
            observer.observe(el);
        })
        return () => {
            observer.disconnect();
        }
    }, [posts])
    return (
        <>
            {posts == null ? <LinearProgress color="secondary" /> :
                <>
                    {
                        posts.map((post) => (
                            <Box className={classes.postContainer}>
                                <div className={classes.outerBox}>
                                    <div className={classes.dpNameBox} >
                                        <Avatar style={{ height: '2rem', width: '2rem', marginLeft: '0.5em' }} src={post.uProfile} />
                                        <h3 style={{ color: "#BDBDBD", marginLeft: '0.4em',fontFamily:'Lato, sans-serif', fontSize:'1.3rem',marginTop:'0',fontWeight:'bold' }}>{post.uName}</h3>
                                    </div>
                                </div>
                                <div className={classes.postOuterBox}>
                                    <div className={classes.postBox}>
                                        <div className={classes.videoContainer}>
                                            <div className="videos" style={{ marginTop: '0.7em', marginBottom: '0.7em' }}>
                                                <Video source={post.pUrl} id={post.pId} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.outerBox}>
                                    <div className={classes.likeCommentBox}>                        
                                        <Likes userData={userData} post={post} />
                                        <h5 style={{ color: '#5a595e', margin: '0.2em' }}>{post.likes.length > 0 ? post.likes.length : ""} likes</h5>
                                    </div>
                                    <div className={classes.likeCommentBox}>
                                        <ChatBubbleIcon onClick={() => handleClickOpen(post.pId)} className={classes.commentIconStyle} />
                                        <Dialog maxWidth="md" onClose={handleClose} open={openId == post.pId}>
                                            <MuiDialogContent className={classes.postDialogBox}>
                                                <div className={classes.vContainer}>
                                                    <div className={classes.videoBox}>
                                                        <Video source={post.pUrl} id={post.pId} />
                                                    </div>
                                                </div>
                                                <div className={classes.ExtraContainer}>
                                                    <Card height="100%" width="100%" style={{ backgroundColor: '#121212' }}>
                                                        <CardHeader
                                                            avatar={
                                                                <Avatar style={{ height: '2rem', width: '2rem', }} src={post.uProfile} />
                                                            }
                                                            title={<h4 style={{ color: '#BDBDBD' }}>{post?.uName}</h4>}
                                                            className={classes.cardHeader}
                                                            
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
                                        <h5 style={{ color: '#5a595e', margin: '0.2em' }}>{post.comments.length > 0 ? post.comments.length : ""} comments</h5>
                                    </div>
                                </div>

                                <div className={classes.outerBox}>
                                    <div className={classes.commentBox}>
                                        <AddComment userData={userData} post={post} />
                                    </div>

                                </div>
                            </Box>
                        ))
                    }
                </>
            }
        </>
    )
}

export default Posts
