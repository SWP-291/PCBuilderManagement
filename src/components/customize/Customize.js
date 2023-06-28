import { useState } from 'react';
import './Customize.scss'

// import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ItemsModal from '../modal/ItemsModal'
import cpu from '../assets/image/cpu.png'
import ram from '../assets/image/ram.png'
import gpu from '../assets/image/gpu.png'
import hdd from '../assets/image/hdd.png'
import ssd from '../assets/image/ssd.png'
import { NavLink } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import cpuheatsink from '../assets/image/cpuheatsick.png'

const Customize = () => {
    const [openModal, setOpenModal] = useState(false);
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
        <div className='container py-5 customize'>
            <Row>
                <div className='title'>
                    <h1>SELECT YOUR COMPONENTS</h1>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Form.Group className="mb-4" >
                        <img src={cpu} alt='CPU'/>  
                        <Button onClick = {() => {setOpenModal(true);}}>                    
                        <Form.Label>CPU</Form.Label>   
                        </Button>  
                        { openModal && <ItemsModal closeModel= {setOpenModal} />}                    
                    </Form.Group> 
                    <Form.Group className="mb-4">
                        <img src={ram} alt='RAM'/>   
                        <Button onClick = {() => {setOpenModal(true);}}>                    
                            <Form.Label>RAM</Form.Label>   
                            </Button>  
                            { openModal && <ItemsModal closeModel= {setOpenModal} />}   
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <img src={gpu} alt='GPU'/>   
                        <Button onClick = {() => {setOpenModal(true);}}>                    
                            <Form.Label>GPU</Form.Label>   
                            </Button>  
                            { openModal && <ItemsModal closeModel= {setOpenModal} />}   
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-4">
                        <img src={ssd} alt='SSD'/>   
                        <Button onClick = {() => {setOpenModal(true);}}>                    
                            <Form.Label>SSD</Form.Label>   
                            </Button>  
                            { openModal && <ItemsModal closeModel= {setOpenModal} />}   
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <img src={hdd} alt='HDD'/>   
                        <Button onClick = {() => {setOpenModal(true);}}>                    
                            <Form.Label>HDD</Form.Label>   
                            </Button>  
                            { openModal && <ItemsModal closeModel= {setOpenModal} />}   
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <img src={cpuheatsink} alt='CPU Heatsink'/>   
                        <Button onClick = {() => {setOpenModal(true);}}>                    
                            <Form.Label>CPU HEATSINK</Form.Label>   
                            </Button>  
                            { openModal && <ItemsModal closeModel= {setOpenModal} />}   
                    </Form.Group>
                </Row>
                <NavLink to='/payment'>
                    <Button type='submit'>Buy Now</Button>
                </NavLink>
                </Form>
            </Row>
        </div>
    )
}
export default Customize