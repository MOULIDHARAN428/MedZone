import React,{useRef, useState, useEffect} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from 'react-webcam';
import io from "socket.io-client";
import ScrollTopBottom from "react-scroll-to-bottom";
import { drawHand } from './utilities';

import {loveYouGesture} from './Shared/loveYou';
import {thumbsUpGesture} from './Shared/thumbsUp';
import {victoryGesture} from './Shared/victory';
import {byeGesture} from './Shared/bye';
import {helloGesture} from './Shared/hello';
import {laterGesture} from './Shared/later';
import {noGesture} from './Shared/no';
import {questionGesture} from './Shared/question';
import {sickGesture} from './Shared/sick';
import {thanksGesture} from './Shared/thanks';
import {tiredGesture} from './Shared/tired';
import {yesGesture} from './Shared/yes';

//const socket = io.connect("http://localhost:3001");
const socket = io.connect('https://med-zone-backend.herokuapp.com/');

function Gesture(props){
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [emoji, setEmoji] = useState(null);
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [messageList,setMessageList] = useState([]);
    const sendMessage = async () => {
        if(emoji !== ""){
            const messageData = {
                room: room,
                author: username,
                message: emoji,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message",messageData);
            setMessageList((list) => [...list, messageData]);
            setEmoji("");
        }
    }
    
    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            //console.log(data);
            setMessageList((list)=>[...list,data])
        });
    },[socket]);

    const joinRoom = () =>{
        if (username!=="" && room!==""){
            socket.emit("join_room",room);
            setShowChat(true);
        }
    };
    
    const runHandpose = async () => {
        const net = await handpose.load();
        console.log("Handpose model loaded.");
        setInterval(()=>{
            detect(net)
        },100)
    }
    const detect = async(net) => {
        //To check data is available
        if(typeof webcamRef.current !== "undefined" && webcamRef.current !== null && 
            webcamRef.current.video.readyState===4){
                
                //video properties
                const video = webcamRef.current.video;
                const videoWidth = webcamRef.current.video.videoWidth;
                const videoHeight = webcamRef.current.video.videoHeight;
                
                //Setting video height and width
                webcamRef.current.video.width = videoWidth;
                webcamRef.current.video.height = videoHeight;

                //Setting canvas height and width
                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;

                //Make Detection
                const hand = await net.estimateHands(video);
                // console.log(hand); -> for printing 21 points index :)

                if(hand.length > 0){
                    const GE = new fp.GestureEstimator([
                        loveYouGesture,
                        victoryGesture,
                        thumbsUpGesture,
                        byeGesture,
                        helloGesture,
                        laterGesture,
                        noGesture,
                        questionGesture,
                        sickGesture,
                        thanksGesture,
                        tiredGesture,
                        yesGesture
                    ])

                    const gesture = await GE.estimate(hand[0].landmarks,4);
                    //console.log(gesture);

                    if(gesture.gestures !== undefined && gesture.gestures.length>0){
                        //console.log(gesture.gestures);

                        //Getting array of gesture's score
                        const score = gesture.gestures.map((prediction)=>prediction.score);
                        
                        //Getting maximum score from array
                        const maxScore = score.indexOf(Math.max.apply(null,score))
                        
                        setEmoji(gesture.gestures[maxScore].name);
                        
                        console.log(emoji);
                    }
                }

                //Draw mesh
                const ctx = canvasRef.current.getContext("2d");
                drawHand(hand,ctx);

            }
    }
    
    runHandpose();

    return(
        <>
            <Webcam
            ref={webcamRef}
            style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                zIndex: 9,
                top: 140,
                left: 50,
                width: 640,
                height: 480,
            }}
            />
            <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                zIndex: 9,
                top: 140,
                left: 50,
                width: 640,
                height: 480,
            }}
            />
            <div className='chat-css-gesture'>
                {!showChat ? (
                    <div className='joinChatContainer'>
                        <h3>Join a chat</h3>
                        <input type="text" placeholder="Name..." onChange={(event)=>{ setUsername(event.target.value)}}/>
                        <input type="text" placeholder="Room ID..." onChange={(event)=>{ setRoom(event.target.value)}}/>
                        <button onClick={joinRoom}>Join a room</button>
                    </div>
                ) : (
                    <div className="chat-window-gesture">
                        <div className="chat-header">
                            <p>Live Chat</p>
                        </div>
                        
                        <div className="chat-body">
                            <ScrollTopBottom className="message-container">
                                {messageList.map((messageContent)=>{
                                    return(
                                        <div className="message" id={username === messageContent.author ? "you" : "other"}>
                                            <div>
                                                <div className="message-content">
                                                    <p>{messageContent.message}</p>
                                                </div>
                                                <div className="message-meta">
                                                    <p id="time">{messageContent.time}</p>
                                                    <p id="author">{messageContent.author}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </ScrollTopBottom>
                        </div>
                        
                        <div className="chat-footer">
                            <input type="text" value={emoji} placeholder="Type..."
                            onKeyPress={(event)=>{event.key === "Enter" && sendMessage();}}/>
                            <button onClick={ sendMessage }>&#9658;</button>
                        </div>

                    </div>
                )}            
            </div>

        </>
    );
}

export default Gesture;