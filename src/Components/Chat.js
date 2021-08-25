import React, { useContext, useEffect, useState, useRef } from 'react'
import { database } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import SendMessage from './SendMessage';
import { Avatar, Typography } from '@material-ui/core';
import { AuthContext } from '../Context/AuthProvider';
import { Box } from '@material-ui/core';
import Header from './Header';
import './Chat.css';
const useStyles = makeStyles(() => ({  
    textBox:{
        width: '100%',
        height: '15%',
        margin:'0.5em',
    },
    sent:{
        display: 'flex',
        float: 'right',
        maxWidth: '40%',
        height:'100%',   
    },
    recieved:{
        display: 'flex',
        float: 'left',
        maxWidth: '40%',
        height:'100%',   
    },
    msgNameBox: {
        borderRadius:'10px',
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5em',
    },
    nameText: {
        color: '#b0adbb',
        marginRight: '0.1em',
        marginTop: '0em',
        textAlign: 'right',
        color:'white',
        fontSize:'15px'
    },
    nameTextLeft:{
        color: '#b0adbb',
        textAlign:'left',
        marginTop: '0em',
        marginLeft:'0.1em',
        fontSize:'15px'
    },
    styleMsg: {
        color: 'white',
        marginTop: '0.3em',
        marginLeft: '1em',
        overflowWrap: 'break-word',
    },
    styleMsgLeft:{
        color: 'white',
        marginTop: '0.3em',
        color: '#b0adbb',
        marginRight:'1em',
        overflowWrap: 'break-word',
    }
}))
function Chat() {
    const classes = useStyles();
    const scroll = useRef();
    const [msg, setMsg] = useState([]);
    const [msgType, setMsgType] = useState();
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        })
    }, [currentUser])
    useEffect(async () => {
        let marr = [];
        await database.messages.orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            marr = [];
            snapshot.forEach((doc) => {
                let data = {
                    ...doc.data(),
                    id: doc.id
                }
                marr.push(data);
            })
            setMsg(marr);
        })
        

    }, []);
    return (
        <>
        <Header userData={userData}/>
        <Box className='msgBox'>
            {
                msg.map((message) => (
                    <div className={classes.textBox} key={message.id} >
                        {
                            message.userId === userData?.userId ? <>
                                <div className={classes.sent}>
                                    <div className={classes.msgNameBox} style={{background:'#9f85ff'}}>
                                        <h3 className={classes.nameText}>{message.username}</h3>
                                        <p className={classes.styleMsg}>{message.text}</p>

                                    </div>
                                    <Avatar src={message.profileURL} style={{marginRight:'1em',marginLeft:'0.3em'}} />
                                </div>
                            </> :
                                <>
                                    <div className={classes.recieved} >
                                        <Avatar src={message.profileURL} style={{marginRight:'0.3em'}}/>
                                        <div className={classes.msgNameBox} style={{background:'#383152'}}>
                                            <h3 className={classes.nameTextLeft}>{message.username}</h3>
                                            <p className={classes.styleMsgLeft}>{message.text}</p>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                ))
            }
            <div ref={scroll}></div>
        </Box>
        <div style={{display:'flex',justifyContent:'center'}}>
            <SendMessage userData={userData} scroll={scroll} />

        </div>
        </>
    )
}

export default Chat
