import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Badge from '@material-ui/core/Badge';
import { Button, CircularProgress } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import { v4 as uuidv4 } from 'uuid';
import { database, storage } from '../Firebase';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none'
    },
    upload: {
        borderColor: '#31BDCE',
    color: '#31BDCE',
        margin:'1em',
    },
}));
function Upload({userData=null, type="icon"}) {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const types = ['video/mp4', 'video/webm', 'video/ogg'];
    const onChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError("Please select a file");
            setTimeout(() => { setError(null) }, 2000);
            return;
        }
        if (types.indexOf(file.type) == -1) {
            setError("Please select a video/image file");
            setTimeout(() => { setError(null) }, 2000);
            return;
        }
        if (file.size / (1024 * 1024) > 100) {
            setError("The selected file is too big.");
            setTimeout(() => { setError(null) }, 2000);
            return;
        }
        setLoading(true);
        const id = uuidv4();
        const uploadTask = storage.ref(`/posts/${userData.userId}/${file.name}`).put(file);
        uploadTask.on('state_chnaged', fn1, fn2, fn3);
        function fn1(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }
        function fn2(error) {
            setError(error);
            setTimeout(() => { setError(null) }, 2000);
            setLoading(false);
        }
        async function fn3() {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                let obj = {
                    comments: [],
                    likes: [],
                    pId: id,
                    pUrl: url,
                    uName: userData?.username,
                    uProfile: userData?.profileURL,
                    userId: userData?.userId,
                    createdAt: database.getCurrentTimeStamp()
                }
                database.posts.add(obj).then(async docRef => {
                    await database.users.doc(userData.userId).update({
                        postIds: [...userData.postIds, docRef.id]
                    })
                }).then(() => {
                    setLoading(false);
                }).catch((err) => {
                    setError(err);
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                    setLoading(false);
                })
            })
        }
    }
    return (
        <>
            {error != null ? <Alert severity="error">{error}</Alert> : 
                <IconButton aria-label="show 4 new mails" color="#BDBDBD">
                    <input
                        accept="video/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={onChange}
                    />
                    <label htmlFor="icon-button-file">
                        
                        {   loading==true?<CircularProgress style={{color:'yellow',fontSize:'1rem'}}/>:<>
                            {
                                type == "button" ? <Button className={classes.upload} variant="outlined" component="span">

                                Upload
                            </Button> : type =="icon"? <Badge color="secondary">
                                <PhotoCamera style={{ color: '#BDBDBD' }} />
                            </Badge>:<></>
                            }
                        </>
                            
                        }
                    </label>
                </IconButton>
            }
        </>

    )
}

export default Upload
