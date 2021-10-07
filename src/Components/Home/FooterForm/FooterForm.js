import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./FooterForm.css";

const FooterForm = () => {
  return (
    <footer className="mt-5 pt-3" id="contact-us">
      <Container>
        <Row className="p-3">
          <Col md={6} className="p-3">
            <h3>
              Let us handle your <br /> project, professionally.
            </h3>
            <small>
              With well written codes, we build amazing apps for all <br />{" "}
              platforms, mobile and web apps in general.
            </small>
          </Col>
          <Col md={6} className="p-3">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  className="p-4"
                  type="email"
                  placeholder="Your email address"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  className="p-4"
                  type="text"
                  placeholder="Your name / company’s name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  className="p-4"
                  as="textarea"
                  rows={3}
                  placeholder="Your message"
                  required
                />
              </Form.Group>
              <button className="btn btn-dark px-5" type="submit">
                Send
              </button>
            </Form>
          </Col>
        </Row>
        <div className="text-center py-5 mt-2">
          <small>copyright Orange labs {new Date().getFullYear()}</small>
        </div>
      </Container>
    </footer>
  );
};

export default FooterForm;
