import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  InputGroup,
  Image,
} from "react-bootstrap";
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
import swal from "sweetalert";
import MenuAppBar from "../../MenuAppBar/MenuAppBar";

const AddService = () => {
  const backendUrl = "https://pool-rebel-tune.glitch.me";
  const [loginUser, setloginUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [service, setService] = useState();
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [fileUpload, setFileUpload] = useState(false);

  document.title = "Add Service";

  // useEffect(() => {
  //   const stickyValue = window.localStorage.getItem("auth");
  //   const authValue = stickyValue !== null ? JSON.parse(stickyValue) : "";
  //   setloginUser(authValue);
  // }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    setService({
      ...service,
      [name]: event.target.value,
      fileName,
    });
  };

  const handleFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setLoading(true);

    fetch(`${backendUrl}/admin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    })
      .then((response) => response.json())
      .then((data) => {
        swal("", data.message, "success");
        setLoading(false);
        setFileUpload(true);
        e.target.reset();
        setFile({});
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        swal("Error", error.message, "error");
        setLoading(false);
        e.target.reset();
      });
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    setLoadingImage(true);

    const formData = new FormData();
    formData.append("file", file);

    fetch(`${backendUrl}/upload/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        swal("", data.message, "success");
        setLoadingImage(false);
        setFileUpload(true);
        // console.log(data);
      })
      .catch((error) => {
        // console.error(error);
        swal("Error", error.message, "error");
        e.target.reset();
      });
  };

  return (
    <>
      <Container fluid className="d-flex">
        {/* <MenuAppBar />   */}
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
          <h4 className="pl-5 responsiveMargin">Add Service</h4>
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
                className="d-flex w-100 text-decoration-none"
                style={{ color: "#009444" }}
              >
                <FontAwesomeIcon icon={faPlus} className="mt-2 mr-2" />
                <button
                  className="btn btn-light w-100"
                  style={{ color: "#009444" }}
                >
                  Add Service
                </button>
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
          <Col md={8} className="mt-3 bg-light p-5">
            <div
              style={{ backgroundColor: "#fff", borderRadius: "20px" }}
              className="p-2"
            >
              <Form className="pb-5 p-3" onSubmit={handleFileSubmit}>
                <Form.Group>
                  <Row>
                    <Col md={8}>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-cloud-arrow-up"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                            />
                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                          </svg>
                        </InputGroup.Text>
                        <Form.Control
                          encType="multipart/form-data"
                          type="file"
                          className="w-25 btn btn-light"
                          placeholder="Upload project file"
                          name="avatar"
                          onChange={handleFile}
                          id="fileinput"
                          required
                        />
                      </InputGroup>
                    </Col>
                    <Col md={4}>
                      <Button
                        variant="info px-5"
                        type="submit"
                        disabled={loadingImage}
                      >
                        {loadingImage ? "Loading…" : "Upload"}
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
              <section>
                {fileUpload && (
                  <Image width="100" src={`${backendUrl}/${fileName}`} />
                )}
              </section>
              {fileUpload && (
                <Form className="pb-5 p-3" onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Service Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      name="title"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Service Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Price"
                      name="price"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Description"
                      name="description"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="dark px-5" type="submit" disabled={loading}>
                    {loading ? "Loading…" : "Submit"}
                  </Button>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddService;
