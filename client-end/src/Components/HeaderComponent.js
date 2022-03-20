import React, {useState} from 'react';
import {Navbar, Container,Nav, Form, Modal, Button} from "react-bootstrap";
function  Header  (props) {
  const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fa = login ? "fa fa-log-out" : "fa fa-sign-in";

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if(email && password){
                // const config = {
                //     headers : {
                //         "Content-type":"application/json"
                //     }
                // }
                // const newLogin = {
                //     password:  password,
                //     email:  email
                // }
                // const { data } = axios.post('http://localhost:3001/login',newLogin,config)
                // .then((response)=>{
                //     alert(response.data.message);
                //     localStorage.setItem("userInfo",JSON.stringify(data));
                //     setLogin(true); 
                // }).catch(error => {
                //     console.log(error);
                //     if(error.response.status === 401 || error.response.status === 400){
                //         alert(error.response.data.message);
                //     }
                //     else{
                //         alert(error.response.data.message);
                //     }
                //     console.log("Error : ",error);
                // });  
                alert("Sign In Successfully!"); 
                
        }
        else if(email){
            alert("Enter Password");
        }
        else if(password){
            alert("Enter Email");
        }
        else{
            alert("Enter Password and Email")
        }
    };
    return (
      <>
        <Navbar expand="lg">
          <Container className="header-navbar">

            <Navbar.Brand href="/home"><img src="/assets/image/logo.png" alt="" /><span className="navbar-header">Med Zone</span></Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                
                <Nav.Link href="/home"><span className="color-header">Home</span></Nav.Link>
                
                <Nav.Link href="/chat"><span className="color-header">Chat</span></Nav.Link>
                
                <Nav.Link href="/video"><span className="color-header">Video</span></Nav.Link>
                
                <Nav.Link href="/gesture"><span className="color-header">Gesture</span></Nav.Link>
                
                <Nav.Link href="/mentalscreening"><span className="color-header">Mental Screening</span></Nav.Link>
        
              </Nav>
              <Button className='log-in-btn' variant="warning"  onClick={!login && handleShow} >
                  <span className={fa}></span>{' '}{login ? "Log out" : "Log in"}
              </Button>
            </Navbar.Collapse>

          </Container>
        </Navbar>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Log in</Modal.Title>
            </Modal.Header>
            <Modal.Body onSubmit={handleSubmit}>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail" name="email"
                                onChange={e => setEmail(e.target.value)}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword" name="password"
                                onChange={e => setPassword(e.target.value)}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicCheckbox" >
                        <Form.Check type="checkbox" label="Remember password" />
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {' '}
                    <Button variant="primary" type="submit" value="Submit">
                        Log in
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <p>Or</p>
                <p>Don't have an account ?</p>
                <Button variant="primary" onClick={handleClose} href="/signup">
                    Sign up
                </Button>
            </Modal.Footer>
        </Modal>
      </>
  );
};

export default Header;