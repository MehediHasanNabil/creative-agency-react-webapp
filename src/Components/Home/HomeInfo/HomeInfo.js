import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Frame from "../../../images/logos/Frame.png";

const HomeInfo = () => {
  return (
    <Container>
      <Row className="p-5">
        <Col md={6} className="py-5">
          <div className="py-5">
            <h1 className="font-weight-bold">
              Let’s Grow Your <br /> Brand To The <br /> Next Level
            </h1>
            <p className="lead my-4">
              Lorem ipsum dolor sit, amet consectetur <br /> adipisicing elit.
              Cupiditate animi, qui sequi <br /> magnam debitis eligendi.
            </p>
            <button className="btn btn-dark px-5">Hire me</button>
          </div>
        </Col>
        <Col md={6} className="py-5">
          <img className="img-fluid py-2" src={Frame} alt="" />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeInfo;
