import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Payment =() =>{
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };
    return(
        <div className='container py-5'>
            <div className='row'>
                <div className='col-sm-8'>
                    <div className='py-3'>
                        <h1 className = 'title'>Biling Detail</h1>
                        <hr />
                    </div>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col md>
                                <Form.FloatingLabel controlId="validationCustom01" label="First name" className="mb-3">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="First name"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.FloatingLabel>
                            </Col>
                            <Col md>
                                <Form.FloatingLabel controlId="validationCustom02" label="Last name " className="mb-3">
                                    <Form.Control 
                                        required
                                        type="text"
                                        placeholder="Last name"
                                    />
                                </Form.FloatingLabel>
                            </Col>  
                        </Row>   
                        <Col>
                            <Form.FloatingLabel controlId="validationCustom03" label="Email address" className="mb-3">
                                <Form.Control 
                                    required
                                    type="email" 
                                    placeholder="name@example.com" />
                            </Form.FloatingLabel>
                            <Form.FloatingLabel controlId="validationCustom04" label="Address" className="mb-3">
                                <Form.Control 
                                    required
                                    type="text" 
                                    placeholder="ABC-NewYork"/>
                            </Form.FloatingLabel>
                            <Form.FloatingLabel controlId="validationCustom05" label="Phone Number" className="mb-3">
                                <Form.Control 
                                    required
                                    type="number" 
                                    placeholder="0123456789" />
                            </Form.FloatingLabel>
                        </Col>   
                        <hr />
                        <Col>
                            <Form.Check className="mb-3" label="Shipping address is the same as my billing address" />
                            <Form.Check className="mb-3" label="Save this information for next time" />
                        </Col>   
                        <hr />
                    <div className='py-3'>
                        <h3 className = 'title'>Payment</h3>
                    </div>
                    <Col>
                        <Form.Check className="mb-3" type="radio" label="Credit Card " required />
                        <Form.Check className="mb-3" type="radio" label="Paypal "/>
                    </Col>
                    <Row> 
                        <Col md>
                            <FloatingLabel controlId="validationCustom06" label="Name on card " className="mb-3">
                                <Form.Control 
                                    required
                                    type="text" 
                                    placeholder="John Biden" />
                            </FloatingLabel>
                        </Col>
                    
                        <Col md>
                            <FloatingLabel controlId="validationCustom07" label="Card number" className="mb-3">
                                <Form.Control 
                                    required
                                    type="number" 
                                    placeholder="01235678912" />
                            </FloatingLabel>
                        </Col>                        
                    </Row> 
                    <Row> 
                        <Col className="md-3">
                            <FloatingLabel controlId="validationCustom08" label="Expiration " className="mb-3">
                                <Form.Control 
                                    required
                                    type="date" 
                                    placeholder="dd/MM/yyyy" />
                            </FloatingLabel>
                        </Col>
                    
                        <Col className="md-3">
                            <FloatingLabel controlId="validationCustom09" label="CVV" className="mb-3">
                                <Form.Control 
                                    required
                                    type="cvv" 
                                    placeholder="xxx" />
                            </FloatingLabel>
                        </Col>                        
                    </Row> 

                    <Button type='submit'>CONTINUE TO CHECKOUT</Button>               
                    </Form>     
                </div>
                
                <div className='col-sm 4'>
                    <div className='py-3'>
                        <h1 className = 'title'>Summary</h1>
                        <hr />
                    </div>
                    <Col className='md-3'>
                        <p>Products</p>
                        <p>Shipping</p>
                    </Col>
                    <hr/>
                    <p>Total amount (including VAT)</p>
                
                </div>
            </div>
            
        </div>
    )
}

export default Payment;
    
