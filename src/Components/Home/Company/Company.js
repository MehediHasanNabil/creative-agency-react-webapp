import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import slack from "../../../images/logos/slack.png";
import google from "../../../images/logos/google.png";
import uber from "../../../images/logos/uber.png";
import netflix from "../../../images/logos/netflix.png";
import airbnb from "../../../images/logos/airbnb.png";

const Company = () => {
  return (
    <Container>
      <Row className="my-3 mt-5 mx-auto">
        <Col lg={2} className="mx-auto">
          <div className="w-50 mx-auto my-4">
            <img src={slack} className="img-fluid" alt="slack" />
          </div>
        </Col>
        <Col lg={2} className="mx-auto">
          <div className="w-50 mx-auto my-4">
            <img src={google} className="img-fluid" alt="google" />
          </div>
        </Col>
        <Col lg={2} className="mx-auto">
          <div className="w-50 mx-auto my-4">
            <img src={uber} className="img-fluid" alt="uber" />
          </div>
        </Col>
        <Col lg={2} className="mx-auto">
          <div className="w-50 mx-auto my-4">
            <img src={netflix} className="img-fluid" alt="netflix" />
          </div>
        </Col>
        <Col lg={2} className="mx-auto">
          <div className="w-50 mx-auto my-4">
            <img src={airbnb} className="img-fluid" alt="airbnb" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Company;
