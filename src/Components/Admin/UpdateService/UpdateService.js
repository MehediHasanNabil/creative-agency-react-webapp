import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import logo from '../../../images/logos/logo.png';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartArrowDown, faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';
// import notification from '../../../music/bells-notification.wav';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';


const UpdateService = () => {
    const backendUrl = 'https://pool-rebel-tune.glitch.me';
    const [loginUser, setloginUser] = useContext(UserContext);
    const { id, title, description, nodejsRoute } = useParams();
    const [service, setService] = useState({
        id, title, description
    });
    document.title = 'Update Service';
    const handleChange = (event) => {
        const name = event.target.name;
        setService({
            ...service,
            [name]: event.target.value
        });
    }

    const updateInfo = (e) => {
        e.preventDefault();
        fetch(`${backendUrl}/${nodejsRoute}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(service),
        })
            .then(response => response.json())
            .then(data => {
                swal(data.message, "", "success");
                // console.log('Success:', data);
            })
            .catch((error) => {
                swal("Error", error.message, "error");
                // console.error('Error:', error);
            });
    }

    return (
        <>
            <Container className="d-flex">
                <div style={{ width: '100px' }}>
                    <Link to="/"><img src={logo} alt="logo" className="my-3" style={{ width: '120px' }} /></Link>
                </div>
                <div className="d-flex justify-content-between mt-3 w-100">
                    <h4 className="ml-5 pl-5">Update Service</h4>
                    <h4 className="text-primary">{loginUser.name}</h4>
                </div>
            </Container>
            <Container>
                <Row className="justify-content-left">
                    <Col md={8} className="mt-3 bg-light p-5 mx-auto">
                        <div style={{ backgroundColor: '#fff', borderRadius: '20px' }} className="p-2">
                            <Form className="pb-5 p-3" onSubmit={updateInfo}>
                                <Form.Group controlId="">
                                    <Form.Label>Service Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter title" name="title" onChange={handleChange} defaultValue={title} required />
                                </Form.Group>
                                <Form.Group controlId="">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter Description" name="description" onChange={handleChange} defaultValue={description} required />
                                </Form.Group>
                                <Button variant="dark px-5" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UpdateService;