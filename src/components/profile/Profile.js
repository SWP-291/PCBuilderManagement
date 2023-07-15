import { Button, Col, Row} from 'react-bootstrap'
import './Profile.scss'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfileUsers } from '../../redux/apiRequest';
const Profile =() =>{
    const dispatch = useDispatch();
    const userInfor = useSelector(state => state.users.profiles.profile);
    console.log(userInfor)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const updateInfo = {
          ...userInfor,
          fullname: fullName,
          gender: gender,
          phone: phone,
          address: address,
          country: country
        };
        updateProfileUsers(userInfor.id, dispatch, updateInfo);
    };

    
    const [fullName, setFullName] = useState(userInfor?.fullName);
    const [gender, setGender] = useState(userInfor?.gender);
    const [phone, setPhone] = useState(userInfor?.phone);
    const [address, setAddress] = useState(userInfor?.address);
    const [country, setCountry] = useState(userInfor?.country);
    return (
        <div className='container py-5'>
        
            <Row>
            <div className='col-lg-10 profile'>              
                <Col className="avatar">
                    <img src={userInfor.avatar} alt='avatar'/>
                </Col>
                <Form onSubmit={handleSubmit}>
                    <h1>General information</h1>
                    <Col md>
                        <Form.FloatingLabel controlId="validationCustom01" label="Full name" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Full name"
                            value= {fullName}
                            onChange={event => setFullName(event.target.value)}
                        />
                       
                        </Form.FloatingLabel>
                    </Col>
                    <Col md>
                        <Form.FloatingLabel controlId="validationCustom03" label="Gender" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Male/Female"
                            value={gender}
                            onChange={event => setGender(event.target.value)}
                        />
                       
                        </Form.FloatingLabel>
                    </Col>

                    <Col md>
                        <Form.FloatingLabel controlId="validationCustom04" label="Phone Number" className="mb-3">
                        <Form.Control
                            require
                            type="number"
                            placeholder="0123456789"
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                        />
                       
                        </Form.FloatingLabel>
                    </Col>

                    <Col md>
                        <Form.FloatingLabel controlId="validationCustom05" label="Address" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={ event => setAddress(event.target.value)}
                        />
                       
                        </Form.FloatingLabel>
                    </Col>
                    <Col md>
                        <Form.FloatingLabel controlId="validationCustom06" label="Country" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={event => setCountry(event.target.value)}
                        />
                       
                        </Form.FloatingLabel>
                    </Col>
                    <Button className='btn' type='submit'>Update Infomation</Button>
                </Form>
            </div>                
            </Row>
        </div>
    )
}
export default Profile