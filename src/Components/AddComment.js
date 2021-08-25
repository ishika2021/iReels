import React,{useState} from 'react'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { TextField,NoSsr} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { database } from '../Firebase';
// import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Picker from 'emoji-picker-react';
const useStyles=makeStyles(()=>({
    textfield: {
        color: '#BDBDBD',
        
    },
    emojiBox:{
        position:'absolute',
        left:'2vw',
        bottom:'9vh',
        
    }
}))

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #BDBDBD;
      border:none;
      border-bottom:2px solid #BDBDBD;
   
      
    }
    &:hover fieldset {
      border-color:#BDBDBD ;
      border:none;
      border-bottom:2px solid #BDBDBD;
     
    }
    &.Mui-focused fieldset {
      border-color: white;
      border:none;
      border-bottom:2px solid #BDBDBD;
      
      
    }
  }
  .MuiOutlinedInput-inputMarginDense{
      padding-top:5px;
      
  }
`;
function AddComment({userData=null,post=null}) {
    const classes=useStyles();
    const [text,setText]=useState('');
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [openEmoji,setOpenEmoji]=useState(false);
    const managetext=(e)=>{
        let comment=e.target.value;
        setText(comment);
    }
    const handleOnEnter=()=>{
        let obj={
            text:text,
            uName:userData.username,
            uUrl:userData.profileURL
        }
        database.comments.add(obj).then(docRef=>{
            database.posts.doc(post.postId).update({
                comments:[...post.comments,docRef.id]
            })
        }).catch(e=>{
            console.log(e);
        })
        setText('');
    }
    const handleOpenEmojiBox=()=>{
        let val=!openEmoji;
        setOpenEmoji(val);
      }
      const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        if(chosenEmoji!=null)
          setText(text+chosenEmoji.emoji);
      };
      const handleKeypress = e => {
          if (e.key === "Enter") {
              handleOnEnter();
      }
    };
    return (
        <>
            <InsertEmoticonIcon style={{ color: "#BDBDBD", fontSize: "2rem",marginLeft:'0.5em',marginRight:'0.2em' }} onClick={handleOpenEmojiBox} />
            {                  
                  openEmoji==true?
                  <div className={classes.emojiBox}>
                  <Picker style={{boxShadow:'none'}} onEmojiClick={onEmojiClick} />
                  </div>:<></>
            }
            <NoSsr>
                <StyledTextField value={text} onChange={managetext} size="small" fullWidth 
                inputProps={{ className: classes.textfield }} InputLabelProps={{ style: { color: '#BDBDBD',fontSize:'0.9rem'} }} 
                variant="outlined" label="Add a comment" style={{ marginLeft: '0.5em', color: '#BDBDBD' }} onKeyPress={handleKeypress} />
            </NoSsr>
            <Button onClick={handleOnEnter} style={{ color: "#BDBDBD", marginLeft: '0.2em', marginRight: '0.2em' }}>POST</Button>
        </>
    )
}

export default AddComment
