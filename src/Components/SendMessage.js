import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Input } from '@material-ui/core';
import { database } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, NoSsr } from '@material-ui/core';
import styled from 'styled-components';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Picker from 'emoji-picker-react';
const useStyles = makeStyles(() => ({
  msgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: '2%',
    width: '70vw',
    background: '#272336',
    borderRadius: '14px',
    padding:'0.5em',
    height:'3rem',
  },
  textfield: {
    color: '#BDBDBD',
    height: '1rem'
  },
  emojiBox: {
    position: 'absolute',
    left: '0',
    bottom: '8vh',
  }
}));
const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    fieldset {
      border-color: white;
      ${'' /* border:none;
      border-bottom:3px solid white; */}
    }
    &:hover fieldset {
      border-color:white ;
      ${'' /* border:none;
      border-bottom:3px solid white; */}
    }
    &.Mui-focused fieldset {
      border-color: white;
      ${'' /* border:none;
      border-bottom:3px solid white; */}
    }
  }
`;
function SendMessage({ userData = null, scroll }) {
  const [message, setMessage] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const classes = useStyles();
  const sendMsg = async (e) => {
    e.preventDefault();
    await database.messages.add({
      text: message,
      profileURL: userData?.profileURL,
      userId: userData?.userId,
      username: userData?.username,
      createdAt: database.getCurrentTimeStamp(),
    })
    setMessage('');
    scroll.current.scrollIntoView({ behavior: 'smooth' })

  }
  const handleOpenEmojiBox = () => {
    let val = !openEmoji;
    setOpenEmoji(val);
  }
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      sendMsg(e)
    }
  }
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    if (chosenEmoji != null)
      setMessage(message + chosenEmoji.emoji);
  };
    return (
      <div className={classes.msgContainer}>

        <InsertEmoticonIcon style={{ color: "#BDBDBD", fontSize: "2rem", marginLeft: '0.2em' }} onClick={handleOpenEmojiBox} />
        {
          openEmoji == true ?
            <div className={classes.emojiBox}>
              <Picker onEmojiClick={onEmojiClick} />
            </div> : <></>
        }
        <NoSsr>
          <StyledTextField value={message} fullWidth onChange={(e) => setMessage(e.target.value)}
            size="small" inputProps={{ className: classes.textfield }} InputLabelProps={{ style: { color: '#fff' } }}
            variant="outlined" placeholder="Type Something..." style={{ marginLeft: '0.5em', color: 'white' }} onKeyPress={handleKeypress} />
        </NoSsr>
        <Button onClick={sendMsg} style={{ color: "#BDBDBD", border: '1px solid #BDBDBD', marginLeft: '0.5em', marginRight: '1em' }}>SEND</Button>

      </div>
    )
  }

  export default SendMessage
