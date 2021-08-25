import React from 'react'
import './Video.css';
function Video(props) {
    const handleMute=(e)=>{
        e.preventDefault();
        e.target.muted=!e.target.muted;
     
    }
    return (
        <>  
            <video src={props.source} onClick={handleMute} controls muted='muted' type='video/mp4'>
                <source src={props.source} type='video/webm'/>
            </video>
        </>
    )
}

export default Video
