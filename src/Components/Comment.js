import React, { useEffect,useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { database } from '../Firebase';
import { CircularProgress } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
const useStyles=makeStyles({
    commentBox:{
        display:'flex',
        width:'100%',
        marginBottom:'0.5em'
    },
    nameCommentBox:{
        display:'flex',
        flexDirection:'column',
        width:'100%',
    }
})
function Comment(props) {
    const classes=useStyles();
    const [comments,setComments]=useState(null);
    useEffect(async()=>{
        let arr=[];
        for(let i=0;i<props.post.comments.length;i++){
            let cid=props.post.comments[i];
            let data=await database.comments.doc(cid).get();
            arr.push(data.data());
        }
        setComments(arr);
    },[props.post])
    return (
        <>
            {
                comments==null?<CircularProgress/>:
                comments.map((comment,index)=>(
                    <div key={index} className={classes.commentBox}>
                        <Avatar src={comment.uUrl} style={{height:'1.7rem',width:'1.7rem'}} />
                        <div className={classes.nameCommentBox}>
                            <h5 style={{color:'#BDBDBD',margin:'0',marginBottom:'0.2em',marginLeft:'0.5em'}}>{comment.uName}</h5>
                            <span style={{color:'#BDBDBD',margin:'0',marginLeft:'0.5em'}}>{comment.text}</span>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Comment
