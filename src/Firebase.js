import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDZ0ix2lDncqvgGRnTu9L76sxG3Bxq-abs",
    authDomain: "ireel-60b33.firebaseapp.com",
    projectId: "ireel-60b33",
    storageBucket: "ireel-60b33.appspot.com",
    messagingSenderId: "883349814000",
    appId: "1:883349814000:web:2c90da708efb6a10e2e035"
})

export const auth=firebase.auth();
const firestore=firebase.firestore();
export const database={
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments:firestore.collection('comments'),
    messages:firestore.collection('messages'),
    getCurrentTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}
export const storage=firebase.storage();