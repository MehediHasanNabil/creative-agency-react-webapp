import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Table, Image, Spinner } from "react-bootstrap";
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
// import notification from '../../../music/mixkit-positive-notification-951.wav';
import loader from "../../../images/loader/loading.svg";
import swal from "sweetalert";
import trash from "../../../images/icons/trash.svg";

const AdminServices = () => {
  const backendUrl = "http://localhost:4000";
  const [loginUser, setloginUser] = useContext(UserContext);
  document.title = "Admin Services";
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageFile, setImageFile] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/admin/`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        authToken: window.localStorage.getItem("authToken"),
      },
    }) // show admin service details
      .then((response) => response.json())
      .then((data) => {
        setAdminData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${backendUrl}/images`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        authToken: window.localStorage.getItem("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setImageFile(data);
        setIsImageLoading(false);
      })
      .catch((error) => {
        console.error(error);
        swal("", error.message, "error");
      });
  }, [imageFile]);

  const handleDeletePhoto = (name) => {
    fetch(`${backendUrl}/delete/image/${name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: window.localStorage.getItem("authToken"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        swal("", result.message, "success");
      })
      .catch((error) => {
        swal("", error.message, "error");
        console.error(error);
      });
  };

  const deleteData = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("data-id");
    console.log(id);
    fetch(`${backendUrl}/admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: window.localStorage.getItem("authToken"),
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
          deleteData(e);
        }
      })
      .catch((error) => {
        swal(error.message);
      });
  };
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
          <h4 className="pl-5 responsiveMargin">Services List</h4>
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
        <Row className="justify-content-left">
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
                className="d-flex w-100 text-decoration-none"
                style={{ color: "#009444" }}
              >
                <FontAwesomeIcon icon={faCartArrowDown} className="mt-2 mr-2" />
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
                className="d-flex w-100 text-decoration-none text-dark"
              >
                <FontAwesomeIcon icon={faUserPlus} className="mt-2 mr-2" />
                <button className="btn btn-light w-100">Make Admin</button>
              </Link>
            </div>
          </Col>
          <Col md={8} className="mt-3 bg-light p-4">
            <div
              style={{ backgroundColor: "#fff", borderRadius: "20px" }}
              className="p-2"
            >
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading ? (
                    adminData.map((data, index) => (
                      <tr key={data._id} className="text-center">
                        <td>{index + 1}</td>
                        <td>{data.title}</td>
                        <td>{data.description}</td>
                        <td>{data.date}</td>
                        <td>
                          <Image
                            width="100"
                            src={`${backendUrl}/${data.fileName}`}
                          />
                        </td>
                        <td>
                          <Link
                            to={`/admin/updateService/admin/${data._id}/${data.title}/${data.description}`}
                            className="btn"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                          </Link>
                        </td>
                        <td>
                          <button
                            data-id={data._id}
                            onClick={deletefn}
                            className="btn"
                          >
                            <Image
                              src={trash}
                              data-id={data._id}
                              onClick={deletefn}
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="loader">
                        <Image src={loader} alt="loading" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="mt-5">
          <h3>Image</h3>
          {isImageLoading ? (
            <Spinner animation="border" role="status" className="serviceLoader">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            imageFile.map((imageName) => (
              <Col lg={3} className="m-3" key={imageName.name}>
                <div className="mx-auto p-4 serverImgDiv">
                  <Image
                    variant="top"
                    className="p-2 serverImg w-100"
                    src={`${backendUrl}/${imageName.name}`}
                  />
                  <div className="serverImgBtn">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeletePhoto(imageName.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default AdminServices;
