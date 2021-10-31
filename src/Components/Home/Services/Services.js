import React, { useState, useEffect } from "react";
import "./Services.css";
import { Container, Row, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import loader from "../../../images/loader/loading.svg";

const Services = () => {
  const backendUrl = "https://pool-rebel-tune.glitch.me";
  const [loading, setLoading] = useState(true);
  const [adminService, setAdminService] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/admin/`)
      .then((response) => response.json())
      .then((data) => {
        setAdminService(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);
  
  return (
    <Container>
      <h2 className="text-center my-5">
        Provide awesome <span style={{ color: "#7AB259" }}> services </span>{" "}
      </h2>
      <Row className="text-center mt-5">
        {!loading ? (
          adminService.map((serviceInfo) => (
            <Col lg={4} key={serviceInfo._id}>
              <Link
                to={`/customer/order/${serviceInfo.title}/${serviceInfo.description}/${serviceInfo.price}/${serviceInfo.fileName}`}
                className="text-decoration-none text-dark"
              >
                <Card className="cardHover border-0 p-4 my-4 color">
                  <Card.Img
                    variant="center"
                    src={`${backendUrl}/${serviceInfo.fileName}`}
                    style={{ width: "74px" }}
                    className="mx-auto"
                  />
                  <Card.Body>
                    <Card.Title>{serviceInfo.title}</Card.Title>
                    <Card.Text className="service-link">{serviceInfo.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <div className="loader position-relative">
            <img src={loader} alt="loading" />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Services;
