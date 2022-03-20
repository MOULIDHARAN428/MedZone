import React,{} from 'react';
import {Button} from 'react-bootstrap';
function Home(props) {
    return(
        <>
            <div className="spltter-home"></div>
            <div className="container main-body-home">
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-5">
                        <img src="/assets/image/doctor.png" alt=""></img>
                    </div>
                    <div className="col-sm-5 quotes-doctor">
                        <h4>
                            A good doctor treats the disease, but the great doctor treats the patient who has the disease.
                        </h4>
                        <h7>Have Chat room ID, then click the button to have chat with your doctor.</h7>
                        <p><Button variant="outline-warning" href="/chat">Chat Room</Button>{' '}
                        <i className="button-padding"></i>
                        <Button variant="outline-warning" href="#">Pay fee</Button></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-5 quotes-doctor quotes-doctor-right">
                        <h4>
                            Let the young know they will never find a more interesting, more
                            instructive book than the patient himself.
                        </h4>
                        <h7>Have Video room ID, then click the button to have video call with your doctor.</h7>
                        <p><Button variant="outline-warning" href="/video">Video Room</Button>{' '}
                        <i className="button-padding"></i>
                        <Button variant="outline-warning" href="#">Pay fee</Button></p>
                    </div>
                    <div className="col-sm-5">
                        <img src="/assets/image/d-5.png" alt=""></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-5">
                        <img class="doctor-image" src="/assets/image/d-3.png" alt=""></img>
                    </div>
                    <div className="col-sm-5 quotes-doctor">
                        <h4>
                            All disputation makes the mind deaf, and when people are deaf, I am dumb.
                        </h4>
                        <h7>Have Gesture room ID, then click the button to have gesture chat with your doctor.</h7>
                        <p><Button variant="outline-warning" href="/gesture">Gesture Room</Button>
                        <i className="button-padding"></i>
                        <Button variant="outline-warning" href="#">Pay fee</Button>{' '}</p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;