import React, { useContext, useEffect, useState } from "react";
import "./Navigation.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../images/logos/logo.png";
import { UserContext } from "../../../App";
import swal from "sweetalert";

const Navigation = () => {
  const backendUrl = 'https://pool-rebel-tune.glitch.me';
  const [loginUser, setloginUser] = useContext(UserContext);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const stickyValue = window.localStorage.getItem("auth");
    const authValue = stickyValue !== null ? JSON.parse(stickyValue) : "";
    if (window.localStorage.getItem("auth") !== null) {
      setloginUser(authValue);
    } 
  });

  const signOut = () => {
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("authToken");
    setloginUser({});
  };

  useEffect(() => {
    fetch(`${backendUrl}/make-admin`)
      .then((response) => response.json())
      .then((data) => setAdmin(data))
      .catch((error) => {
        console.error(error);
        swal("Error", error.message, "error");
      });
  }, []);

  return (
    <Navbar expand="lg" className="container navBackground">
      <Link className="navbar-brand" to="/">
        <img className="img" src={logo} alt="logo" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link className="nav-link mx-2 text-center text-dark" to="/">
            Home
          </Link>
          <Link className="nav-link mx-2 text-center text-dark" to="/">
            Our Protfolio
          </Link>
          <Link className="nav-link mx-2 text-center text-dark" to="/">
            Our Team
          </Link>
          <Link className="nav-link mx-2 text-center text-dark" to="/">
            Contact us
          </Link>
          {loginUser.name ? (
            <button className="btn mx-1 text-light bg-info text-center rounded">
              {loginUser.name}
            </button>
          ) : (
            ""
          )}
          {!loginUser.name ? (
            <Link
              className="nav-link mx-2 bg-dark text-light text-center rounded px-5"
              to="/login"
            >
              Login
            </Link>
          ) : (
            <button
              className="btn mx-1 bg-danger text-light text-center rounded px-3"
              onClick={signOut}
            >
              SignOut
            </button>
          )}

          {admin.map(
            (adminData) =>
              adminData.email === loginUser.email && (
                <Link
                  className="nav-link mx-1 bg-info text-light text-center rounded px-4"
                  to="/admin/dashboard"
                >
                  Admin
                </Link>
              )
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
