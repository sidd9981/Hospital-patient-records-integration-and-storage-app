import React, { useState, useEffect } from "react";
import styles from "../login.module.css"; // Import the CSS module
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login({ setShowNavbar, setHosbar, setPatientbar }) {
  useEffect(() => {
    setShowNavbar(false);
    setHosbar(false);
    setPatientbar(false);
  }, []);
  const navigate = useNavigate();
  const [uaadhar, setuaadhar] = useState("");
  const [upassword, setupassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const apiUrl = "http://127.0.0.1:5000/api/udata/" + uaadhar; // Replace with your API endpoint
    // const requestBody = {
    //   hospitalNumber: hospitalNumber,
    //   password: password,
    // };

    fetch(apiUrl, {
      method: "GET", // Use the appropriate HTTP method (POST, GET, etc.)
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the API response data as needed
        // For example, you can check if the login was successful
        console.log(data);
        if (data.password) {
          // Redirect to the dashboard page on successful login
          if (data.password === upassword) {
            console.log(data.password);
            fetch("http://127.0.0.1:5000/api/updatestatus/" + uaadhar, {
              method: "PUT", // Use the appropriate HTTP method (POST, GET, etc.)
              headers: {
                "Content-Type": "application/json",
              },
              // body: JSON.stringify(requestBody),
            })
            setShowNavbar(true);
            setHosbar(false);
            setPatientbar(true);
            navigate("/PatientHome");
          } else {
            // Handle unsuccessful login (e.g., display an error message)
            setError("Wrong password");
          }
        } else {
          setError("Fill in Correct Details");
        }
      })
      .catch((error) => {
        // Handle any network errors or exceptions here
        console.error("API call error:", error);
        // alert("API call error:", error);
      }); 
    
  };

  const handleLogin1 = () => {
    setShowNavbar(false);
    setHosbar(false);
    setPatientbar(false);
    navigate("/Signup");
  };
  const handleLogin2 = () => {
    setShowNavbar(true);
    setHosbar(true);
    setPatientbar(false);
    navigate("/HospitalLogin");
  };

  return (
    <div className={`${styles.rishibody}`}>
      <div className={`${styles.container1}`} id="container1">
        <div className={`${styles.formContainer} ${styles.signInContainer1}`}>
          <form className={`${styles.rishiform}`} action="#">
          {error && <p style={{ color: "red" }}>{error}</p>}<br></br><br></br>
            <h1 className={`${styles.rishih1}`}>Sign in</h1>
            {/* <span className={`${styles.rishispan}`}>or use your account</span> */}
            <input
              className={`${styles.rishiinput}`}
              type="text"
              placeholder="Aadhar Number"
              value={uaadhar}
              onChange={(e) => setuaadhar(e.target.value)}
              required
            />
            <input
              className={`${styles.rishiinput}`}
              type="password"
              placeholder="Password"
              value={upassword}
              onChange={(e) => setupassword(e.target.value)}
              required
            />
            <button className={`${styles.rishibutton}`} onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
        <div className={`${styles.overlayContainer1}`}>
          <div className={`${styles.overlay}`}>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={`${styles.rishih1}`}>Hello, India!</h1>
              <p className={`${styles.riship}`}>
                Haven't signed up with us yet? Please enter your details to
                access all your medical records.
              </p>
              <button
                className={`${styles.rishibutton} ${styles.ghost}`}
                id="signUp"
                onClick={handleLogin1}
              >
                Sign Up
              </button>
              <p className={`${styles.riship}`}>
                Or, Is a hospital trying to Login?
              </p>
              <button
                className={`${styles.rishibutton} ${styles.ghost}`}
                id="signUp"
                onClick={handleLogin2}  
              >
                Login as Hospital
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
