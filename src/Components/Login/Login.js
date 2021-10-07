import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Login.css";
import logo from "../../images/logos/logo.png";
import googleIcon from "../../images/logos/googleIcon.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebaseConfig";
import { UserContext } from "../../App";
firebase.initializeApp(firebaseConfig);

const Login = (props) => {
  const [loginUser, setloginUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (loginUser) {
      window.localStorage.setItem("auth", JSON.stringify(loginUser));
    }
  }, [loginUser]);

  const provider = new firebase.auth.GoogleAuthProvider();

  const singInGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          name: displayName,
          email: email,
          emailVerified: true,
          image: photoURL,
        };
        setloginUser(signedInUser);
        firebaseTokenStore();
        history.replace(from);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  function firebaseTokenStore() {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        window.localStorage.setItem("authToken", idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  }
  document.title = "Login";
  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: "120px" }} />
        </Link>
      </Container>
      <Container>
        <Row className="mt-3">
          <Col lg={5} className="mx-auto mt-5 py-5 border text-center">
            <div className="p-4">
              <h5 className="mb-3 font-weight-bold">Login With</h5>
              <img src={googleIcon} alt="googleIcon" className="googleIcon" />
              <button
                className="btn w-100 m-2 btnIcon mb-2"
                onClick={singInGoogle}
              >
                Continue with Google
              </button>
              <p>
                Don’t have an account?
                <span style={{ color: "#3F90FC", cursor: "pointer" }}>
                  {" "}
                  Create an account{" "}
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
