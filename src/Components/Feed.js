import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import Header from './Header'
import Profile from './Profile';
import { database, storage } from '../Firebase';
import UserDetail from './UserDetail';
import Posts from './Posts';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  feed:{
    display:'flex',
    justifyContent:'center',
    marginTop:'4em',
  },
  mainContainer:{
      backgroundColor:'#121212',
      width:'50%',
      display:'flex',
      flexDirection:'column',
    //   justifyContent:'center',
      alignItems:'center',
    //   margin:'0 auto',
   
  },
  sideContainer:{
      width:'25%',
  }
    
}));
function Feed() {
    const classes=useStyles()
    const {currentUser}=useContext(AuthContext);
    const [userData,setUserData]=useState(null);
    useEffect(()=>{
        const unsubscribe=database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            setUserData(doc.data());
        })
      },[currentUser])
    return (
        <div>
            <Header/>
            <div className={classes.feed}>
            <div className={classes.mainContainer}>
                <Posts userData={userData}/>
            </div>
            <div className={classes.sideContainer}>
                <UserDetail userData={userData}/>
            </div>
            </div>
        </div>
    )
}

export default Feed
