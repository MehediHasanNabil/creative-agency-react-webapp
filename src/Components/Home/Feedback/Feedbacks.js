import React, { useContext, useEffect, useState } from "react";
import "./Feedback.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import loader from "../../../images/loader/loading.svg";
import { UserContext } from "../../../App";
import swal from "sweetalert";
import { Avatar } from "@material-ui/core";

const Feedbacks = () => {
  const backendUrl = "https://pool-rebel-tune.glitch.me";
  const [loginUser, setloginUser] = useContext(UserContext);
  const [review, setreview] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${backendUrl}/review`)
      .then((response) => response.json())
      .then((data) => {
        setreview(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const deleteReview = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("data-id");
    console.log(id);
    fetch(`${backendUrl}/review/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        swal("", data.message, "success");
        // console.log('Success:', data);
      })
      .catch((error) => {
        swal("", error.message, "error");
        // console.error('Error:', error);
      });
  };

  const deletefn = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteReview(e);
        }
      })
      .catch((error) => {
        swal(error.message);
      });
  };

  return (
    <Container>
      <h2 className="my-5 text-center">
        Clients <span style={{ color: "#7AB259" }}> Feedback </span>{" "}
      </h2>
      <Row className="customMargin justify-content-center">
        {!loading ? (
          review.map((feedback) => (
            <Col lg={4} className="my-3" key={feedback._id}>
              <Card className="scaleEffect">
                <div className="d-flex">
                  {loginUser.image && (
                    <Avatar
                      alt="Remy Sharp"
                      src={loginUser.image}
                      className="m-2"
                    />
                  )}
                  <Card.Title className="py-2">
                    <h5>{feedback.customerName}</h5>
                    <h6>{feedback.title}</h6>
                  </Card.Title>
                  {feedback.email === loginUser.email && (
                    <div>
                      <button
                        onClick={deletefn}
                        data-id={feedback._id}
                        className="ml-5 btn btn-outline-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <Card.Body>
                  <Card.Text>{feedback.description}</Card.Text>
                </Card.Body>
                <footer className="blockquote-footer"></footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <div
              className="mx-auto justify-content-center"
              style={{ width: "80px" }}
            >
              <img src={loader} className="100%" alt="loading" />
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Feedbacks;
