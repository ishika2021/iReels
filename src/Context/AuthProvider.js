import React, { useEffect, useState } from 'react'
import {auth} from '../Firebase';
export const AuthContext=React.createContext();
function AuthProvider({children}) {
    const [currentUser,setCurrentUser]=useState();
    const [loading,setLoading]=useState(true);
    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout(){
        return auth.signOut();
    }
    // 
    useEffect(()=>{
        const unsub=auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            setLoading(false);
        })
        return()=>{
            unsub();
        }
    },[])
    // values that upon changing cause re-rendering of the children
    const value={
        currentUser,
        login,
        signup,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading&&children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
