import React, {  useState } from 'react';
// import { Link } from 'react-router-dom';
import {Form,Button,Row, Col} from 'react-bootstrap';
import { faqs } from './Shared/forms';
// import axios from "axios";

function Mentalscreening(props){
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [telno, setTelno] = useState("");
        const [age, setAge] = useState("");
        const handleSubmit = (evt) => {
            evt.preventDefault();
            if(name && email && telno && age){
                // const newUser = {
                //     name:  name,
                //     email:  email,
                //     telno: telno,
                //     age: age
                // }
                // axios.post('http://localhost:3001/createUser',newUser);      
                alert("Posted Successfully! Result will reach you ASAP!"); 
            }
            else{
                alert("Enter the remaining information!");
            }
        };

        return(
            <>

                <div className="form container">
                    <h3 className="form-header">Mental Screening</h3><hr />

                    <Form class="col-12" onSubmit={handleSubmit}>
                        <Row>
                            <Form.Label column lg={2} className="form_label">Name</Form.Label>
                            <Col column lg={3}></Col>
                            <Col column lg={4}><Form.Control type="text" name="name" placeholder="Name" 
                                onChange={e => setName(e.target.value)} required/></Col>
                        </Row><br />

                        <Row>
                            <Form.Label column lg={2} className="form_label">Email</Form.Label>
                            <Col column lg={3}></Col>
                            <Col column lg={4}><Form.Control type="mail" name="email" placeholder="Email"
                                 onChange={e => setEmail(e.target.value)} required/></Col>
                        </Row><br />

                        <Row>
                            <Form.Label column lg={2} className="form_label">Tel No</Form.Label>
                            <Col column lg={3}></Col>
                            <Col column lg={4}><Form.Control type="number" name="telno" placeholder="Tel no." 
                                 onChange={e => setTelno(e.target.value)}/></Col>
                        </Row><br />

                        <Row>
                            <Form.Label column lg={2} className="form_label">Age</Form.Label>
                            <Col column lg={3}></Col>
                            <Col column lg={4}><Form.Control type="number" name="age" placeholder="Age" 
                                 onChange={e => setAge(e.target.value)}/></Col>
                        </Row><br />

                        {faqs.map((faq)=>(
                            <>
                                <Row>
                                    <Form.Label column lg={5} className="form_label">{faq.question}</Form.Label>
                                    <Col column lg={4}>
                                        <Form.Select lg={2}>
                                            <option value={faq.option1}>{faq.option1}</option>
                                            <option value={faq.option2}>{faq.option2}</option>
                                            <option value={faq.option3}>{faq.option3}</option>
                                            <option value={faq.option4}>{faq.option4}</option>
                                        </Form.Select>
                                    </Col>
                                </Row><br />
                            </>
                        ))}
                        
                        
                        <Form.Group className="mb-3">
                            <Form.Check
                            className="form_label"
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                            />
                        </Form.Group>

                        <Button type="submit" value="Submit">Submit</Button>
                        <br />
                        <br />
                    
                    </Form>
                        
                </div>
            </>
        );
    
}
export default Mentalscreening;