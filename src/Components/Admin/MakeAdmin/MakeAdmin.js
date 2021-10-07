import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import logo from "../../../images/logos/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faUserPlus,
  faPlus,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../App";
import swal from 'sweetalert';


const MakeAdmin = () => {
  const backendUrl = 'https://pool-rebel-tune.glitch.me';
  const [loginUser, setloginUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [adminEmail, setadminEmail] = useState({});
  document.title = "Make admin";

  const handleChange = (event) => {
    const name = event.target.name;
    setadminEmail({ 
      ...adminEmail,
      [name]: event.target.value
    });
  }

  const makeAdmin = (e) => {
    e.preventDefault();
    fetch(`${backendUrl}/make-admin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminEmail),  
    })
    .then(response => response.json())
    .then(data => {
        // console.log('Success:', data);
        swal(data.message, "", "success");
        setLoading(false);
        e.target.reset();
    })
    .catch((error) => {
        // console.error('Error:', error);
        swal("Error", error.message, "error");
        setLoading(false);
        e.target.reset();
    });
}
  return (
    <>
      <Container fluid className="d-flex">
        <div style={{ width: "100px" }}>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="my-3"
              style={{ width: "120px" }}
            />
          </Link>
        </div>
        <div className="d-flex justify-content-between mt-3 w-100">
          <h4 className="pl-5 responsiveMargin">Make Admin</h4>
          <div className="d-flex justify-content-right">
            {loginUser.image && (
              <Image
                width="50"
                height="50"
                roundedCircle
                src={loginUser.image}
                alt="profile"
              />
            )}
            <h4 className="text-primary text-center">{loginUser.name}</h4>
          </div>
        </div>
      </Container>
      <Container fluid>
        <Row>
          <Col md={2}>
            <div className="mt-5">
              <Link
                to="/admin/dashboard"
                className="d-flex w-100 text-decoration-none text-dark"
              >
                <FontAwesomeIcon icon={faHome} className="mt-2 mr-2" />
                <button className="btn btn-light w-100">Dashboard</button>
              </Link>
            </div>
            <div>
              <Link
                to="/admin/serviceList"
                className="d-flex w-100 text-decoration-none text-dark"
              >
                <FontAwesomeIcon icon={faCartArrowDown} className="mt-2 mr-2" />
                <button className="btn btn-light w-100">Service list</button>
              </Link>
            </div>
            <div>
              <Link
                to="/admin/addService"
                className="d-flex w-100 text-decoration-none text-dark"
              >
                <FontAwesomeIcon icon={faPlus} className="mt-2 mr-2" />
                <button className="btn btn-light w-100">Add Service</button>
              </Link>
            </div>
            <div>
              <Link
                to="/admin/makeAdmin"
                className="d-flex w-100 text-decoration-none"
                style={{ color: "#009444" }}
              >
                <FontAwesomeIcon icon={faUserPlus} className="mt-2 mr-2" />
                <button
                  className="btn btn-light w-100"
                  style={{ color: "#009444" }}
                >
                  Make Admin
                </button>
              </Link>
            </div>
          </Col>
          <Col md={8} className="mt-3 bg-light p-5">
            <div
              style={{ backgroundColor: "#fff", borderRadius: "20px" }}
              className="p-2"
            >
              <Form className="pb-5 p-3" onSubmit={makeAdmin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="jon@gamil.com"
                    required
                    name="email"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="dark px-5" type="submit" disabled={loading}>
                  {loading ? 'Loading…' : 'Make Admin'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MakeAdmin;
