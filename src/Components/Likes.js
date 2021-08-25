import React,{useState,useEffect} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import {database} from '../Firebase';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme)=>({
    like:{ 
     color: "#2fbfce", 
     fontSize: "1.3rem", 
     marginLeft: '0.2em', 
     cursor:'pointer',
    },
    unlike:{ 
    color: "#BDBDBD", 
    fontSize: "1.3rem", 
    marginLeft: '0.2em',
    cursor:'pointer',
    }
}))

function Likes({userData=null,post=null}) {
    const[like,setLike]=useState(null);
    const classes=useStyles();
    useEffect(()=>{
        let check=post.likes.includes(userData?.userId)?true:false;
        setLike(check);
        
    },[post]);
    const handleLike=async()=>{
        if(like==true){
            // unlike
            let uarr=post.likes.filter(el=>{
                return el!=userData.userId;
            })
              await database.posts.doc(post.postId).update({
                likes:uarr
            })
        }else{
            // like
            let uarr=[...post.likes,userData.userId];
            await database.posts.doc(post.postId).update({
                likes:uarr
            })
        }
    }
    return (
        <>
        {   
          
            like!=null?<>{like==false?
            <FavoriteIcon className={classes.unlike} onClick={handleLike} />
            :<FavoriteIcon className={classes.like} onClick={handleLike} /> }
            </>:<></>
        }
        </>
    )
}

export default Likes
