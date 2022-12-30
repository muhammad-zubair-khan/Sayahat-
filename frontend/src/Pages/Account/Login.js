// import React, { useState } from "react";
// import Navbar from "../../Navbar/Navbar";
// import "./Account.css";

// function Form({ option }) {
//   // const [firstName,setFirstName] = useState("")
//   // const [lastName,setLastName] = useState("")
//   // const [email,setEmail] = useState("")
//   // const [password,setPassword] = useState("")
//   // const [repeatPassword,setRepeatPassword] = useState("")
//   const [formInput, setFormInput] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//   });

//   const [formError, setFormError] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//   });

//   const handleUserInput = (name, value) => {
//     setFormInput({
//       ...formInput,
//       [name]: value,
//     });
//   };
//   const validateFormInput = (event) => {
//     event.preventDefault();
//     let inputError = {
//       email: "",
//       password: "",
//       confirmPassword: "",
//       firstName: "",
//       lastName: "",
//     };

//     if (!formInput.email && !formInput.password) {
//       setFormError({
//         ...inputError,
//         email: "Enter valid email address",
//         password: "Password should not be empty",
//       });
//       return;
//     }

//     if (!formInput.firstName) {
//       setFormError({
//         ...inputError,
//         firstName: "Enter your first name",
//       });
//       return;
//     }

//     if (!formInput.lastName) {
//       setFormError({
//         ...inputError,
//         lastName: "Enter your last name",
//       });
//       return;
//     }

//     if (!formInput.email) {
//       setFormError({
//         ...inputError,
//         email: "Enter valid email address",
//       });
//       return;
//     }

//     if (formInput.confirmPassword !== formInput.password) {
//       setFormError({
//         ...inputError,
//         confirmPassword: "Password and confirm password should be same",
//       });
//       return;
//     }

//     if (!formInput.password) {
//       setFormError({
//         ...inputError,
//         password: "Password should not be empty",
//       });
//       return;
//     }

//     setFormError(inputError);
//   };
//   return (
//     <form className="account-form" onSubmit={validateFormInput}>
//       <div
//         className={
//           "account-form-fields " +
//           (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
//         }
//       >
//         <input
//           value={formInput.email}
//           onChange={({ target }) => {
//             handleUserInput(target.name, target.value);
//           }}
//           className="input"
//           id="email"
//           name="email"
//           type="email"
//           placeholder="E-mail"
//           required
//         />
//         <p className="error-message">{formError.email}</p>
//         <input
//           value={formInput.password}
//           onChange={({ target }) => {
//             handleUserInput(target.name, target.value);
//           }}
//           id="password"
//           name="password"
//           className="input"
//           type="password"
//           placeholder="Password"
//           required={option === 1 || option === 2 ? true : false}
//           disabled={option === 3 ? true : false}
//           // value={password}
//           // onChange={(e)=> setPassword(e.target.value)}
//         />
//         <p className="error-message">{formError.password}</p>
//         <input
//           value={formInput.confirmPassword}
//           onChange={({ target }) => {
//             handleUserInput(target.name, target.value);
//           }}
//           id="confirm-password"
//           name="confirm-password"
//           className="input"
//           type="password"
//           placeholder="Confirm password"
//           required={option === 2 ? true : false}
//           disabled={option === 1 || option === 3 ? true : false}
//           // value={repeatPassword}
//           // onChange={(e)=> setRepeatPassword(e.target.value)}
//         />
//         <p className="error-message">{formError.confirmPassword}</p>
//         <input
//           id="first-name"
//           name="first-name"
//           className="input"
//           placeholder="First Name"
//           required={option === 2 ? true : false}
//           disabled={option === 1 || option === 3 ? true : false}
//           // value={firstName}
//           // onChange={(e)=> setLastName(e.target.value)}
//           value={formInput.firstName}
//           onChange={({ target }) => {
//             handleUserInput(target.name, target.value);
//           }}
//         />
//         <p className="error-message">{formError.firstName}</p>

//         <input
//           id="last-name"
//           name="last-name"
//           className="input"
//           placeholder="Last Name"
//           required={option === 2 ? true : false}
//           disabled={option === 1 || option === 3 ? true : false}
//           // value={lastName}
//           // onChange={(e)=> setLastName(e.target.value)}
//           value={formInput.lastName}
//           onChange={({ target }) => {
//             handleUserInput(target.name, target.value);
//           }}
//         />
//         <p className="error-message">{formError.lastName}</p>
//       </div>
//       <button className="btn-submit-form" type="submit">
//         {option === 1 ? "Sign in" : option === 2 ? "Sign up" : "Reset password"}
//       </button>
//     </form>
//   );
// }

// const Account = () => {
//   const [option, setOption] = useState(1);
//   return (
//     <div
//       style={{
//         background: "#000000",
//         height: "120vh",
//         fontFamily: "Nunito, Roboto, Arial, sans-serif",
//       }}
//     >
//       <Navbar />
//       <div className="cont container">
//         <header>
//           <div
//             className={
//               "header-headings " +
//               (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
//             }
//           >
//             <span>Sign in to your account</span>
//             <span>Create an account</span>
//             <span>Reset your password</span>
//           </div>
//         </header>
//         <ul className="options22">
//           <li
//             className={option === 1 ? "active" : ""}
//             onClick={() => setOption(1)}
//           >
//             Sign in
//           </li>
//           <li
//             className={option === 2 ? "active" : ""}
//             onClick={() => setOption(2)}
//           >
//             Sign up
//           </li>
//           <li
//             className={option === 3 ? "active" : ""}
//             onClick={() => setOption(3)}
//           >
//             Forgot
//           </li>
//         </ul>
//         <Form option={option} />
//       </div>
//     </div>
//   );
// };

// export default Account;

import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Form from "./utilities/Forms";
import "./style.css";
import logo from "../../Assets/logo/logo.png";
import { Row, Col } from "react-bootstrap";
import { login } from "../../Redux/Actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // const {error,success} = useSelector((state)=>state.auth)
  // console.log(success)

  const validateLogin = () => {
    let isValid = true;

    let validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6,
      },
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const authenticate = (e) => {
    e.preventDefault();

    const validate = validateLogin();

    if (validate) {
      setValidate({});
      setEmail("");
      setPassword("");
      alert("Successfully Login");
    }
  };
  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const signuInUser = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));

    // history.push()
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  return (
    <Row>
      <Col
        md={6}
        style={{
          backgroundImage:
            "linear-gradient(to right top, #173f4a, #395c5e, #5f7a72, #88988a, #b2b7a7)",
          height: "100vh",
        }}
      >
        <img
          src={logo}
          alt=""
          style={{ width: "-webkit-fill-available", marginTop: "10%" }}
        />
      </Col>

      <Col className="text-center bgimg">
        <div
          className="d-flex flex-column align-content-end"
          style={{ marginTop: "20%" }}
        >
          <div className="auth-body mx-auto">
            <h4 style={{ marginBottom: "20px" }}>Login to your account</h4>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                onSubmit={signuInUser}
                autoComplete={"off"}
              >
                <div className="email mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      validate.validate && validate.validate.email
                        ? "is-invalid "
                        : ""
                    }`}
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.email
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.email
                      ? validate.validate.email[0]
                      : ""}
                  </div>
                </div>

                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        validate.validate && validate.validate.password
                          ? "is-invalid "
                          : ""
                      }`}
                      name="password"
                      id="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => togglePassword(e)}
                    >
                      <i
                        className={
                          showPassword ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>

                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.password
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.password
                        ? validate.validate.password[0]
                        : ""}
                    </div>
                  </div>

                  <div className="extra mt-3 row justify-content-between">
                    <div className="col-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember"
                          checked={remember}
                          onChange={(e) => setRemember(e.currentTarget.checked)}
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="forgot-password text-end">
                        <Link to="/forgot-password">Forgot password?</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Log In
                  </button>
                </div>
              </form>

              <hr />
              <div className="auth-option text-center pt-2">
                No Account?{" "}
                <Link className="text-link" to="/register">
                  Sign up{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
