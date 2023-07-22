
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import './Profile.scss'
const Profile = () => {
    const [userData, setUserData] = useState({
        fullname: '',
        gender: '',
        phone: '',
        address: '',
        country: '',
        avatar: '',
    });
    // const [fullname_err, setFullname_err] = useState('');
    const navigate = useNavigate();
    const id = useSelector((state) => state.auth.login.currentUser.id);
    useEffect(() => {
        getOneUser(id);
    }, [id]);

        const getOneUser = async (id) => {
        try {
        const res = await axios.get(`https://localhost:7262/api/User/${id}`, id);

        if (res.status === 200) {
            setUserData(res.data.data);
        }
        } catch (error) {
        console.error("Fetch User data failed:", error);
        }
    };
    const updateUser = async (userId, data) => {
        try {
        const res = await axios.put(`https://localhost:7262/api/User/${userId}`, data);
        console.log("update date: ", res.data);
        if (res.status === 200) {
            toast.success(`Updated User successfully ~`);
            getOneUser(id);
            navigate("/profile");
        }
        } catch (error) {
        toast.error("Update user failed:", error);
        }
    };
    // const validateForm = () => {
    //     let isValid = true;
    //     if (userData.fullname.trim() === "" ) {
    //         console.log('fullname_err: ',fullname_err);
    //     setFullname_err("Name is Required");
    //     isValid = false;
    //     }
    //     return isValid;
    //     };
    const handleSubmit = (event) => {
        event.preventDefault();
        // if (validateForm){
            updateUser(userData.id, userData);
        // }else {
        //     toast.error("Fullname is require ~ Pls check again");
        // }
        
    };

    return (
        <div className='container py-5'>
        <Row>
            <div className='col-lg-10 profile'>
            <Col className="avatar">
                <img src={userData.avatar} alt='avatar' />
            </Col>
            <Form onSubmit={handleSubmit}>
                <h1>General information</h1>
                <Col md>
                <Form.FloatingLabel controlId="validationCustom01" label="Full name" className="mb-3">
                    <Form.Control
                    type="text"
                    placeholder="Full name"
                    value={userData.fullname}
                    onChange={event => setUserData({ ...userData, fullname: event.target.value })}
                    />
                </Form.FloatingLabel>
                {/* {fullname_err && (
                <span className="error">{fullname_err}</span>
                )} */}
                </Col>
                <Col md>
                <Form.FloatingLabel controlId="validationCustom03" label="Gender" className="mb-3">
                    <Form.Control
                    type="text"
                    placeholder="Male/Female"
                    value={userData.gender}
                    onChange={event => setUserData({ ...userData, gender: event.target.value })}
                    />
                </Form.FloatingLabel>
                </Col>

                <Col md>
                <Form.FloatingLabel controlId="validationCustom04" label="Phone Number" className="mb-3">
                    <Form.Control
                    require
                    type="number"
                    placeholder="0123456789"
                    value={userData.phone}
                    onChange={event => setUserData({ ...userData, phone: event.target.value })}
                    />
                </Form.FloatingLabel>
                </Col>

                <Col md>
                <Form.FloatingLabel controlId="validationCustom05" label="Address" className="mb-3">
                    <Form.Control
                    type="text"
                    placeholder="Address"
                    value={userData.address}
                    onChange={event => setUserData({ ...userData, address: event.target.value })}
                    />
                </Form.FloatingLabel>
                </Col>
                <Col md>
                <Form.FloatingLabel controlId="validationCustom06" label="Country" className="mb-3">
                    <Form.Control
                    type="text"
                    placeholder="Country"
                    value={userData.country}
                    onChange={event => setUserData({ ...userData, country: event.target.value })}
                    />
                </Form.FloatingLabel>
                </Col>
                <Button className='btn' type='submit'>Update Information</Button>
            </Form>
            </div>
        </Row>
        </div>
    )
    }
export default Profile
