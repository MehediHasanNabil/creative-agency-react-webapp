import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import logo from "../../../images/logos/logo.png";
import { Link, useParams, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faUsers,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../App";
import swal from "sweetalert";

const Order = () => {
  const backendUrl = "https://pool-rebel-tune.glitch.me";
  document.title = "Order";
  const [loginUser, setloginUser] = useContext(UserContext);
  const [path, setPath] = useState(false);
  const [info, setInfo] = useState({});
  const { title, description, price, imageName } = useParams();
  const { name, email } = loginUser;

  const handleChange = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    setInfo(newInfo);
  };
  useEffect(() => {
    setInfo({
      name,
      email,
      title,
      description,
      price,
      imageName, // add file name property
    });
  }, [info, loginUser]);

  // console.log(info)

  const handleSubmit = (e) => {
    console.log(`Submit`);
    e.preventDefault();
    fetch(`${backendUrl}/creative-agency/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((data) => {
        swal(data.message, "", "success");
        setPath(true);
        // console.log('Success:', data);
      })
      .catch((error) => {
        swal(error.message, "", "error");
        console.error("Error:", error);
      });
  };

  if (path) {
    return <Redirect to="/customer/service" />;
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
          <h4 className="pl-5" style={{ marginLeft: "10rem" }}>
            Order
          </h4>
          <h4 className="text-primary">{loginUser.name}</h4>
        </div>
      </Container>
      <Container fluid>
        <Row className="justify-content-left">
          <Col md={2}>
            <div className="mt-5">
              <Link
                to="/"
                className="d-flex w-100 text-decoration-none"
                style={{ color: "#009444" }}
              >
                <FontAwesomeIcon icon={faCartArrowDown} className="mt-2 mr-2" />
                <button
                  className="btn btn-light w-100"
                  style={{ color: "#009444" }}
                >
                  Order
                </button>
              </Link>
            </div>
            <div>
              <Link
                to="/customer/service"
                className="d-flex w-100 text-decoration-none text-dark"
              >
                <FontAwesomeIcon icon={faUsers} className="mt-2 mr-2" />
                <button className="btn btn-light w-100">Service list</button>
              </Link>
            </div>
            <div>
              <Link
                to="/customer/review"
                className="d-flex w-100 text-decoration-none text-dark"
              >
                <FontAwesomeIcon icon={faInbox} className="mt-2 mr-2" />
                <button className="btn btn-light w-100">Review</button>
              </Link>
            </div>
          </Col>
          <Col md={8}>
            <div className="mt-3 p-5 bg-light w-75">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    onBlur={handleChange}
                    value={loginUser.name}
                    name="name"
                    placeholder="Your name / company’s name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="email"
                    onBlur={handleChange}
                    value={loginUser.email}
                    name="email"
                    placeholder="Your email address"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    onBlur={handleChange}
                    value={title}
                    name="title"
                    placeholder="Service name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    onBlur={handleChange}
                    value={description}
                    name="description"
                    rows={3}
                    placeholder="Project Details"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    onBlur={handleChange}
                    value={price}
                    name="price"
                    placeholder="Price"
                  />
                </Form.Group>
                <button className="btn btn-dark px-5" type="submit">
                  Send
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Order;
