import React, { useEffect, useContext,useState } from 'react'
import Header from './Header'
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import ProfileTop from './ProfileTop';
import ProfileBottom from './ProfileBottom';
import {database} from '../Firebase';
import { CircularProgress } from '@material-ui/core';
function Profile() {
    const history=useHistory();
    const {currentUser}=useContext(AuthContext);
    const [userData,setUserData]=useState(null);
    useEffect(()=>{
        const unsubscribe=database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            setUserData(doc.data());
        })
      },[currentUser])
    useEffect(()=>{
        if(currentUser){
            history.push('/profile');
        }
    },[])
    return (
        <>
            <Header/>
            { userData==null?<CircularProgress/>:
                <>
                <ProfileTop userData={userData} />
                <hr style={{background:'#F0F0F0',width:'80%',marginTop:'1.5em',border:'1px solid #F0F0F0'}} />
                <ProfileBottom userData={userData}/>
                </>

            }
            
        </>
    )
}

export default Profile
