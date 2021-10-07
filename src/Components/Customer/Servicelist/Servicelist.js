import React, { useContext, useEffect, useState } from "react";
import "./Servicelist.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import logo from "../../../images/logos/logo.png";
import loader from "../../../images/loader/loading.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faInbox } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../App";

const Servicelist = () => {
  const backendUrl = "https://pool-rebel-tune.glitch.me";
  const [loginUser, setloginUser] = useContext(UserContext);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${backendUrl}/creative-agency`)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      });
  }, []);

  document.title = "service Lists";

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
              {/* <Link to="/customer/order" className="d-flex w-100 text-decoration-none text-dark"><FontAwesomeIcon icon={faCartArrowDown} className="mt-2 mr-2" /><button className="btn btn-light w-100">Order</button></Link>  */}
            </div>
            <div>
              <Link
                to="/customer/service"
                className="d-flex w-100 text-decoration-none"
                style={{ color: "#009444" }}
              >
                <FontAwesomeIcon icon={faUsers} className="mt-2 mr-2" />
                <button
                  className="btn btn-light w-100"
                  style={{ color: "#009444" }}
                >
                  Service list
                </button>
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
          <Col md={8} className="mt-3 bg-light p-5">
            <Row>
              {!loading ? (
                order.map(
                  (service) =>
                    service.email === loginUser.email && (
                      <Col
                        lg={6}
                        className="my-2 serviceAnimation"
                        key={service._id}
                      >
                        <Card style={{ minHeight: "250px" }}>
                          <div>
                            <Card.Img
                              variant="top"
                              src={`${backendUrl}/${service.imageName}`}
                              style={{ width: "100px" }}
                              className="p-3"
                            />
                            <button className="float-right m-4 px-3 btn btn-light">
                              {service.status}
                            </button>
                          </div>
                          <Card.Body>
                            <Card.Title>{service.title}</Card.Title>
                            <Card.Text>{service.description}</Card.Text>
                          </Card.Body>
                        </Card>
                        <Card.Footer>
                          <small>{service.email}</small>
                        </Card.Footer>
                      </Col>
                    )
                )
              ) : (
                <div className="loader">
                  <img src={loader} alt="loading" />
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Servicelist;
