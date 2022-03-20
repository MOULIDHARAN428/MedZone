import React,{useRef, useState} from 'react'
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from 'react-webcam';
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

function HomeGesture(props){
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [emoji, setEmoji] = useState(null);

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
                left: 0,
                right:0,
                textAlign: "center",
                zIndex: 9,
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
                left: 0,
                right:0,
                textAlign: "center",
                zIndex: 9,
                width: 640,
                height: 480,
            }}
            />
            {emoji !== null ? <>{emoji}</>:""} 

        </>
    );
}

export default HomeGesture;