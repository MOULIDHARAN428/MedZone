import React,{useState} from 'react';
import Chat from './Chat';
import io from "socket.io-client";

//const socket = io.connect("http://localhost:3001");
const socket = io.connect('https://med-zone-backend.herokuapp.com/');

function Chating(props){
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () =>{
        if (username!=="" && room!==""){
            socket.emit("join_room",room);
            setShowChat(true);
        }
    };

    return(
        <>
        <div className='chat-css'>
            {!showChat ? (
                <div className='joinChatContainer'>
                    <h3>Join a chat</h3>
                    <input type="text" placeholder="Name..." onChange={(event)=>{ setUsername(event.target.value)}}/>
                    <input type="text" placeholder="Room ID..." onChange={(event)=>{ setRoom(event.target.value)}}/>
                    <button onClick={joinRoom}>Join a room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room}/>
            )}            
        </div>    
        </>
    );
}

export default Chating;